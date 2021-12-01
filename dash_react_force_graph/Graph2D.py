# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class Graph2D(Component):
    """A Graph2D component.


Keyword arguments:
- id (string; required): The ID used to identify this component in Dash callbacks.
- key (string; optional): The key used to identify this component in React
- graphData (dict; required): Graph data structure. Prop which is provided by user.
Can also be used to apply incremental updates. Format {nodes:{}, links:{}}
- nodeId (string; optional): Node object accessor attribute for unique node id (used in link objects source/target).
- linkSource (string; optional): Link object accessor attribute referring to id of source node.
- linkTarget (string; optional): Link object accessor attribute referring to id of target node.
- backgroundColor (string; optional): Getter/setter for the canvas background color, default transparent
- nodeRelSize (number; optional): Ratio of node circle area (square px) [2D] or sphere volume (cubic px) [3D] per value unit.
- nodeIconRelSize (number; optional): controls nodeIcon size
- nodeImgRelSize (number; optional): controls nodeImg size
- nodeLabel (string; optional): Node object accessor function or attribute for name (shown in label). Supports plain text or HTML content (except in VR).
2D, 3D and VR
- nodeVal (number | string; optional): Ratio of node circle area (square px) [2D] or sphere volume (cubic px) [3D] per value unit.
- nodeCoordinates (string | list of numbers; optional): Ratio of node circle area (square px) [2D] or sphere volume (cubic px) [3D] per value unit.
- nodeDesc (string; optional): For VR only. Node object accessor function or attribute for description (shown under label).
- nodeColor (string; optional): The node attribute whose value should be used for coloring nodes
- nodeAutoColorBy (string; optional): Node object accessor function or attribute to automatically group colors by. Only affects nodes without a color attribute.
- nodeTextColor (string; optional): Node text color
- nodeTextAutoColor (boolean; optional): Automatically color node text with inverse of backgroundColor
- nodeOpacity (number; optional): Nodes sphere opacity, between [0,1]. 3D, VR, AR
- nodeResolution (number; optional): Geometric resolution of each node's sphere, expressed in how many slice segments to divide the circumference. Higher values yield smoother spheres. Only applicable to 3D modes.
3D, VR, AR
- linkLabel (string; optional): Link object accessor function or attribute for name (shown in label). Supports plain text or HTML content (except in VR).
- linkDesc (string; optional): For VR only. Link object accessor function or attribute for description (shown under label).
- linkColor (string; optional): String giving link color
- linkAutoColor (boolean; optional): Automatically color link with inverse of background color
- linkAutoColorBy (string; optional): Link object accessor function or attribute to automatically group colors by. Only affects links without a color attribute.
- linkOpacity (number; optional): Line opacity of links, between [0,1]. 3D, VR, AR
- linkLineDash (number | string; optional): Link object accessor function, attribute or number array (e.g. [5, 15]) to determine if a line dash should be applied to this rendered link. Refer to the HTML canvas setLineDash API for example values. Either a falsy value or an empty array will disable dashing.
- linkWidth (number | string; optional): Link object accessor function, attribute or a numeric constant for the link line width.
- linkResolution (number; optional): Geometric resolution of each link 3D line, expressed in how many radial segments to divide the cylinder. Higher values yield smoother cylinders. Applicable only to links with positive width. 3D, VR, AR
- linkCurvature (number; optional): Link object accessor function, attribute or a numeric constant for the curvature radius of the link line. A value of 0 renders a straight line. 1 indicates a radius equal to half of the line length, causing the curve to approximate a semi-circle. For self-referencing links (source equal to target) the curve is represented as a loop around the node, with length proportional to the curvature value.
- linkDirectionalArrowLength (number | string; optional): Link object accessor function, attribute or a numeric constant for the length of the arrow head indicating the link directionality. The arrow is displayed directly over the link line, and points in the direction of source > target. A value of 0 hides the arrow.
- linkDirectionalArrowColor (string; optional): Link object accessor function or attribute for the color of the arrow head.
- linkDirectionalArrowRelPos (number | string; optional): Link object accessor function, attribute or a numeric constant for the longitudinal position of the arrow head along the link line, expressed as a ratio between 0 and 1, where 0 indicates immediately next to the source node, 1 next to the target node, and 0.5 right in the middle.
- linkDirectionalArrowResolution (number; optional): Geometric resolution of the arrow head, expressed in how many slice segments to divide the cone base circumference. Higher values yield smoother arrows.
- linkDirectionalParticles (number | string; optional): Link object accessor function, attribute or a numeric constant for the number of particles (small spheres) to display over the link line. The particles are distributed equi-spaced along the line, travel in the direction source > target, and can be used to indicate link directionality.
- linkDirectionalParticleSpeed (number | string; optional): Link object accessor function, attribute or a numeric constant for the directional particles speed, expressed as the ratio of the link length to travel per frame. Values above 0.5 are discouraged.
- linkDirectionalParticleWidth (number | string; optional): Link object accessor function, attribute or a numeric constant for the directional particles width. Values are rounded to the nearest decimal for indexing purposes.
- linkDirectionalParticleColor (string; optional): Link object accessor function or attribute for the directional particles color.
- linkDirectionalParticleResolution (number; optional): Geometric resolution of each 3D directional particle, expressed in how many slice segments to divide the circumference. Higher values yield smoother particles.
- emitParticle (dict; optional): An alternative mechanism for generating particles, this method emits a non-cyclical single particle within a specific link. The emitted particle shares the styling (speed, width, color) of the regular particle props. A valid link object that is included in graphData should be passed as a single parameter.
- rendererConfig (dict; optional): Configuration parameters to pass to the ThreeJS WebGLRenderer constructor. This prop only has an effect on component mount. 3D only
- pauseAnimation (boolean; optional): Pauses the rendering cycle of the component, effectively freezing the current view and cancelling all user interaction. This method can be used to save performance in circumstances when a static image is sufficient.
- centerAtZoom (dict with strings as keys and values of type number; optional): calls centerAt, then zoom. Takes an object with keys "k", "x", "y"
- zoomToFit (list of numbers; optional): Automatically zooms/pans the canvas so that all of the nodes fit inside it. If no nodes are found no action is taken. It accepts two optional arguments: the first defines the duration of the transition (in ms) to animate the canvas motion (default: 0ms). The second argument is the amount of padding (in px) between the edge of the canvas and the outermost node (default: 10px). The third argument specifies a custom node filter: node => <boolean>, which should return a truthy value if the node is to be included. This can be useful for focusing on a portion of the graph. 2D, 3D
- refresh (boolean; optional): Redraws all the nodes/links. 3D, VR, AR
- numDimensions (number; optional): Not applicable to 2D mode. Number of dimensions to run the force simulation on. 3D, VR, AR
- forceEngine (string; optional): Which force-simulation engine to use (d3 or ngraph).
- ngraphPhysics (dict; optional): Specify custom physics configuration for ngraph, according to its configuration object syntax. Only applicable if using the ngraph simulation engine.
- warmupTicks (number; optional): Number of layout engine cycles to dry-run at ignition before starting to render.
- cooldownTicks (number; optional): How many build-in frames to render before stopping and freezing the layout engine.
- cooldownTime (number; optional): How long (ms) to render for before stopping and freezing the layout engine.
- fixNodes (boolean; optional): Whether to fix node coordinates after simulation has cooled
- linkHoverPrecision (number; optional): Whether to display the link label when gazing the link closely (low value) or from far away (high value).
- zoom (list of numbers; optional): Calls zoom() method. ([number], [ms])
- controlType (string; optional): Which type of control to use to control the camera on 3D mode. Choice between trackball, orbit or fly.
- enableZoomPanInteraction (boolean; optional): Whether to enable zooming and panning user interactions on a 2D canvas.
- enableNavigationControls (boolean; optional): Whether to enable the trackball navigation controls used to move the camera using mouse interactions (rotate/zoom/pan).
- enablePointerInteraction (boolean; optional): Whether to enable the mouse tracking events. This activates an internal tracker of the canvas mouse position and enables the functionality of object hover/click and tooltip labels, at the cost of performance. If you're looking for maximum gain in your graph performance it's recommended to switch off this property.
- enableNodeDrag (boolean; optional): Whether to enable the user interaction to drag nodes by click-dragging. If enabled, every time a node is dragged the simulation is re-heated so the other nodes react to the changes. Only applicable if enablePointerInteraction is true.
- getGraphBbox (boolean; optional): Returns the current bounding box of the nodes in the graph, formatted as { x: [<num>, <num>], y: [<num>, <num>], z: [<num>, <num>] }. 
If no nodes are found, returns null. Accepts an optional argument to define a custom node filter: node => <boolean>, which should return a truthy value if the node is to be included. 
This can be useful to calculate the bounding box of a portion of the graph.
Bounding box is saved as the graphBbox prop
- heightRatio (number; optional): height of component as proportion of container
- size (dict; optional): provided react-sizeme. Contains an object with "width" and "height" attributes
- active (boolean; optional): whether or not session is active. Used to enable or disable warning browser dialog when closing
- useNodeImg (boolean; optional): Whether or not to use the nodeImg. Overrides nodeIcon
- nodeImg (string; optional): The node attribute containing url to image to display for each individual node
- useNodeIcon (boolean; optional): Whether or not to use the nodeIcon
- nodeIcon (string; optional): The node attribute containing object with icon to display for each individual node.
- nodeIcon_fontsheets (dict; optional): object with keys being fonts (string) and values being CSS sheets
- linkId (string; optional): The link attribute containing the unique link id
- nodeZoomId (string; optional): id of node to zoom to
- sortRelsBy1 (string; optional): in zoom view, node attribute to sort relations by first
- sortRelsBy2 (string; optional): in zoom view, node attribute to sort relations by after first sort
- sortRoleplayersBy1 (string; optional): in zoom view, node attribute to sort role players by first
- sortRoleplayersBy2 (string; optional): in zoom view, node attribute to sort role players by after first sort
- sortRels1Descend (boolean; optional): sort in descending order?
- sortRels2Descend (boolean; optional): sort in descending order?
- sortRoleplayers1Descend (boolean; optional): sort in descending order?
- sortRoleplayers2Descend (boolean; optional): sort in descending order?
- nodesSelected (list of dicts; optional): selected (clicked) nodes
- nodeClicked (dict; optional): left-clicked node
- nodeRightClicked (dict; optional): right-clicked node
- nodeRightClickedViewpointCoordinates (dict with strings as keys and values of type number; optional): screen coordinates of right-clicked node
- linkRightClickedViewpointCoordinates (dict with strings as keys and values of type number; optional)
- linkRightClicked (dict; optional): right-clicked link
- linksSelected (list of dicts; optional): selected (clicked) links
- minZoom (number; optional): ids of links highlighted due to being dragged
- maxZoom (number; optional)
- nodeIdsHighlightUser (list of strings; optional): ids of highlighted nodes (through search)
- nodeIdsInvisibleAuto (list of strings; optional): ids of visible nodes. Not to be supplied by user. Available to allow for saving state
- nodeIdsInvisibleUser (list of strings; optional): ids of invisible nodes supplied by user as prop
- linkIdsHighlightUser (list of strings; optional): ids of highlighted links (through search)
- linkIdsInvisibleAuto (list of strings; optional)
- linkIdsInvisibleUser (list of strings; optional): ids of visible links
- externalobject_source (string; optional): externalobject_source:
- externalobjectInput (number | string | boolean | list | dict; optional): externalobject_source:
- useCoordinates (boolean; optional): useCoordinates: whether to set nodeCoordinates for node coordinates
- pixelUnitRatio (number; optional): pixelUnitRatio: if node attribute (in some unit of measurement) is used as coordinates, pixel:unit scale
- showCoordinates (boolean; optional): showCoordinates: whether or not to show pointer coordinates in hover tooltip (not yet used)
- invisibleProps (list of strings; optional): node props to hide on hover, in addition to any with prop name prefixed by "__"
- maxDepth_neighbours_select (number; optional): max levels of neighbourhood selection around a node by repeat clicking
- currentZoomPan (dict; optional)
- updateNeighbours (boolean; optional)
- forceRefresh (number; optional)
- n_nodeRightClicks (number; optional)
- n_linkRightClicks (number; optional)"""
    @_explicitize_args
    def __init__(self, id=Component.REQUIRED, key=Component.UNDEFINED, graphData=Component.REQUIRED, nodeId=Component.UNDEFINED, linkSource=Component.UNDEFINED, linkTarget=Component.UNDEFINED, backgroundColor=Component.UNDEFINED, nodeRelSize=Component.UNDEFINED, nodeIconRelSize=Component.UNDEFINED, nodeImgRelSize=Component.UNDEFINED, nodeLabel=Component.UNDEFINED, nodeVal=Component.UNDEFINED, nodeCoordinates=Component.UNDEFINED, nodeDesc=Component.UNDEFINED, nodeColor=Component.UNDEFINED, nodeAutoColorBy=Component.UNDEFINED, nodeTextColor=Component.UNDEFINED, nodeTextAutoColor=Component.UNDEFINED, nodeOpacity=Component.UNDEFINED, nodeResolution=Component.UNDEFINED, linkLabel=Component.UNDEFINED, linkDesc=Component.UNDEFINED, linkColor=Component.UNDEFINED, linkAutoColor=Component.UNDEFINED, linkAutoColorBy=Component.UNDEFINED, linkOpacity=Component.UNDEFINED, linkLineDash=Component.UNDEFINED, linkWidth=Component.UNDEFINED, linkResolution=Component.UNDEFINED, linkCurvature=Component.UNDEFINED, linkDirectionalArrowLength=Component.UNDEFINED, linkDirectionalArrowColor=Component.UNDEFINED, linkDirectionalArrowRelPos=Component.UNDEFINED, linkDirectionalArrowResolution=Component.UNDEFINED, linkDirectionalParticles=Component.UNDEFINED, linkDirectionalParticleSpeed=Component.UNDEFINED, linkDirectionalParticleWidth=Component.UNDEFINED, linkDirectionalParticleColor=Component.UNDEFINED, linkDirectionalParticleResolution=Component.UNDEFINED, emitParticle=Component.UNDEFINED, rendererConfig=Component.UNDEFINED, pauseAnimation=Component.UNDEFINED, centerAtZoom=Component.UNDEFINED, zoomToFit=Component.UNDEFINED, refresh=Component.UNDEFINED, numDimensions=Component.UNDEFINED, forceEngine=Component.UNDEFINED, ngraphPhysics=Component.UNDEFINED, warmupTicks=Component.UNDEFINED, cooldownTicks=Component.UNDEFINED, cooldownTime=Component.UNDEFINED, fixNodes=Component.UNDEFINED, linkHoverPrecision=Component.UNDEFINED, zoom=Component.UNDEFINED, controlType=Component.UNDEFINED, enableZoomPanInteraction=Component.UNDEFINED, enableNavigationControls=Component.UNDEFINED, enablePointerInteraction=Component.UNDEFINED, enableNodeDrag=Component.UNDEFINED, getGraphBbox=Component.UNDEFINED, heightRatio=Component.UNDEFINED, size=Component.UNDEFINED, active=Component.UNDEFINED, useNodeImg=Component.UNDEFINED, nodeImg=Component.UNDEFINED, useNodeIcon=Component.UNDEFINED, nodeIcon=Component.UNDEFINED, nodeIcon_fontsheets=Component.UNDEFINED, linkId=Component.UNDEFINED, nodeZoomId=Component.UNDEFINED, sortRelsBy1=Component.UNDEFINED, sortRelsBy2=Component.UNDEFINED, sortRoleplayersBy1=Component.UNDEFINED, sortRoleplayersBy2=Component.UNDEFINED, sortRels1Descend=Component.UNDEFINED, sortRels2Descend=Component.UNDEFINED, sortRoleplayers1Descend=Component.UNDEFINED, sortRoleplayers2Descend=Component.UNDEFINED, nodesSelected=Component.UNDEFINED, nodeClicked=Component.UNDEFINED, nodeRightClicked=Component.UNDEFINED, nodeRightClickedViewpointCoordinates=Component.UNDEFINED, linkRightClickedViewpointCoordinates=Component.UNDEFINED, linkRightClicked=Component.UNDEFINED, linksSelected=Component.UNDEFINED, minZoom=Component.UNDEFINED, maxZoom=Component.UNDEFINED, nodeIdsHighlightUser=Component.UNDEFINED, nodeIdsInvisibleAuto=Component.UNDEFINED, nodeIdsInvisibleUser=Component.UNDEFINED, linkIdsHighlightUser=Component.UNDEFINED, linkIdsInvisibleAuto=Component.UNDEFINED, linkIdsInvisibleUser=Component.UNDEFINED, externalobject_source=Component.UNDEFINED, externalobjectInput=Component.UNDEFINED, useCoordinates=Component.UNDEFINED, pixelUnitRatio=Component.UNDEFINED, showCoordinates=Component.UNDEFINED, invisibleProps=Component.UNDEFINED, maxDepth_neighbours_select=Component.UNDEFINED, currentZoomPan=Component.UNDEFINED, updateNeighbours=Component.UNDEFINED, forceRefresh=Component.UNDEFINED, n_nodeRightClicks=Component.UNDEFINED, n_linkRightClicks=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'key', 'graphData', 'nodeId', 'linkSource', 'linkTarget', 'backgroundColor', 'nodeRelSize', 'nodeIconRelSize', 'nodeImgRelSize', 'nodeLabel', 'nodeVal', 'nodeCoordinates', 'nodeDesc', 'nodeColor', 'nodeAutoColorBy', 'nodeTextColor', 'nodeTextAutoColor', 'nodeOpacity', 'nodeResolution', 'linkLabel', 'linkDesc', 'linkColor', 'linkAutoColor', 'linkAutoColorBy', 'linkOpacity', 'linkLineDash', 'linkWidth', 'linkResolution', 'linkCurvature', 'linkDirectionalArrowLength', 'linkDirectionalArrowColor', 'linkDirectionalArrowRelPos', 'linkDirectionalArrowResolution', 'linkDirectionalParticles', 'linkDirectionalParticleSpeed', 'linkDirectionalParticleWidth', 'linkDirectionalParticleColor', 'linkDirectionalParticleResolution', 'emitParticle', 'rendererConfig', 'pauseAnimation', 'centerAtZoom', 'zoomToFit', 'refresh', 'numDimensions', 'forceEngine', 'ngraphPhysics', 'warmupTicks', 'cooldownTicks', 'cooldownTime', 'fixNodes', 'linkHoverPrecision', 'zoom', 'controlType', 'enableZoomPanInteraction', 'enableNavigationControls', 'enablePointerInteraction', 'enableNodeDrag', 'getGraphBbox', 'heightRatio', 'size', 'active', 'useNodeImg', 'nodeImg', 'useNodeIcon', 'nodeIcon', 'nodeIcon_fontsheets', 'linkId', 'nodeZoomId', 'sortRelsBy1', 'sortRelsBy2', 'sortRoleplayersBy1', 'sortRoleplayersBy2', 'sortRels1Descend', 'sortRels2Descend', 'sortRoleplayers1Descend', 'sortRoleplayers2Descend', 'nodesSelected', 'nodeClicked', 'nodeRightClicked', 'nodeRightClickedViewpointCoordinates', 'linkRightClickedViewpointCoordinates', 'linkRightClicked', 'linksSelected', 'minZoom', 'maxZoom', 'nodeIdsHighlightUser', 'nodeIdsInvisibleAuto', 'nodeIdsInvisibleUser', 'linkIdsHighlightUser', 'linkIdsInvisibleAuto', 'linkIdsInvisibleUser', 'externalobject_source', 'externalobjectInput', 'useCoordinates', 'pixelUnitRatio', 'showCoordinates', 'invisibleProps', 'maxDepth_neighbours_select', 'currentZoomPan', 'updateNeighbours', 'forceRefresh', 'n_nodeRightClicks', 'n_linkRightClicks']
        self._type = 'Graph2D'
        self._namespace = 'dash_react_force_graph'
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'key', 'graphData', 'nodeId', 'linkSource', 'linkTarget', 'backgroundColor', 'nodeRelSize', 'nodeIconRelSize', 'nodeImgRelSize', 'nodeLabel', 'nodeVal', 'nodeCoordinates', 'nodeDesc', 'nodeColor', 'nodeAutoColorBy', 'nodeTextColor', 'nodeTextAutoColor', 'nodeOpacity', 'nodeResolution', 'linkLabel', 'linkDesc', 'linkColor', 'linkAutoColor', 'linkAutoColorBy', 'linkOpacity', 'linkLineDash', 'linkWidth', 'linkResolution', 'linkCurvature', 'linkDirectionalArrowLength', 'linkDirectionalArrowColor', 'linkDirectionalArrowRelPos', 'linkDirectionalArrowResolution', 'linkDirectionalParticles', 'linkDirectionalParticleSpeed', 'linkDirectionalParticleWidth', 'linkDirectionalParticleColor', 'linkDirectionalParticleResolution', 'emitParticle', 'rendererConfig', 'pauseAnimation', 'centerAtZoom', 'zoomToFit', 'refresh', 'numDimensions', 'forceEngine', 'ngraphPhysics', 'warmupTicks', 'cooldownTicks', 'cooldownTime', 'fixNodes', 'linkHoverPrecision', 'zoom', 'controlType', 'enableZoomPanInteraction', 'enableNavigationControls', 'enablePointerInteraction', 'enableNodeDrag', 'getGraphBbox', 'heightRatio', 'size', 'active', 'useNodeImg', 'nodeImg', 'useNodeIcon', 'nodeIcon', 'nodeIcon_fontsheets', 'linkId', 'nodeZoomId', 'sortRelsBy1', 'sortRelsBy2', 'sortRoleplayersBy1', 'sortRoleplayersBy2', 'sortRels1Descend', 'sortRels2Descend', 'sortRoleplayers1Descend', 'sortRoleplayers2Descend', 'nodesSelected', 'nodeClicked', 'nodeRightClicked', 'nodeRightClickedViewpointCoordinates', 'linkRightClickedViewpointCoordinates', 'linkRightClicked', 'linksSelected', 'minZoom', 'maxZoom', 'nodeIdsHighlightUser', 'nodeIdsInvisibleAuto', 'nodeIdsInvisibleUser', 'linkIdsHighlightUser', 'linkIdsInvisibleAuto', 'linkIdsInvisibleUser', 'externalobject_source', 'externalobjectInput', 'useCoordinates', 'pixelUnitRatio', 'showCoordinates', 'invisibleProps', 'maxDepth_neighbours_select', 'currentZoomPan', 'updateNeighbours', 'forceRefresh', 'n_nodeRightClicks', 'n_linkRightClicks']
        self.available_wildcard_properties =            []

        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}

        for k in ['id', 'graphData']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')
        super(Graph2D, self).__init__(**args)
