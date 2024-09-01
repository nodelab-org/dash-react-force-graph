# AUTO GENERATED FILE - DO NOT EDIT

export dash_custompiemenu

"""
    dash_custompiemenu(;kwargs...)
    dash_custompiemenu(children::Any;kwargs...)
    dash_custompiemenu(children_maker::Function;kwargs...)


A CustomPieMenu component.

Keyword arguments:
- `children` (Array; optional): DashSlice components
- `id` (String; required): The ID used to identify this component in Dash callbacks.
- `centerRadius` (String; optional): Defines the center radius. For example, 30px or 0 (no center). This prop is forwarded to the Center Component.
- `centerX` (String; required): Defines the x position of the pie menu in CSS Unit. For example, 0px will be left-most position of its parent container.
- `centerY` (String; required): Defines the y position of the pie menu in CSS Unit. For example, 0px will be the top-most position of its parent container.
- `className` (String; optional): Defines the center radius. For example, 30px or 0 (no center). This prop is forwarded to the Center Component.
- `hidden` (Bool; optional): The ID used to identify this component in Dash callbacks.
- `iconsize` (String; optional)
- `loading_state` (optional): Assigned by Dash. loading_state has the following type: lists containing elements 'is_loading', 'prop_name', 'component_name'.
Those elements have the following types:
  - `is_loading` (Bool; optional): Determines if the component is loading or not
  - `prop_name` (String; optional): Holds which property is loading
  - `component_name` (String; optional): Holds the name of the component that is loading
- `radius` (String; optional): Defines pie menu's radius in CSS Unit. For example, 150px. `
"""
function dash_custompiemenu(; kwargs...)
        available_props = Symbol[:children, :id, :centerRadius, :centerX, :centerY, :className, :hidden, :iconsize, :loading_state, :radius]
        wild_props = Symbol[]
        return Component("dash_custompiemenu", "CustomPieMenu", "dash_react_force_graph", available_props, wild_props; kwargs...)
end

dash_custompiemenu(children::Any; kwargs...) = dash_custompiemenu(;kwargs..., children = children)
dash_custompiemenu(children_maker::Function; kwargs...) = dash_custompiemenu(children_maker(); kwargs...)

