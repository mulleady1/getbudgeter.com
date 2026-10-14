from django.http import HttpResponse

# Everything but the landing page is behind login, so there is nothing else to index. Polite
# crawlers (PetalBot, Sogou, SEO tools) stop after reading this; scanners never ask.
ROBOTS_TXT = """User-agent: *
Allow: /$
Allow: /static/
Disallow: /
"""


def robots_txt(request):
    return HttpResponse(ROBOTS_TXT, content_type="text/plain")
