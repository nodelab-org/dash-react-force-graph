# AUTO GENERATED FILE - DO NOT EDIT

export dash_graph2d

"""
    dash_graph2d(;kwargs...)

A Graph2D component.

Keyword arguments:
- `id` (String; required): The ID used to identify this component in Dash callbacks.
- `graphData` (Dict; required): Graph data structure. Can also be used to apply incremental updates. Format {nodes:{}, links:{}}
- `nodeId` (String; optional): Node object accessor attribute for unique node id (used in link objects source/target).
- `linkSource` (String; optional): Link object accessor attribute referring to id of source node.
- `linkTarget` (String; optional): Link object accessor attribute referring to id of target node.
- `backgroundColor` (String; optional): Getter/setter for the chart background color, default transparent
- `showNavInfo` (Bool; optional): Whether to show the navigation controls footer info.
- `nodeRelSize` (Real; optional): Ratio of node circle area (square px) [2D] or sphere volume (cubic px) [3D] per value unit.
- `nodeVal` (Real | String; optional): Ratio of node circle area (square px) [2D] or sphere volume (cubic px) [3D] per value unit.
- `nodeLabel` (String; optional): Node object accessor function or attribute for name (shown in label). Supports plain text or HTML content (except in VR).
2D, 3D and VR
- `nodeDesc` (String; optional): For VR only. Node object accessor function or attribute for description (shown under label).
- `nodeColor` (String; optional): The node attribute whose value should be used for coloring nodes
- `nodeAutoColorBy` (String; optional): Node object accessor function or attribute to automatically group colors by. Only affects nodes without a color attribute.
- `nodeOpacity` (Real; optional): Nodes sphere opacity, between [0,1]. 3D, VR, AR
- `nodeResolution` (Real; optional): Geometric resolution of each node's sphere, expressed in how many slice segments to divide the circumference. Higher values yield smoother spheres. Only applicable to 3D modes.
3D, VR, AR
- `linkLabel` (String; optional): Link object accessor function or attribute for name (shown in label). Supports plain text or HTML content (except in VR).
- `linkDesc` (String; optional): For VR only. Link object accessor function or attribute for description (shown under label).
- `linkColor` (String; optional): Link object accessor function or attribute for line color.
- `linkAutoColorBy` (String; optional): Link object accessor function or attribute to automatically group colors by. Only affects links without a color attribute.
- `linkOpacity` (Real; optional): Line opacity of links, between [0,1]. 3D, VR, AR
- `linkLineDash` (Real | String; optional): Link object accessor function, attribute or number array (e.g. [5, 15]) to determine if a line dash should be applied to this rendered link. Refer to the HTML canvas setLineDash API for example values. Either a falsy value or an empty array will disable dashing.
- `linkWidth` (Real | String; optional): Link object accessor function, attribute or a numeric constant for the link line width.
- `linkResolution` (Real; optional): Geometric resolution of each link 3D line, expressed in how many radial segments to divide the cylinder. Higher values yield smoother cylinders. Applicable only to links with positive width. 3D, VR, AR
- `linkCurvature` (Real | String; optional): Link object accessor function, attribute or a numeric constant for the curvature radius of the link line. A value of 0 renders a straight line. 1 indicates a radius equal to half of the line length, causing the curve to approximate a semi-circle. For self-referencing links (source equal to target) the curve is represented as a loop around the node, with length proportional to the curvature value.
- `linkCurveRotation` (Real | String; optional): Link object accessor function, attribute or a numeric constant for the rotation along the line axis to apply to the curve. Has no effect on straight lines. At 0 rotation, the curve is oriented in the direction of the intersection with the XY plane. The rotation angle (in radians) will rotate the curved line clockwise around the "start-to-end" axis from this reference orientation.
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
- `resumeAnimation` (Bool; optional): Resumes the rendering cycle of the component, and re-enables the user interaction. This method can be used together with pauseAnimation for performance optimization purposes.
- `centerAt` (Array; optional): Set the coordinates of the center of the viewport. This method can be used to perform panning on the 2D canvas programmatically. Each of the x, y coordinates is optional, allowing for motion in just one dimension. An optional 3rd argument defines the duration of the transition (in ms) to animate the canvas motion.
- `zoom` (Array; optional): Set the 2D canvas zoom amount. The zoom is defined in terms of the scale transform of each px. A value of 1 indicates unity, larger values zoom in and smaller values zoom out. An optional 2nd argument defines the duration of the transition (in ms) to animate the canvas motion. By default the zoom is set to a value inversely proportional to the amount of nodes in the system.
- `zoomToFit` (Array; optional): Automatically zooms/pans the canvas so that all of the nodes fit inside it. If no nodes are found no action is taken. It accepts two optional arguments: the first defines the duration of the transition (in ms) to animate the canvas motion (default: 0ms). The second argument is the amount of padding (in px) between the edge of the canvas and the outermost node (default: 10px). The third argument specifies a custom node filter: node => <boolean>, which should return a truthy value if the node is to be included. This can be useful for focusing on a portion of the graph. 2D, 3D
- `cameraPosition` (Array; optional): Re-position the camera, in terms of x, y, z coordinates. Each of the coordinates is optional, allowing for motion in just some dimensions. The optional second argument can be used to define the direction that the camera should aim at, in terms of an {x,y,z} point in the 3D space. The 3rd optional argument defines the duration of the transition (in ms) to animate the camera motion. A value of 0 (default) moves the camera immediately to the final position. By default the camera will face the center of the graph at a z distance proportional to the amount of nodes in the system. 3D
- `refresh` (Bool; optional): Redraws all the nodes/links. 3D, VR, AR
- `numDimensions` (Real; optional): Not applicable to 2D mode. Number of dimensions to run the force simulation on. 3D, VR, AR
- `forceEngine` (String; optional): Which force-simulation engine to use (d3 or ngraph).
- `dagMode` (String; optional): Apply layout constraints based on the graph directionality. Only works correctly for DAG graph structures (without cycles). Choice between td (top-down), bu (bottom-up), lr (left-to-right), rl (right-to-left), zout (near-to-far), zin (far-to-near), radialout (outwards-radially) or radialin (inwards-radially).
- `dagLevelDistance` (Real; optional): If dagMode is engaged, this specifies the distance between the different graph depths.
- `d3AlphaMin` (Real; optional): Sets the simulation alpha min parameter. Only applicable if using the d3 simulation engine.
- `d3AlphaDecay` (Real; optional): Sets the simulation intensity decay parameter. Only applicable if using the d3 simulation engine.
- `d3VelocityDecay` (Real; optional): Nodes' velocity decay that simulates the medium resistance. Only applicable if using the d3 simulation engine.
- `ngraphPhysics` (Dict; optional): Specify custom physics configuration for ngraph, according to its configuration object syntax. Only applicable if using the ngraph simulation engine.
- `warmupTicks` (Real; optional): Number of layout engine cycles to dry-run at ignition before starting to render.
- `cooldownTicks` (Real; optional): How many build-in frames to render before stopping and freezing the layout engine.
- `cooldownTime` (Real; optional): How long (ms) to render for before stopping and freezing the layout engine.
- `d3ReheatSimulation` (Bool; optional): Reheats the force simulation engine, by setting the alpha value to 1. Only applicable if using the d3 simulation engine.
- `linkHoverPrecision` (Real; optional): Whether to display the link label when gazing the link closely (low value) or from far away (high value).
- `controlType` (String; optional): Which type of control to use to control the camera on 3D mode. Choice between trackball, orbit or fly.
- `enableNodeDrag` (Bool; optional): Whether to enable the user interaction to drag nodes by click-dragging. If enabled, every time a node is dragged the simulation is re-heated so the other nodes react to the changes. Only applicable if enablePointerInteraction is true.
- `getGraphBbox` (Bool; optional): Returns the current bounding box of the nodes in the graph, formatted as { x: [<num>, <num>], y: [<num>, <num>], z: [<num>, <num>] }. If no nodes are found, returns null. Accepts an optional argument to define a custom node filter: node => <boolean>, which should return a truthy value if the node is to be included. This can be useful to calculate the bounding box of a portion of the graph.
Bounding box is saved as the graphBbox prop
- `heightRatio` (Real; optional): height of component as proportion of container
- `size` (Dict; optional): provided react-sizeme. Contains an object with "width" and "height" attributes
- `active` (Bool; optional): whether or not session is active. Used to enable or disable warning browser dialog when closing
- `nodeURL` (String; optional): The node attribute containing a URL
- `useNodeImg` (Bool; optional): Whether or not to use the nodeImg. Overrides nodeIcon
- `nodeImg` (String; optional): The node attribute containing url to image to display for each individual node
- `useNodeIcon` (Bool; optional): Whether or not to use the nodeIcon
- `nodeIcon` (String; optional): The node attribute containing object with icon to display for each individual node.
- `nodeIcon_fontsheets` (Dict; optional): object with keys being fonts (string) and values being CSS sheets
- `linkId` (String; optional): The link attribute containing the unique link id
- `interactive` (Bool; optional): toggle enableZoomPanInteraction, enablePointerInteraction, enableNavigationControls with a single control
- `updated` (Bool; optional): whether or not graphData has changed. Internally, sets interactive to False until (mainly used internally)
- `nodeZoomId` (String; optional): id of node to zoom to
- `nodesSelected` (Array of Dicts; optional): selected (clicked) nodes
- `nodeIdsDrag` (Array of Strings; optional): ids of nodes highlighted due to being dragged
- `nodeClicked` (Dict; optional): clicked node
- `nodeClickedViewpointCoordinates` (Dict with Strings as keys and values of type Real; optional): screen coordinates of clicked node
- `nodeRightClicked` (Dict; optional): right-clicked node
- `nodeRightClickedViewpointCoordinates` (Dict with Strings as keys and values of type Real; optional): screen coordinates of right-clicked node
- `nodeHovered` (Dict; optional): the currently hovered node
- `nodeHoveredViewpointCoordinates` (Dict with Strings as keys and values of type Real; optional): screen coordinates of hovered node
- `linkClicked` (Dict; optional): clicked link
- `linkRightClicked` (Dict; optional): right-clicked link
- `linkHovered` (Dict; optional): hovered link
- `linksSelected` (Array of Dicts; optional): selected (clicked) links
- `linkIdsNodesDrag` (Array of Strings; optional): ids of links highlighted due to being dragged
- `nodeIdsHighlight` (Array of Strings; optional): ids of highlighted nodes (through searcha)
- `nodeIdsVisible` (Array of Strings; optional): ids of visible nodes
- `linkIdsVisible` (Array of Strings; optional): ids of visible links
- `externalobject_source` (String; optional): externalobject_source:
- `externalobject_input` (Real | String | Bool | Array | Dict; optional): externalobject_source:
- `centreCoordinates` (Dict with Strings as keys and values of type Real; optional): origin coordinates
- `useCoordinates` (Bool; optional): useCoordinates: whether to use node attribute to set node coordinates
- `pixelUnitRatio` (Real; optional): pixelUnitRatio: if node attribute (in some unit of measurement) is used as coordinates, pixel:unit scale
- `showCoordinates` (Bool; optional): showCoordinates: whether or not to show pointer coordinates as tooltip (not yet used)
- `gravity` (String; optional): gravity: not yet used, prop to change three gravity. Not used in 2D
- `maxDepth_neighbours_select` (Real; optional): max levels of neighbourhood selection around a node by repeat clicking
"""
function dash_graph2d(; kwargs...)
        available_props = Symbol[:id, :graphData, :nodeId, :linkSource, :linkTarget, :backgroundColor, :showNavInfo, :nodeRelSize, :nodeVal, :nodeLabel, :nodeDesc, :nodeColor, :nodeAutoColorBy, :nodeOpacity, :nodeResolution, :linkLabel, :linkDesc, :linkColor, :linkAutoColorBy, :linkOpacity, :linkLineDash, :linkWidth, :linkResolution, :linkCurvature, :linkCurveRotation, :linkDirectionalArrowLength, :linkDirectionalArrowColor, :linkDirectionalArrowRelPos, :linkDirectionalArrowResolution, :linkDirectionalParticles, :linkDirectionalParticleSpeed, :linkDirectionalParticleWidth, :linkDirectionalParticleColor, :linkDirectionalParticleResolution, :emitParticle, :rendererConfig, :pauseAnimation, :resumeAnimation, :centerAt, :zoom, :zoomToFit, :cameraPosition, :refresh, :numDimensions, :forceEngine, :dagMode, :dagLevelDistance, :d3AlphaMin, :d3AlphaDecay, :d3VelocityDecay, :ngraphPhysics, :warmupTicks, :cooldownTicks, :cooldownTime, :d3ReheatSimulation, :linkHoverPrecision, :controlType, :enableNodeDrag, :getGraphBbox, :heightRatio, :size, :active, :nodeURL, :useNodeImg, :nodeImg, :useNodeIcon, :nodeIcon, :nodeIcon_fontsheets, :linkId, :interactive, :updated, :nodeZoomId, :nodesSelected, :nodeIdsDrag, :nodeClicked, :nodeClickedViewpointCoordinates, :nodeRightClicked, :nodeRightClickedViewpointCoordinates, :nodeHovered, :nodeHoveredViewpointCoordinates, :linkClicked, :linkRightClicked, :linkHovered, :linksSelected, :linkIdsNodesDrag, :nodeIdsHighlight, :nodeIdsVisible, :linkIdsVisible, :externalobject_source, :externalobject_input, :centreCoordinates, :useCoordinates, :pixelUnitRatio, :showCoordinates, :gravity, :maxDepth_neighbours_select]
        wild_props = Symbol[]
        return Component("dash_graph2d", "Graph2D", "dash_react_force_graph", available_props, wild_props; kwargs...)
end

