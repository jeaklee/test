render = (response, template, options) ->
    # Common template variables.
    options = {} unless options?
    options.IE = response.locals.ie

    # Actual render
    response.status(200).send (template options)

module.exports = render
