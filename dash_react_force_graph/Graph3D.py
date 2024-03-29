# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class Graph3D(Component):
    """A Graph3D component.


Keyword arguments:

- id (string; required):
    The ID used to identify this component in Dash callbacks.

- active (boolean; optional):
    whether or not session is active. Used to enable or disable
    warning browser dialog when closing.

- backgroundColor (string; optional):
    Getter/setter for the chart background color, default transparent.

- cameraPosition (list; optional):
    Re-position the camera, in terms of x, y, z coordinates. Each of
    the coordinates is optional, allowing for motion in just some
    dimensions. The optional second argument can be used to define the
    direction that the camera should aim at, in terms of an {x,y,z}
    point in the 3D space. The 3rd optional argument defines the
    duration of the transition (in ms) to animate the camera motion. A
    value of 0 (default) moves the camera immediately to the final
    position. By default the camera will face the center of the graph
    at a z distance proportional to the amount of nodes in the system.
    3D.

- centerAt (list; optional):
    Set the coordinates of the center of the viewport. This method can
    be used to perform panning on the 2D canvas programmatically. Each
    of the x, y coordinates is optional, allowing for motion in just
    one dimension. An optional 3rd argument defines the duration of
    the transition (in ms) to animate the canvas motion.

- centreCoordinates (dict with strings as keys and values of type number; optional):
    origin coordinates.

- controlType (string; optional):
    Which type of control to use to control the camera on 3D mode.
    Choice between trackball, orbit or fly.

- cooldownTicks (number; optional):
    How many build-in frames to render before stopping and freezing
    the layout engine.

- cooldownTime (number; optional):
    How long (ms) to render for before stopping and freezing the
    layout engine.

- d3AlphaDecay (number; optional):
    Sets the simulation intensity decay parameter. Only applicable if
    using the d3 simulation engine.

- d3AlphaMin (number; optional):
    Sets the simulation alpha min parameter. Only applicable if using
    the d3 simulation engine.

- d3ReheatSimulation (boolean; optional):
    Reheats the force simulation engine, by setting the alpha value to
    1. Only applicable if using the d3 simulation engine.

- d3VelocityDecay (number; optional):
    Nodes' velocity decay that simulates the medium resistance. Only
    applicable if using the d3 simulation engine.

- dagLevelDistance (number; optional):
    If dagMode is engaged, this specifies the distance between the
    different graph depths.

- dagMode (string; optional):
    Apply layout constraints based on the graph directionality. Only
    works correctly for DAG graph structures (without cycles). Choice
    between td (top-down), bu (bottom-up), lr (left-to-right), rl
    (right-to-left), zout (near-to-far), zin (far-to-near), radialout
    (outwards-radially) or radialin (inwards-radially).

- dagModeOn (boolean; optional):
    Apply layout constraints based on the graph directionality. Only
    works correctly for DAG graph structures (without cycles). Choice
    between td (top-down), bu (bottom-up), lr (left-to-right), rl
    (right-to-left), zout (near-to-far), zin (far-to-near), radialout
    (outwards-radially) or radialin (inwards-radially).

- dagNodeIds (list of strings; optional):
    array of string ids for nodes to include in DAG layout.

- emitParticle (dict; optional):
    An alternative mechanism for generating particles, this method
    emits a non-cyclical single particle within a specific link. The
    emitted particle shares the styling (speed, width, color) of the
    regular particle props. A valid link object that is included in
    graphData should be passed as a single parameter.

- enableNodeDrag (boolean; optional):
    Whether to enable the user interaction to drag nodes by
    click-dragging. If enabled, every time a node is dragged the
    simulation is re-heated so the other nodes react to the changes.
    Only applicable if enablePointerInteraction is True.

- externalobject_input (number | string | boolean | list | dict; optional):
    externalobject_source:.

- externalobject_source (string; optional):
    externalobject_source:.

- forceEngine (string; optional):
    Which force-simulation engine to use (d3 or ngraph).

- getGraphBbox (boolean; optional):
    Returns the current bounding box of the nodes in the graph,
    formatted as { x: [<num>, <num>], y: [<num>, <num>], z: [<num>,
    <num>] }. If no nodes are found, returns None. Accepts an optional
    argument to define a custom node filter: node => <boolean>, which
    should return a truthy value if the node is to be included. This
    can be useful to calculate the bounding box of a portion of the
    graph. Bounding box is saved as the graphBbox prop.

- graphData (dict; required):
    Graph data structure. Can also be used to apply incremental
    updates. Format {nodes:{}, links:{}}.

- gravity (string; optional):
    gravity: not yet used, prop to change three gravity. Not used in
    2D.

- heightRatio (number; optional):
    height of component as proportion of container.

- interactive (boolean; optional):
    toggle enableZoomPanInteraction, enablePointerInteraction,
    enableNavigationControls with a single control.

- linkAutoColorBy (string; optional):
    Link object accessor function or attribute to automatically group
    colors by. Only affects links without a color attribute.

- linkColor (string; optional):
    Link object accessor function or attribute for line color.

- linkCurvature (number | string; optional):
    Link object accessor function, attribute or a numeric constant for
    the curvature radius of the link line. A value of 0 renders a
    straight line. 1 indicates a radius equal to half of the line
    length, causing the curve to approximate a semi-circle. For
    self-referencing links (source equal to target) the curve is
    represented as a loop around the node, with length proportional to
    the curvature value.

- linkCurveRotation (number | string; optional):
    Link object accessor function, attribute or a numeric constant for
    the rotation along the line axis to apply to the curve. Has no
    effect on straight lines. At 0 rotation, the curve is oriented in
    the direction of the intersection with the XY plane. The rotation
    angle (in radians) will rotate the curved line clockwise around
    the \"start-to-end\" axis from this reference orientation.

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

- linkHoverPrecision (number; optional):
    Whether to display the link label when gazing the link closely
    (low value) or from far away (high value).

- linkId (string; optional):
    The link attribute containing the unique link id.

- linkIdsHighlight (list of strings; optional):
    ids of highlighted links (through search).

- linkIdsVisible (list of strings; optional):
    ids of visible links.

- linkLabel (string; optional):
    Link object accessor function or attribute for name (shown in
    label). Supports plain text or HTML content (except in VR).

- linkLineDash (number | string; optional):
    Link object accessor function, attribute or number array (e.g. [5,
    15]) to determine if a line dash should be applied to this
    rendered link. Refer to the HTML canvas setLineDash API for
    example values. Either a falsy value or an empty array will
    disable dashing.

- linkOpacity (number; optional):
    Line opacity of links, between [0,1]. 3D, VR, AR.

- linkResolution (number; optional):
    Geometric resolution of each link 3D line, expressed in how many
    radial segments to divide the cylinder. Higher values yield
    smoother cylinders. Applicable only to links with positive width.
    3D, VR, AR.

- linkSource (string; optional):
    Link object accessor attribute referring to id of source node.

- linkTarget (string; optional):
    Link object accessor attribute referring to id of target node.

- linkWidth (number | string; optional):
    Link object accessor function, attribute or a numeric constant for
    the link line width.

- maxDepth_neighbours_select (number; optional):
    max levels of neighbourhood selection around a node by repeat
    clicking.

- ngraphPhysics (dict; optional):
    Specify custom physics configuration for ngraph, according to its
    configuration object syntax. Only applicable if using the ngraph
    simulation engine.

- nodeAutoColorBy (string; optional):
    Node object accessor function or attribute to automatically group
    colors by. Only affects nodes without a color attribute.

- nodeColor (string; optional):
    The node attribute whose value should be used for coloring nodes.

- nodeDesc (string; optional):
    For VR only. Node object accessor function or attribute for
    description (shown under label).

- nodeIcon (string; optional):
    The node attribute containing object with icon to display for each
    individual node.

- nodeIcon_fontsheets (dict; optional):
    object with keys being fonts (string) and values being CSS sheets.

- nodeId (string; optional):
    Node object accessor attribute for unique node id (used in link
    objects source/target).

- nodeIdsHighlight (list of strings; optional):
    ids of highlighted nodes (through searcha).

- nodeIdsVisible (list of strings; optional):
    ids of visible nodes.

- nodeImg (string; optional):
    The node attribute containing url to image to display for each
    individual node.

- nodeLabel (string; optional):
    Node object accessor function or attribute for name (shown in
    label). Supports plain text or HTML content (except in VR). 2D, 3D
    and VR.

- nodeOpacity (number; optional):
    Nodes sphere opacity, between [0,1]. 3D, VR, AR.

- nodeRelSize (number; optional):
    Ratio of node circle area (square px) [2D] or sphere volume (cubic
    px) [3D] per value unit.

- nodeResolution (number; optional):
    Geometric resolution of each node's sphere, expressed in how many
    slice segments to divide the circumference. Higher values yield
    smoother spheres. Only applicable to 3D modes. 3D, VR, AR.

- nodeURL (string; optional):
    The node attribute containing a URL.

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

- refresh (boolean; optional):
    Redraws all the nodes/links. 3D, VR, AR.

- rendererConfig (dict; optional):
    Configuration parameters to pass to the ThreeJS WebGLRenderer
    constructor. This prop only has an effect on component mount. 3D
    only.

- resumeAnimation (boolean; optional):
    Resumes the rendering cycle of the component, and re-enables the
    user interaction. This method can be used together with
    pauseAnimation for performance optimization purposes.

- showCoordinates (boolean; optional):
    showCoordinates: whether or not to show pointer coordinates as
    tooltip (not yet used).

- showNavInfo (boolean; optional):
    Whether to show the navigation controls footer info.

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

- useCoordinates (boolean; optional):
    useCoordinates: whether to use node attribute to set node
    coordinates.

- useNodeIcon (boolean; optional):
    Whether or not to use the nodeIcon.

- useNodeImg (boolean; optional):
    Whether or not to use the nodeImg. Overrides nodeIcon.

- warmupTicks (number; optional):
    Number of layout engine cycles to dry-run at ignition before
    starting to render.

- zoom (list; optional):
    Set the 2D canvas zoom amount. The zoom is defined in terms of the
    scale transform of each px. A value of 1 indicates unity, larger
    values zoom in and smaller values zoom out. An optional 2nd
    argument defines the duration of the transition (in ms) to animate
    the canvas motion. By default the zoom is set to a value inversely
    proportional to the amount of nodes in the system.

- zoomToFit (list; optional):
    Automatically zooms/pans the canvas so that all of the nodes fit
    inside it. If no nodes are found no action is taken. It accepts
    two optional arguments: the first defines the duration of the
    transition (in ms) to animate the canvas motion (default: 0ms).
    The second argument is the amount of padding (in px) between the
    edge of the canvas and the outermost node (default: 10px). The
    third argument specifies a custom node filter: node => <boolean>,
    which should return a truthy value if the node is to be included.
    This can be useful for focusing on a portion of the graph. 2D, 3D."""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'dash_react_force_graph'
    _type = 'Graph3D'
    @_explicitize_args
    def __init__(self, id=Component.REQUIRED, graphData=Component.REQUIRED, nodeId=Component.UNDEFINED, linkSource=Component.UNDEFINED, linkTarget=Component.UNDEFINED, backgroundColor=Component.UNDEFINED, showNavInfo=Component.UNDEFINED, nodeRelSize=Component.UNDEFINED, nodeVal=Component.UNDEFINED, nodeLabel=Component.UNDEFINED, nodeDesc=Component.UNDEFINED, nodeColor=Component.UNDEFINED, nodeAutoColorBy=Component.UNDEFINED, nodeOpacity=Component.UNDEFINED, nodeResolution=Component.UNDEFINED, linkLabel=Component.UNDEFINED, linkDesc=Component.UNDEFINED, linkColor=Component.UNDEFINED, linkAutoColorBy=Component.UNDEFINED, linkOpacity=Component.UNDEFINED, linkLineDash=Component.UNDEFINED, linkWidth=Component.UNDEFINED, linkResolution=Component.UNDEFINED, linkCurvature=Component.UNDEFINED, linkCurveRotation=Component.UNDEFINED, linkDirectionalArrowLength=Component.UNDEFINED, linkDirectionalArrowColor=Component.UNDEFINED, linkDirectionalArrowRelPos=Component.UNDEFINED, linkDirectionalArrowResolution=Component.UNDEFINED, linkDirectionalParticles=Component.UNDEFINED, linkDirectionalParticleSpeed=Component.UNDEFINED, linkDirectionalParticleWidth=Component.UNDEFINED, linkDirectionalParticleColor=Component.UNDEFINED, linkDirectionalParticleResolution=Component.UNDEFINED, emitParticle=Component.UNDEFINED, rendererConfig=Component.UNDEFINED, pauseAnimation=Component.UNDEFINED, resumeAnimation=Component.UNDEFINED, centerAt=Component.UNDEFINED, zoom=Component.UNDEFINED, zoomToFit=Component.UNDEFINED, cameraPosition=Component.UNDEFINED, refresh=Component.UNDEFINED, numDimensions=Component.UNDEFINED, forceEngine=Component.UNDEFINED, dagMode=Component.UNDEFINED, dagModeOn=Component.UNDEFINED, dagLevelDistance=Component.UNDEFINED, dagNodeIds=Component.UNDEFINED, d3AlphaMin=Component.UNDEFINED, d3AlphaDecay=Component.UNDEFINED, d3VelocityDecay=Component.UNDEFINED, ngraphPhysics=Component.UNDEFINED, warmupTicks=Component.UNDEFINED, cooldownTicks=Component.UNDEFINED, cooldownTime=Component.UNDEFINED, d3ReheatSimulation=Component.UNDEFINED, linkHoverPrecision=Component.UNDEFINED, controlType=Component.UNDEFINED, enableNodeDrag=Component.UNDEFINED, getGraphBbox=Component.UNDEFINED, heightRatio=Component.UNDEFINED, size=Component.UNDEFINED, active=Component.UNDEFINED, nodeURL=Component.UNDEFINED, useNodeImg=Component.UNDEFINED, nodeImg=Component.UNDEFINED, useNodeIcon=Component.UNDEFINED, nodeIcon=Component.UNDEFINED, nodeIcon_fontsheets=Component.UNDEFINED, linkId=Component.UNDEFINED, interactive=Component.UNDEFINED, nodeZoomId=Component.UNDEFINED, sortRelsBy1=Component.UNDEFINED, sortRelsBy2=Component.UNDEFINED, sortRoleplayersBy1=Component.UNDEFINED, sortRoleplayersBy2=Component.UNDEFINED, sortRels1Descend=Component.UNDEFINED, sortRels2Descend=Component.UNDEFINED, sortRoleplayers1Descend=Component.UNDEFINED, sortRoleplayers2Descend=Component.UNDEFINED, nodesSelected=Component.UNDEFINED, nodeIdsHighlight=Component.UNDEFINED, nodeIdsVisible=Component.UNDEFINED, linkIdsHighlight=Component.UNDEFINED, linkIdsVisible=Component.UNDEFINED, externalobject_source=Component.UNDEFINED, externalobject_input=Component.UNDEFINED, centreCoordinates=Component.UNDEFINED, useCoordinates=Component.UNDEFINED, pixelUnitRatio=Component.UNDEFINED, showCoordinates=Component.UNDEFINED, gravity=Component.UNDEFINED, maxDepth_neighbours_select=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'active', 'backgroundColor', 'cameraPosition', 'centerAt', 'centreCoordinates', 'controlType', 'cooldownTicks', 'cooldownTime', 'd3AlphaDecay', 'd3AlphaMin', 'd3ReheatSimulation', 'd3VelocityDecay', 'dagLevelDistance', 'dagMode', 'dagModeOn', 'dagNodeIds', 'emitParticle', 'enableNodeDrag', 'externalobject_input', 'externalobject_source', 'forceEngine', 'getGraphBbox', 'graphData', 'gravity', 'heightRatio', 'interactive', 'linkAutoColorBy', 'linkColor', 'linkCurvature', 'linkCurveRotation', 'linkDesc', 'linkDirectionalArrowColor', 'linkDirectionalArrowLength', 'linkDirectionalArrowRelPos', 'linkDirectionalArrowResolution', 'linkDirectionalParticleColor', 'linkDirectionalParticleResolution', 'linkDirectionalParticleSpeed', 'linkDirectionalParticleWidth', 'linkDirectionalParticles', 'linkHoverPrecision', 'linkId', 'linkIdsHighlight', 'linkIdsVisible', 'linkLabel', 'linkLineDash', 'linkOpacity', 'linkResolution', 'linkSource', 'linkTarget', 'linkWidth', 'maxDepth_neighbours_select', 'ngraphPhysics', 'nodeAutoColorBy', 'nodeColor', 'nodeDesc', 'nodeIcon', 'nodeIcon_fontsheets', 'nodeId', 'nodeIdsHighlight', 'nodeIdsVisible', 'nodeImg', 'nodeLabel', 'nodeOpacity', 'nodeRelSize', 'nodeResolution', 'nodeURL', 'nodeVal', 'nodeZoomId', 'nodesSelected', 'numDimensions', 'pauseAnimation', 'pixelUnitRatio', 'refresh', 'rendererConfig', 'resumeAnimation', 'showCoordinates', 'showNavInfo', 'size', 'sortRels1Descend', 'sortRels2Descend', 'sortRelsBy1', 'sortRelsBy2', 'sortRoleplayers1Descend', 'sortRoleplayers2Descend', 'sortRoleplayersBy1', 'sortRoleplayersBy2', 'useCoordinates', 'useNodeIcon', 'useNodeImg', 'warmupTicks', 'zoom', 'zoomToFit']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'active', 'backgroundColor', 'cameraPosition', 'centerAt', 'centreCoordinates', 'controlType', 'cooldownTicks', 'cooldownTime', 'd3AlphaDecay', 'd3AlphaMin', 'd3ReheatSimulation', 'd3VelocityDecay', 'dagLevelDistance', 'dagMode', 'dagModeOn', 'dagNodeIds', 'emitParticle', 'enableNodeDrag', 'externalobject_input', 'externalobject_source', 'forceEngine', 'getGraphBbox', 'graphData', 'gravity', 'heightRatio', 'interactive', 'linkAutoColorBy', 'linkColor', 'linkCurvature', 'linkCurveRotation', 'linkDesc', 'linkDirectionalArrowColor', 'linkDirectionalArrowLength', 'linkDirectionalArrowRelPos', 'linkDirectionalArrowResolution', 'linkDirectionalParticleColor', 'linkDirectionalParticleResolution', 'linkDirectionalParticleSpeed', 'linkDirectionalParticleWidth', 'linkDirectionalParticles', 'linkHoverPrecision', 'linkId', 'linkIdsHighlight', 'linkIdsVisible', 'linkLabel', 'linkLineDash', 'linkOpacity', 'linkResolution', 'linkSource', 'linkTarget', 'linkWidth', 'maxDepth_neighbours_select', 'ngraphPhysics', 'nodeAutoColorBy', 'nodeColor', 'nodeDesc', 'nodeIcon', 'nodeIcon_fontsheets', 'nodeId', 'nodeIdsHighlight', 'nodeIdsVisible', 'nodeImg', 'nodeLabel', 'nodeOpacity', 'nodeRelSize', 'nodeResolution', 'nodeURL', 'nodeVal', 'nodeZoomId', 'nodesSelected', 'numDimensions', 'pauseAnimation', 'pixelUnitRatio', 'refresh', 'rendererConfig', 'resumeAnimation', 'showCoordinates', 'showNavInfo', 'size', 'sortRels1Descend', 'sortRels2Descend', 'sortRelsBy1', 'sortRelsBy2', 'sortRoleplayers1Descend', 'sortRoleplayers2Descend', 'sortRoleplayersBy1', 'sortRoleplayersBy2', 'useCoordinates', 'useNodeIcon', 'useNodeImg', 'warmupTicks', 'zoom', 'zoomToFit']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        for k in ['id', 'graphData']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')

        super(Graph3D, self).__init__(**args)
