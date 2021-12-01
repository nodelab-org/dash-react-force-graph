# AUTO GENERATED FILE - DO NOT EDIT

export dash_graph2d

"""
    dash_graph2d(;kwargs...)

A Graph2D component.

Keyword arguments:
- `id` (String; required): The ID used to identify this component in Dash callbacks.
- `key` (String; optional): The key used to identify this component in React
- `graphData` (Dict; required): Graph data structure. Prop which is provided by user.
Can also be used to apply incremental updates. Format {nodes:{}, links:{}}
- `nodeId` (String; optional): Node object accessor attribute for unique node id (used in link objects source/target).
- `linkSource` (String; optional): Link object accessor attribute referring to id of source node.
- `linkTarget` (String; optional): Link object accessor attribute referring to id of target node.
- `backgroundColor` (String; optional): Getter/setter for the canvas background color, default transparent
- `nodeRelSize` (Real; optional): Ratio of node circle area (square px) [2D] or sphere volume (cubic px) [3D] per value unit.
- `nodeIconRelSize` (Real; optional): controls nodeIcon size
- `nodeImgRelSize` (Real; optional): controls nodeImg size
- `nodeLabel` (String; optional): Node object accessor function or attribute for name (shown in label). Supports plain text or HTML content (except in VR).
2D, 3D and VR
- `nodeVal` (Real | String; optional): Ratio of node circle area (square px) [2D] or sphere volume (cubic px) [3D] per value unit.
- `nodeCoordinates` (String | Array of Reals; optional): Ratio of node circle area (square px) [2D] or sphere volume (cubic px) [3D] per value unit.
- `nodeDesc` (String; optional): For VR only. Node object accessor function or attribute for description (shown under label).
- `nodeColor` (String; optional): The node attribute whose value should be used for coloring nodes
- `nodeAutoColorBy` (String; optional): Node object accessor function or attribute to automatically group colors by. Only affects nodes without a color attribute.
- `nodeTextColor` (String; optional): Node text color
- `nodeTextAutoColor` (Bool; optional): Automatically color node text with inverse of backgroundColor
- `nodeOpacity` (Real; optional): Nodes sphere opacity, between [0,1]. 3D, VR, AR
- `nodeResolution` (Real; optional): Geometric resolution of each node's sphere, expressed in how many slice segments to divide the circumference. Higher values yield smoother spheres. Only applicable to 3D modes.
3D, VR, AR
- `linkLabel` (String; optional): Link object accessor function or attribute for name (shown in label). Supports plain text or HTML content (except in VR).
- `linkDesc` (String; optional): For VR only. Link object accessor function or attribute for description (shown under label).
- `linkColor` (String; optional): String giving link color
- `linkAutoColor` (Bool; optional): Automatically color link with inverse of background color
- `linkAutoColorBy` (String; optional): Link object accessor function or attribute to automatically group colors by. Only affects links without a color attribute.
- `linkOpacity` (Real; optional): Line opacity of links, between [0,1]. 3D, VR, AR
- `linkLineDash` (Real | String; optional): Link object accessor function, attribute or number array (e.g. [5, 15]) to determine if a line dash should be applied to this rendered link. Refer to the HTML canvas setLineDash API for example values. Either a falsy value or an empty array will disable dashing.
- `linkWidth` (Real | String; optional): Link object accessor function, attribute or a numeric constant for the link line width.
- `linkResolution` (Real; optional): Geometric resolution of each link 3D line, expressed in how many radial segments to divide the cylinder. Higher values yield smoother cylinders. Applicable only to links with positive width. 3D, VR, AR
- `linkCurvature` (Real; optional): Link object accessor function, attribute or a numeric constant for the curvature radius of the link line. A value of 0 renders a straight line. 1 indicates a radius equal to half of the line length, causing the curve to approximate a semi-circle. For self-referencing links (source equal to target) the curve is represented as a loop around the node, with length proportional to the curvature value.
- `linkDirectionalArrowLength` (Real | String; optional): Link object accessor function, attribute or a numeric constant for the length of the arrow head indicating the link directionality. The arrow is displayed directly over the link line, and points in the direction of source > target. A value of 0 hides the arrow.
- `linkDirectionalArrowColor` (String; optional): Link object accessor function or attribute for the color of the arrow head.
- `linkDirectionalArrowRelPos` (Real | String; optional): Link object accessor function, attribute or a numeric constant for the longitudinal position of the arrow head along the link line, expressed as a ratio between 0 and 1, where 0 indicates immediately next to the source node, 1 next to the target node, and 0.5 right in the middle.
- `linkDirectionalArrowResolution` (Real; optional): Geometric resolution of the arrow head, expressed in how many slice segments to divide the cone base circumference. Higher values yield smoother arrows.
- `linkDirectionalParticles` (Real | String; optional): Link object accessor function, attribute or a numeric constant for the number of particles (small spheres) to display over the link line. The particles are distributed equi-spaced along the line, travel in the direction source > target, and can be used to indicate link directionality.
- `linkDirectionalParticleSpeed` (Real | String; optional): Link object accessor function, attribute or a numeric constant for the directional particles speed, expressed as the ratio of the link length to travel per frame. Values above 0.5 are discouraged.
- `linkDirectionalParticleWidth` (Real | String; optional): Link object accessor function, attribute or a numeric constant for the directional particles width. Values are rounded to the nearest decimal for indexing purposes.
- `linkDirectionalParticleColor` (String; optional): Link object accessor function or attribute for the directional particles color.
- `linkDirectionalParticleResolution` (Real; optional): Geometric resolution of each 3D directional particle, expressed in how many slice segments to divide the circumference. Higher values yield smoother particles.
- `emitParticle` (Dict; optional): An alternative mechanism for generating particles, this method emits a non-cyclical single particle within a specific link. The emitted particle shares the styling (speed, width, color) of the regular particle props. A valid link object that is included in graphData should be passed as a single parameter.
- `rendererConfig` (Dict; optional): Configuration parameters to pass to the ThreeJS WebGLRenderer constructor. This prop only has an effect on component mount. 3D only
- `pauseAnimation` (Bool; optional): Pauses the rendering cycle of the component, effectively freezing the current view and cancelling all user interaction. This method can be used to save performance in circumstances when a static image is sufficient.
- `centerAtZoom` (Dict with Strings as keys and values of type Real; optional): calls centerAt, then zoom. Takes an object with keys "k", "x", "y"
- `zoomToFit` (Array of Reals; optional): Automatically zooms/pans the canvas so that all of the nodes fit inside it. If no nodes are found no action is taken. It accepts two optional arguments: the first defines the duration of the transition (in ms) to animate the canvas motion (default: 0ms). The second argument is the amount of padding (in px) between the edge of the canvas and the outermost node (default: 10px). The third argument specifies a custom node filter: node => <boolean>, which should return a truthy value if the node is to be included. This can be useful for focusing on a portion of the graph. 2D, 3D
- `refresh` (Bool; optional): Redraws all the nodes/links. 3D, VR, AR
- `numDimensions` (Real; optional): Not applicable to 2D mode. Number of dimensions to run the force simulation on. 3D, VR, AR
- `forceEngine` (String; optional): Which force-simulation engine to use (d3 or ngraph).
- `ngraphPhysics` (Dict; optional): Specify custom physics configuration for ngraph, according to its configuration object syntax. Only applicable if using the ngraph simulation engine.
- `warmupTicks` (Real; optional): Number of layout engine cycles to dry-run at ignition before starting to render.
- `cooldownTicks` (Real; optional): How many build-in frames to render before stopping and freezing the layout engine.
- `cooldownTime` (Real; optional): How long (ms) to render for before stopping and freezing the layout engine.
- `fixNodes` (Bool; optional): Whether to fix node coordinates after simulation has cooled
- `linkHoverPrecision` (Real; optional): Whether to display the link label when gazing the link closely (low value) or from far away (high value).
- `zoom` (Array of Reals; optional): Calls zoom() method. ([number], [ms])
- `controlType` (String; optional): Which type of control to use to control the camera on 3D mode. Choice between trackball, orbit or fly.
- `enableZoomPanInteraction` (Bool; optional): Whether to enable zooming and panning user interactions on a 2D canvas.
- `enableNavigationControls` (Bool; optional): Whether to enable the trackball navigation controls used to move the camera using mouse interactions (rotate/zoom/pan).
- `enablePointerInteraction` (Bool; optional): Whether to enable the mouse tracking events. This activates an internal tracker of the canvas mouse position and enables the functionality of object hover/click and tooltip labels, at the cost of performance. If you're looking for maximum gain in your graph performance it's recommended to switch off this property.
- `enableNodeDrag` (Bool; optional): Whether to enable the user interaction to drag nodes by click-dragging. If enabled, every time a node is dragged the simulation is re-heated so the other nodes react to the changes. Only applicable if enablePointerInteraction is true.
- `getGraphBbox` (Bool; optional): Returns the current bounding box of the nodes in the graph, formatted as { x: [<num>, <num>], y: [<num>, <num>], z: [<num>, <num>] }. 
If no nodes are found, returns null. Accepts an optional argument to define a custom node filter: node => <boolean>, which should return a truthy value if the node is to be included. 
This can be useful to calculate the bounding box of a portion of the graph.
Bounding box is saved as the graphBbox prop
- `heightRatio` (Real; optional): height of component as proportion of container
- `size` (Dict; optional): provided react-sizeme. Contains an object with "width" and "height" attributes
- `active` (Bool; optional): whether or not session is active. Used to enable or disable warning browser dialog when closing
- `useNodeImg` (Bool; optional): Whether or not to use the nodeImg. Overrides nodeIcon
- `nodeImg` (String; optional): The node attribute containing url to image to display for each individual node
- `useNodeIcon` (Bool; optional): Whether or not to use the nodeIcon
- `nodeIcon` (String; optional): The node attribute containing object with icon to display for each individual node.
- `nodeIcon_fontsheets` (Dict; optional): object with keys being fonts (string) and values being CSS sheets
- `linkId` (String; optional): The link attribute containing the unique link id
- `nodeZoomId` (String; optional): id of node to zoom to
- `sortRelsBy1` (String; optional): in zoom view, node attribute to sort relations by first
- `sortRelsBy2` (String; optional): in zoom view, node attribute to sort relations by after first sort
- `sortRoleplayersBy1` (String; optional): in zoom view, node attribute to sort role players by first
- `sortRoleplayersBy2` (String; optional): in zoom view, node attribute to sort role players by after first sort
- `sortRels1Descend` (Bool; optional): sort in descending order?
- `sortRels2Descend` (Bool; optional): sort in descending order?
- `sortRoleplayers1Descend` (Bool; optional): sort in descending order?
- `sortRoleplayers2Descend` (Bool; optional): sort in descending order?
- `nodesSelected` (Array of Dicts; optional): selected (clicked) nodes
- `nodeClicked` (Dict; optional): left-clicked node
- `nodeRightClicked` (Dict; optional): right-clicked node
- `nodeRightClickedViewpointCoordinates` (Dict with Strings as keys and values of type Real; optional): screen coordinates of right-clicked node
- `linkRightClickedViewpointCoordinates` (Dict with Strings as keys and values of type Real; optional)
- `linkRightClicked` (Dict; optional): right-clicked link
- `linksSelected` (Array of Dicts; optional): selected (clicked) links
- `minZoom` (Real; optional): ids of links highlighted due to being dragged
- `maxZoom` (Real; optional)
- `nodeIdsHighlightUser` (Array of Strings; optional): ids of highlighted nodes (through search)
- `nodeIdsInvisibleAuto` (Array of Strings; optional): ids of visible nodes. Not to be supplied by user. Available to allow for saving state
- `nodeIdsInvisibleUser` (Array of Strings; optional): ids of invisible nodes supplied by user as prop
- `linkIdsHighlightUser` (Array of Strings; optional): ids of highlighted links (through search)
- `linkIdsInvisibleAuto` (Array of Strings; optional)
- `linkIdsInvisibleUser` (Array of Strings; optional): ids of visible links
- `externalobject_source` (String; optional): externalobject_source:
- `externalobjectInput` (Real | String | Bool | Array | Dict; optional): externalobject_source:
- `useCoordinates` (Bool; optional): useCoordinates: whether to set nodeCoordinates for node coordinates
- `pixelUnitRatio` (Real; optional): pixelUnitRatio: if node attribute (in some unit of measurement) is used as coordinates, pixel:unit scale
- `showCoordinates` (Bool; optional): showCoordinates: whether or not to show pointer coordinates in hover tooltip (not yet used)
- `invisibleProps` (Array of Strings; optional): node props to hide on hover, in addition to any with prop name prefixed by "__"
- `maxDepth_neighbours_select` (Real; optional): max levels of neighbourhood selection around a node by repeat clicking
- `currentZoomPan` (Dict; optional)
- `updateNeighbours` (Bool; optional)
- `forceRefresh` (Real; optional)
- `n_nodeRightClicks` (Real; optional)
- `n_linkRightClicks` (Real; optional)
"""
function dash_graph2d(; kwargs...)
        available_props = Symbol[:id, :key, :graphData, :nodeId, :linkSource, :linkTarget, :backgroundColor, :nodeRelSize, :nodeIconRelSize, :nodeImgRelSize, :nodeLabel, :nodeVal, :nodeCoordinates, :nodeDesc, :nodeColor, :nodeAutoColorBy, :nodeTextColor, :nodeTextAutoColor, :nodeOpacity, :nodeResolution, :linkLabel, :linkDesc, :linkColor, :linkAutoColor, :linkAutoColorBy, :linkOpacity, :linkLineDash, :linkWidth, :linkResolution, :linkCurvature, :linkDirectionalArrowLength, :linkDirectionalArrowColor, :linkDirectionalArrowRelPos, :linkDirectionalArrowResolution, :linkDirectionalParticles, :linkDirectionalParticleSpeed, :linkDirectionalParticleWidth, :linkDirectionalParticleColor, :linkDirectionalParticleResolution, :emitParticle, :rendererConfig, :pauseAnimation, :centerAtZoom, :zoomToFit, :refresh, :numDimensions, :forceEngine, :ngraphPhysics, :warmupTicks, :cooldownTicks, :cooldownTime, :fixNodes, :linkHoverPrecision, :zoom, :controlType, :enableZoomPanInteraction, :enableNavigationControls, :enablePointerInteraction, :enableNodeDrag, :getGraphBbox, :heightRatio, :size, :active, :useNodeImg, :nodeImg, :useNodeIcon, :nodeIcon, :nodeIcon_fontsheets, :linkId, :nodeZoomId, :sortRelsBy1, :sortRelsBy2, :sortRoleplayersBy1, :sortRoleplayersBy2, :sortRels1Descend, :sortRels2Descend, :sortRoleplayers1Descend, :sortRoleplayers2Descend, :nodesSelected, :nodeClicked, :nodeRightClicked, :nodeRightClickedViewpointCoordinates, :linkRightClickedViewpointCoordinates, :linkRightClicked, :linksSelected, :minZoom, :maxZoom, :nodeIdsHighlightUser, :nodeIdsInvisibleAuto, :nodeIdsInvisibleUser, :linkIdsHighlightUser, :linkIdsInvisibleAuto, :linkIdsInvisibleUser, :externalobject_source, :externalobjectInput, :useCoordinates, :pixelUnitRatio, :showCoordinates, :invisibleProps, :maxDepth_neighbours_select, :currentZoomPan, :updateNeighbours, :forceRefresh, :n_nodeRightClicks, :n_linkRightClicks]
        wild_props = Symbol[]
        return Component("dash_graph2d", "Graph2D", "dash_react_force_graph", available_props, wild_props; kwargs...)
end

