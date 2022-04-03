# AUTO GENERATED FILE - DO NOT EDIT

export dash_graph2d

"""
    dash_graph2d(;kwargs...)

A Graph2D component.

Keyword arguments:
- `id` (String; required): The ID used to identify this component in Dash callbacks.
- `active` (Bool; optional): whether or not session is active. Used to enable or disable warning browser dialog when closing
- `backgroundColor` (String; optional): Getter/setter for the canvas background color, default transparent
- `centerAtZoom` (Dict with Strings as keys and values of type Real; optional): calls centerAt, then zoom. Takes an object with keys "k", "x", "y"
- `controlType` (String; optional): Which type of control to use to control the camera on 3D mode. Choice between trackball, orbit or fly.
- `cooldownTicks` (Real; optional): How many build-in frames to render before stopping and freezing the layout engine.
- `cooldownTime` (Real; optional): How long (ms) to render for before stopping and freezing the layout engine.
- `currentZoomPan` (Dict; optional)
- `emitParticle` (Dict; optional): An alternative mechanism for generating particles, this method emits a non-cyclical single particle within a specific link. The emitted particle shares the styling (speed, width, color) of the regular particle props. A valid link object that is included in graphData should be passed as a single parameter.
- `enableNavigationControls` (Bool; optional): Whether to enable the trackball navigation controls used to move the camera using mouse interactions (rotate/zoom/pan).
- `enableNodeDrag` (Bool; optional): Whether to enable the user interaction to drag nodes by click-dragging. If enabled, every time a node is dragged the simulation is re-heated so the other nodes react to the changes. Only applicable if enablePointerInteraction is true.
- `enablePointerInteraction` (Bool; optional): Whether to enable the mouse tracking events. This activates an internal tracker of the canvas mouse position and enables the functionality of object hover/click and tooltip labels, at the cost of performance. If you're looking for maximum gain in your graph performance it's recommended to switch off this property.
- `enableZoomPanInteraction` (Bool; optional): Whether to enable zooming and panning user interactions on a 2D canvas.
- `externalobjectInput` (Real | String | Bool | Array | Dict; optional): externalobject_source:
- `externalobject_source` (String; optional): externalobject_source:
- `fixNodes` (Bool; optional): Whether to fix node coordinates after simulation has cooled
- `forceEngine` (String; optional): Which force-simulation engine to use (d3 or ngraph).
- `forceRefresh` (Real; optional)
- `getGraphBbox` (Bool; optional): Returns the current bounding box of the nodes in the graph, formatted as { x: [<num>, <num>], y: [<num>, <num>], z: [<num>, <num>] }. 
If no nodes are found, returns null. Accepts an optional argument to define a custom node filter: node => <boolean>, which should return a truthy value if the node is to be included. 
This can be useful to calculate the bounding box of a portion of the graph.
Bounding box is saved as the graphBbox prop
- `graphData` (Dict; required): Graph data structure. Prop which is provided by user.
Can also be used to apply incremental updates. Format {nodes:{}, links:{}}
- `heightRatio` (Real; optional): height of component as proportion of container
- `key` (String; optional): The key used to identify this component in React
- `linkAutoColor` (Bool; optional): Automatically color link with inverse of background color
- `linkAutoColorBy` (String; optional): Link object accessor function or attribute to automatically group colors by. Only affects links without a color attribute.
- `linkClicked` (Dict; optional): clicked link
- `linkColor` (String; optional): String giving link color
- `linkCurvature` (Real | String; optional): Link object accessor function, attribute or a numeric constant for the curvature radius of the link line. A value of 0 renders a straight line. 1 indicates a radius equal to half of the line length, causing the curve to approximate a semi-circle. For self-referencing links (source equal to target) the curve is represented as a loop around the node, with length proportional to the curvature value.
- `linkDesc` (String; optional): For VR only. Link object accessor function or attribute for description (shown under label).
- `linkDirectionalArrowColor` (String; optional): Link object accessor function or attribute for the color of the arrow head.
- `linkDirectionalArrowLength` (Real | String; optional): Link object accessor function, attribute or a numeric constant for the length of the arrow head indicating the link directionality. The arrow is displayed directly over the link line, and points in the direction of source > target. A value of 0 hides the arrow.
- `linkDirectionalArrowRelPos` (Real | String; optional): Link object accessor function, attribute or a numeric constant for the longitudinal position of the arrow head along the link line, expressed as a ratio between 0 and 1, where 0 indicates immediately next to the source node, 1 next to the target node, and 0.5 right in the middle.
- `linkDirectionalArrowResolution` (Real; optional): Geometric resolution of the arrow head, expressed in how many slice segments to divide the cone base circumference. Higher values yield smoother arrows.
- `linkDirectionalParticleColor` (String; optional): Link object accessor function or attribute for the directional particles color.
- `linkDirectionalParticleResolution` (Real; optional): Geometric resolution of each 3D directional particle, expressed in how many slice segments to divide the circumference. Higher values yield smoother particles.
- `linkDirectionalParticleSpeed` (Real | String; optional): Link object accessor function, attribute or a numeric constant for the directional particles speed, expressed as the ratio of the link length to travel per frame. Values above 0.5 are discouraged.
- `linkDirectionalParticleWidth` (Real | String; optional): Link object accessor function, attribute or a numeric constant for the directional particles width. Values are rounded to the nearest decimal for indexing purposes.
- `linkDirectionalParticles` (Real | String; optional): Link object accessor function, attribute or a numeric constant for the number of particles (small spheres) to display over the link line. The particles are distributed equi-spaced along the line, travel in the direction source > target, and can be used to indicate link directionality.
- `linkHoverPrecision` (Real; optional): Whether to display the link label when gazing the link closely (low value) or from far away (high value).
- `linkId` (String; optional): The link attribute containing the unique link id
- `linkIdsHighlightUser` (Array of Strings; optional): ids of highlighted links (through search)
- `linkIdsInvisibleAuto` (Array of Strings; optional)
- `linkIdsInvisibleUser` (Array of Strings; optional): ids of visible links
- `linkLabel` (String; optional): Link object accessor function or attribute for name (shown in label). Supports plain text or HTML content (except in VR).
- `linkOpacity` (Real; optional): Line opacity of links, between [0,1]. 3D, VR, AR
- `linkResolution` (Real; optional): Geometric resolution of each link 3D line, expressed in how many radial segments to divide the cylinder. Higher values yield smoother cylinders. Applicable only to links with positive width. 3D, VR, AR
- `linkRightClicked` (Dict; optional): right-clicked link
- `linkRightClickedViewpointCoordinates` (Dict with Strings as keys and values of type Real; optional)
- `linkSource` (String; optional): Link object accessor attribute referring to id of source node.
- `linkTarget` (String; optional): Link object accessor attribute referring to id of target node.
- `linkWidth` (Real | String; optional): Link object accessor function, attribute or a numeric constant for the link line width.
- `linksSelected` (Array of Dicts; optional): selected (clicked) links
- `maxDepth_neighbours_select` (Real; optional): max levels of neighbourhood selection around a node by repeat clicking
- `maxZoom` (Real; optional)
- `minZoom` (Real; optional): ids of links highlighted due to being dragged
- `n_linkRightClicks` (Real; optional)
- `n_nodeRightClicks` (Real; optional)
- `ngraphPhysics` (Dict; optional): Specify custom physics configuration for ngraph, according to its configuration object syntax. Only applicable if using the ngraph simulation engine.
- `nodeAutoColorBy` (String; optional): Node object accessor function or attribute to automatically group colors by. Only affects nodes without a color attribute.
- `nodeClicked` (Dict; optional): left-clicked node
- `nodeColor` (String; optional): The node attribute whose value should be used for coloring nodes
- `nodeCoordinates` (String | Array of Reals; optional): Ratio of node circle area (square px) [2D] or sphere volume (cubic px) [3D] per value unit.
- `nodeDesc` (String; optional): For VR only. Node object accessor function or attribute for description (shown under label).
- `nodeIcon` (String; optional): The node attribute containing object with icon to display for each individual node.
- `nodeIconSizeFactor` (Real; optional): controls nodeIcon size, relative to nodeRelSize
- `nodeId` (String; optional): Node object accessor attribute for unique node id (used in link objects source/target).
- `nodeIdsHighlightUser` (Array of Strings; optional): ids of highlighted nodes (through search)
- `nodeIdsInvisibleAuto` (Array of Strings; optional): ids of visible nodes. Not to be supplied by user. Available to allow for saving state
- `nodeIdsInvisibleUser` (Array of Strings; optional): ids of invisible nodes supplied by user as prop
- `nodeImg` (String; optional): The node attribute containing url to image to display for each individual node
- `nodeImgSizeFactor` (Real; optional): controls nodeImg size, reltive to nodeRelSize
- `nodeLabel` (String; optional): Node object accessor function or attribute for name (shown in label). Supports plain text or HTML content (except in VR).
2D, 3D and VR
- `nodeLabelRelSize` (Real; optional): controls node label size
- `nodeOpacity` (Real; optional): Nodes sphere opacity, between [0,1]. 3D, VR, AR
- `nodeRelSize` (Real; optional): Ratio of node circle area (square px) [2D] or sphere volume (cubic px) [3D] per value unit.
- `nodeResolution` (Real; optional): Geometric resolution of each node's sphere, expressed in how many slice segments to divide the circumference. Higher values yield smoother spheres. Only applicable to 3D modes.
3D, VR, AR
- `nodeRightClicked` (Dict; optional): right-clicked node
- `nodeRightClickedViewpointCoordinates` (Dict with Strings as keys and values of type Real; optional): screen coordinates of right-clicked node
- `nodeTextAutoColor` (Bool; optional): Automatically color node text with inverse of backgroundColor
- `nodeTextColor` (String; optional): Node text color
- `nodeVal` (Real | String; optional): Ratio of node circle area (square px) [2D] or sphere volume (cubic px) [3D] per value unit.
- `nodeZoomId` (String; optional): id of node to zoom to
- `nodesSelected` (Array of Dicts; optional): selected (clicked) nodes
- `numDimensions` (Real; optional): Not applicable to 2D mode. Number of dimensions to run the force simulation on. 3D, VR, AR
- `pauseAnimation` (Bool; optional): Pauses the rendering cycle of the component, effectively freezing the current view and cancelling all user interaction. This method can be used to save performance in circumstances when a static image is sufficient.
- `pixelUnitRatio` (Real; optional): pixelUnitRatio: if node attribute (in some unit of measurement) is used as coordinates, pixel:unit scale
- `refresh` (Bool; optional): Redraws all the nodes/links. 3D, VR, AR
- `rendererConfig` (Dict; optional): Configuration parameters to pass to the ThreeJS WebGLRenderer constructor. This prop only has an effect on component mount. 3D only
- `scripts` (Array of Strings; optional)
- `showCoordinates` (Bool; optional): showCoordinates: whether or not to show pointer coordinates in hover tooltip (not yet used)
- `size` (Dict; optional): provided react-sizeme. Contains an object with "width" and "height" attributes
- `sortRels1Descend` (Bool; optional): sort in descending order?
- `sortRels2Descend` (Bool; optional): sort in descending order?
- `sortRelsBy1` (String; optional): in zoom view, node attribute to sort relations by first
- `sortRelsBy2` (String; optional): in zoom view, node attribute to sort relations by after first sort
- `sortRoleplayers1Descend` (Bool; optional): sort in descending order?
- `sortRoleplayers2Descend` (Bool; optional): sort in descending order?
- `sortRoleplayersBy1` (String; optional): in zoom view, node attribute to sort role players by first
- `sortRoleplayersBy2` (String; optional): in zoom view, node attribute to sort role players by after first sort
- `updateNeighbours` (Bool; optional)
- `useCoordinates` (Bool; optional): useCoordinates: whether to set nodeCoordinates for node coordinates
- `warmupTicks` (Real; optional): Number of layout engine cycles to dry-run at ignition before starting to render.
- `zoom` (Array of Reals; optional): Calls zoom() method. ([number], [ms])
- `zoomToFit` (Real; optional)
"""
function dash_graph2d(; kwargs...)
        available_props = Symbol[:id, :active, :backgroundColor, :centerAtZoom, :controlType, :cooldownTicks, :cooldownTime, :currentZoomPan, :emitParticle, :enableNavigationControls, :enableNodeDrag, :enablePointerInteraction, :enableZoomPanInteraction, :externalobjectInput, :externalobject_source, :fixNodes, :forceEngine, :forceRefresh, :getGraphBbox, :graphData, :heightRatio, :key, :linkAutoColor, :linkAutoColorBy, :linkClicked, :linkColor, :linkCurvature, :linkDesc, :linkDirectionalArrowColor, :linkDirectionalArrowLength, :linkDirectionalArrowRelPos, :linkDirectionalArrowResolution, :linkDirectionalParticleColor, :linkDirectionalParticleResolution, :linkDirectionalParticleSpeed, :linkDirectionalParticleWidth, :linkDirectionalParticles, :linkHoverPrecision, :linkId, :linkIdsHighlightUser, :linkIdsInvisibleAuto, :linkIdsInvisibleUser, :linkLabel, :linkOpacity, :linkResolution, :linkRightClicked, :linkRightClickedViewpointCoordinates, :linkSource, :linkTarget, :linkWidth, :linksSelected, :maxDepth_neighbours_select, :maxZoom, :minZoom, :n_linkRightClicks, :n_nodeRightClicks, :ngraphPhysics, :nodeAutoColorBy, :nodeClicked, :nodeColor, :nodeCoordinates, :nodeDesc, :nodeIcon, :nodeIconSizeFactor, :nodeId, :nodeIdsHighlightUser, :nodeIdsInvisibleAuto, :nodeIdsInvisibleUser, :nodeImg, :nodeImgSizeFactor, :nodeLabel, :nodeLabelRelSize, :nodeOpacity, :nodeRelSize, :nodeResolution, :nodeRightClicked, :nodeRightClickedViewpointCoordinates, :nodeTextAutoColor, :nodeTextColor, :nodeVal, :nodeZoomId, :nodesSelected, :numDimensions, :pauseAnimation, :pixelUnitRatio, :refresh, :rendererConfig, :scripts, :showCoordinates, :size, :sortRels1Descend, :sortRels2Descend, :sortRelsBy1, :sortRelsBy2, :sortRoleplayers1Descend, :sortRoleplayers2Descend, :sortRoleplayersBy1, :sortRoleplayersBy2, :updateNeighbours, :useCoordinates, :warmupTicks, :zoom, :zoomToFit]
        wild_props = Symbol[]
        return Component("dash_graph2d", "Graph2D", "dash_react_force_graph", available_props, wild_props; kwargs...)
end

