# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class Graph3D(Component):
    """A Graph3D component.


Keyword arguments:
- id (string; optional): The ID used to identify this component in Dash callbacks.
- graphData (dict; required): The data to display. Format {nodes:{}, links:{}}
- heightRatio (number; optional)
- backgroundColor (string; optional): backgroundColor: Getter/setter for the chart background color, default transparent
- width (number; optional): width: Canvas width, in px.
- nodeRelSize (number; optional): Ratio of node circle area (square px) per value unit.
- nodeLabel (string; optional): The node attribute whose value should be displayed as label
- nodeLabel_attr_type (dict with strings as keys and values of type string; optional): The node attribute whose value should be displayed as label, by type
- nodeLabel_attr_supertype (dict with strings as keys and values of type string; optional): The node attribute whose value should be displayed as label, by supertype
- nodeColor (string; optional): The node attribute whose value should be used for coloring nodes
- nodeColor_common_type (dict with strings as keys and values of type string; optional): common node colors by type, overrides nodeColor_common_supertype
- nodeColor_common_supertype (dict with strings as keys and values of type string; optional): common node colors by supertype (relation, entity, attribute)
- nodeURL (string; optional): The node attribute which is activated upon Cmd click
- nodeURL_attr_type (dict with strings as keys and values of type string; optional): specify node URL attribute by type, override nodeURL_attr_supertype and nodeURL_common_*
- nodeURL_attr_supertype (dict with strings as keys and values of type string; optional): specify node URL attribute by supertype (relation, entity, attribute), overrides nodeURL_common_*
- nodeAutoColorBy (string; optional): The node attribute whose value should be used for coloring nodes
- nodeOpacity (number; optional): node opacity
- nodeCanvasObjectMode (string; optional): when showing nodeThreeObject, keep showing default node object as well as text or image
- nodeThreeObject (dict | string; optional)
- useNodeIcon (boolean; optional): Whether to use nodeIcon*
- nodeIcon (string; optional): The node attribute containing url to image to display for each individual node. Takes precedence over nodeIcon_supertype and nodeIcon_type
- nodeIcon_attr_type (dict with strings as keys and values of type string; optional): specify node image attribute by type, overrides nodeIcon_attr_supertype and nodeIcon_common_*
- nodeIcon_attr_supertype (dict with strings as keys and values of type string; optional): specify node image attribute by supertype (relation, entity, attribute), overrides nodeIcon_common_*
- nodeIcon_common_type (dict with strings as keys and values of type dict with strings as keys and values of type string; optional): Common node image by type   overrides nodeIcon_supertype
- nodeIcon_common_supertype (dict with strings as keys and values of type dict with strings as keys and values of type string; optional): Common node image by supertype (relation, entity, attribute)
- nodeIcon_fontsheets (dict; optional)
- useNodeImg (boolean; optional): Whether to use nodeImg*
- nodeImg (string; optional): The node attribute containing url to image to display for each individual node. Takes precedence over nodeIcon_supertype and nodeIcon_type
- nodeImg_attr_type (dict with strings as keys and values of type string; optional): specify node image attribute by type, overrides nodeImg_attr_supertype and nodeImg_common_*
- nodeImg_attr_supertype (dict with strings as keys and values of type string; optional): specify node image attribute by supertype (relation, entity, attribute), overrides nodeImg_common_*
- nodeImg_common_type (dict with strings as keys and values of type string; optional): Common node image by type   overrides nodeImg_supertype
- nodeImg_common_supertype (dict with strings as keys and values of type string; optional): Common node image by supertype (relation, entity, attribute)
- linkLabel (string; optional): The node attribute whose value should be displayed as label
- linkColor (string; optional): linkColor
- linkColor_attr_type (dict with strings as keys and values of type string; optional)
- linkColor_attr_supertype (dict with strings as keys and values of type string; optional)
- linkAutoColorBy (string; optional): autocolor the links by some link attribute
- linkOpacity (number; optional): opacity, in [0,1]
- linkWidth (number | string; optional): linkWidth
- linkCurvature (number | string; optional): linkCurvature
- linkThreeObject (dict | string; optional): object to display (instead of normal link)
- linkThreeObjectExtend (boolean | string; optional): also show normal link
- linkCanvasObjectMode (string; optional)
- linkDirectionalArrowLength (number; optional): link arrow length
- linkDirectionalArrowRelPos (number; optional): link arrow position
- zoomOut (boolean; optional): zoom
- center (boolean; optional)
- cooldownTime (number; optional): cooldown time
- d3Force_define (dict; optional): object to define a new force on the simulation. E.g.
d3Force_define = {
   "name": "charge", // the name to which the force is (to be) assigned
   "force": "strength", // the force, e.g "forceManyBody" or "forceCenter" (omit the 'd3' object) Pass a null value to remove the force from the simulation
   "force_args": [], // arguments to pass to force, e.g. links to forceLink. No functions, e.g. of node, allowed (currently)
}
- d3Force_call (dict; optional): object to call a method on an existing simulation force. E.g.
d3Force_call_method = {
   "name": "charge", // the name to which the force is assigned
   "method": "strength", // the name of a method to call on the force
   "method_args": [-50], // array of args to pass to force method
- interactive (boolean; optional): toggle with a single control whether graph is interactive
- enableZoomPanInteraction (boolean; optional): enable zoom and panning? (2D)
- enableNavigationControls (boolean; optional): enable navigation? (3D)
- enablePointerInteraction (boolean; optional): enable pointer interaction such as hover, click, drag?
- enableNodeDrag (boolean; optional): enable node drag? more efficient if false
- nodeZoomId (string; optional): id of node to zoom to
- nodesSelected (list of dicts; optional)
- nodeIdsDrag (list of strings; optional)
- nodeRightClicked (dict; optional)
- nodeRightClickedViewpointCoordinates (dict with strings as keys and values of type number; optional)
- linksSelected (list of dicts; optional)
- linkIdsNodesDrag (list of strings; optional)
- graknStatus (string; optional)
- maxDepth_neighbours_select (number; optional)
- max_nodes_render (number; optional)
- size (dict; optional)
- externalobject_source (string; optional)
- externalobject_input (number | string | boolean | list | dict; optional)
- nodeHovered (dict; optional)
- centreCoordinates (dict with strings as keys and values of type number; optional)
- graphData_changed (boolean; optional)
- updated (boolean; optional)
- nodeIdsHighlight (list of strings; optional)
- nodeIdsVisible (list of strings; optional)
- linkIdsFilter (list of strings; optional)
- useCoordinates (boolean; optional): useCoordinates: whether to use node attribute to set node coordinates
- pixelUnitRatio (number; optional): pixelUnitRatio: if node attribute (in some unit of measurement) is used as coordinates, pixel:unit scale
- showCoordinates (boolean; optional): showCoordinates: whether or not to show pointer coordinates as tooltip (not yet used)
- gravity (string; optional): gravity: not yet used, prop to change three gravity. Not used in 2D
- focused (boolean; optional): focused: whether component is focused"""
    @_explicitize_args
    def __init__(self, id=Component.UNDEFINED, graphData=Component.REQUIRED, heightRatio=Component.UNDEFINED, backgroundColor=Component.UNDEFINED, width=Component.UNDEFINED, nodeRelSize=Component.UNDEFINED, nodeLabel=Component.UNDEFINED, nodeLabel_attr_type=Component.UNDEFINED, nodeLabel_attr_supertype=Component.UNDEFINED, nodeColor=Component.UNDEFINED, nodeColor_common_type=Component.UNDEFINED, nodeColor_common_supertype=Component.UNDEFINED, nodeURL=Component.UNDEFINED, nodeURL_attr_type=Component.UNDEFINED, nodeURL_attr_supertype=Component.UNDEFINED, nodeAutoColorBy=Component.UNDEFINED, nodeOpacity=Component.UNDEFINED, nodeCanvasObjectMode=Component.UNDEFINED, nodeThreeObject=Component.UNDEFINED, useNodeIcon=Component.UNDEFINED, nodeIcon=Component.UNDEFINED, nodeIcon_attr_type=Component.UNDEFINED, nodeIcon_attr_supertype=Component.UNDEFINED, nodeIcon_common_type=Component.UNDEFINED, nodeIcon_common_supertype=Component.UNDEFINED, nodeIcon_fontsheets=Component.UNDEFINED, useNodeImg=Component.UNDEFINED, nodeImg=Component.UNDEFINED, nodeImg_attr_type=Component.UNDEFINED, nodeImg_attr_supertype=Component.UNDEFINED, nodeImg_common_type=Component.UNDEFINED, nodeImg_common_supertype=Component.UNDEFINED, linkLabel=Component.UNDEFINED, linkColor=Component.UNDEFINED, linkColor_attr_type=Component.UNDEFINED, linkColor_attr_supertype=Component.UNDEFINED, linkAutoColorBy=Component.UNDEFINED, linkOpacity=Component.UNDEFINED, linkWidth=Component.UNDEFINED, linkCurvature=Component.UNDEFINED, linkThreeObject=Component.UNDEFINED, linkThreeObjectExtend=Component.UNDEFINED, linkCanvasObjectMode=Component.UNDEFINED, linkDirectionalArrowLength=Component.UNDEFINED, linkDirectionalArrowRelPos=Component.UNDEFINED, zoomOut=Component.UNDEFINED, center=Component.UNDEFINED, cooldownTime=Component.UNDEFINED, d3Force_define=Component.UNDEFINED, d3Force_call=Component.UNDEFINED, onNodeClick=Component.UNDEFINED, onNodeRightClick=Component.UNDEFINED, onNodeHover=Component.UNDEFINED, onLinkClick=Component.UNDEFINED, onLinkRightClick=Component.UNDEFINED, onLinkHover=Component.UNDEFINED, onBackgroundClick=Component.UNDEFINED, onBackgroundRightClick=Component.UNDEFINED, interactive=Component.UNDEFINED, enableZoomPanInteraction=Component.UNDEFINED, enableNavigationControls=Component.UNDEFINED, enablePointerInteraction=Component.UNDEFINED, enableNodeDrag=Component.UNDEFINED, nodeZoomId=Component.UNDEFINED, nodesSelected=Component.UNDEFINED, nodeIdsDrag=Component.UNDEFINED, nodeRightClicked=Component.UNDEFINED, nodeRightClickedViewpointCoordinates=Component.UNDEFINED, linksSelected=Component.UNDEFINED, linkIdsNodesDrag=Component.UNDEFINED, graknStatus=Component.UNDEFINED, maxDepth_neighbours_select=Component.UNDEFINED, max_nodes_render=Component.UNDEFINED, size=Component.UNDEFINED, externalobject_source=Component.UNDEFINED, externalobject_input=Component.UNDEFINED, nodeHovered=Component.UNDEFINED, centreCoordinates=Component.UNDEFINED, graphData_changed=Component.UNDEFINED, updated=Component.UNDEFINED, nodeIdsHighlight=Component.UNDEFINED, nodeIdsVisible=Component.UNDEFINED, linkIdsFilter=Component.UNDEFINED, useCoordinates=Component.UNDEFINED, pixelUnitRatio=Component.UNDEFINED, showCoordinates=Component.UNDEFINED, gravity=Component.UNDEFINED, focused=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'graphData', 'heightRatio', 'backgroundColor', 'width', 'nodeRelSize', 'nodeLabel', 'nodeLabel_attr_type', 'nodeLabel_attr_supertype', 'nodeColor', 'nodeColor_common_type', 'nodeColor_common_supertype', 'nodeURL', 'nodeURL_attr_type', 'nodeURL_attr_supertype', 'nodeAutoColorBy', 'nodeOpacity', 'nodeCanvasObjectMode', 'nodeThreeObject', 'useNodeIcon', 'nodeIcon', 'nodeIcon_attr_type', 'nodeIcon_attr_supertype', 'nodeIcon_common_type', 'nodeIcon_common_supertype', 'nodeIcon_fontsheets', 'useNodeImg', 'nodeImg', 'nodeImg_attr_type', 'nodeImg_attr_supertype', 'nodeImg_common_type', 'nodeImg_common_supertype', 'linkLabel', 'linkColor', 'linkColor_attr_type', 'linkColor_attr_supertype', 'linkAutoColorBy', 'linkOpacity', 'linkWidth', 'linkCurvature', 'linkThreeObject', 'linkThreeObjectExtend', 'linkCanvasObjectMode', 'linkDirectionalArrowLength', 'linkDirectionalArrowRelPos', 'zoomOut', 'center', 'cooldownTime', 'd3Force_define', 'd3Force_call', 'interactive', 'enableZoomPanInteraction', 'enableNavigationControls', 'enablePointerInteraction', 'enableNodeDrag', 'nodeZoomId', 'nodesSelected', 'nodeIdsDrag', 'nodeRightClicked', 'nodeRightClickedViewpointCoordinates', 'linksSelected', 'linkIdsNodesDrag', 'graknStatus', 'maxDepth_neighbours_select', 'max_nodes_render', 'size', 'externalobject_source', 'externalobject_input', 'nodeHovered', 'centreCoordinates', 'graphData_changed', 'updated', 'nodeIdsHighlight', 'nodeIdsVisible', 'linkIdsFilter', 'useCoordinates', 'pixelUnitRatio', 'showCoordinates', 'gravity', 'focused']
        self._type = 'Graph3D'
        self._namespace = 'dash_react_force_graph'
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'graphData', 'heightRatio', 'backgroundColor', 'width', 'nodeRelSize', 'nodeLabel', 'nodeLabel_attr_type', 'nodeLabel_attr_supertype', 'nodeColor', 'nodeColor_common_type', 'nodeColor_common_supertype', 'nodeURL', 'nodeURL_attr_type', 'nodeURL_attr_supertype', 'nodeAutoColorBy', 'nodeOpacity', 'nodeCanvasObjectMode', 'nodeThreeObject', 'useNodeIcon', 'nodeIcon', 'nodeIcon_attr_type', 'nodeIcon_attr_supertype', 'nodeIcon_common_type', 'nodeIcon_common_supertype', 'nodeIcon_fontsheets', 'useNodeImg', 'nodeImg', 'nodeImg_attr_type', 'nodeImg_attr_supertype', 'nodeImg_common_type', 'nodeImg_common_supertype', 'linkLabel', 'linkColor', 'linkColor_attr_type', 'linkColor_attr_supertype', 'linkAutoColorBy', 'linkOpacity', 'linkWidth', 'linkCurvature', 'linkThreeObject', 'linkThreeObjectExtend', 'linkCanvasObjectMode', 'linkDirectionalArrowLength', 'linkDirectionalArrowRelPos', 'zoomOut', 'center', 'cooldownTime', 'd3Force_define', 'd3Force_call', 'interactive', 'enableZoomPanInteraction', 'enableNavigationControls', 'enablePointerInteraction', 'enableNodeDrag', 'nodeZoomId', 'nodesSelected', 'nodeIdsDrag', 'nodeRightClicked', 'nodeRightClickedViewpointCoordinates', 'linksSelected', 'linkIdsNodesDrag', 'graknStatus', 'maxDepth_neighbours_select', 'max_nodes_render', 'size', 'externalobject_source', 'externalobject_input', 'nodeHovered', 'centreCoordinates', 'graphData_changed', 'updated', 'nodeIdsHighlight', 'nodeIdsVisible', 'linkIdsFilter', 'useCoordinates', 'pixelUnitRatio', 'showCoordinates', 'gravity', 'focused']
        self.available_wildcard_properties =            []

        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}

        for k in ['graphData']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')
        super(Graph3D, self).__init__(**args)
