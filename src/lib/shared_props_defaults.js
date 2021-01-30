//import { none } from "ramda"

const obj_shared_props = {
    // id: "Graph2D",
    graphData: {"nodes":[], "links":[]},

    // Container layout
    backgroundColor: "black",
    heightRatio: 0.85, 

    // node styling
    // nodeRelSize: 4,
    nodeLabel: "name",
    nodeLabel_attr_type: {},
    nodeLabel_attr_supertype: {},

    nodeColor: "__color", 

    nodeColor_common_type: {},
    nodeColor_common_supertype: {},

    nodeAutoColorBy: "__supertype",
    nodeOpacity:0.9,
    
    // nodeCanvasObjectMode:"replace",
    // nodeThreeObjectExtend: true,
    
    // link styling
    linkLabel: "__label",
    linkColor: "#F0FFFF", 
    linkColor_attr_type: {},
    linkColor_attr_supertype: {},

    // Azure //"rgb(150,80,250)",
    linkAutoColorBy:"__label",
    linkOpacity:0.1,
    // linkLineDash: false,
    linkWidth:1, 
    linkCurvature: 0,

    // linkCanvasObjectMode:"replace",
    linkThreeObjectExtend:true,
    
    linkDirectionalArrowLength:3,
    linkDirectionalArrowRelPos:0.95,
    
    // render control
    // zoomToFit:[250,10],
    // zoom:1,
    // centerAt:[0,0,0],
    // Force engine (d3-force) configuration
    cooldownTime:2500,
    // interaction

    interactive: true,
    enableZoomPanInteraction: true,
    enableNavigationControls: true,
    enablePointerInteraction:true,
    enableNodeDrag:true,

    updated:false,
    
    nodeZoomId: null,

    nodesSelected: [],
    nodeIdsHighlightDrag: [],
    // nodeClicked:null
    // click: 0.0,
    // rightClick: 0.0,
    // altClick: 0.0,
    
    //nodeClicked: null,
    nodeRightClicked: null,
    nodeRightClickedViewpointCoordinates:null,
    // nodeShiftClicked: null,
    // nodeAltClicked: null,


    // altClickCoordinates: {x:0, y:0, z:0}, // just initial values

    linksSelected: [],
    linkIdsHighlightDrag: [],
    // linkClicked:null,
    // linkRightClicked: null,
    // linkShiftClicked: null,
    // linkAltClicked: null,

    graknStatus: "off",

    nodeURL: "link",
    nodeURL_attr_type: {},
    nodeURL_attr_supertype: {},

    // nodeIcon
    useNodeIcon: true,
    nodeIcon: "icon",
    nodeIcon_attr_supertype: {},
    nodeIcon_attr_type:{},
    nodeIcon_common_supertype: {},
    nodeIcon_common_type:{
        "org_entity": {"FontAwesome":"\uF1AD"},
        "intermediary": {"FontAwesome":"\uE068"},
        "node-address": {"FontAwesome":"\uF3C5"}, 
        "officer": {"FontAwesome":"\uF508"},  
        "other": {"FontAwesome":"\uF494"},   
    },
    nodeIcon_fontsheets: {"FontAwesome": "https://kit.fontawesome.com/a6e0eeba63.js"},

    // nodeImg
    useNodeImg: true,
    nodeImg: "img",  
    nodeImg_attr_supertype: {},
    nodeImg_attr_type:{},
    nodeImg_common_supertype: {},
    nodeImg_common_type:{},

    maxDepth_neighbours_select: 4,
    // aims to avoid javascript max recursion error,
    
    maxNodesRender:10000,
     
    backgroundImgURL: null,

    nodeHovered: null,
    
    externalobject_source: null,

    externalobject_input: null, 

    centreCoordinates: {x:300, y:300, z:300}, // just initial values

    nodeIdsHighlight: [],

    linkIdsHighlight: [],

    nodeIdsFilter: [],

    linkIdsFilter: [],

    useCoordinates: false,

    pixelUnitRatio: null, 
    
    showCoordinates: null,
    
//    origin: PropTypes.arrayOf(PropTypes.number),

    gravity: null,

    focused: true,

}

export {obj_shared_props}