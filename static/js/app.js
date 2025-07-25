htmx.defineExtension("submit-spinner", {
  onEvent: function (name, event) {
    if (name === "htmx:load") {
      const parent = event.target
      const elts = parent.querySelectorAll('button[type="submit"], wa-button[type="submit"]')
      if (elts.length > 0) {
        parent.addEventListener("htmx:beforeRequest", (event) => {
          elts.forEach((elt) => {
            elt.disabled = true
            elt.loading = true
          })
        })
        parent.addEventListener("htmx:afterRequest", (event) => {
          elts.forEach((elt) => {
            elt.disabled = false
            elt.loading = false
          })
        })
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
  <wa-dialog label="${title}" class="dialog-overview">
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
