htmx.defineExtension("submit-spinner", {
  onEvent: function (name, event) {
    if (name === "htmx:load") {
      const parent = event.target
      const elts = parent.querySelectorAll('button[type="submit"], sl-button[type="submit"]')
      if (elts.length > 0) {
        parent.addEventListener("htmx:beforeRequest", (event) => {
          elts.forEach((elt) => {
            elt.disabled = true
            elt._innerHTML = elt.innerHTML
            elt.innerHTML = "<sl-spinner style='--indicator-color: #eee; --track-color: #333;'></sl-spinner>"
          })
        })
        parent.addEventListener("htmx:afterRequest", (event) => {
          elts.forEach((elt) => {
            elt.disabled = false
            elt.innerHTML = elt._innerHTML
            delete elt._innerHTML
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
  <sl-dialog label="${title}" class="dialog-overview">
    ${text}
    <div slot="footer">
      <sl-button class="cancel">${cancelButtonText}</sl-button>
      <sl-button class="confirm" variant="primary">${confirmButtonText}</sl-button>
    </div>
  </sl-dialog>
    `

    const dialog = div.firstElementChild
    dialog.addEventListener("sl-after-hide", () => {
      resolve(yes)
      div.remove()
    })
    const closeButton = dialog.querySelector("sl-button.cancel")
    const confirmButton = dialog.querySelector("sl-button.confirm")
    closeButton.addEventListener("click", () => dialog.hide())
    confirmButton.addEventListener("click", () => {
      yes = true
      dialog.hide()
    })
    document.body.appendChild(div)
    setTimeout(() => {
      dialog.show()
    }, 100)
  })
}
