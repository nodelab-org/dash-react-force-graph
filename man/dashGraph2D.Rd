% Auto-generated: do not edit by hand
\name{dashGraph2D}

\alias{dashGraph2D}

\title{Graph2D component}

\description{

}

\usage{
dashGraph2D(id=NULL, active=NULL, backgroundColor=NULL,
centerAtZoom=NULL, controlType=NULL, cooldownTicks=NULL,
cooldownTime=NULL, currentZoomPan=NULL, emitParticle=NULL,
enableNavigationControls=NULL, enableNodeDrag=NULL,
enablePointerInteraction=NULL,
enableZoomPanInteraction=NULL, externalobjectInput=NULL,
externalobject_source=NULL, fixNodes=NULL, forceEngine=NULL,
forceRefresh=NULL, getGraphBbox=NULL, graphData=NULL,
heightRatio=NULL, key=NULL, linkAutoColor=NULL,
linkAutoColorBy=NULL, linkColor=NULL, linkCurvature=NULL,
linkDesc=NULL, linkDirectionalArrowColor=NULL,
linkDirectionalArrowLength=NULL,
linkDirectionalArrowRelPos=NULL,
linkDirectionalArrowResolution=NULL,
linkDirectionalParticleColor=NULL,
linkDirectionalParticleResolution=NULL,
linkDirectionalParticleSpeed=NULL,
linkDirectionalParticleWidth=NULL,
linkDirectionalParticles=NULL, linkHoverPrecision=NULL,
linkId=NULL, linkIdsHighlightUser=NULL,
linkIdsInvisibleAuto=NULL, linkIdsInvisibleUser=NULL,
linkLabel=NULL, linkLineDash=NULL, linkOpacity=NULL,
linkResolution=NULL, linkRightClicked=NULL,
linkRightClickedViewpointCoordinates=NULL, linkSource=NULL,
linkTarget=NULL, linkWidth=NULL, linksSelected=NULL,
maxDepth_neighbours_select=NULL, maxZoom=NULL, minZoom=NULL,
n_linkRightClicks=NULL, n_nodeRightClicks=NULL,
ngraphPhysics=NULL, nodeAutoColorBy=NULL, nodeClicked=NULL,
nodeColor=NULL, nodeCoordinates=NULL, nodeDesc=NULL,
nodeIcon=NULL, nodeIconSizeFactor=NULL, nodeId=NULL,
nodeIdsHighlightUser=NULL, nodeIdsInvisibleAuto=NULL,
nodeIdsInvisibleUser=NULL, nodeImg=NULL,
nodeImgSizeFactor=NULL, nodeLabel=NULL,
nodeLabelRelSize=NULL, nodeOpacity=NULL, nodeRelSize=NULL,
nodeResolution=NULL, nodeRightClicked=NULL,
nodeRightClickedViewpointCoordinates=NULL,
nodeTextAutoColor=NULL, nodeTextColor=NULL, nodeVal=NULL,
nodeZoomId=NULL, nodesSelected=NULL, numDimensions=NULL,
pauseAnimation=NULL, pixelUnitRatio=NULL, refresh=NULL,
rendererConfig=NULL, scripts=NULL, showCoordinates=NULL,
size=NULL, sortRels1Descend=NULL, sortRels2Descend=NULL,
sortRelsBy1=NULL, sortRelsBy2=NULL,
sortRoleplayers1Descend=NULL, sortRoleplayers2Descend=NULL,
sortRoleplayersBy1=NULL, sortRoleplayersBy2=NULL,
updateNeighbours=NULL, useCoordinates=NULL,
warmupTicks=NULL, zoom=NULL, zoomToFit=NULL)
}

\arguments{
\item{id}{Character. The ID used to identify this component in Dash callbacks.}

\item{active}{Logical. whether or not session is active. Used to enable or disable warning browser dialog when closing}

\item{backgroundColor}{Character. Getter/setter for the canvas background color, default transparent}

\item{centerAtZoom}{List with named elements and values of type numeric. calls centerAt, then zoom. Takes an object with keys "k", "x", "y"}

\item{controlType}{Character. Which type of control to use to control the camera on 3D mode. Choice between trackball, orbit or fly.}

\item{cooldownTicks}{Numeric. How many build-in frames to render before stopping and freezing the layout engine.}

\item{cooldownTime}{Numeric. How long (ms) to render for before stopping and freezing the layout engine.}

\item{currentZoomPan}{Named list. }

\item{emitParticle}{Named list. An alternative mechanism for generating particles, this method emits a non-cyclical single particle within a specific link. The emitted particle shares the styling (speed, width, color) of the regular particle props. A valid link object that is included in graphData should be passed as a single parameter.}

\item{enableNavigationControls}{Logical. Whether to enable the trackball navigation controls used to move the camera using mouse interactions (rotate/zoom/pan).}

\item{enableNodeDrag}{Logical. Whether to enable the user interaction to drag nodes by click-dragging. If enabled, every time a node is dragged the simulation is re-heated so the other nodes react to the changes. Only applicable if enablePointerInteraction is true.}

\item{enablePointerInteraction}{Logical. Whether to enable the mouse tracking events. This activates an internal tracker of the canvas mouse position and enables the functionality of object hover/click and tooltip labels, at the cost of performance. If you're looking for maximum gain in your graph performance it's recommended to switch off this property.}

\item{enableZoomPanInteraction}{Logical. Whether to enable zooming and panning user interactions on a 2D canvas.}

\item{externalobjectInput}{Numeric | character | logical | unnamed list | named list. externalobject_source:}

\item{externalobject_source}{Character. externalobject_source:}

\item{fixNodes}{Logical. Whether to fix node coordinates after simulation has cooled}

\item{forceEngine}{Character. Which force-simulation engine to use (d3 or ngraph).}

\item{forceRefresh}{Numeric. }

\item{getGraphBbox}{Logical. Returns the current bounding box of the nodes in the graph, formatted as { x: [<num>, <num>], y: [<num>, <num>], z: [<num>, <num>] }. 
If no nodes are found, returns null. Accepts an optional argument to define a custom node filter: node => <boolean>, which should return a truthy value if the node is to be included. 
This can be useful to calculate the bounding box of a portion of the graph.
Bounding box is saved as the graphBbox prop}

\item{graphData}{Named list. Graph data structure. Prop which is provided by user.
Can also be used to apply incremental updates. Format {nodes:{}, links:{}}}

\item{heightRatio}{Numeric. height of component as proportion of container}

\item{key}{Character. The key used to identify this component in React}

\item{linkAutoColor}{Logical. Automatically color link with inverse of background color}

\item{linkAutoColorBy}{Character. Link object accessor function or attribute to automatically group colors by. Only affects links without a color attribute.}

\item{linkColor}{Character. String giving link color}

\item{linkCurvature}{Numeric | character. Link object accessor function, attribute or a numeric constant for the curvature radius of the link line. A value of 0 renders a straight line. 1 indicates a radius equal to half of the line length, causing the curve to approximate a semi-circle. For self-referencing links (source equal to target) the curve is represented as a loop around the node, with length proportional to the curvature value.}

\item{linkDesc}{Character. For VR only. Link object accessor function or attribute for description (shown under label).}

\item{linkDirectionalArrowColor}{Character. Link object accessor function or attribute for the color of the arrow head.}

\item{linkDirectionalArrowLength}{Numeric | character. Link object accessor function, attribute or a numeric constant for the length of the arrow head indicating the link directionality. The arrow is displayed directly over the link line, and points in the direction of source > target. A value of 0 hides the arrow.}

\item{linkDirectionalArrowRelPos}{Numeric | character. Link object accessor function, attribute or a numeric constant for the longitudinal position of the arrow head along the link line, expressed as a ratio between 0 and 1, where 0 indicates immediately next to the source node, 1 next to the target node, and 0.5 right in the middle.}

\item{linkDirectionalArrowResolution}{Numeric. Geometric resolution of the arrow head, expressed in how many slice segments to divide the cone base circumference. Higher values yield smoother arrows.}

\item{linkDirectionalParticleColor}{Character. Link object accessor function or attribute for the directional particles color.}

\item{linkDirectionalParticleResolution}{Numeric. Geometric resolution of each 3D directional particle, expressed in how many slice segments to divide the circumference. Higher values yield smoother particles.}

\item{linkDirectionalParticleSpeed}{Numeric | character. Link object accessor function, attribute or a numeric constant for the directional particles speed, expressed as the ratio of the link length to travel per frame. Values above 0.5 are discouraged.}

\item{linkDirectionalParticleWidth}{Numeric | character. Link object accessor function, attribute or a numeric constant for the directional particles width. Values are rounded to the nearest decimal for indexing purposes.}

\item{linkDirectionalParticles}{Numeric | character. Link object accessor function, attribute or a numeric constant for the number of particles (small spheres) to display over the link line. The particles are distributed equi-spaced along the line, travel in the direction source > target, and can be used to indicate link directionality.}

\item{linkHoverPrecision}{Numeric. Whether to display the link label when gazing the link closely (low value) or from far away (high value).}

\item{linkId}{Character. The link attribute containing the unique link id}

\item{linkIdsHighlightUser}{List of characters. ids of highlighted links (through search)}

\item{linkIdsInvisibleAuto}{List of characters. }

\item{linkIdsInvisibleUser}{List of characters. ids of visible links}

\item{linkLabel}{Character. Link object accessor function or attribute for name (shown in label). Supports plain text or HTML content (except in VR).}

\item{linkLineDash}{Numeric | character. Link object accessor function, attribute or number array (e.g. [5, 15]) to determine if a line dash should be applied to this rendered link. Refer to the HTML canvas setLineDash API for example values. Either a falsy value or an empty array will disable dashing.}

\item{linkOpacity}{Numeric. Line opacity of links, between [0,1]. 3D, VR, AR}

\item{linkResolution}{Numeric. Geometric resolution of each link 3D line, expressed in how many radial segments to divide the cylinder. Higher values yield smoother cylinders. Applicable only to links with positive width. 3D, VR, AR}

\item{linkRightClicked}{Named list. right-clicked link}

\item{linkRightClickedViewpointCoordinates}{List with named elements and values of type numeric. }

\item{linkSource}{Character. Link object accessor attribute referring to id of source node.}

\item{linkTarget}{Character. Link object accessor attribute referring to id of target node.}

\item{linkWidth}{Numeric | character. Link object accessor function, attribute or a numeric constant for the link line width.}

\item{linksSelected}{List of named lists. selected (clicked) links}

\item{maxDepth_neighbours_select}{Numeric. max levels of neighbourhood selection around a node by repeat clicking}

\item{maxZoom}{Numeric. }

\item{minZoom}{Numeric. ids of links highlighted due to being dragged}

\item{n_linkRightClicks}{Numeric. }

\item{n_nodeRightClicks}{Numeric. }

\item{ngraphPhysics}{Named list. Specify custom physics configuration for ngraph, according to its configuration object syntax. Only applicable if using the ngraph simulation engine.}

\item{nodeAutoColorBy}{Character. Node object accessor function or attribute to automatically group colors by. Only affects nodes without a color attribute.}

\item{nodeClicked}{Named list. left-clicked node}

\item{nodeColor}{Character. The node attribute whose value should be used for coloring nodes}

\item{nodeCoordinates}{Character | list of numerics. Ratio of node circle area (square px) [2D] or sphere volume (cubic px) [3D] per value unit.}

\item{nodeDesc}{Character. For VR only. Node object accessor function or attribute for description (shown under label).}

\item{nodeIcon}{Character. The node attribute containing object with icon to display for each individual node.}

\item{nodeIconSizeFactor}{Numeric. controls nodeIcon size, relative to nodeRelSize}

\item{nodeId}{Character. Node object accessor attribute for unique node id (used in link objects source/target).}

\item{nodeIdsHighlightUser}{List of characters. ids of highlighted nodes (through search)}

\item{nodeIdsInvisibleAuto}{List of characters. ids of visible nodes. Not to be supplied by user. Available to allow for saving state}

\item{nodeIdsInvisibleUser}{List of characters. ids of invisible nodes supplied by user as prop}

\item{nodeImg}{Character. The node attribute containing url to image to display for each individual node}

\item{nodeImgSizeFactor}{Numeric. controls nodeImg size, reltive to nodeRelSize}

\item{nodeLabel}{Character. Node object accessor function or attribute for name (shown in label). Supports plain text or HTML content (except in VR).
2D, 3D and VR}

\item{nodeLabelRelSize}{Numeric. controls node label size}

\item{nodeOpacity}{Numeric. Nodes sphere opacity, between [0,1]. 3D, VR, AR}

\item{nodeRelSize}{Numeric. Ratio of node circle area (square px) [2D] or sphere volume (cubic px) [3D] per value unit.}

\item{nodeResolution}{Numeric. Geometric resolution of each node's sphere, expressed in how many slice segments to divide the circumference. Higher values yield smoother spheres. Only applicable to 3D modes.
3D, VR, AR}

\item{nodeRightClicked}{Named list. right-clicked node}

\item{nodeRightClickedViewpointCoordinates}{List with named elements and values of type numeric. screen coordinates of right-clicked node}

\item{nodeTextAutoColor}{Logical. Automatically color node text with inverse of backgroundColor}

\item{nodeTextColor}{Character. Node text color}

\item{nodeVal}{Numeric | character. Ratio of node circle area (square px) [2D] or sphere volume (cubic px) [3D] per value unit.}

\item{nodeZoomId}{Character. id of node to zoom to}

\item{nodesSelected}{List of named lists. selected (clicked) nodes}

\item{numDimensions}{Numeric. Not applicable to 2D mode. Number of dimensions to run the force simulation on. 3D, VR, AR}

\item{pauseAnimation}{Logical. Pauses the rendering cycle of the component, effectively freezing the current view and cancelling all user interaction. This method can be used to save performance in circumstances when a static image is sufficient.}

\item{pixelUnitRatio}{Numeric. pixelUnitRatio: if node attribute (in some unit of measurement) is used as coordinates, pixel:unit scale}

\item{refresh}{Logical. Redraws all the nodes/links. 3D, VR, AR}

\item{rendererConfig}{Named list. Configuration parameters to pass to the ThreeJS WebGLRenderer constructor. This prop only has an effect on component mount. 3D only}

\item{scripts}{List of characters. }

\item{showCoordinates}{Logical. showCoordinates: whether or not to show pointer coordinates in hover tooltip (not yet used)}

\item{size}{Named list. provided react-sizeme. Contains an object with "width" and "height" attributes}

\item{sortRels1Descend}{Logical. sort in descending order?}

\item{sortRels2Descend}{Logical. sort in descending order?}

\item{sortRelsBy1}{Character. in zoom view, node attribute to sort relations by first}

\item{sortRelsBy2}{Character. in zoom view, node attribute to sort relations by after first sort}

\item{sortRoleplayers1Descend}{Logical. sort in descending order?}

\item{sortRoleplayers2Descend}{Logical. sort in descending order?}

\item{sortRoleplayersBy1}{Character. in zoom view, node attribute to sort role players by first}

\item{sortRoleplayersBy2}{Character. in zoom view, node attribute to sort role players by after first sort}

\item{updateNeighbours}{Logical. }

\item{useCoordinates}{Logical. useCoordinates: whether to set nodeCoordinates for node coordinates}

\item{warmupTicks}{Numeric. Number of layout engine cycles to dry-run at ignition before starting to render.}

\item{zoom}{List of numerics. Calls zoom() method. ([number], [ms])}

\item{zoomToFit}{Numeric. }
}

\value{named list of JSON elements corresponding to React.js properties and their values}

