# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class ContextPieMenu(Component):
    """A ContextPieMenu component.


Keyword arguments:

- id (string; default "context-pie-menu")

- centerRadius (string; default "30px")

- centerX (string; default "0px")

- centerY (string; default "0px")

- contextObj (dict; optional)

- radius (string; default "125px")

- rootTypeKey (string; default "__rootType")

- schemaOrData (string; default "data")"""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'dash_react_force_graph'
    _type = 'ContextPieMenu'
    @_explicitize_args
    def __init__(self, id=Component.UNDEFINED, contextObj=Component.UNDEFINED, schemaOrData=Component.UNDEFINED, centerX=Component.UNDEFINED, centerY=Component.UNDEFINED, radius=Component.UNDEFINED, centerRadius=Component.UNDEFINED, sliceCallback=Component.UNDEFINED, rootTypeKey=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'centerRadius', 'centerX', 'centerY', 'contextObj', 'radius', 'rootTypeKey', 'schemaOrData']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'centerRadius', 'centerX', 'centerY', 'contextObj', 'radius', 'rootTypeKey', 'schemaOrData']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        super(ContextPieMenu, self).__init__(**args)
