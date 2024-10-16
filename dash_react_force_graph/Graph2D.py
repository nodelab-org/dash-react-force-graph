# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class Graph2D(Component):
    """A Graph2D component.


Keyword arguments:

- id (string | dict; required):
    The ID used to identify this component in Dash callbacks.

- active (boolean; optional):
    whether or not session is active. Used to enable or disable
    warning browser dialog when closing.

- backgroundColor (string; optional):
    Getter/setter for the canvas background color, default
    transparent.

- centerAtZoom (dict with strings as keys and values of type number; optional):
    calls centerAt, then zoom. Takes an object with keys \"k\", \"x\",
    \"y\".

- centerForce (number; optional)

- chargeForce (number; optional)

- contextMenuClicked (string; optional)

- controlType (string; optional):
    Which type of control to use to control the camera on 3D mode.
    Choice between trackball, orbit or fly.

- cooldownTicks (number; optional):
    How many build-in frames to render before stopping and freezing
    the layout engine.

- currentZoomPan (dict; optional)

- emitParticle (dict; optional):
    An alternative mechanism for generating particles, this method
    emits a non-cyclical single particle within a specific link. The
    emitted particle shares the styling (speed, width, color) of the
    regular particle props. A valid link object that is included in
    graphData should be passed as a single parameter.

- enableContextMenu (boolean; optional)

- enableNavigationControls (boolean; optional):
    Whether to enable the trackball navigation controls used to move
    the camera using mouse interactions (rotate/zoom/pan).

- enableNodeDrag (boolean; optional):
    Whether to enable the user interaction to drag nodes by
    click-dragging. If enabled, every time a node is dragged the
    simulation is re-heated so the other nodes react to the changes.
    Only applicable if enablePointerInteraction is True.

- enablePointerInteraction (boolean; optional):
    Whether to enable the mouse tracking events. This activates an
    internal tracker of the canvas mouse position and enables the
    functionality of object hover/click and tooltip labels, at the
    cost of performance. If you're looking for maximum gain in your
    graph performance it's recommended to switch off this property.

- enableZoomPanInteraction (boolean; optional):
    Whether to enable zooming and panning user interactions on a 2D
    canvas.

- externalobjectInput (number | string | boolean | list | dict; optional):
    externalobject_source:.

- externalobject_source (string; optional):
    externalobject_source:.

- fixNodes (boolean; optional):
    Whether to fix node coordinates after simulation has cooled.

- forceEngine (string; optional):
    Which force-simulation engine to use (d3 or ngraph).

- getGraphBbox (boolean; optional):
    Returns the current bounding box of the nodes in the graph,
    formatted as { x: [<num>, <num>], y: [<num>, <num>], z: [<num>,
    <num>] }.  If no nodes are found, returns None. Accepts an
    optional argument to define a custom node filter: node =>
    <boolean>, which should return a truthy value if the node is to be
    included.  This can be useful to calculate the bounding box of a
    portion of the graph. Bounding box is saved as the graphBbox prop.

- graphDataRead (dict; optional):
    Graph data. To be read by the user.

- graphDataWrite (dict; required):
    Graph data structure. Allows user to update graphData Format
    {nodes:{}, links:{}}.

- heightRatio (number; optional):
    height of component as proportion of container.

- key (string; optional):
    The key used to identify this component in React.

- linkAutoColor (boolean; optional):
    Automatically color link with inverse of background color.

- linkAutoColorBy (string; optional):
    Link object accessor function or attribute to automatically group
    colors by. Only affects links without a color attribute.

- linkClicked (dict; optional):
    clicked link.

- linkColor (string; optional):
    String giving link color.

- linkCurvature (number | string; optional):
    Link object accessor function, attribute or a numeric constant for
    the curvature radius of the link line. A value of 0 renders a
    straight line. 1 indicates a radius equal to half of the line
    length, causing the curve to approximate a semi-circle. For
    self-referencing links (source equal to target) the curve is
    represented as a loop around the node, with length proportional to
    the curvature value.

- linkDesc (string; optional):
    For VR only. Link object accessor function or attribute for
    description (shown under label).

- linkDirectionalArrowColor (string; optional):
    Link object accessor function or attribute for the color of the
    arrow head.

- linkDirectionalArrowLength (number | string; optional):
    Link object accessor function, attribute or a numeric constant for
    the length of the arrow head indicating the link directionality.
    The arrow is displayed directly over the link line, and points in
    the direction of source > target. A value of 0 hides the arrow.

- linkDirectionalArrowRelPos (number | string; optional):
    Link object accessor function, attribute or a numeric constant for
    the longitudinal position of the arrow head along the link line,
    expressed as a ratio between 0 and 1, where 0 indicates
    immediately next to the source node, 1 next to the target node,
    and 0.5 right in the middle.

- linkDirectionalArrowResolution (number; optional):
    Geometric resolution of the arrow head, expressed in how many
    slice segments to divide the cone base circumference. Higher
    values yield smoother arrows.

- linkDirectionalParticleColor (string; optional):
    Link object accessor function or attribute for the directional
    particles color.

- linkDirectionalParticleResolution (number; optional):
    Geometric resolution of each 3D directional particle, expressed in
    how many slice segments to divide the circumference. Higher values
    yield smoother particles.

- linkDirectionalParticleSpeed (number | string; optional):
    Link object accessor function, attribute or a numeric constant for
    the directional particles speed, expressed as the ratio of the
    link length to travel per frame. Values above 0.5 are discouraged.

- linkDirectionalParticleWidth (number | string; optional):
    Link object accessor function, attribute or a numeric constant for
    the directional particles width. Values are rounded to the nearest
    decimal for indexing purposes.

- linkDirectionalParticles (number | string; optional):
    Link object accessor function, attribute or a numeric constant for
    the number of particles (small spheres) to display over the link
    line. The particles are distributed equi-spaced along the line,
    travel in the direction source > target, and can be used to
    indicate link directionality.

- linkForce (number; optional)

- linkHoverPrecision (number; optional):
    Whether to display the link label when gazing the link closely
    (low value) or from far away (high value).

- linkId (string; optional):
    The link attribute containing the unique link id.

- linkIdsInvisibleAuto (list of strings; optional):
    ids of highlighted links (through search).

- linkIdsInvisibleUser (list of strings; optional):
    ids of visible links.

- linkLabel (string; optional):
    Link object accessor function or attribute for name (shown in
    label). Supports plain text or HTML content (except in VR).

- linkOpacity (number; optional):
    Line opacity of links, between [0,1]. 3D, VR, AR.

- linkResolution (number; optional):
    Geometric resolution of each link 3D line, expressed in how many
    radial segments to divide the cylinder. Higher values yield
    smoother cylinders. Applicable only to links with positive width.
    3D, VR, AR.

- linkRightClicked (dict; optional):
    right-clicked link.

- linkSource (string; optional):
    Link object accessor attribute referring to id of source node.

- linkTarget (string; optional):
    Link object accessor attribute referring to id of target node.

- linkWidth (number | string; optional):
    Link object accessor function, attribute or a numeric constant for
    the link line width.

- linksSelected (list of dicts; optional):
    selected (clicked) links.

- maxCooldownTime (number; optional):
    How long (ms) to render for before stopping and freezing the
    layout engine.

- maxDepth_neighbours_select (number; optional):
    max levels of neighbourhood selection around a node by repeat
    clicking.

- maxZoom (number; optional)

- minZoom (number; optional):
    ids of links highlighted due to being dragged.

- n_linkRightClicks (number; optional)

- n_nodeRightClicks (number; optional)

- ngraphPhysics (dict; optional):
    Specify custom physics configuration for ngraph, according to its
    configuration object syntax. Only applicable if using the ngraph
    simulation engine.

- nodeAutoColorBy (string; optional):
    Node object accessor function or attribute to automatically group
    colors by. Only affects nodes without a color attribute.

- nodeClicked (dict; optional):
    left-clicked node.

- nodeColor (string; optional):
    The node attribute whose value should be used for coloring nodes.

- nodeCoordinates (string | list of numbers; optional):
    Ratio of node circle area (square px) [2D] or sphere volume (cubic
    px) [3D] per value unit.

- nodeDesc (string; optional):
    For VR only. Node object accessor function or attribute for
    description (shown under label).

- nodeIcon (string; optional):
    The node attribute containing object with icon to display for each
    individual node.

- nodeIconSizeFactor (number; optional):
    controls nodeIcon size, relative to nodeRelSize.

- nodeId (string; optional):
    Node object accessor attribute for unique node id (used in link
    objects source/target).

- nodeIdsHighlightUser (list of strings; optional):
    ids of highlighted nodes (through search).

- nodeIdsInvisibleAuto (list of strings; optional):
    ids of visible nodes. Not to be supplied by user. Available to
    allow for saving state.

- nodeIdsInvisibleUser (list of strings; optional):
    ids of invisible nodes supplied by user as prop.

- nodeImg (string; optional):
    The node attribute containing url to image to display for each
    individual node.

- nodeImgSizeFactor (number; optional):
    controls nodeImg size, reltive to nodeRelSize.

- nodeLabel (string; optional):
    Node object accessor function or attribute for name (shown in
    label). Supports plain text or HTML content (except in VR). 2D, 3D
    and VR.

- nodeLabelRelSize (number; optional):
    controls node label size.

- nodeOpacity (number; optional):
    Nodes sphere opacity, between [0,1]. 3D, VR, AR.

- nodeRelSize (number; optional):
    Ratio of node circle area (square px) [2D] or sphere volume (cubic
    px) [3D] per value unit.

- nodeResolution (number; optional):
    Geometric resolution of each node's sphere, expressed in how many
    slice segments to divide the circumference. Higher values yield
    smoother spheres. Only applicable to 3D modes. 3D, VR, AR.

- nodeRightClicked (dict; optional):
    right-clicked node.

- nodeSubLabel (string; optional)

- nodeTextAutoColor (boolean; optional):
    Automatically color node text with inverse of backgroundColor.

- nodeTextColor (string; optional):
    Node text color.

- nodeVal (number | string; optional):
    Ratio of node circle area (square px) [2D] or sphere volume (cubic
    px) [3D] per value unit.

- nodeZoomId (string; optional):
    id of node to zoom to.

- nodesSelected (list of dicts; optional):
    selected (clicked) nodes.

- numDimensions (number; optional):
    Not applicable to 2D mode. Number of dimensions to run the force
    simulation on. 3D, VR, AR.

- pauseAnimation (boolean; optional):
    Pauses the rendering cycle of the component, effectively freezing
    the current view and cancelling all user interaction. This method
    can be used to save performance in circumstances when a static
    image is sufficient.

- pixelUnitRatio (number; optional):
    pixelUnitRatio: if node attribute (in some unit of measurement) is
    used as coordinates, pixel:unit scale.

- radialForce (number; optional)

- refresh (boolean; optional):
    Redraws all the nodes/links. 3D, VR, AR.

- reheat (number; optional)

- rendererConfig (dict; optional):
    Configuration parameters to pass to the ThreeJS WebGLRenderer
    constructor. This prop only has an effect on component mount. 3D
    only.

- rootType (string; optional):
    Node object accessor attribute for root type (e.g. entity).

- schemaOrData (string; optional)

- scripts (list of strings; optional)

- showCoordinates (boolean; optional):
    showCoordinates: whether or not to show pointer coordinates in
    hover tooltip (not yet used).

- size (dict; optional):
    provided react-sizeme. Contains an object with \"width\" and
    \"height\" attributes.

- sortRels1Descend (boolean; optional):
    sort in descending order?.

- sortRels2Descend (boolean; optional):
    sort in descending order?.

- sortRelsBy1 (string; optional):
    in zoom view, node attribute to sort relations by first.

- sortRelsBy2 (string; optional):
    in zoom view, node attribute to sort relations by after first
    sort.

- sortRoleplayers1Descend (boolean; optional):
    sort in descending order?.

- sortRoleplayers2Descend (boolean; optional):
    sort in descending order?.

- sortRoleplayersBy1 (string; optional):
    in zoom view, node attribute to sort role players by first.

- sortRoleplayersBy2 (string; optional):
    in zoom view, node attribute to sort role players by after first
    sort.

- thingType (string; optional):
    Node object accessor attribute for type (e.g. person).

- useCoordinates (boolean; optional):
    useCoordinates: whether to set nodeCoordinates for node
    coordinates.

- warmupTicks (number; optional):
    Number of layout engine cycles to dry-run at ignition before
    starting to render.

- zoom (list of numbers; optional):
    Calls zoom() method. ([number], [ms]).

- zoomToFitNodeIds (list of strings; optional)"""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'dash_react_force_graph'
    _type = 'Graph2D'
    @_explicitize_args
    def __init__(self, id=Component.REQUIRED, key=Component.UNDEFINED, graphDataWrite=Component.REQUIRED, graphDataRead=Component.UNDEFINED, nodeId=Component.UNDEFINED, thingType=Component.UNDEFINED, rootType=Component.UNDEFINED, linkSource=Component.UNDEFINED, linkTarget=Component.UNDEFINED, backgroundColor=Component.UNDEFINED, nodeRelSize=Component.UNDEFINED, nodeIconSizeFactor=Component.UNDEFINED, nodeLabelRelSize=Component.UNDEFINED, nodeImgSizeFactor=Component.UNDEFINED, nodeLabel=Component.UNDEFINED, nodeSubLabel=Component.UNDEFINED, nodeVal=Component.UNDEFINED, nodeCoordinates=Component.UNDEFINED, nodeDesc=Component.UNDEFINED, nodeColor=Component.UNDEFINED, nodeAutoColorBy=Component.UNDEFINED, nodeTextColor=Component.UNDEFINED, nodeTextAutoColor=Component.UNDEFINED, nodeOpacity=Component.UNDEFINED, nodeResolution=Component.UNDEFINED, linkLabel=Component.UNDEFINED, linkDesc=Component.UNDEFINED, linkColor=Component.UNDEFINED, linkAutoColor=Component.UNDEFINED, linkAutoColorBy=Component.UNDEFINED, linkOpacity=Component.UNDEFINED, linkWidth=Component.UNDEFINED, linkResolution=Component.UNDEFINED, linkCurvature=Component.UNDEFINED, linkDirectionalArrowLength=Component.UNDEFINED, linkDirectionalArrowColor=Component.UNDEFINED, linkDirectionalArrowRelPos=Component.UNDEFINED, linkDirectionalArrowResolution=Component.UNDEFINED, linkDirectionalParticles=Component.UNDEFINED, linkDirectionalParticleSpeed=Component.UNDEFINED, linkDirectionalParticleWidth=Component.UNDEFINED, linkDirectionalParticleColor=Component.UNDEFINED, linkDirectionalParticleResolution=Component.UNDEFINED, emitParticle=Component.UNDEFINED, rendererConfig=Component.UNDEFINED, pauseAnimation=Component.UNDEFINED, centerAtZoom=Component.UNDEFINED, refresh=Component.UNDEFINED, numDimensions=Component.UNDEFINED, forceEngine=Component.UNDEFINED, ngraphPhysics=Component.UNDEFINED, warmupTicks=Component.UNDEFINED, cooldownTicks=Component.UNDEFINED, maxCooldownTime=Component.UNDEFINED, fixNodes=Component.UNDEFINED, linkHoverPrecision=Component.UNDEFINED, zoom=Component.UNDEFINED, controlType=Component.UNDEFINED, enableZoomPanInteraction=Component.UNDEFINED, enableNavigationControls=Component.UNDEFINED, enablePointerInteraction=Component.UNDEFINED, enableNodeDrag=Component.UNDEFINED, getGraphBbox=Component.UNDEFINED, heightRatio=Component.UNDEFINED, size=Component.UNDEFINED, active=Component.UNDEFINED, nodeImg=Component.UNDEFINED, nodeIcon=Component.UNDEFINED, linkId=Component.UNDEFINED, nodeZoomId=Component.UNDEFINED, sortRelsBy1=Component.UNDEFINED, sortRelsBy2=Component.UNDEFINED, sortRoleplayersBy1=Component.UNDEFINED, sortRoleplayersBy2=Component.UNDEFINED, sortRels1Descend=Component.UNDEFINED, sortRels2Descend=Component.UNDEFINED, sortRoleplayers1Descend=Component.UNDEFINED, sortRoleplayers2Descend=Component.UNDEFINED, nodesSelected=Component.UNDEFINED, nodeClicked=Component.UNDEFINED, nodeRightClicked=Component.UNDEFINED, linkClicked=Component.UNDEFINED, linkRightClicked=Component.UNDEFINED, linksSelected=Component.UNDEFINED, minZoom=Component.UNDEFINED, maxZoom=Component.UNDEFINED, nodeIdsHighlightUser=Component.UNDEFINED, nodeIdsInvisibleAuto=Component.UNDEFINED, nodeIdsInvisibleUser=Component.UNDEFINED, linkIdsInvisibleAuto=Component.UNDEFINED, linkIdsInvisibleUser=Component.UNDEFINED, externalobject_source=Component.UNDEFINED, externalobjectInput=Component.UNDEFINED, useCoordinates=Component.UNDEFINED, pixelUnitRatio=Component.UNDEFINED, showCoordinates=Component.UNDEFINED, maxDepth_neighbours_select=Component.UNDEFINED, currentZoomPan=Component.UNDEFINED, zoomToFitNodeIds=Component.UNDEFINED, n_nodeRightClicks=Component.UNDEFINED, n_linkRightClicks=Component.UNDEFINED, scripts=Component.UNDEFINED, centerForce=Component.UNDEFINED, chargeForce=Component.UNDEFINED, linkForce=Component.UNDEFINED, radialForce=Component.UNDEFINED, reheat=Component.UNDEFINED, schemaOrData=Component.UNDEFINED, enableContextMenu=Component.UNDEFINED, contextMenuClicked=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'active', 'backgroundColor', 'centerAtZoom', 'centerForce', 'chargeForce', 'contextMenuClicked', 'controlType', 'cooldownTicks', 'currentZoomPan', 'emitParticle', 'enableContextMenu', 'enableNavigationControls', 'enableNodeDrag', 'enablePointerInteraction', 'enableZoomPanInteraction', 'externalobjectInput', 'externalobject_source', 'fixNodes', 'forceEngine', 'getGraphBbox', 'graphDataRead', 'graphDataWrite', 'heightRatio', 'key', 'linkAutoColor', 'linkAutoColorBy', 'linkClicked', 'linkColor', 'linkCurvature', 'linkDesc', 'linkDirectionalArrowColor', 'linkDirectionalArrowLength', 'linkDirectionalArrowRelPos', 'linkDirectionalArrowResolution', 'linkDirectionalParticleColor', 'linkDirectionalParticleResolution', 'linkDirectionalParticleSpeed', 'linkDirectionalParticleWidth', 'linkDirectionalParticles', 'linkForce', 'linkHoverPrecision', 'linkId', 'linkIdsInvisibleAuto', 'linkIdsInvisibleUser', 'linkLabel', 'linkOpacity', 'linkResolution', 'linkRightClicked', 'linkSource', 'linkTarget', 'linkWidth', 'linksSelected', 'maxCooldownTime', 'maxDepth_neighbours_select', 'maxZoom', 'minZoom', 'n_linkRightClicks', 'n_nodeRightClicks', 'ngraphPhysics', 'nodeAutoColorBy', 'nodeClicked', 'nodeColor', 'nodeCoordinates', 'nodeDesc', 'nodeIcon', 'nodeIconSizeFactor', 'nodeId', 'nodeIdsHighlightUser', 'nodeIdsInvisibleAuto', 'nodeIdsInvisibleUser', 'nodeImg', 'nodeImgSizeFactor', 'nodeLabel', 'nodeLabelRelSize', 'nodeOpacity', 'nodeRelSize', 'nodeResolution', 'nodeRightClicked', 'nodeSubLabel', 'nodeTextAutoColor', 'nodeTextColor', 'nodeVal', 'nodeZoomId', 'nodesSelected', 'numDimensions', 'pauseAnimation', 'pixelUnitRatio', 'radialForce', 'refresh', 'reheat', 'rendererConfig', 'rootType', 'schemaOrData', 'scripts', 'showCoordinates', 'size', 'sortRels1Descend', 'sortRels2Descend', 'sortRelsBy1', 'sortRelsBy2', 'sortRoleplayers1Descend', 'sortRoleplayers2Descend', 'sortRoleplayersBy1', 'sortRoleplayersBy2', 'thingType', 'useCoordinates', 'warmupTicks', 'zoom', 'zoomToFitNodeIds']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'active', 'backgroundColor', 'centerAtZoom', 'centerForce', 'chargeForce', 'contextMenuClicked', 'controlType', 'cooldownTicks', 'currentZoomPan', 'emitParticle', 'enableContextMenu', 'enableNavigationControls', 'enableNodeDrag', 'enablePointerInteraction', 'enableZoomPanInteraction', 'externalobjectInput', 'externalobject_source', 'fixNodes', 'forceEngine', 'getGraphBbox', 'graphDataRead', 'graphDataWrite', 'heightRatio', 'key', 'linkAutoColor', 'linkAutoColorBy', 'linkClicked', 'linkColor', 'linkCurvature', 'linkDesc', 'linkDirectionalArrowColor', 'linkDirectionalArrowLength', 'linkDirectionalArrowRelPos', 'linkDirectionalArrowResolution', 'linkDirectionalParticleColor', 'linkDirectionalParticleResolution', 'linkDirectionalParticleSpeed', 'linkDirectionalParticleWidth', 'linkDirectionalParticles', 'linkForce', 'linkHoverPrecision', 'linkId', 'linkIdsInvisibleAuto', 'linkIdsInvisibleUser', 'linkLabel', 'linkOpacity', 'linkResolution', 'linkRightClicked', 'linkSource', 'linkTarget', 'linkWidth', 'linksSelected', 'maxCooldownTime', 'maxDepth_neighbours_select', 'maxZoom', 'minZoom', 'n_linkRightClicks', 'n_nodeRightClicks', 'ngraphPhysics', 'nodeAutoColorBy', 'nodeClicked', 'nodeColor', 'nodeCoordinates', 'nodeDesc', 'nodeIcon', 'nodeIconSizeFactor', 'nodeId', 'nodeIdsHighlightUser', 'nodeIdsInvisibleAuto', 'nodeIdsInvisibleUser', 'nodeImg', 'nodeImgSizeFactor', 'nodeLabel', 'nodeLabelRelSize', 'nodeOpacity', 'nodeRelSize', 'nodeResolution', 'nodeRightClicked', 'nodeSubLabel', 'nodeTextAutoColor', 'nodeTextColor', 'nodeVal', 'nodeZoomId', 'nodesSelected', 'numDimensions', 'pauseAnimation', 'pixelUnitRatio', 'radialForce', 'refresh', 'reheat', 'rendererConfig', 'rootType', 'schemaOrData', 'scripts', 'showCoordinates', 'size', 'sortRels1Descend', 'sortRels2Descend', 'sortRelsBy1', 'sortRelsBy2', 'sortRoleplayers1Descend', 'sortRoleplayers2Descend', 'sortRoleplayersBy1', 'sortRoleplayersBy2', 'thingType', 'useCoordinates', 'warmupTicks', 'zoom', 'zoomToFitNodeIds']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        for k in ['id', 'graphDataWrite']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')

        super(Graph2D, self).__init__(**args)
