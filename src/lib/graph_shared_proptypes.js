import PropTypes from 'prop-types';

const graphSharedProptypes = {

    /**
     * The ID used to identify this component in Dash callbacks.
     */
    "id": PropTypes.string.isRequired,

    /**
     * Dash-assigned callback that should be called to report property changes
     * to Dash, to make them available for callbacks.
     */
    "setProps": PropTypes.func,

    /**
    * DATA INPUT
    */

    /**
     * Graph data structure. Can also be used to apply incremental updates. Format {nodes:{}, links:{}}
     */
    "graphData": PropTypes.object.isRequired,

    /**
     * Node object accessor attribute for unique node id (used in link objects source/target).
     */
    "nodeId": PropTypes.string,

    /**
     * Link object accessor attribute referring to id of source node.
     */
    "linkSource": PropTypes.string,

    /**
     * Link object accessor attribute referring to id of target node.
     */
    "linkTarget": PropTypes.string,

    /**
     * CONTAINER LAYOUT
     */

    /**
     * Canvas width, in px.
     */
    // width: PropTypes.number,

    /**
     * Canvas heigh, in px.
     */
    // height: PropTypes.number,

    /**
     * Getter/setter for the chart background color, default transparent
     */
    "backgroundColor": PropTypes.string,

    /**
     * Whether to show the navigation controls footer info.
     */
    "showNavInfo": PropTypes.bool,

    /**
     * In AR mode, defines the offset distance above the marker where to place the center coordinates <0,0,0> of the force directed graph. Measured in terms of marker width units.
     */
    // yOffset: PropTypes.number,

    /**
     * In AR mode, defines the translation scale between real world distances and WebGL units, determining the overall size of the graph. Defined in terms of how many GL units fit in a full marker width.
     */
    // glScale: PropTypes.number,

    /**
     * Set of attributes that define the marker where the AR force directed graph is mounted, according to the a-marker specification. This prop only has an effect on component mount.
     */
    // markerAttrs: PropTypes.object,

    /**
     * NODE STYLING
     */

    /**
     *  Ratio of node circle area (square px) [2D] or sphere volume (cubic px) [3D] per value unit.
     */
    "nodeRelSize": PropTypes.number,

    /**
     *  Ratio of node circle area (square px) [2D] or sphere volume (cubic px) [3D] per value unit.
     */
    "nodeVal": PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        //PropTypes.func
    ]),

    /**
     * Node object accessor function or attribute for name (shown in label). Supports plain text or HTML content (except in VR).
     * 2D, 3D and VR
     */
    "nodeLabel":  PropTypes.oneOfType([
        PropTypes.string,
        //PropTypes.func
    ]),

    /**
     * For VR only. Node object accessor function or attribute for description (shown under label).
     */
    "nodeDesc":  PropTypes.oneOfType([
        PropTypes.string,
        // PropTypes.func
    ]),


    /**
     * Node object accessor function, attribute or a boolean constant for whether to display the node.
     */
    // nodeVisibility:  PropTypes.oneOfType([
    //     PropTypes.bool,
    //     PropTypes.string,
    //     PropTypes.func
    // ]),

    /**
     * The node attribute whose value should be used for coloring nodes
     */
    "nodeColor": PropTypes.oneOfType([
        PropTypes.string,
        // PropTypes.func
    ]),

    /**
     * Node object accessor function or attribute to automatically group colors by. Only affects nodes without a color attribute.
     */
    "nodeAutoColorBy": PropTypes.oneOfType([
        PropTypes.string,
    //    PropTypes.func
    ]),


    /**
     * Nodes sphere opacity, between [0,1]. 3D, VR, AR
     */
    "nodeOpacity": PropTypes.number,

    /**
     * Geometric resolution of each node's sphere, expressed in how many slice segments to divide the circumference. Higher values yield smoother spheres. Only applicable to 3D modes.
     * 3D, VR, AR
     */
    "nodeResolution": PropTypes.number,

        /**
     * Callback function for painting a custom 2D canvas object to represent graph nodes. Should use the provided canvas context attribute to perform drawing operations for each node. The callback function will be called for each node at every frame, and has the signature: nodeCanvasObject(<node>, <canvas context>, <current global scale>, <isShadowContext>). 2D
     */
    // nodeCanvasObject: PropTypes.func, // not exposed, handled interally

    /**
     * Node object accessor function or attribute for the custom drawing mode. Use in combination with nodeCanvasObject to specify how to customize nodes painting.
     * Possible values are:
     * replace: the node is rendered using just nodeCanvasObject.
     * before: the node is rendered by invoking nodeCanvasObject and then proceeding with the default node painting.
     * after: nodeCanvasObject is applied after the default node painting takes place.
     * Any other value will be ignored and the default drawing will be applied.
     */
    // nodeCanvasObjectMode: PropTypes.oneOfType([
    //     PropTypes.string,
    //     PropTypes.func
    // ]), // not exposed, handle interally


    /**
     * Node object accessor function or attribute for generating a custom 3d object to render as graph nodes. Should return an instance of ThreeJS Object3d. If a falsy value is returned, the default 3d object type will be used instead for that node.
     */
    // nodeThreeObject: PropTypes.oneOfType([
    //     PropTypes.object,
    //     PropTypes.string,
    //     PropTypes.func
    // ]) // not exposed, handled interally

    /**
     * Node object accessor function, attribute or a boolean value for whether to replace the default node when using a custom nodeThreeObject (false) or to extend it (true).
     */
    // nodeThreeObjectExtend: PropTypes.oneOfType([
    //     PropTypes.bool,
    //     PropTypes.string,
    //     PropTypes.func]), // not exposed, handle interally

        /**
     * LINK STYLING
     */

    /**
     * Link object accessor function or attribute for name (shown in label). Supports plain text or HTML content (except in VR).
     */
    "linkLabel": PropTypes.oneOfType([
        PropTypes.string,
        // PropTypes.func
    ]),

    /**
     * For VR only. Link object accessor function or attribute for description (shown under label).
     */
    "linkDesc": PropTypes.oneOfType([
        PropTypes.string,
        // PropTypes.func
    ]),

    /**
     * Link object accessor function, attribute or a boolean constant for whether to display the link line.
     */
    // linkVisibility: PropTypes.oneOfType([
    //     PropTypes.bool,
    //     PropTypes.string,
    //     //PropTypes.func
    // ]), // not exposed

    /**
     * Link object accessor function or attribute for line color.
     */
    "linkColor": PropTypes.oneOfType([
        PropTypes.string,
    //    PropTypes.func
    ]),

    /**
     * Link object accessor function or attribute to automatically group colors by. Only affects links without a color attribute.
     */
    "linkAutoColorBy": PropTypes.oneOfType([
        PropTypes.string,
    //    PropTypes.func
    ]),

    /**
     * Line opacity of links, between [0,1]. 3D, VR, AR
     */
    "linkOpacity": PropTypes.number,

    /**
     * Link object accessor function, attribute or number array (e.g. [5, 15]) to determine if a line dash should be applied to this rendered link. Refer to the HTML canvas setLineDash API for example values. Either a falsy value or an empty array will disable dashing.
     */
    "linkLineDash": PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    //     PropTypes.func,
    ]),

    /**
     * Link object accessor function, attribute or a numeric constant for the link line width.
     */
    "linkWidth": PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    //    PropTypes.func
    ]),

    /**
     * Geometric resolution of each link 3D line, expressed in how many radial segments to divide the cylinder. Higher values yield smoother cylinders. Applicable only to links with positive width. 3D, VR, AR
     */
    "linkResolution": PropTypes.number,

        /**
     * Link object accessor function, attribute or a numeric constant for the curvature radius of the link line. A value of 0 renders a straight line. 1 indicates a radius equal to half of the line length, causing the curve to approximate a semi-circle. For self-referencing links (source equal to target) the curve is represented as a loop around the node, with length proportional to the curvature value.
     */
    "linkCurvature": PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    //    PropTypes.func
    ]),

    /**
     * Link object accessor function, attribute or a numeric constant for the rotation along the line axis to apply to the curve. Has no effect on straight lines. At 0 rotation, the curve is oriented in the direction of the intersection with the XY plane. The rotation angle (in radians) will rotate the curved line clockwise around the "start-to-end" axis from this reference orientation.
     */
    "linkCurveRotation": PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    //    PropTypes.func
    ]),


    /**
     * Link object accessor function or attribute for specifying a custom material to style the graph links with. Should return an instance of ThreeJS Material. If a falsy value is returned, the default material will be used instead for that link.
     */
    // linkMaterial: PropTypes.oneOfType([
    //     PropTypes.string,
    // //    PropTypes.func
    // ]), // not exposed

    /**
     * Callback function for painting a custom canvas object to represent graph links. Should use the provided canvas context attribute to perform drawing operations for each link. The callback function will be called for each link at every frame, and has the signature: .linkCanvasObject(<link>, <canvas context>, <current global scale>). 2D
     */
    // linkCanvasObject: PropTypes.func // not exposed

    /**
     * Link object accessor function or attribute for the custom drawing mode. Use in combination with linkCanvasObject to specify how to customize links painting. Possible values are:
     * replace: the link is rendered using just linkCanvasObject.
     * before: the link is rendered by invoking linkCanvasObject and then proceeding with the default link painting.
     * after: linkCanvasObject is applied after the default link painting takes place.
     * Any other value will be ignored and the default drawing will be applied. 	✔️
     */
    // linkCanvasObjectMode: PropTypes.oneOfType([
    //     PropTypes.string,
    //     PropTypes.func,
    // ]), // not exposed

    /**
     * Link object accessor function or attribute for generating a custom 3d object to render as graph links. Should return an instance of ThreeJS Object3d. If a falsy value is returned, the default 3d object type will be used instead for that link. 3D, VR, AR
     */
    // linkThreeObject: PropTypes.oneOfType([
    //     PropTypes.string,
    //     PropTypes.func,
    // ]), // not exposed

    /**
     * Link object accessor function, attribute or a boolean value for whether to replace the default link when using a custom linkThreeObject (false) or to extend it (true).
     */
    // linkThreeObjectExtend: PropTypes.oneOfType([
    //     PropTypes.bool,
    //     PropTypes.string,
    //     PropTypes.func,
    // ]), // not exposed

    /**
     * Custom function to call for updating the position of links at every render iteration. It receives the respective link ThreeJS Object3d, the start and end coordinates of the link ({x,y,z} each), and the link's data. If the function returns a truthy value, the regular position update function will not run for that link.
     */
    // linkPositionUpdate: PropTypes.object,

    /**
     * Link object accessor function, attribute or a numeric constant for the length of the arrow head indicating the link directionality. The arrow is displayed directly over the link line, and points in the direction of source > target. A value of 0 hides the arrow.
     */
    "linkDirectionalArrowLength": PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        //     PropTypes.func,
        ]),


    /**
     * Link object accessor function or attribute for the color of the arrow head.
     */
    "linkDirectionalArrowColor": PropTypes.oneOfType([
        PropTypes.string,
    //     PropTypes.func,
    ]),

    /**
    * Link object accessor function, attribute or a numeric constant for the longitudinal position of the arrow head along the link line, expressed as a ratio between 0 and 1, where 0 indicates immediately next to the source node, 1 next to the target node, and 0.5 right in the middle.
    */
    "linkDirectionalArrowRelPos": PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    //     PropTypes.func,
    ]),

    /**
    * Geometric resolution of the arrow head, expressed in how many slice segments to divide the cone base circumference. Higher values yield smoother arrows.
    */
    "linkDirectionalArrowResolution": PropTypes.number,


    /**
    * Link object accessor function, attribute or a numeric constant for the number of particles (small spheres) to display over the link line. The particles are distributed equi-spaced along the line, travel in the direction source > target, and can be used to indicate link directionality.
    */
    "linkDirectionalParticles": PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    // PropTypes.func,
    ]),

    /**
    * Link object accessor function, attribute or a numeric constant for the directional particles speed, expressed as the ratio of the link length to travel per frame. Values above 0.5 are discouraged.
    */
    "linkDirectionalParticleSpeed": PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    // PropTypes.func,
    ]),

    /**
    * Link object accessor function, attribute or a numeric constant for the directional particles width. Values are rounded to the nearest decimal for indexing purposes.
    */
    "linkDirectionalParticleWidth": PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    // PropTypes.func,
    ]),

    /**
    * Link object accessor function or attribute for the directional particles color.
    */
    "linkDirectionalParticleColor": PropTypes.oneOfType([
    PropTypes.string,
    // PropTypes.func,
    ]),

    /**
    * Geometric resolution of each 3D directional particle, expressed in how many slice segments to divide the circumference. Higher values yield smoother particles.
    */
    "linkDirectionalParticleResolution": PropTypes.number,

    // METHODS
    /**
    * An alternative mechanism for generating particles, this method emits a non-cyclical single particle within a specific link. The emitted particle shares the styling (speed, width, color) of the regular particle props. A valid link object that is included in graphData should be passed as a single parameter.
    */
    "emitParticle": PropTypes.object,

    /**
    * RENDER CONTROL
    */

    /**
    * Configuration parameters to pass to the ThreeJS WebGLRenderer constructor. This prop only has an effect on component mount. 3D only
    */
    "rendererConfig": PropTypes.object,

    /**
    * Callback function to invoke at every frame, immediately before any node/link is rendered to the canvas. This can be used to draw additional external items on the canvas. The canvas context and the current global scale are included as parameters: .onRenderFramePre(<canvas context>, <global scale>).
    */
    // onRenderFramePre: PropTypes.func, // not exposed

        /**
    * Callback function to invoke at every frame, immediately after the last node/link is rendered to the canvas. This can be used to draw additional external items on the canvas. The canvas context and the current global scale are included as parameters: .onRenderFramePre(<canvas context>, <global scale>).
    */
    // onRenderFramePost: PropTypes.func, // not exposed

    // METHODS

    /**
    * Pauses the rendering cycle of the component, effectively freezing the current view and cancelling all user interaction. This method can be used to save performance in circumstances when a static image is sufficient.
    */
    "pauseAnimation": PropTypes.bool,

    /**
    * Resumes the rendering cycle of the component, and re-enables the user interaction. This method can be used together with pauseAnimation for performance optimization purposes.
    */
    "resumeAnimation": PropTypes.bool,

    /**
    * Set the coordinates of the center of the viewport. This method can be used to perform panning on the 2D canvas programmatically. Each of the x, y coordinates is optional, allowing for motion in just one dimension. An optional 3rd argument defines the duration of the transition (in ms) to animate the canvas motion.
    */
    "centerAt": PropTypes.array,

    /**
    * Set the 2D canvas zoom amount. The zoom is defined in terms of the scale transform of each px. A value of 1 indicates unity, larger values zoom in and smaller values zoom out. An optional 2nd argument defines the duration of the transition (in ms) to animate the canvas motion. By default the zoom is set to a value inversely proportional to the amount of nodes in the system.
    */
    "zoom": PropTypes.array,

    /**
    * Automatically zooms/pans the canvas so that all of the nodes fit inside it. If no nodes are found no action is taken. It accepts two optional arguments: the first defines the duration of the transition (in ms) to animate the canvas motion (default: 0ms). The second argument is the amount of padding (in px) between the edge of the canvas and the outermost node (default: 10px). The third argument specifies a custom node filter: node => <boolean>, which should return a truthy value if the node is to be included. This can be useful for focusing on a portion of the graph. 2D, 3D
    */
    "zoomToFit": PropTypes.array,

    /**
    * Re-position the camera, in terms of x, y, z coordinates. Each of the coordinates is optional, allowing for motion in just some dimensions. The optional second argument can be used to define the direction that the camera should aim at, in terms of an {x,y,z} point in the 3D space. The 3rd optional argument defines the duration of the transition (in ms) to animate the camera motion. A value of 0 (default) moves the camera immediately to the final position. By default the camera will face the center of the graph at a z distance proportional to the amount of nodes in the system. 3D
    */
    "cameraPosition": PropTypes.array,

    /**
    * Access the internal ThreeJS Scene.
    */
    // scene:  // not exposed

    /**
    * Access the internal ThreeJS Camera.
    */
    // camera:  // not exposed

    /**
    * Access the internal ThreeJS WebGL renderer.
    */
    // renderer:  // not exposed

    /**
    * Access the post-processing composer. Use this to add post-processing rendering effects to the scene. By default the composer has a single pass (RenderPass) that directly renders the scene without any effects.
    */
    // postProcessingComposer: // not exposed

    /**
    * Access the internal ThreeJS controls object.
    */
    // controls: // not exposed

    /**
    * Redraws all the nodes/links. 3D, VR, AR
    */
    "refresh": PropTypes.bool,

    /**
    * FORCE ENGINGE CONFIGURATION
    */

    /**
    * Not applicable to 2D mode. Number of dimensions to run the force simulation on. 3D, VR, AR
    */
    "numDimensions": PropTypes.number,

    /**
    * Which force-simulation engine to use (d3 or ngraph).
    */
    "forceEngine": PropTypes.string,

    /**
    * Apply layout constraints based on the graph directionality. Only works correctly for DAG graph structures (without cycles). Choice between td (top-down), bu (bottom-up), lr (left-to-right), rl (right-to-left), zout (near-to-far), zin (far-to-near), radialout (outwards-radially) or radialin (inwards-radially).
    */
    "dagMode": PropTypes.string,

    /**
    * If dagMode is engaged, this specifies the distance between the different graph depths.
    */
    "dagLevelDistance": PropTypes.number,

    /**
    * Node accessor function to specify nodes to ignore during the DAG layout processing. This accessor method receives a node object and should return a boolean value indicating whether the node is to be included. Excluded nodes will be left unconstrained and free to move in any direction.
    */
    // dagNodeFilter: PropTypes.func, // not exposed

    /**
    * Callback to invoke if a cycle is encountered while processing the data structure for a DAG layout. The loop segment of the graph is included for information, as an array of node ids. By default an exception will be thrown whenever a loop is encountered. You can override this method to handle this case externally and allow the graph to continue the DAG processing. Strict graph directionality is not guaranteed if a loop is encountered and the result is a best effort to establish a hierarchy.
    */
    // onDagError: PropTypes.func,

    /**
    * Sets the simulation alpha min parameter. Only applicable if using the d3 simulation engine.
    */
    "d3AlphaMin": PropTypes.number,

    /**
    * Sets the simulation intensity decay parameter. Only applicable if using the d3 simulation engine.
    */
    "d3AlphaDecay": PropTypes.number,

    /**
    * Nodes' velocity decay that simulates the medium resistance. Only applicable if using the d3 simulation engine.
    */
    "d3VelocityDecay": PropTypes.number,

    /**
    * Specify custom physics configuration for ngraph, according to its configuration object syntax. Only applicable if using the ngraph simulation engine.
    */
    "ngraphPhysics": PropTypes.object,

    /**
    * Number of layout engine cycles to dry-run at ignition before starting to render.
    */
    "warmupTicks": PropTypes.number,

    /**
    * How many build-in frames to render before stopping and freezing the layout engine.
    */
    "cooldownTicks": PropTypes.number,

    /**
     * How long (ms) to render for before stopping and freezing the layout engine.
     */
    "cooldownTime": PropTypes.number,

    /**
     * Callback function invoked at every tick of the simulation engine.
     */
    // onEngineTick: PropTypes.func, // not exposed

    /**
     * Callback function invoked when the simulation engine stops and the layout is frozen.
     */
    // onEngineStop: PropTypes.func, // not exposed

    /**
     * d3Force
     * Access to the internal forces that control the d3 simulation engine. Follows the same interface as d3-force-3d's simulation.force. Three forces are included by default: 'link' (based on forceLink), 'charge' (based on forceManyBody) and 'center' (based on forceCenter). Each of these forces can be reconfigured, or new forces can be added to the system. Only applicable if using the d3 simulation engine.
     * See details at https://github.com/vasturiano/react-force-graph
     * For examples, search https://github.com/vasturiano for .d3Force and look in code
     *
     * In react-force-graph, three forces are included by default: 'link' (based on forceLink), 'charge' (based on forceManyBody) and 'center' (based on forceCenter).
     *
     * In this dash-react-force-graph component, the user can acccess the d3Force method via the two different props below:
     */

        /**
     *  object to define a new force on the simulation. E.g.
     * d3Force_define = {
     *    "name": "charge", // the name to which the force is (to be) assigned
     *    "force": "strength", // the force, e.g "forceManyBody" or "forceCenter" (omit the 'd3' object) Pass a null value to remove the force from the simulation
     *    "force_args": [], // arguments to pass to force, e.g. links to forceLink. No functions, e.g. of node, allowed (currently)
     * }
     */

    "d3Force_define": PropTypes.object,

        /**
     * object to call a method on an existing simulation force. E.g.
     * d3Force_call_method = {
     *    "name": "charge", // the name to which the force is assigned
     *    "method": "strength", // the name of a method to call on the force
     *    "method_args": [-50], // array of args to pass to force method
     *
     */

    "d3Force_call": PropTypes.object,

    /**
     * Reheats the force simulation engine, by setting the alpha value to 1. Only applicable if using the d3 simulation engine.
     */
    "d3ReheatSimulation": PropTypes.bool,

    /**
     * INTERACTION
     */

    /**
    * Callback function for node (left-button) clicks. The node object and the event object are included as arguments onNodeClick(node, event). 2D and 3D
    */
    // onNodeClick: PropTypes.func, // not exposed

    /**
    * Callback function for node right-clicks. The node object and the event object are included as arguments onNodeRightClick(node, event).
    */
    // onNodeRightClick: PropTypes.func, // not exposed

    /**
    * Callback function for node mouse over events. The node object (or null if there's no node under the mouse line of sight) is included as the first argument, and the previous node object (or null) as second argument: onNodeHover(node, prevNode).
    */
    // onNodeHover: PropTypes.func, // not exposed

    /**
    * For VR/AR only. Callback function for node hover events at the center of the viewport. The node object (or null if there's no node under the mouse line of sight) is included as the first argument, and the previous node object (or null) as second argument: onNodeCenterHover(node, prevNode).
    */
    // onNodeCenterHover: PropTypes.func, // not exposed

    /**
    * Callback function for node drag interactions. This function is invoked repeatedly while dragging a node, every time its position is updated. The node object is included as the first argument, and the change in coordinates since the last iteration of this function are included as the second argument in format {x,y,z}: onNodeDrag(node, translate).
    */
    // onNodeDrag: PropTypes.func, // not exposed

    /**
    * Callback function for the end of node drag interactions. This function is invoked when the node is released. The node object is included as the first argument, and the change in coordinates from the node's initial postion are included as the second argument in format {x,y,z}: onNodeDragEnd(node, translate).
    */
    // onNodeDragEnd: PropTypes.func, // not exposed

    /**
    * Callback function for link (left-button) clicks. The link object and the event object are included as arguments onLinkClick(link, event).
    */
    // onLinkClick: PropTypes.func, // not exposed

    /**
    * Callback function for link right-clicks. The link object and the event object are included as arguments onLinkRightClick(link, event).
    */
    // onLinkRightClick: PropTypes.func, // not exposed

    /**
    * Callback function for link mouse over events. The link object (or null if there's no link under the mouse line of sight) is included as the first argument, and the previous link object (or null) as second argument: onLinkHover(link, prevLink).
    */
    // onLinkHover: PropTypes.func, // not exposed

    /**
    * For VR/AR only. Callback function for link hover events at the center of the viewport. The link object (or null if there's no link under the mouse line of sight) is included as the first argument, and the previous link object (or null) as second argument: onLinkCenterHover(link, prevLink).
    */
    // onLinkCenterHover: PropTypes.func, // not exposed

    /**
    * Callback function for click events on the empty space between the nodes and links. The event object is included as single argument onBackgroundClick(event). 2D, 3D
    */
    // onBackgroundClick: PropTypes.func, // not exposed

    /**
    * Callback function for right-click events on the empty space between the nodes and links. The event object is included as single argument onBackgroundRightClick(event).
    */
    // onBackgroundRightClick: PropTypes.func, // not exposed

    /**
    * Whether to display the link label when gazing the link closely (low value) or from far away (high value).
    */
    "linkHoverPrecision": PropTypes.number,

    /**
    * Callback function for zoom/pan events. The current zoom transform is included as single argument onZoom({ k, x, y }). Note that onZoom is triggered by user interaction as well as programmatic zooming/panning with zoom() and centerAt(). 2D
    */
    // onZoom: PropTypes.func, // not exposed

    /**
    * Callback function for on 'end' of zoom/pan events. The current zoom transform is included as single argument onZoomEnd({ k, x, y }). Note that onZoomEnd is triggered by user interaction as well as programmatic zooming/panning with zoom() and centerAt().
    */
    // onZoomEnd: PropTypes.func, // not exposed

    /**
    * Which type of control to use to control the camera on 3D mode. Choice between trackball, orbit or fly.
    */
    "controlType": PropTypes.string,

    /**
    * Whether to enable zooming and panning user interactions on a 2D canvas.
    */
    // enableZoomPanInteraction: PropTypes.bool, overridden by 'interactive' parameter

    /**
     * Whether to enable the trackball navigation controls used to move the camera using mouse interactions (rotate/zoom/pan).
     */
    // enableNavigationControls:PropTypes.bool, overridden by 'interactive' parameter

    /**
     * Whether to enable the mouse tracking events. This activates an internal tracker of the canvas mouse position and enables the functionality of object hover/click and tooltip labels, at the cost of performance. If you're looking for maximum gain in your graph performance it's recommended to switch off this property.
     */
    // enablePointerInteraction:PropTypes.bool, overridden by 'interactive' parameter

    /**
    * Whether to enable the user interaction to drag nodes by click-dragging. If enabled, every time a node is dragged the simulation is re-heated so the other nodes react to the changes. Only applicable if enablePointerInteraction is true.
    */
    "enableNodeDrag": PropTypes.bool,

    /**
    * UTILITY
    */

    /**
    * Returns the current bounding box of the nodes in the graph, formatted as { x: [<num>, <num>], y: [<num>, <num>], z: [<num>, <num>] }. If no nodes are found, returns null. Accepts an optional argument to define a custom node filter: node => <boolean>, which should return a truthy value if the node is to be included. This can be useful to calculate the bounding box of a portion of the graph.
    * Bounding box is saved as the graphBbox prop
    */
    "getGraphBbox": PropTypes.bool,

    /**
    * Utility method to translate viewport coordinates to the graph domain. Given a pair of x,y screen coordinates, returns the current equivalent {x, y} in the domain of graph node coordinates. 2D
    */
    // screen2GraphCoords: , // not exposed

    /**
    * Utility method to translate node coordinates to the viewport domain. Given a set of x,y(,z) graph coordinates, returns the current equivalent {x, y} in viewport coordinates. 2D, 3D
    */
    // graph2ScreenCoords: , // not exposed

    /**
    * HIGHER-ORDER COMPONENT PROPS (NOT IN ORIGINAL REACT COMPONENT)
    */

    /**
    * height of component as proportion of container
    */
    "heightRatio": PropTypes.number,

    /**
    * provided react-sizeme. Contains an object with "width" and "height" attributes
    */
    "size": PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.object]),


    /**
    * whether or not session is active. Used to enable or disable warning browser dialog when closing
    */
    "active": PropTypes.bool,

    /**
    * set to True to zoom out
    */
    // zoomOut: PropTypes.bool,

    /**
    * set to True to pan to center
    */
    // center: PropTypes.bool,

    /**
     * The node attribute containing a URL
     */
    "nodeURL": PropTypes.string,

    /**
    * Whether or not to use the nodeImg. Overrides nodeIcon
    */
    "useNodeImg": PropTypes.bool,

    /**
    * The node attribute containing url to image to display for each individual node
    */
    "nodeImg": PropTypes.string,

    /**
    * Whether or not to use the nodeIcon
    */
    "useNodeIcon": PropTypes.bool,

    /**
    * The node attribute containing object with icon to display for each individual node.
    */
    "nodeIcon": PropTypes.string,

    /**
    * object with keys being fonts (string) and values being CSS sheets
    */
    "nodeIcon_fontsheets": PropTypes.object,

    /**
    * The link attribute containing the unique link id
    */
    "linkId": PropTypes.string,

    /**
    * toggle enableZoomPanInteraction, enablePointerInteraction, enableNavigationControls with a single control
    */
    "interactive": PropTypes.bool,

    /**
    * whether or not graphData has changed. Internally, sets interactive to False until (mainly used internally)
    */
    "updated": PropTypes.bool,

    /**
    * id of node to zoom to
    */
    "nodeZoomId": PropTypes.string,

    /**
    * selected (clicked) nodes
    */
    "nodesSelected": PropTypes.arrayOf(
        PropTypes.object
    ),

    /**
    * ids of nodes highlighted due to being dragged
    */
    "nodeIdsDrag": PropTypes.arrayOf(
        PropTypes.string
    ),

    /**
    * clicked node
    */
    "nodeClicked": PropTypes.object,

    /**
    *  screen coordinates of clicked node
    */
    "nodeClickedViewpointCoordinates": PropTypes.objectOf(PropTypes.number),

    /**
    * right-clicked node
    */
    "nodeRightClicked": PropTypes.object,

    /**
    *  screen coordinates of right-clicked node
    */
    "nodeRightClickedViewpointCoordinates": PropTypes.objectOf(PropTypes.number),

    /**
    * the currently hovered node
    */
    "nodeHovered": PropTypes.object,

    /**
    *  screen coordinates of hovered node
    */
    "nodeHoveredViewpointCoordinates": PropTypes.objectOf(PropTypes.number),

    /**
    * clicked link
    */
    "linkClicked": PropTypes.object,

    /**
    * right-clicked link
    */
    "linkRightClicked": PropTypes.object,

    /**
    * hovered link
    */
    "linkHovered": PropTypes.object,

    /**
    *  selected (clicked) links
    */
    "linksSelected": PropTypes.arrayOf(
        PropTypes.object
    ),

    /**
    * ids of links highlighted due to being dragged
    */
    "linkIdsNodesDrag": PropTypes.arrayOf(
        PropTypes.string
    ),


    /**
    * ids of highlighted nodes (through searcha)
    */
    "nodeIdsHighlight": PropTypes.arrayOf(PropTypes.string),

    /**
     * ids of visible nodes
     */
    "nodeIdsVisible": PropTypes.arrayOf(PropTypes.string),

    /**
     * ids of visible links
     */
    "linkIdsVisible": PropTypes.arrayOf(PropTypes.string),

    /**
    * externalobject_source:
    */
    "externalobject_source": PropTypes.string,

    /**
    * externalobject_source:
    */
    "externalobject_input": PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.bool,
        PropTypes.array,
        PropTypes.object]),

    /**
    * origin coordinates
    */
    "centreCoordinates": PropTypes.objectOf(PropTypes.number),

    /**
    * useCoordinates: whether to use node attribute to set node coordinates
    */
    "useCoordinates": PropTypes.bool,

    /**
    * pixelUnitRatio: if node attribute (in some unit of measurement) is used as coordinates, pixel:unit scale
    */
    "pixelUnitRatio": PropTypes.number,

    /**
    * showCoordinates: whether or not to show pointer coordinates as tooltip (not yet used)
    */
    "showCoordinates": PropTypes.bool,

    /**
    * gravity: not yet used, prop to change three gravity. Not used in 2D
    */
    "gravity": PropTypes.string,

    /**
    * max levels of neighbourhood selection around a node by repeat clicking
    */
    "maxDepth_neighbours_select": PropTypes.number,

};

export default graphSharedProptypes;