"""CSP nonce stamping: the template loader, and the headers/markup the server actually sends."""

import re

import pytest
from django.template import engines
from django.utils.safestring import mark_safe

from app.template_loaders import HX_NONCE_ATTR, SCRIPT_NONCE_ATTR, stamp_nonces

NONCE_HEADER_RE = re.compile(r"'nonce-([^']+)'")


class TestStampNonces:
    def test_stamps_element_with_hx_attribute(self):
        assert stamp_nonces('<button hx-post="/x">Go</button>') == (
            f'<button{HX_NONCE_ATTR} hx-post="/x">Go</button>'
        )

    def test_leaves_plain_elements_alone(self):
        src = '<div class="a" id="b"><p>hi</p></div>'
        assert stamp_nonces(src) == src

    def test_stamps_multiline_tag_with_template_tags_inside(self):
        src = (
            "<wa-button\n"
            '  size="small"\n'
            '  hx-get="/things?month={{ selected_month|date:\'Y-m\' }}"\n'
            '  class="x {% if a %}active{% endif %}"\n'
            ">"
        )
        result = stamp_nonces(src)
        assert result.startswith(f"<wa-button{HX_NONCE_ATTR}\n")
        assert result.count("\n") == src.count("\n"), "must not change line numbers"

    def test_hx_attribute_inside_template_conditional_still_counts(self):
        src = '<a {% if x %}hx-get="/y"{% endif %} href="/y">'
        assert stamp_nonces(src) == f'<a{HX_NONCE_ATTR} {{% if x %}}hx-get="/y"{{% endif %}} href="/y">'

    def test_hx_attribute_with_template_variable_in_name(self):
        src = '<a hx-{{ method }}="/y">'
        assert stamp_nonces(src) == f"<a{HX_NONCE_ATTR} hx-{{{{ method }}}}=\"/y\">"

    def test_modifier_and_hx_on_attributes_count(self):
        assert HX_NONCE_ATTR in stamp_nonces('<div hx-target:inherited="#out">')
        assert HX_NONCE_ATTR in stamp_nonces('<div hx-on:click="doThing()">')
        assert HX_NONCE_ATTR in stamp_nonces('<div hx-on::after:request="doThing()">')
        assert HX_NONCE_ATTR in stamp_nonces('<div data-hx-get="/x">')

    def test_does_not_double_stamp(self):
        src = '<button hx-nonce="abc" hx-post="/x">'
        assert stamp_nonces(src) == src
        src = '<script nonce="abc">1</script>'
        assert stamp_nonces(src) == src

    def test_does_not_treat_attribute_values_as_names(self):
        # `hx-...` appearing only inside a value must not trigger stamping.
        src = '<div title="hx-get" data-x=hx-post>'
        assert stamp_nonces(src) == src

    def test_stamps_inline_and_external_scripts(self):
        assert stamp_nonces("<script>\n  x()\n</script>") == f"<script{SCRIPT_NONCE_ATTR}>\n  x()\n</script>"
        assert stamp_nonces('<script src="/a.js"></script>') == f'<script{SCRIPT_NONCE_ATTR} src="/a.js"></script>'
        assert stamp_nonces('<SCRIPT type="module">x</SCRIPT>') == f'<SCRIPT{SCRIPT_NONCE_ATTR} type="module">x</SCRIPT>'

    def test_script_body_is_left_alone(self):
        body = "\n  el.innerHTML = '<div hx-get=\"/x\"></div>'\n  if (a < b && c > d) {}\n  <template>\n"
        result = stamp_nonces(f"<script>{body}</script>")
        assert result == f"<script{SCRIPT_NONCE_ATTR}>{body}</script>"

    def test_content_after_script_is_still_processed(self):
        src = '<script>1</script><div hx-get="/x"></div>'
        assert stamp_nonces(src) == f'<script{SCRIPT_NONCE_ATTR}>1</script><div{HX_NONCE_ATTR} hx-get="/x"></div>'

    def test_ignores_html_comments_and_template_comments(self):
        src = '<!-- <div hx-get="/x"> --><span>{# <div hx-get="/x"> #}</span>'
        assert stamp_nonces(src) == src

    def test_ignores_closing_tags_and_bare_less_than(self):
        src = '<div hx-get="/x">a < b</div> 1 <2'
        assert stamp_nonces(src) == f'<div{HX_NONCE_ATTR} hx-get="/x">a < b</div> 1 <2'

    def test_quoted_greater_than_inside_attribute_value(self):
        src = '<div hx-vals=\'{"a": ">"}\' title="x">'
        assert stamp_nonces(src) == f"<div{HX_NONCE_ATTR} hx-vals='{{\"a\": \">\"}}' title=\"x\">"

    def test_template_token_inside_tag_containing_greater_than(self):
        src = '<div hx-get="/x" data-y="{{ y|default:">" }}">'
        assert stamp_nonces(src) == f'<div{HX_NONCE_ATTR} hx-get="/x" data-y="{{{{ y|default:">" }}}}">'

    def test_partial_and_body_tags(self):
        assert stamp_nonces('<hx-partial hx-target="#a" hx-swap="outerHTML">') == (
            f'<hx-partial{HX_NONCE_ATTR} hx-target="#a" hx-swap="outerHTML">'
        )
        assert stamp_nonces("<body hx-indicator:inherited=\".bar\">") == (
            f"<body{HX_NONCE_ATTR} hx-indicator:inherited=\".bar\">"
        )

    def test_user_data_rendered_into_template_never_gets_a_nonce(self):
        """The whole point of stamping the source: rendered variables come in after stamping."""
        template = engines["django"].from_string(stamp_nonces('<div hx-get="/ok">{{ user_html }}</div>'))
        evil = '<button hx-post="/evil">x</button>'
        escaped = template.render({"csp_nonce": "N0NCE", "user_html": evil})
        assert 'hx-nonce="N0NCE" hx-get="/ok"' in escaped
        assert "<button" not in escaped  # autoescaped, not even a tag
        assert "&lt;button hx-post=" in escaped
        unescaped = template.render({"csp_nonce": "N0NCE", "user_html": mark_safe(evil)})
        assert '<button hx-post="/evil">x</button>' in unescaped
        assert unescaped.count("hx-nonce") == 1  # only the template's own element is stamped


@pytest.mark.django_db
class TestCspResponses:
    def _nonce_from(self, response):
        csp = response["Content-Security-Policy"]
        assert "'unsafe-inline'" not in csp
        assert "'unsafe-eval'" not in csp
        match = NONCE_HEADER_RE.search(csp)
        assert match, f"no nonce in CSP header: {csp}"
        return match.group(1)

    def test_full_page_has_nonce_header_matching_stamped_markup(self, client):
        response = client.get("/login")
        assert response.status_code == 200
        nonce = self._nonce_from(response)
        html = response.content.decode()
        assert f'<script nonce="{nonce}" src=' in html  # htmx.js and friends
        assert f'<body hx-nonce="{nonce}"' in html  # body carries hx-indicator:inherited
        assert 'safeEval:true' in html
        assert "hx-csp.js" in html
        assert "{{ csp_nonce }}" not in html
        assert 'hx-nonce=""' not in html
        assert 'nonce=""' not in html

    def test_htmx_partial_response_is_stamped_with_its_own_nonce(self, client, test_user):
        client.force_login(test_user)
        response = client.get("/bills/new", HTTP_HX_REQUEST="true")
        assert response.status_code == 200
        nonce = self._nonce_from(response)
        html = response.content.decode()
        assert f'hx-nonce="{nonce}"' in html
        assert "{{ csp_nonce }}" not in html
        assert 'hx-nonce=""' not in html

    def test_every_hx_element_in_a_page_is_stamped(self, client, test_user):
        client.force_login(test_user)
        for path in ["/bills", "/transactions", "/receipts", "/analytics", "/budgets", "/account"]:
            response = client.get(path)
            assert response.status_code == 200, path
            nonce = self._nonce_from(response)
            html = response.content.decode()
            # Every start tag that has an hx- attribute must also carry the nonce.
            for tag in re.findall(r"<[A-Za-z][^>]*>", html):
                if re.search(r"\shx-[\w:-]+=", tag) and "hx-nonce" not in tag:
                    pytest.fail(f"{path}: unstamped htmx element: {tag[:120]}")
                if tag.lower().startswith("<script") and f'nonce="{nonce}"' not in tag:
                    pytest.fail(f"{path}: unstamped script: {tag[:120]}")
