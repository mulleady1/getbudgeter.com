/**
 * HTMX extension for CSRF token injection.
 */
htmx.defineExtension("csrf", {
  onEvent: function (name, evt) {
    if (name === "htmx:configRequest") {
      const target = evt.target
      const modal = target.closest("wa-dialog, wa-drawer")

      // First try to find CSRF token inside the modal (if we're in one)
      let csrfInput = modal?.querySelector("input[name=csrfmiddlewaretoken]")

      // Fall back to document-level token
      if (!csrfInput) {
        csrfInput = document.querySelector("input[name=csrfmiddlewaretoken]")
      }

      if (csrfInput) {
        evt.detail.headers["X-CSRFToken"] = csrfInput.value
      }
    }
  },
})

/**
 * HTMX extension for disabling submit buttons and showing a spinner.
 */
htmx.defineExtension("button-spinner", {
  onEvent: function (name, event) {
    if (name === "htmx:load") {
      const parent = event.target

      // Process form submit buttons.

      const elts = parent.querySelectorAll('button[type="submit"], wa-button[type="submit"]')

      const enableSubmitButtons = () => {
        elts.forEach((elt) => {
          elt.disabled = false
          elt.loading = false
        })
      }

      const disableSubmitButtons = (event) => {
        elts.forEach((elt) => {
          elt.disabled = true
          elt.loading = true
        })
      }

      if (elts.length > 0) {
        parent.addEventListener("htmx:beforeRequest", disableSubmitButtons)
        parent.addEventListener("htmx:afterRequest", enableSubmitButtons)
      }

      // Process hx-[verb] elements.

      const eltTypes = ["button", "wa-button", "wa-dropdown-item"]
      const hxVerbs = ["get", "post", "put", "patch", "delete"]
      const selector = eltTypes.map((eltType) => hxVerbs.map((verb) => `${eltType}[hx-${verb}]`).join(", ")).join(", ")
      const elts2 = parent.querySelectorAll(selector)
      for (const elt of elts2) {
        elt.addEventListener("htmx:beforeRequest", () => {
          elt.disabled = true
          elt.loading = true
        })
        elt.addEventListener("htmx:afterRequest", () => {
          elt.disabled = false
          elt.loading = false
        })
      }
    }
  },
})

/**
 * HTMX extension for auto-opening and auto-closing dialogs and drawers.
 */
htmx.defineExtension("show-hide-dialogs", {
  onEvent: function (name, evt) {
    const target = evt.target

    // Auto-open dialogs/drawers after they're loaded into the DOM
    if (name === "htmx:load") {
      const dialog = target.matches("wa-dialog, wa-drawer") ? target : target.querySelector("wa-dialog, wa-drawer")

      if (dialog) {
        // Auto-open after a brief delay (unless it already has the 'open' attribute)
        if (!dialog.hasAttribute("open")) {
          setTimeout(() => (dialog.open = true), 100)
        }

        // Auto-cleanup when dialog closes
        dialog.addEventListener("wa-after-hide", () => dialog.remove(), { once: true })
      }
    }
  },
})

function customConfirm(options) {
  const title = options?.title || "Confirm"
  const text = options?.text || "Are you sure?"
  const confirmButtonText = options?.confirmButtonText || "Confirm"
  const cancelButtonText = options?.cancelButtonText || "Cancel"

  return new Promise((resolve) => {
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
    dialog.addEventListener("wa-after-hide", () => {
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
