# AUTO GENERATED FILE - DO NOT EDIT

dashDashReactForceGraph <- function(id=NULL, label=NULL, value=NULL) {
    
    props <- list(id=id, label=label, value=value)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'DashReactForceGraph',
        namespace = 'dash_react_force_graph',
        propNames = c('id', 'label', 'value'),
        package = 'dashReactForceGraph'
        )

    structure(component, class = c('dash_component', 'list'))
}
