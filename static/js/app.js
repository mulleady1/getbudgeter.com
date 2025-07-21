htmx.defineExtension("app-spinner", {
  onEvent: function (name, event) {
    if (name === "htmx:load") {
      const parent = event.target
      const elt = parent.querySelector("[app-spinner]")
      if (elt) {
        parent.addEventListener("htmx:beforeRequest", (event) => {
          elt.disabled = true
          elt._innerHTML = elt.innerHTML
          elt.innerHTML = "<sl-spinner style='--indicator-color: #eee; --track-color: #333;'></sl-spinner>"
        })
        parent.addEventListener("htmx:afterRequest", (event) => {
          elt.disabled = false
          elt.innerHTML = elt._innerHTML
          delete elt._innerHTML
        })
      }
    }
  },
})
