% Auto-generated: do not edit by hand
\name{dashGraph3D}

\alias{dashGraph3D}

\title{Graph3D component}

\description{

}

\usage{
dashGraph3D(id=NULL, graphData=NULL, heightRatio=NULL,
backgroundColor=NULL, width=NULL, nodeRelSize=NULL,
nodeLabel=NULL, nodeLabel_attr_type=NULL,
nodeLabel_attr_supertype=NULL, nodeColor=NULL,
nodeColor_common_type=NULL, nodeColor_common_supertype=NULL,
nodeURL=NULL, nodeURL_attr_type=NULL,
nodeURL_attr_supertype=NULL, nodeAutoColorBy=NULL,
nodeOpacity=NULL, nodeCanvasObjectMode=NULL,
nodeThreeObject=NULL, useNodeIcon=NULL, nodeIcon=NULL,
nodeIcon_attr_type=NULL, nodeIcon_attr_supertype=NULL,
nodeIcon_common_type=NULL, nodeIcon_common_supertype=NULL,
nodeIcon_fontsheets=NULL, useNodeImg=NULL, nodeImg=NULL,
nodeImg_attr_type=NULL, nodeImg_attr_supertype=NULL,
nodeImg_common_type=NULL, nodeImg_common_supertype=NULL,
linkLabel=NULL, linkColor=NULL, linkColor_attr_type=NULL,
linkColor_attr_supertype=NULL, linkAutoColorBy=NULL,
linkOpacity=NULL, linkWidth=NULL, linkCurvature=NULL,
linkThreeObject=NULL, linkThreeObjectExtend=NULL,
linkCanvasObjectMode=NULL, linkDirectionalArrowLength=NULL,
linkDirectionalArrowRelPos=NULL, zoomOut=NULL, center=NULL,
cooldownTime=NULL, d3Force_define=NULL, d3Force_call=NULL,
onNodeClick=NULL, onNodeRightClick=NULL, onNodeHover=NULL,
onLinkClick=NULL, onLinkRightClick=NULL, onLinkHover=NULL,
onBackgroundClick=NULL, onBackgroundRightClick=NULL,
interactive=NULL, enableZoomPanInteraction=NULL,
enableNavigationControls=NULL,
enablePointerInteraction=NULL, enableNodeDrag=NULL,
nodeZoomId=NULL, nodesSelected=NULL, nodeIdsDrag=NULL,
nodeRightClicked=NULL,
nodeRightClickedViewpointCoordinates=NULL,
linksSelected=NULL, linkIdsNodesDrag=NULL, graknStatus=NULL,
maxDepth_neighbours_select=NULL, max_nodes_render=NULL,
size=NULL, externalobject_source=NULL,
externalobject_input=NULL, nodeHovered=NULL,
centreCoordinates=NULL, graphData_changed=NULL,
updated=NULL, nodeIdsHighlight=NULL, nodeIdsVisible=NULL,
linkIdsFilter=NULL, useCoordinates=NULL,
pixelUnitRatio=NULL, showCoordinates=NULL, gravity=NULL,
focused=NULL)
}

\arguments{
\item{id}{Character. The ID used to identify this component in Dash callbacks.}

\item{graphData}{Named list. The data to display. Format {nodes:{}, links:{}}}

\item{heightRatio}{Numeric. }

\item{backgroundColor}{Character. backgroundColor: Getter/setter for the chart background color, default transparent}

\item{width}{Numeric. width: Canvas width, in px.}

\item{nodeRelSize}{Numeric. Ratio of node circle area (square px) per value unit.}

\item{nodeLabel}{Character. The node attribute whose value should be displayed as label}

\item{nodeLabel_attr_type}{List with named elements and values of type character. The node attribute whose value should be displayed as label, by type}

\item{nodeLabel_attr_supertype}{List with named elements and values of type character. The node attribute whose value should be displayed as label, by supertype}

\item{nodeColor}{Character. The node attribute whose value should be used for coloring nodes}

\item{nodeColor_common_type}{List with named elements and values of type character. common node colors by type, overrides nodeColor_common_supertype}

\item{nodeColor_common_supertype}{List with named elements and values of type character. common node colors by supertype (relation, entity, attribute)}

\item{nodeURL}{Character. The node attribute which is activated upon Cmd click}

\item{nodeURL_attr_type}{List with named elements and values of type character. specify node URL attribute by type, override nodeURL_attr_supertype and nodeURL_common_*}

\item{nodeURL_attr_supertype}{List with named elements and values of type character. specify node URL attribute by supertype (relation, entity, attribute), overrides nodeURL_common_*}

\item{nodeAutoColorBy}{Character. The node attribute whose value should be used for coloring nodes}

\item{nodeOpacity}{Numeric. node opacity}

\item{nodeCanvasObjectMode}{Character. when showing nodeThreeObject, keep showing default node object as well as text or image}

\item{nodeThreeObject}{Named list | character. }

\item{useNodeIcon}{Logical. Whether to use nodeIcon*}

\item{nodeIcon}{Character. The node attribute containing url to image to display for each individual node. Takes precedence over nodeIcon_supertype and nodeIcon_type}

\item{nodeIcon_attr_type}{List with named elements and values of type character. specify node image attribute by type, overrides nodeIcon_attr_supertype and nodeIcon_common_*}

\item{nodeIcon_attr_supertype}{List with named elements and values of type character. specify node image attribute by supertype (relation, entity, attribute), overrides nodeIcon_common_*}

\item{nodeIcon_common_type}{List with named elements and values of type list with named elements and values of type character. Common node image by type   overrides nodeIcon_supertype}

\item{nodeIcon_common_supertype}{List with named elements and values of type list with named elements and values of type character. Common node image by supertype (relation, entity, attribute)}

\item{nodeIcon_fontsheets}{Named list. }

\item{useNodeImg}{Logical. Whether to use nodeImg*}

\item{nodeImg}{Character. The node attribute containing url to image to display for each individual node. Takes precedence over nodeIcon_supertype and nodeIcon_type}

\item{nodeImg_attr_type}{List with named elements and values of type character. specify node image attribute by type, overrides nodeImg_attr_supertype and nodeImg_common_*}

\item{nodeImg_attr_supertype}{List with named elements and values of type character. specify node image attribute by supertype (relation, entity, attribute), overrides nodeImg_common_*}

\item{nodeImg_common_type}{List with named elements and values of type character. Common node image by type   overrides nodeImg_supertype}

\item{nodeImg_common_supertype}{List with named elements and values of type character. Common node image by supertype (relation, entity, attribute)}

\item{linkLabel}{Character. The node attribute whose value should be displayed as label}

\item{linkColor}{Character. linkColor}

\item{linkColor_attr_type}{List with named elements and values of type character. }

\item{linkColor_attr_supertype}{List with named elements and values of type character. }

\item{linkAutoColorBy}{Character. autocolor the links by some link attribute}

\item{linkOpacity}{Numeric. opacity, in [0,1]}

\item{linkWidth}{Numeric | character. linkWidth}

\item{linkCurvature}{Numeric | character. linkCurvature}

\item{linkThreeObject}{Named list | character. object to display (instead of normal link)}

\item{linkThreeObjectExtend}{Logical | character. also show normal link}

\item{linkCanvasObjectMode}{Character. }

\item{linkDirectionalArrowLength}{Numeric. link arrow length}

\item{linkDirectionalArrowRelPos}{Numeric. link arrow position}

\item{zoomOut}{Logical. zoom}

\item{center}{Logical. }

\item{cooldownTime}{Numeric. cooldown time}

\item{d3Force_define}{Named list. object to define a new force on the simulation. E.g.
d3Force_define = {
   "name": "charge", // the name to which the force is (to be) assigned
   "force": "strength", // the force, e.g "forceManyBody" or "forceCenter" (omit the 'd3' object) Pass a null value to remove the force from the simulation
   "force_args": [], // arguments to pass to force, e.g. links to forceLink. No functions, e.g. of node, allowed (currently)
}}

\item{d3Force_call}{Named list. object to call a method on an existing simulation force. E.g.
d3Force_call_method = {
   "name": "charge", // the name to which the force is assigned
   "method": "strength", // the name of a method to call on the force
   "method_args": [-50], // array of args to pass to force method}

\item{onNodeClick}{onNodeClick}

\item{onNodeRightClick}{onNodeRightClick}

\item{onNodeHover}{onNodeHover}

\item{onLinkClick}{onLinkClick}

\item{onLinkRightClick}{onLinkRightClick}

\item{onLinkHover}{onLinkHover}

\item{onBackgroundClick}{onBackgroundClick}

\item{onBackgroundRightClick}{onBackgroundRightClick}

\item{interactive}{Logical. toggle with a single control whether graph is interactive}

\item{enableZoomPanInteraction}{Logical. enable zoom and panning? (2D)}

\item{enableNavigationControls}{Logical. enable navigation? (3D)}

\item{enablePointerInteraction}{Logical. enable pointer interaction such as hover, click, drag?}

\item{enableNodeDrag}{Logical. enable node drag? more efficient if false}

\item{nodeZoomId}{Character. id of node to zoom to}

\item{nodesSelected}{List of named lists. }

\item{nodeIdsDrag}{List of characters. }

\item{nodeRightClicked}{Named list. }

\item{nodeRightClickedViewpointCoordinates}{List with named elements and values of type numeric. }

\item{linksSelected}{List of named lists. }

\item{linkIdsNodesDrag}{List of characters. }

\item{graknStatus}{Character. }

\item{maxDepth_neighbours_select}{Numeric. }

\item{max_nodes_render}{Numeric. }

\item{size}{Named list. }

\item{externalobject_source}{Character. }

\item{externalobject_input}{Numeric | character | logical | unnamed list | named list. }

\item{nodeHovered}{Named list. }

\item{centreCoordinates}{List with named elements and values of type numeric. }

\item{graphData_changed}{Logical. }

\item{updated}{Logical. }

\item{nodeIdsHighlight}{List of characters. }

\item{nodeIdsVisible}{List of characters. }

\item{linkIdsFilter}{List of characters. }

\item{useCoordinates}{Logical. useCoordinates: whether to use node attribute to set node coordinates}

\item{pixelUnitRatio}{Numeric. pixelUnitRatio: if node attribute (in some unit of measurement) is used as coordinates, pixel:unit scale}

\item{showCoordinates}{Logical. showCoordinates: whether or not to show pointer coordinates as tooltip (not yet used)}

\item{gravity}{Character. gravity: not yet used, prop to change three gravity. Not used in 2D}

\item{focused}{Logical. focused: whether component is focused}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

