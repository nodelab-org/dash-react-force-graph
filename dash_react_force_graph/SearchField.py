# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class SearchField(Component):
    """A SearchField component.


Keyword arguments:

- id (default "search-field")

- onSelect (optional)

- options (optional)

- placeholder (default "search..")"""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'dash_react_force_graph'
    _type = 'SearchField'
    @_explicitize_args
    def __init__(self, id=Component.UNDEFINED, options=Component.UNDEFINED, onSelect=Component.UNDEFINED, placeholder=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'onSelect', 'options', 'placeholder']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'onSelect', 'options', 'placeholder']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        super(SearchField, self).__init__(**args)
