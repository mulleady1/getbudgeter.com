// Inject CSRF token into every htmx request.
htmx.on("htmx:config:request", evt => {
  const source = evt.detail.ctx.sourceElement
  const dialog = source.closest("wa-dialog, wa-drawer")
  const csrfInput =
    dialog?.querySelector("input[name=csrfmiddlewaretoken]") ??
    document.querySelector("input[name=csrfmiddlewaretoken]")
  if (csrfInput) {
    evt.detail.ctx.request.headers["X-CSRFToken"] = csrfInput.value
  }
})

// htmx 4 only serializes native form controls (input/select/textarea) into GET params, and it
// can't see inside shadow DOM, so a named wa-* component that triggers its own request sends
// nothing. Add the source element's own name/value here.
htmx.on("htmx:config:request", evt => {
  const source = evt.detail.ctx.sourceElement
  const body = evt.detail.ctx.request.body
  if (!source.tagName.includes("-") || !source.name || source.value == null) return
  if (typeof source.checked === "boolean" && !source.checked) return
  if (!body.has(source.name)) {
    body.append(source.name, source.value)
  }
})

// Disable buttons and show spinners while a request is in flight.
htmx.on("htmx:before:request", evt => {
  const source = evt.detail.ctx.sourceElement
  const form = source.closest("form")
  const dialog = source.closest("wa-dialog, wa-drawer")
  const container = dialog ?? form
  container?.querySelectorAll('button[type="submit"], wa-button[type="submit"]').forEach(el => {
    el.disabled = true
    el.loading = true
  })

  if (source.matches("form")) {
    source.querySelectorAll(".form-error").forEach(el => el.remove())
  } else if (source.matches("button, wa-button, wa-dropdown-item")) {
    source.disabled = true
    source.loading = true
  }
})

// Re-enable buttons and hide spinners after a request is processed.
// Also, auto-close dialogs/drawers on successful form submission.
htmx.on("htmx:after:request", evt => {
  const source = evt.detail.ctx.sourceElement
  const form = source.closest("form")
  const dialog = source.closest("wa-dialog, wa-drawer")
  const container = dialog ?? form

  // Re-enable buttons
  container?.querySelectorAll('button[type="submit"], wa-button[type="submit"]').forEach(el => {
    el.disabled = false
    el.loading = false
  })
  if (source.matches("button, wa-button, wa-dropdown-item")) {
    source.disabled = false
    source.loading = false
  }

  // Close dialogs
  if (dialog && evt.detail.ctx.response?.raw?.ok && source.matches("form")) {
    console.log("closing dialog, evt=", evt)
    dialog.open = false
  }
})

// Auto-open and auto-cleanup dialogs/drawers.
htmx.on("htmx:after:process", evt => {
  const elt = evt.target
  const dialog = elt.matches?.("wa-dialog, wa-drawer") ? elt : elt.querySelector("wa-dialog, wa-drawer")
  if (!dialog) return

  if (!dialog.hasAttribute("open") && !dialog.hasAttribute("data-no-autoopen")) {
    setTimeout(() => {
      console.log("opening dialog, evt=", evt)
      dialog.open = true
    }, 100)
  }
  if (!dialog.hasAttribute("data-no-autoremove")) {
    // `wa-after-hide` bubbles, so only act on this dialog's own hide. Without the target
    // check, any nested component that closes an overlay (a wa-dropdown menu in the header
    // or a table row, a nested dialog, a tooltip) would tear down the whole dialog.
    dialog.addEventListener("wa-after-hide", function onAfterHide(evt) {
      if (evt.target !== dialog) return
      dialog.removeEventListener("wa-after-hide", onAfterHide)
      dialog.remove()
    })
  }
})

function customConfirm(options) {
  const title = options?.title || "Confirm"
  const text = options?.text || "Are you sure?"
  const confirmButtonText = options?.confirmButtonText || "Confirm"
  const cancelButtonText = options?.cancelButtonText || "Cancel"

  return new Promise(resolve => {
    let yes = false
    const div = document.createElement("div")
    div.innerHTML = `
  <wa-dialog label="${title}" class="dialog-overview" style="--width: 300px">
    ${text}
    <div slot="footer" style="width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
      <wa-button class="cancel" appearance="outlined">${cancelButtonText}</wa-button>
      <wa-button class="confirm">${confirmButtonText}</wa-button>
    </div>
  </wa-dialog>
    `

    const dialog = div.firstElementChild
    dialog.addEventListener("wa-after-hide", evt => {
      if (evt.target !== dialog) return // ignore hide events bubbling up from nested components
      resolve(yes)
      div.remove()
    })
    const closeButton = dialog.querySelector("wa-button.cancel")
    const confirmButton = dialog.querySelector("wa-button.confirm")
    closeButton.addEventListener("click", () => (dialog.open = false))
    confirmButton.addEventListener("click", () => {
      yes = true
      dialog.open = false
    })
    document.body.appendChild(div)
    setTimeout(() => {
      dialog.open = true
    }, 100)
  })
}

async function waitFor(cb) {
  const max = 100
  for (let i = 0; i < max; i++) {
    if (cb()) return
    await sleep(100)
  }
}
