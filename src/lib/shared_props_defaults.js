const objSharedProps = {
    // props include most react-force-graph props (unless handled with internal logic in higher-level component)
    // https://github.com/vasturiano/react-force-graph
    // with additional higher-level props added at the end

    /**
    * data input
    */
    // props
    graphData: {"nodes":[], "links":[]},
    nodeId: "id",
    linkSource : "source",
    linkTarget: "target",

    /**
    * container layout
    */
    // props
    // width: null, // not exposed, responsive to container width
    // height: null, // not exposed, uses heightRatio prop instead
    backgroundColor: "black",
    showNavInfo: true, // 3D and VR
    // yOffset: 1.5, // AR
    // glScale: 200 // AR
    // markerAttrs: { preset: 'hiro' } // AR

    /**
    * node styling
    */
    // props
    nodeRelSize: 4,
    nodeVal:"val",
    nodeLabel: "label",
    // nodeDesc: "desc" // VR only
    // nodeVisibility: True // not exposed, use nodeIdsVisible prop instead
    nodeColor: "color",
    nodeAutoColorBy: "label",
    nodeOpacity:0.75, // 3D, VR, AR only
    nodeResolution: 8, // 3D, VR, AR only
    // nodeCanvasObject: none // 2D, not exposed
    // nodeCanvasObjectMode: "replace", // 2D, not exposed
    // nodeThreeObject: none // 3D, VR, AR, not exposed
    // nodeThreeObjectExtend: true,

    /**
    * link styling
    */
    // props
    linkLabel: "label",
    // linkDesc: "desc", // VR only,
    // linkVisibility: true, // not exposed, use nodeIdsVisible instead
    linkColor: "color",
    linkAutoColorBy:"label",
    linkOpacity:0.2,
    linkLineDash: null, // falsy value disables dashing
    linkWidth:1,
    linkResolution: 6,
    linkCurvature: 0,
    linkCurveRotation: 0, // 3D, VR, AR,
    // linkMaterial: null, // 3D, VR, AR, not exposed
    // linkCanvasObject: null // 2D, not exposed
    // linkCanvasObjectMode: "replace", // 2D, not exposed
    // linkThreeObject: null // 3D, VR, AR, not exposed
    // linkThreeObjectExtend:true, // 3D, VR, AR, not exposed
    // linkPositionUpdate: null, // function, not exposed
    linkDirectionalArrowLength:3,
    linkDirectionalArrowColor:"color",
    linkDirectionalArrowRelPos:0.95,
    linkDirectionalArrowResolution: 8, // 3D, VR, AR
    linkDirectionalParticles: 0,
    linkDirectionalParticleSpeed: 0.01,
    linkDirectionalParticleWidth: 0.5,
    linkDirectionalParticleColor: "color",
    linkDirectionalParticleResolution: 4,
    // methods
    emitParticle: null, // to call the emitParticle method, pass it a link through this prop

    /**
    * Render control
    */
    // props
    rendererConfig:{ antialias: true, alpha: true },
    // onRenderFramePre: null, //TODO not ported (cannot pass methods as arguments to Dash a component)
    // onRenderFramePost: null, //TODO not ported (cannot pass methods as arguments to Dash a component)
    // methods
    pauseAnimation: false, // to call the pauseAnimation method, pass True
    resumeAnimation: false, // to call the resumeAnimation method, pass True
    centerAt: null,// to call the centerAt method, pass a list or tuple ([x], [y], [ms]) (TODO)
    zoom: null, // to call the zoom method, pass a list or tuple ([number], [ms])
    zoomToFit: null,// to call the zoomToFit method, pass a list or tuple ([ms], [px], [nodeFilterFn])
    cameraPosition:	null, // 3D
    // scene: // TODO method
    // camera: // TODO method
    // renderer: // TODO method
    // postProcessingComposer // TODO method
    // mcontrols // TODO method
    refresh: false,

    /**
    * Render control
    */
    // props

    numDimensions: 3, // 3D, VR, AR
    forceEngine: "d3",
    dagMode: null,
    dagModeOn: false,
    dagLevelDistance: null,
    // dagNodeFilter: // Implemented in Higher Order Component
    // onDagError: // implemented in Higher Order Component
    dagNodeIds: [],
    d3AlphaMin: 0,
    d3AlphaDecay: 0.0228,
    d3VelocityDecay: 0.4,
    ngraphPhysics: null,
    warmupTicks: 0,
    cooldownTicks: Infinity,
    cooldownTime: 15000,
    // onEngineTick: // TODO: function
    // onEngineStop: // TODO: function
    // methods
    // d3Force_define: {"name":null, "force":null, "force_args":null},
    // d3Force_call: {"name":null, "method":null, "method_args":null},

    d3ReheatSimulation: false,

    /**
    * interaction
    */
    // onNodeClick // not exposed
    // onNodeRightClick // not exposed
    // onNodeHover // not exposed
    // onNodeCenterHover // not exposed, VR and AR
    // onNodeDrag // not exposed
    // onNodeDragEnd // not exposed
    // onLinkClick // not exposed
    // onLinkRightClick // not exposed
    // onLinkHover // not exposed
    // onLinkCenterHover // not exposed
    // onBackgroundClick // not exposed
    // onBackgroundRightClick // not exposed
    linkHoverPrecision:4,
    // onZoom // TODO: function
    // onZoomEnd // TODO: function
    controlType: "trackball",
    // enableZoomPanInteraction: true, // overridden by 'interactive' parameter
    // enableNavigationControls: true, // overridden by 'interactive' parameter
    // enablePointerInteraction: true, // overridden by 'interactive' parameter
    enableNodeDrag: true, // overridden by 'interactive' parameter

    /**
    * utility
    */
    // methods
    getGraphBbox: false,
    // screen2GraphCoords // not exposed
    // graph2ScreenCoords // not exposed

    /**
    * higher-order props (not in original react component)
    */
    heightRatio: 1,
    size: null,
    active: true,
    // zoomOut: false,
    // center: false,
    graphBbox: null,
    nodeURL: "link",
    useNodeImg: true,
    nodeImg: "img",
    useNodeIcon: true,
    nodeIcon: "icon",
    nodeIcon_fontsheets: {"FontAwesome": "https://kit.fontawesome.com/a6e0eeba63.js"},
    linkId: "id",
    interactive: true,
    updated:false,
    nodeZoomId: null,
    nodesSelected: [],
    nodeIdsDrag: [],
    nodeClicked: null,
    nodeClickedViewpointCoordinates:null,
    nodeRightClicked: null,
    nodeRightClickedViewpointCoordinates:null,
    nodeHovered: null,
    nodeHoveredViewpointCoordinates:null,
    linkClicked:null,
    linkRightClicked:null,
    linksSelected: [],
    linkIdsNodesDrag: [],
    nodeIdsHighlight: [],
    linkIdsHighlight: [],
    nodeIdsVisible: [],
    linkIdsVisible: [],
    externalobject_source: null,
    externalobject_input: null,
    centreCoordinates: {x:300, y:300, z:300}, // just initial values
    useCoordinates: false,
    pixelUnitRatio: null,
    showCoordinates: null,
    gravity: null,
    maxDepth_neighbours_select: 4,
}

export default objSharedProps;
