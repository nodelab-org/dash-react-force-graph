% Auto-generated: do not edit by hand
\name{dashGraph3D}

\alias{dashGraph3D}

\title{Graph3D component}

\description{

}

\usage{
dashGraph3D(id=NULL, graphData=NULL, nodeId=NULL, linkSource=NULL,
linkTarget=NULL, backgroundColor=NULL, showNavInfo=NULL,
nodeRelSize=NULL, nodeVal=NULL, nodeLabel=NULL,
nodeDesc=NULL, nodeColor=NULL, nodeAutoColorBy=NULL,
nodeOpacity=NULL, nodeResolution=NULL, linkLabel=NULL,
linkDesc=NULL, linkColor=NULL, linkAutoColorBy=NULL,
linkOpacity=NULL, linkLineDash=NULL, linkWidth=NULL,
linkResolution=NULL, linkCurvature=NULL,
linkCurveRotation=NULL, linkDirectionalArrowLength=NULL,
linkDirectionalArrowColor=NULL,
linkDirectionalArrowRelPos=NULL,
linkDirectionalArrowResolution=NULL,
linkDirectionalParticles=NULL,
linkDirectionalParticleSpeed=NULL,
linkDirectionalParticleWidth=NULL,
linkDirectionalParticleColor=NULL,
linkDirectionalParticleResolution=NULL, emitParticle=NULL,
rendererConfig=NULL, pauseAnimation=NULL,
resumeAnimation=NULL, centerAt=NULL, zoom=NULL,
zoomToFit=NULL, cameraPosition=NULL, refresh=NULL,
numDimensions=NULL, forceEngine=NULL, dagMode=NULL,
dagModeOn=NULL, dagLevelDistance=NULL, dagNodeIds=NULL,
d3AlphaMin=NULL, d3AlphaDecay=NULL, d3VelocityDecay=NULL,
ngraphPhysics=NULL, warmupTicks=NULL, cooldownTicks=NULL,
cooldownTime=NULL, d3ReheatSimulation=NULL,
linkHoverPrecision=NULL, controlType=NULL,
enableNodeDrag=NULL, getGraphBbox=NULL, heightRatio=NULL,
size=NULL, active=NULL, nodeURL=NULL, useNodeImg=NULL,
nodeImg=NULL, useNodeIcon=NULL, nodeIcon=NULL,
nodeIcon_fontsheets=NULL, linkId=NULL, interactive=NULL,
nodeZoomId=NULL, sortRelsBy1=NULL, sortRelsBy2=NULL,
sortRoleplayersBy1=NULL, sortRoleplayersBy2=NULL,
sortRels1Descend=NULL, sortRels2Descend=NULL,
sortRoleplayers1Descend=NULL, sortRoleplayers2Descend=NULL,
nodesSelected=NULL, nodeIdsHighlight=NULL,
nodeIdsVisible=NULL, linkIdsHighlight=NULL,
linkIdsVisible=NULL, externalobject_source=NULL,
externalobject_input=NULL, centreCoordinates=NULL,
useCoordinates=NULL, pixelUnitRatio=NULL,
showCoordinates=NULL, gravity=NULL,
maxDepth_neighbours_select=NULL)
}

\arguments{
\item{id}{Character. The ID used to identify this component in Dash callbacks.}

\item{graphData}{Named list. Graph data structure. Can also be used to apply incremental updates. Format {nodes:{}, links:{}}}

\item{nodeId}{Character. Node object accessor attribute for unique node id (used in link objects source/target).}

\item{linkSource}{Character. Link object accessor attribute referring to id of source node.}

\item{linkTarget}{Character. Link object accessor attribute referring to id of target node.}

\item{backgroundColor}{Character. Getter/setter for the chart background color, default transparent}

\item{showNavInfo}{Logical. Whether to show the navigation controls footer info.}

\item{nodeRelSize}{Numeric. Ratio of node circle area (square px) [2D] or sphere volume (cubic px) [3D] per value unit.}

\item{nodeVal}{Numeric | character. Ratio of node circle area (square px) [2D] or sphere volume (cubic px) [3D] per value unit.}

\item{nodeLabel}{Character. Node object accessor function or attribute for name (shown in label). Supports plain text or HTML content (except in VR).
2D, 3D and VR}

\item{nodeDesc}{Character. For VR only. Node object accessor function or attribute for description (shown under label).}

\item{nodeColor}{Character. The node attribute whose value should be used for coloring nodes}

\item{nodeAutoColorBy}{Character. Node object accessor function or attribute to automatically group colors by. Only affects nodes without a color attribute.}

\item{nodeOpacity}{Numeric. Nodes sphere opacity, between [0,1]. 3D, VR, AR}

\item{nodeResolution}{Numeric. Geometric resolution of each node's sphere, expressed in how many slice segments to divide the circumference. Higher values yield smoother spheres. Only applicable to 3D modes.
3D, VR, AR}

\item{linkLabel}{Character. Link object accessor function or attribute for name (shown in label). Supports plain text or HTML content (except in VR).}

\item{linkDesc}{Character. For VR only. Link object accessor function or attribute for description (shown under label).}

\item{linkColor}{Character. Link object accessor function or attribute for line color.}

\item{linkAutoColorBy}{Character. Link object accessor function or attribute to automatically group colors by. Only affects links without a color attribute.}

\item{linkOpacity}{Numeric. Line opacity of links, between [0,1]. 3D, VR, AR}

\item{linkLineDash}{Numeric | character. Link object accessor function, attribute or number array (e.g. [5, 15]) to determine if a line dash should be applied to this rendered link. Refer to the HTML canvas setLineDash API for example values. Either a falsy value or an empty array will disable dashing.}

\item{linkWidth}{Numeric | character. Link object accessor function, attribute or a numeric constant for the link line width.}

\item{linkResolution}{Numeric. Geometric resolution of each link 3D line, expressed in how many radial segments to divide the cylinder. Higher values yield smoother cylinders. Applicable only to links with positive width. 3D, VR, AR}

\item{linkCurvature}{Numeric | character. Link object accessor function, attribute or a numeric constant for the curvature radius of the link line. A value of 0 renders a straight line. 1 indicates a radius equal to half of the line length, causing the curve to approximate a semi-circle. For self-referencing links (source equal to target) the curve is represented as a loop around the node, with length proportional to the curvature value.}

\item{linkCurveRotation}{Numeric | character. Link object accessor function, attribute or a numeric constant for the rotation along the line axis to apply to the curve. Has no effect on straight lines. At 0 rotation, the curve is oriented in the direction of the intersection with the XY plane. The rotation angle (in radians) will rotate the curved line clockwise around the "start-to-end" axis from this reference orientation.}

\item{linkDirectionalArrowLength}{Numeric | character. Link object accessor function, attribute or a numeric constant for the length of the arrow head indicating the link directionality. The arrow is displayed directly over the link line, and points in the direction of source > target. A value of 0 hides the arrow.}

\item{linkDirectionalArrowColor}{Character. Link object accessor function or attribute for the color of the arrow head.}

\item{linkDirectionalArrowRelPos}{Numeric | character. Link object accessor function, attribute or a numeric constant for the longitudinal position of the arrow head along the link line, expressed as a ratio between 0 and 1, where 0 indicates immediately next to the source node, 1 next to the target node, and 0.5 right in the middle.}

\item{linkDirectionalArrowResolution}{Numeric. Geometric resolution of the arrow head, expressed in how many slice segments to divide the cone base circumference. Higher values yield smoother arrows.}

\item{linkDirectionalParticles}{Numeric | character. Link object accessor function, attribute or a numeric constant for the number of particles (small spheres) to display over the link line. The particles are distributed equi-spaced along the line, travel in the direction source > target, and can be used to indicate link directionality.}

\item{linkDirectionalParticleSpeed}{Numeric | character. Link object accessor function, attribute or a numeric constant for the directional particles speed, expressed as the ratio of the link length to travel per frame. Values above 0.5 are discouraged.}

\item{linkDirectionalParticleWidth}{Numeric | character. Link object accessor function, attribute or a numeric constant for the directional particles width. Values are rounded to the nearest decimal for indexing purposes.}

\item{linkDirectionalParticleColor}{Character. Link object accessor function or attribute for the directional particles color.}

\item{linkDirectionalParticleResolution}{Numeric. Geometric resolution of each 3D directional particle, expressed in how many slice segments to divide the circumference. Higher values yield smoother particles.}

\item{emitParticle}{Named list. An alternative mechanism for generating particles, this method emits a non-cyclical single particle within a specific link. The emitted particle shares the styling (speed, width, color) of the regular particle props. A valid link object that is included in graphData should be passed as a single parameter.}

\item{rendererConfig}{Named list. Configuration parameters to pass to the ThreeJS WebGLRenderer constructor. This prop only has an effect on component mount. 3D only}

\item{pauseAnimation}{Logical. Pauses the rendering cycle of the component, effectively freezing the current view and cancelling all user interaction. This method can be used to save performance in circumstances when a static image is sufficient.}

\item{resumeAnimation}{Logical. Resumes the rendering cycle of the component, and re-enables the user interaction. This method can be used together with pauseAnimation for performance optimization purposes.}

\item{centerAt}{Unnamed list. Set the coordinates of the center of the viewport. This method can be used to perform panning on the 2D canvas programmatically. Each of the x, y coordinates is optional, allowing for motion in just one dimension. An optional 3rd argument defines the duration of the transition (in ms) to animate the canvas motion.}

\item{zoom}{Unnamed list. Set the 2D canvas zoom amount. The zoom is defined in terms of the scale transform of each px. A value of 1 indicates unity, larger values zoom in and smaller values zoom out. An optional 2nd argument defines the duration of the transition (in ms) to animate the canvas motion. By default the zoom is set to a value inversely proportional to the amount of nodes in the system.}

\item{zoomToFit}{Unnamed list. Automatically zooms/pans the canvas so that all of the nodes fit inside it. If no nodes are found no action is taken. It accepts two optional arguments: the first defines the duration of the transition (in ms) to animate the canvas motion (default: 0ms). The second argument is the amount of padding (in px) between the edge of the canvas and the outermost node (default: 10px). The third argument specifies a custom node filter: node => <boolean>, which should return a truthy value if the node is to be included. This can be useful for focusing on a portion of the graph. 2D, 3D}

\item{cameraPosition}{Unnamed list. Re-position the camera, in terms of x, y, z coordinates. Each of the coordinates is optional, allowing for motion in just some dimensions. The optional second argument can be used to define the direction that the camera should aim at, in terms of an {x,y,z} point in the 3D space. The 3rd optional argument defines the duration of the transition (in ms) to animate the camera motion. A value of 0 (default) moves the camera immediately to the final position. By default the camera will face the center of the graph at a z distance proportional to the amount of nodes in the system. 3D}

\item{refresh}{Logical. Redraws all the nodes/links. 3D, VR, AR}

\item{numDimensions}{Numeric. Not applicable to 2D mode. Number of dimensions to run the force simulation on. 3D, VR, AR}

\item{forceEngine}{Character. Which force-simulation engine to use (d3 or ngraph).}

\item{dagMode}{Character. Apply layout constraints based on the graph directionality. Only works correctly for DAG graph structures (without cycles). Choice between td (top-down), bu (bottom-up), lr (left-to-right), rl (right-to-left), zout (near-to-far), zin (far-to-near), radialout (outwards-radially) or radialin (inwards-radially).}

\item{dagModeOn}{Logical. Apply layout constraints based on the graph directionality. Only works correctly for DAG graph structures (without cycles). Choice between td (top-down), bu (bottom-up), lr (left-to-right), rl (right-to-left), zout (near-to-far), zin (far-to-near), radialout (outwards-radially) or radialin (inwards-radially).}

\item{dagLevelDistance}{Numeric. If dagMode is engaged, this specifies the distance between the different graph depths.}

\item{dagNodeIds}{List of characters. array of string ids for nodes to include in DAG layout}

\item{d3AlphaMin}{Numeric. Sets the simulation alpha min parameter. Only applicable if using the d3 simulation engine.}

\item{d3AlphaDecay}{Numeric. Sets the simulation intensity decay parameter. Only applicable if using the d3 simulation engine.}

\item{d3VelocityDecay}{Numeric. Nodes' velocity decay that simulates the medium resistance. Only applicable if using the d3 simulation engine.}

\item{ngraphPhysics}{Named list. Specify custom physics configuration for ngraph, according to its configuration object syntax. Only applicable if using the ngraph simulation engine.}

\item{warmupTicks}{Numeric. Number of layout engine cycles to dry-run at ignition before starting to render.}

\item{cooldownTicks}{Numeric. How many build-in frames to render before stopping and freezing the layout engine.}

\item{cooldownTime}{Numeric. How long (ms) to render for before stopping and freezing the layout engine.}

\item{d3ReheatSimulation}{Logical. Reheats the force simulation engine, by setting the alpha value to 1. Only applicable if using the d3 simulation engine.}

\item{linkHoverPrecision}{Numeric. Whether to display the link label when gazing the link closely (low value) or from far away (high value).}

\item{controlType}{Character. Which type of control to use to control the camera on 3D mode. Choice between trackball, orbit or fly.}

\item{enableNodeDrag}{Logical. Whether to enable the user interaction to drag nodes by click-dragging. If enabled, every time a node is dragged the simulation is re-heated so the other nodes react to the changes. Only applicable if enablePointerInteraction is true.}

\item{getGraphBbox}{Logical. Returns the current bounding box of the nodes in the graph, formatted as { x: [<num>, <num>], y: [<num>, <num>], z: [<num>, <num>] }. If no nodes are found, returns null. Accepts an optional argument to define a custom node filter: node => <boolean>, which should return a truthy value if the node is to be included. This can be useful to calculate the bounding box of a portion of the graph.
Bounding box is saved as the graphBbox prop}

\item{heightRatio}{Numeric. height of component as proportion of container}

\item{size}{Named list. provided react-sizeme. Contains an object with "width" and "height" attributes}

\item{active}{Logical. whether or not session is active. Used to enable or disable warning browser dialog when closing}

\item{nodeURL}{Character. The node attribute containing a URL}

\item{useNodeImg}{Logical. Whether or not to use the nodeImg. Overrides nodeIcon}

\item{nodeImg}{Character. The node attribute containing url to image to display for each individual node}

\item{useNodeIcon}{Logical. Whether or not to use the nodeIcon}

\item{nodeIcon}{Character. The node attribute containing object with icon to display for each individual node.}

\item{nodeIcon_fontsheets}{Named list. object with keys being fonts (string) and values being CSS sheets}

\item{linkId}{Character. The link attribute containing the unique link id}

\item{interactive}{Logical. toggle enableZoomPanInteraction, enablePointerInteraction, enableNavigationControls with a single control}

\item{nodeZoomId}{Character. id of node to zoom to}

\item{sortRelsBy1}{Character. in zoom view, node attribute to sort relations by first}

\item{sortRelsBy2}{Character. in zoom view, node attribute to sort relations by after first sort}

\item{sortRoleplayersBy1}{Character. in zoom view, node attribute to sort role players by first}

\item{sortRoleplayersBy2}{Character. in zoom view, node attribute to sort role players by after first sort}

\item{sortRels1Descend}{Logical. sort in descending order?}

\item{sortRels2Descend}{Logical. sort in descending order?}

\item{sortRoleplayers1Descend}{Logical. sort in descending order?}

\item{sortRoleplayers2Descend}{Logical. sort in descending order?}

\item{nodesSelected}{List of named lists. selected (clicked) nodes}

\item{nodeIdsHighlight}{List of characters. ids of highlighted nodes (through searcha)}

\item{nodeIdsVisible}{List of characters. ids of visible nodes}

\item{linkIdsHighlight}{List of characters. ids of highlighted links (through search)}

\item{linkIdsVisible}{List of characters. ids of visible links}

\item{externalobject_source}{Character. externalobject_source:}

\item{externalobject_input}{Numeric | character | logical | unnamed list | named list. externalobject_source:}

\item{centreCoordinates}{List with named elements and values of type numeric. origin coordinates}

\item{useCoordinates}{Logical. useCoordinates: whether to use node attribute to set node coordinates}

\item{pixelUnitRatio}{Numeric. pixelUnitRatio: if node attribute (in some unit of measurement) is used as coordinates, pixel:unit scale}

\item{showCoordinates}{Logical. showCoordinates: whether or not to show pointer coordinates as tooltip (not yet used)}

\item{gravity}{Character. gravity: not yet used, prop to change three gravity. Not used in 2D}

\item{maxDepth_neighbours_select}{Numeric. max levels of neighbourhood selection around a node by repeat clicking}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

