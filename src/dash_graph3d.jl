# AUTO GENERATED FILE - DO NOT EDIT

export dash_graph3d

"""
    dash_graph3d(;kwargs...)

A Graph3D component.

Keyword arguments:
- `id` (String; optional): The ID used to identify this component in Dash callbacks.
- `graphData` (Dict; required): The data to display. Format {nodes:{}, links:{}}
- `heightRatio` (Real; optional)
- `backgroundColor` (String; optional): backgroundColor: Getter/setter for the chart background color, default transparent
- `width` (Real; optional): width: Canvas width, in px.
- `nodeRelSize` (Real; optional): Ratio of node circle area (square px) per value unit.
- `nodeLabel` (String; optional): The node attribute whose value should be displayed as label
- `nodeLabel_attr_type` (Dict with Strings as keys and values of type String; optional): The node attribute whose value should be displayed as label, by type
- `nodeLabel_attr_supertype` (Dict with Strings as keys and values of type String; optional): The node attribute whose value should be displayed as label, by supertype
- `nodeColor` (String; optional): The node attribute whose value should be used for coloring nodes
- `nodeColor_common_type` (Dict with Strings as keys and values of type String; optional): common node colors by type, overrides nodeColor_common_supertype
- `nodeColor_common_supertype` (Dict with Strings as keys and values of type String; optional): common node colors by supertype (relation, entity, attribute)
- `nodeURL` (String; optional): The node attribute which is activated upon Cmd click
- `nodeURL_attr_type` (Dict with Strings as keys and values of type String; optional): specify node URL attribute by type, override nodeURL_attr_supertype and nodeURL_common_*
- `nodeURL_attr_supertype` (Dict with Strings as keys and values of type String; optional): specify node URL attribute by supertype (relation, entity, attribute), overrides nodeURL_common_*
- `nodeAutoColorBy` (String; optional): The node attribute whose value should be used for coloring nodes
- `nodeOpacity` (Real; optional): node opacity
- `nodeCanvasObjectMode` (String; optional): when showing nodeThreeObject, keep showing default node object as well as text or image
- `nodeThreeObject` (Dict | String; optional)
- `useNodeIcon` (Bool; optional): Whether to use nodeIcon*
- `nodeIcon` (String; optional): The node attribute containing url to image to display for each individual node. Takes precedence over nodeIcon_supertype and nodeIcon_type
- `nodeIcon_attr_type` (Dict with Strings as keys and values of type String; optional): specify node image attribute by type, overrides nodeIcon_attr_supertype and nodeIcon_common_*
- `nodeIcon_attr_supertype` (Dict with Strings as keys and values of type String; optional): specify node image attribute by supertype (relation, entity, attribute), overrides nodeIcon_common_*
- `nodeIcon_common_type` (Dict with Strings as keys and values of type Dict with Strings as keys and values of type String; optional): Common node image by type   overrides nodeIcon_supertype
- `nodeIcon_common_supertype` (Dict with Strings as keys and values of type Dict with Strings as keys and values of type String; optional): Common node image by supertype (relation, entity, attribute)
- `nodeIcon_fontsheets` (Dict; optional)
- `useNodeImg` (Bool; optional): Whether to use nodeImg*
- `nodeImg` (String; optional): The node attribute containing url to image to display for each individual node. Takes precedence over nodeIcon_supertype and nodeIcon_type
- `nodeImg_attr_type` (Dict with Strings as keys and values of type String; optional): specify node image attribute by type, overrides nodeImg_attr_supertype and nodeImg_common_*
- `nodeImg_attr_supertype` (Dict with Strings as keys and values of type String; optional): specify node image attribute by supertype (relation, entity, attribute), overrides nodeImg_common_*
- `nodeImg_common_type` (Dict with Strings as keys and values of type String; optional): Common node image by type   overrides nodeImg_supertype
- `nodeImg_common_supertype` (Dict with Strings as keys and values of type String; optional): Common node image by supertype (relation, entity, attribute)
- `linkLabel` (String; optional): The node attribute whose value should be displayed as label
- `linkColor` (String; optional): linkColor
- `linkColor_attr_type` (Dict with Strings as keys and values of type String; optional)
- `linkColor_attr_supertype` (Dict with Strings as keys and values of type String; optional)
- `linkAutoColorBy` (String; optional): autocolor the links by some link attribute
- `linkOpacity` (Real; optional): opacity, in [0,1]
- `linkWidth` (Real | String; optional): linkWidth
- `linkCurvature` (Real | String; optional): linkCurvature
- `linkThreeObject` (Dict | String; optional): object to display (instead of normal link)
- `linkThreeObjectExtend` (Bool | String; optional): also show normal link
- `linkCanvasObjectMode` (String; optional)
- `linkDirectionalArrowLength` (Real; optional): link arrow length
- `linkDirectionalArrowRelPos` (Real; optional): link arrow position
- `zoomOut` (Bool; optional): zoom
- `center` (Bool; optional)
- `cooldownTime` (Real; optional): cooldown time
- `d3Force` (String; optional)
- `interactive` (Bool; optional): toggle with a single control whether graph is interactive
- `enableZoomPanInteraction` (Bool; optional): enable zoom and panning? (2D)
- `enableNavigationControls` (Bool; optional): enable navigation? (3D)
- `enablePointerInteraction` (Bool; optional): enable pointer interaction such as hover, click, drag?
- `enableNodeDrag` (Bool; optional): enable node drag? more efficient if false
- `nodeZoomId` (String; optional): id of node to zoom to
- `nodesSelected` (Array of Dicts; optional)
- `nodeIdsDrag` (Array of Strings; optional)
- `nodeRightClicked` (Dict; optional)
- `nodeRightClickedViewpointCoordinates` (Dict with Strings as keys and values of type Real; optional)
- `linksSelected` (Array of Dicts; optional)
- `linkIdsNodesDrag` (Array of Strings; optional)
- `graknStatus` (String; optional)
- `maxDepth_neighbours_select` (Real; optional)
- `max_nodes_render` (Real; optional)
- `size` (Dict; optional)
- `externalobject_source` (String; optional)
- `externalobject_input` (Real | String | Bool | Array | Dict; optional)
- `nodeHovered` (Dict; optional)
- `centreCoordinates` (Dict with Strings as keys and values of type Real; optional)
- `graphData_changed` (Bool; optional)
- `updated` (Bool; optional)
- `nodeIdsHighlight` (Array of Strings; optional)
- `nodeIdsVisible` (Array of Strings; optional)
- `linkIdsFilter` (Array of Strings; optional)
- `useCoordinates` (Bool; optional): useCoordinates: whether to use node attribute to set node coordinates
- `pixelUnitRatio` (Real; optional): pixelUnitRatio: if node attribute (in some unit of measurement) is used as coordinates, pixel:unit scale
- `showCoordinates` (Bool; optional): showCoordinates: whether or not to show pointer coordinates as tooltip (not yet used)
- `gravity` (String; optional): gravity: not yet used, prop to change three gravity. Not used in 2D
- `focused` (Bool; optional): focused: whether component is focused
"""
function dash_graph3d(; kwargs...)
        available_props = Symbol[:id, :graphData, :heightRatio, :backgroundColor, :width, :nodeRelSize, :nodeLabel, :nodeLabel_attr_type, :nodeLabel_attr_supertype, :nodeColor, :nodeColor_common_type, :nodeColor_common_supertype, :nodeURL, :nodeURL_attr_type, :nodeURL_attr_supertype, :nodeAutoColorBy, :nodeOpacity, :nodeCanvasObjectMode, :nodeThreeObject, :useNodeIcon, :nodeIcon, :nodeIcon_attr_type, :nodeIcon_attr_supertype, :nodeIcon_common_type, :nodeIcon_common_supertype, :nodeIcon_fontsheets, :useNodeImg, :nodeImg, :nodeImg_attr_type, :nodeImg_attr_supertype, :nodeImg_common_type, :nodeImg_common_supertype, :linkLabel, :linkColor, :linkColor_attr_type, :linkColor_attr_supertype, :linkAutoColorBy, :linkOpacity, :linkWidth, :linkCurvature, :linkThreeObject, :linkThreeObjectExtend, :linkCanvasObjectMode, :linkDirectionalArrowLength, :linkDirectionalArrowRelPos, :zoomOut, :center, :cooldownTime, :d3Force, :interactive, :enableZoomPanInteraction, :enableNavigationControls, :enablePointerInteraction, :enableNodeDrag, :nodeZoomId, :nodesSelected, :nodeIdsDrag, :nodeRightClicked, :nodeRightClickedViewpointCoordinates, :linksSelected, :linkIdsNodesDrag, :graknStatus, :maxDepth_neighbours_select, :max_nodes_render, :size, :externalobject_source, :externalobject_input, :nodeHovered, :centreCoordinates, :graphData_changed, :updated, :nodeIdsHighlight, :nodeIdsVisible, :linkIdsFilter, :useCoordinates, :pixelUnitRatio, :showCoordinates, :gravity, :focused]
        wild_props = Symbol[]
        return Component("dash_graph3d", "Graph3D", "dash_react_force_graph", available_props, wild_props; kwargs...)
end

