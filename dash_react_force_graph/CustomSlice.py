# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class CustomSlice(Component):
    """A CustomSlice component.


Keyword arguments:

- id (string; required):
    The ID used to identify this component in Dash callbacks.

- attrs (dict; optional):
    You can add custom attributes by specifying in attrs. For example,
    { enabled: 'True' }.

- className (string; default "react-pie-menu-slice"):
    CSS class.

- hidden (boolean; default False):
    whether to highlight.

- icon (string; required):
    The font awesome icon, e.g. \"faCoffee\". Must be one of the icons
    imported above.

- iconColor (string; default "#192733"):
    Icon color.

- iconSize (string; default "2x"):
    icon size, e.g. \"xs\", \"2x\". See
    https://fontawesome.com/v5.15/how-to-use/on-the-web/styling/sizing-icons.

- label (string; optional):
    label to show on hover.

- loading_state (dict; optional):
    Assigned by Dash.

    `loading_state` is a dict with keys:

    - component_name (string; optional):
        Holds the name of the component that is loading.

    - is_loading (boolean; optional):
        Determines if the component is loading or not.

    - prop_name (string; optional):
        Holds which property is loading.

- n_clicks (number; default 0):
    number of times slice has been clicked."""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'dash_react_force_graph'
    _type = 'CustomSlice'
    @_explicitize_args
    def __init__(self, attrs=Component.UNDEFINED, className=Component.UNDEFINED, hidden=Component.UNDEFINED, icon=Component.REQUIRED, iconColor=Component.UNDEFINED, iconSize=Component.UNDEFINED, id=Component.REQUIRED, loading_state=Component.UNDEFINED, label=Component.UNDEFINED, n_clicks=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'attrs', 'className', 'hidden', 'icon', 'iconColor', 'iconSize', 'label', 'loading_state', 'n_clicks']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'attrs', 'className', 'hidden', 'icon', 'iconColor', 'iconSize', 'label', 'loading_state', 'n_clicks']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        for k in ['id', 'icon']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')

        super(CustomSlice, self).__init__(**args)
