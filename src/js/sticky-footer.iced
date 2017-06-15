# Polyfill cross-browser event listener syntax.
unless window.addEventListener
    window.addEventListener = (name, fn) ->
        window.attachEvent 'on'+name, fn

window.addEventListener 'load', ->
    getHeightOffset = (footer) ->
        h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
        
        box = footer.getBoundingClientRect()
        body = document.body
        docEl = document.documentElement

        scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop
        clientTop = docEl.clientTop || body.clientTop || 0
        top  = box.top + scrollTop - clientTop

        h - Math.round(top) - footer.offsetHeight

    stickyFooter = ->
        footer = document.body.lastChild
        loop
            footer = footer.previousSibling
            break if footer.nodeName.toUpperCase() == "FOOTER"

        diffHeight = getHeightOffset footer

        if diffHeight >= 0
            footer.style.position = "absolute"
            footer.style.bottom = "0"
        else
            footer.style.position = "relative"
            footer.style.bottom = "auto"

    window.addEventListener 'resize', stickyFooter
    do stickyFooter # Initial setup

    return
