/* eslint-disable max-lines */
/* eslint-disable no-ternary */
/* eslint-disable no-nested-ternary */
/* eslint-disable sort-imports */
/* eslint-disable capitalized-comments */
import {ForceGraph2D} from "react-force-graph";
import {cloneDeep} from "lodash";
import {forceRadial} from "d3-force";
import DatGui, {
    // DatBoolean,
    DatButton,
    // DatColor,
    DatFolder,
    DatNumber
    // DatSelect
} from "react-dat-gui";
import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import validateColor from "validate-color";
// import importScript from "../customHooks/importScript.js";

// const script = document.createElement('script');
// script.src = "https://kit.fontawesome.com/a6e0eeba63.js";
// script.async = true;
// document.body.appendChild(script);

// import {forceCenter, forceManyBody, forceLink, forceRadial} from "d3";

// import * as material_UI from '@material-ui/icon_s';
// doesn't work: Module not found: Error: Can't resolve '@material-ui/icons' in '/Users/rkm916/Sync/projects/2020-dashforcegraph/src/lib/components'

// See https://stackoverflow.com/questions/42051588/wildcard-or-asterisk-vs-named-or-selective-import-es6-javascript

import {invert, lighten, saturate, transparentize} from "polished";
import {withSize} from "react-sizeme";
import objSharedProps from "../shared_props_defaults.js";
import "react-dat-gui/dist/index.css";

// window.onload = function () {
//     var span = document.createElement('span');
  
//     // span.className = 'fas';
//     span.className = 'fas';
//     span.style.display = 'none';
//     document.body.insertBefore(span, document.body.firstChild);
    
//     alert(window.getComputedStyle(span, null).getPropertyValue('font-family'));
      
//     document.body.removeChild(span);
// };

/* eslint-enable sort-imports */

// Use react resize-me to make canvas container width responsive
const withSizeHOC = withSize({
    "monitorHeight": false,
    "monitorWidth": true,
    "noPlaceholder": true
});
/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
/* eslint-disable func-style */

// const filterObject = (obj, keyPredicate) => {

//     const result = {};

//     for (const key in obj) {

//         if (keyPredicate(key)) {

//             result[key] = obj[key];

//         }

//     }

//     return result;

// }; 

const MAX_COOLDOWNTIME_MS = 3000

/* eslint-disable complexity */
function Graph2D (props) {

    // Initialise props that can be changed from within component as state
    /* eslint-disable one-var */
    const [
        [
            graphDataNodes,
            setGraphDataNodes
        ],
        [
            forceRefreshCount,
            setForceRefreshCount
        ],
        [
            zoomToFitCount,
            setZoomToFitCount
        ],
        // [
        //     nodeRelSize,
        //     setNodeRelSize
        // ],
        // [
        //     nodeIconRelSize,
        //     setNodeIconRelSize
        // ],
        // [
        //     nodeImgRelSize,
        //     setNodeImgRelSize
        // ],
        // [
        //     nodeLabelRelSize,
        //     setNodeLabelRelSize
        // ],
        // [
        //     useNodeImg,
        //     setUseNodeImg
        // ],
        // [
        //     useNodeIcon,
        //     setUseNodeIcon
        // ],
        // [
        //     linkCurvature,
        //     setLinkCurvature
        // ],
        [
            nodesById,
            setNodesById
        ],
        [
            nodeIdsDrag,
            setNodeIdsDrag
        ],
        [
            linkIdsNodesDrag,
            setLinkIdsNodesDrag
        ],
        [
            nodeZoomId,
            setNodeZoomId
        ],
        [
            refreshNodeZoom,
            setRefreshNodeZoom
        ],
        [
            nodePreviousFCoordinatesById,
            setNodePreviousFCoordinatesById
        ],
        [
            nodeIdsInvisibleAuto,
            setNodeIdsInvisibleAuto
        ],
        [
            linkIdsInvisibleAuto,
            setLinkIdsInvisibleAuto
        ],
        [
            nodeIdsHighlight,
            setNodeIdsHighlight
        ],
        [
            linkIdsHighlight,
            setLinkIdsHighlight
        ],
        [
            graphDataIdsAll,
            setGraphDataIdsAll
        ],
        [
            guiSettings,
            setGuiSettings
        ],
        fgRef
    ] = [
        useState([]),
        useState(0),
        useState(0),
        // useState(props.nodeRelSize),
        // useState(props.nodeIconRelSize),
        // useState(props.nodeImgRelSize),
        // useState(props.nodeLabelRelSize),
        // useState(props.useNodeImg),
        // useState(props.useNodeIcon),
        // useState(props.linkCurvature),
        useState(null),
        useState([]),
        useState([]),
        useState(null),
        useState(0),
        useState(null),
        useState([]),
        useState([]),
        useState([]),
        useState([]),
        useState({
            "links": new Set(),
            "nodes": new Set()
        }),
        useState({
            "center": 0.52,
            "charge": -45,
            "link": 70,
            // "linkCurvature": props.linkCurvature,
            // "nodeLabelRelSize": props.nodeLabelRelSize,
            // "nodeRelSize": props.nodeRelSize,
            "radial": 0.00,
            // "useNodeIcon": props.useNodeIcon,
            // "useNodeImg": props.useNodeImg
        }),
        useRef(null)
    ];

    // [
        // "https://kit.fontawesome.com/a6e0eeba63.js",
        // "https://kit.fontawesome.com/1b79b43068.js",
        // '../../../assets/scripts/solid.js',
        // '../../../assets/scripts/brands.js',
        // '../../../assets/scripts/fontawesome.js'
    //     // '../../../node_modules/@fortawesome/fontawesome-free/js/solid.js',
    //     // '../../../node_modules/@fortawesome/fontawesome-free/js/brands.js',
    //     // We recommend referencing the fontawesome.js loader last.
    //     // https://fontawesome.com/docs/web/setup/host-yourself/svg-js
    //     // '../../../node_modules/@fortawesome/fontawesome-free/js/fontawesome.js'
    // ].map((script) => importScript(script));

    /* eslint-enable one-var */
    // Import scripts https://fontawesome.com/kits/a6e0eeba63/use?welcome=yes
    // if (props.scripts) {

    //     props.scripts.map((script) => importScript(script));

    // }
    // importScript("https://fontawesome.com/kits/a6e0eeba63")

    useEffect(
        () => {

            /**
             * Add radial force
             * https://github.com/vasturiano/3d-force-graph/issues/228#
             */

            if (fgRef &&
                fgRef.current) {

                // console.log("useEffect: add radial force");

                fgRef.current.d3Force(
                    "radial",
                    forceRadial()
                        .radius(0)
                        .strength(0.01)
                );

                // Math.pow(Math.sqrt(node.x)+Math.sqrt(node.y),2)/2

                // Add negative charge and lower effective distance
                const [
                    newStrength,
                    newDistMax
                ] = [
                    -40,
                    200
                ];

                fgRef.current.d3Force("charge")
                    .strength(newStrength)
                    .distanceMax(newDistMax);

            }

        },
        []
    );


    // Update current state with changes from controls
    /* eslint-disable one-var */
    const handleUpdate = (newData) => setGuiSettings({...guiSettings,
        ...newData});
    /* eslint-enable one-var */


    // useEffect(
    //     () => {

    //         if (nodeRelSize !== null &&
    //             guiSettings.nodeRelSize !== nodeRelSize) {

    //             // console.log("useEffect: nodeRelSize");

    //             setNodeRelSize((_nrz) => guiSettings.nodeRelSize);
    //             setNodeIconRelSize((_nirz) => guiSettings.nodeRelSize * 2);
    //             setNodeImgRelSize((_nirz) => guiSettings.nodeRelSize * 2);

    //         }

    //     },
    //     [guiSettings.nodeRelSize]
    // );


    // useEffect(
    //     () => {

    //         if (nodeLabelRelSize !== null &&
    //             guiSettings.nodeLabelRelSize !== nodeLabelRelSize) {

    //             // console.log("useEffect: nodeLabelRelSize");

    //             setNodeLabelRelSize((_nlrz) => guiSettings.nodeLabelRelSize);

    //         }

    //     },
    //     [guiSettings.nodeLabelRelSize]
    // );


    // useEffect(
    //     () => {

    //         if (linkCurvature !== null && guiSettings.linkCurvature !== linkCurvature) {

    //             // console.log("useEffect: linkCurvature");

    //             setLinkCurvature((_lcur) => guiSettings.linkCurvature);

    //         }

    //     },
    //     [guiSettings.linkCurvature]
    // );


    // useEffect(
    //     () => {

    //         if (guiSettings.useNodeIcon !== useNodeIcon) {

    //             // console.log("useEffect: useNodeIcon");

    //             setUseNodeIcon((_nIcon) => guiSettings.useNodeIcon);

    //         }

    //     },
    //     [guiSettings.useNodeIcon]
    // );


    // useEffect(
    //     () => {

    //         if (guiSettings.useNodeImg !== useNodeImg) {

    //             // console.log("useEffect: useNodeImg");

    //             setUseNodeImg((_nImg) => guiSettings.useNodeImg);

    //         }

    //     },
    //     [guiSettings.useNodeImg]
    // );


    useEffect(

        () => {

            if (props.graphData &&
                props.graphData.nodes.length &&
                !props.useCoordinates &&
                props.forceEngine === "d3") {

                // console.log("useEffect: adjust graph layout forces");

                if (props.fixNodes &&
                    graphDataNodes &&
                    graphDataNodes.length &&
                    graphDataNodes.every((node) => "fx" in node)) {

                    // setGraphData((gData) => {

                    //     gData.nodes.forEach((node) => {

                    //         delete node.fx;
                    //         delete node.fy;

                    //     });

                    //     return gData;

                    // });
                    setGraphDataNodes((gDataNodes) => gDataNodes.map((node) => {

                        if ("fx" in node && "fy" in node) {

                            delete node.fx;
                            delete node.fy;

                        }

                        return node;

                    }));

                }

                fgRef.current
                    .d3Force("link")
                    .distance((_link) => guiSettings.link);
                fgRef.current
                    .d3Force("charge")
                    .strength(() => guiSettings.charge);
                fgRef.current
                    .d3Force("center")
                    .strength(() => guiSettings.center);
                fgRef.current
                    .d3Force("radial")
                    .strength(() => guiSettings.radial);

                fgRef.current.d3ReheatSimulation();

            }

        },
        [
            guiSettings.link,
            guiSettings.charge,
            guiSettings.center,
            guiSettings.radial
        ]
    );

    // display standard browser warning before navigating away from page
    // https://stackoverflow.com/questions/1119289/how-to-show-the-are-you-sure-you-want-to-navigate-away-from-this-page-when-ch
    // useEffect( () => {
    //     if (props.active && props.graphData.nodes.length>0) {
    //         window.onbeforeunload = () => true
    //     } else {
    //         window.onbeforeunload = () => false
    //     }
    //   },[props.graphData, props.active])

    // attempt to detect whether component focused, didn't get it to work
    // useEffect(() => {
    //     //if (document.activeElement === currentRef) {
        // console.log("document.activeElement")
    //     console.log(document.activeElement)
    //     console.log("fgRef.current")
    //     console.log(fgRef.current)
    //     console.log("document.activeElement === fgRef.current")
    //     console.log(document.activeElement === fgRef.current)
    //     props.setProps({focused:document.activeElement === fgRef.current})
    //     //}
    // });

    /* eslint-disable one-var */
    const reheatFunction = () => {

        // console.log("reheatFunction fired");

        if (nodeZoomId) {

            setNodeZoomId((_nz) => null);

        } else if (graphDataNodes) {

            if (props.useCoordinates && props.nodeCoordinates) {

                setGraphDataNodes((gDataNodes) => gDataNodes.map((node) => {
                    // restore fixed coordinates

                    const [
                        coordX,
                        coordY
                    ] = [
                        typeof props.nodeCoordinates === "string"
                            ? props.nodeCoordinates in node
                                ? node[props.nodeCoordinates].x
                                : null
                            : "x" in props.nodeCoordinates && props.nodeCoordinates.x in node
                                ? node[props.nodeCoordinates.x]
                                : null,
                        typeof props.nodeCoordinates === "string"
                            ? props.nodeCoordinates in node
                                ? node[props.nodeCoordinates].y
                                : null
                            : "y" in props.nodeCoordinates && props.nodeCoordinates.y in node
                                ? node[props.nodeCoordinates.y]
                                : null
                    ];

                    if (coordX && coordY) {

                        node.fx = coordX;
                        node.fy = coordY;

                    }

                    return node;

                }));

            } else if (props.fixNodes) {

                // free up fixed nodes

                setGraphDataNodes((gDataNodes) => gDataNodes.map((node) => {

                    if ("fx" in node) {

                        delete node.fx;
                        delete node.fy;

                    }
                    return node;

                }));

                props.setProps({"cooldownTime": Math.min(graphDataNodes.length * 50, MAX_COOLDOWNTIME_MS)});

                fgRef.current.d3ReheatSimulation();

            }

        }

    }

    /* eslint-enable one-var */

    /**
     * Check whether any node or links ids have changed
     * by comparing graphDataIdsAll and ids in new props.graphData prop
     * Whenever node and/or link ids change, update graphData in place
     * 1. To each node, add "__source" and "__target" attributes,
     *  containing a dict, with linkLabels as keys,
     *  and dicts of {linkid1:nodeid1, linkid2:nodeid2..} as values.
     * ~~2. Compute coordinates if fixed coordinate attributes are used.~~
     * 3. If all nodes have f coordinates, save these to state for recovering from nodeZoom mode
     * 4. Center camera at the centre
     * 5. update nodesById
     */

    //if ((props.graphData && "nodes" in props.graphData) || (fgRef.current && fgRef.current.graphData && fgRef.current.graphData.nodes)) {

    useEffect(
        () => {

            if (props.graphData &&
                (props.graphData.nodes.length ||
                    graphDataNodes.length)) {

                /* eslint-disable one-var */
                const [
                    nodeIdsAllNew,
                    linkIdsAllNew
                ] = [
                    new Set(props
                        .graphData
                        .nodes
                        .map((node) => node[props.nodeId])),
                    new Set(props
                        .graphData
                        .links
                        .map((link) => link[props.linkId]))
                ];

                const [
                    nodeIdsAddedNew,
                    nodeIdsRemovedNew,
                    linkIdsAddedNew,
                    linkIdsRemovedNew
                ] = [
                    new Set([...nodeIdsAllNew].filter((el) => !graphDataIdsAll.nodes.has(el))),
                    new Set([...graphDataIdsAll.nodes].filter((el) => !nodeIdsAllNew.has(el))),
                    new Set([...linkIdsAllNew].filter((el) => !graphDataIdsAll.links.has(el))),
                    new Set([...graphDataIdsAll.links].filter((el) => !linkIdsAllNew.has(el)))
                ];

                // check whether any node or link ids were added or deleted
                /* eslint-enable one-var */

                if (nodeIdsAddedNew.size ||
                    nodeIdsRemovedNew.size ||
                    linkIdsAddedNew.size ||
                    linkIdsRemovedNew.size ||
                    props.forceRefresh > forceRefreshCount
                ) {

                    // console.log("useEffect: new nodes added or forceRefresh incremented");

                    setGraphDataIdsAll((_gDataIdsAll) => ({
                        "links": linkIdsAllNew,
                        "nodes": nodeIdsAllNew
                    }));


                    const nodesClone = cloneDeep(props.graphData.nodes);

                    if ((nodeIdsAddedNew.size ||
                        nodeIdsRemovedNew.size ||
                        linkIdsAddedNew.size ||
                        linkIdsRemovedNew.size ||
                        props.forceRefresh > forceRefreshCount) &&
                        props.updateNeighbours &&
                        props.graphData.nodes.length
                        ) {

                        /**
                         * Add neighbours to each node
                         */

                        // update neighbours
                        nodesClone.forEach((node) => {

                            node.__source = {};
                            node.__target = {};

                        });

                        if (
                            nodesClone.length &&
                            props.graphData.links.length
                        ) {

                            const [
                                nodeIds,
                                linksClone
                            ] = [
                                nodesClone.map((node) => node[props.nodeId]),
                                cloneDeep(props.graphData.links)
                            ];

                            linksClone.forEach((link) => {

                                if (typeof link.source !== "string") {

                                    link.source = link.source[props.nodeId];
                                    link.target = link.target[props.nodeId];

                                }

                                const [
                                    idxSourceNode,
                                    idxTargetNode
                                ] = [
                                    nodeIds.indexOf(link[props.linkSource]),
                                    nodeIds.indexOf(link[props.linkTarget])
                                ];

                                // If link label type not in node.__source, add key
                                if (!(link[props.linkLabel] in nodesClone[idxSourceNode].__source)) {

                                    nodesClone[idxSourceNode]
                                        .__source[link[props.linkLabel]] = {};

                                }

                                nodesClone[idxSourceNode]
                                    .__source[link[props.linkLabel]][link[props.linkId]] = link[props.linkTarget];

                                // If link label type not in node.__target, add key
                                if (!(link[props.linkLabel] in nodesClone[idxTargetNode].__target)) {

                                    nodesClone[idxTargetNode].__target[link[props.linkLabel]] = {};

                                }

                                nodesClone[idxTargetNode]
                                    .__target[link[props.linkLabel]][link[props.linkId]] = link[props.linkSource];  

                            });

                        }

                    }

                    // set coordinates. Only necessary when not forcing refresh.
                    if (nodesClone.length && 
                        props.graphData.nodes.length //&& 
                        // (nodeIdsAddedNew.size || nodeIdsRemovedNew.size)
                        ) {

                        if (props.useCoordinates &&
                            props.nodeCoordinates) {

                            nodesClone.forEach((node) => {

                                const [
                                    coordX,
                                    coordY
                                ] = [
                                    typeof props.nodeCoordinates === "string"
                                        ? props.nodeCoordinates in node
                                            ? node[props.nodeCoordinates].x
                                            : null
                                        : "x" in props.nodeCoordinates && props.nodeCoordinates.x in node
                                            ? node[props.nodeCoordinates.x]
                                            : null,
                                    typeof props.nodeCoordinates === "string"
                                        ? props.nodeCoordinates in node
                                            ? node[props.nodeCoordinates].y
                                            : null
                                        : "y" in props.nodeCoordinates && props.nodeCoordinates.y in node
                                            ? node[props.nodeCoordinates.y]
                                            : null
                                ];

                                if (coordX && coordY) {

                                    node.fx = coordX;
                                    node.fy = coordY;

                                }

                            });

                        } //else {

                        //     nodesClone.forEach((node) => {

                        //         if ("fx" in node) {

                        //             delete node.fx;
                        //             delete node.fy;

                        //         }

                        //     });

                        // }

                    }

                    if (props.forceRefresh > forceRefreshCount) {

                        setForceRefreshCount((_frcnt) => props.forceRefresh);

                    }

                    setGraphDataNodes((_gDataNodes) => nodesClone);
                    // manually update graphData props as onChange on the ForceGraph2D doesn't even when replacing graphData

                    setNodesById((_nbid) => Object.fromEntries(nodesClone
                        .map((node) => [
                            node[props.nodeId],
                            node
                        ])));

                    // reset right clicked node and link

                    if (//("linksSelected" in props && props.linksSelected.length) ||
                        props.linkRightClicked ||
                        props.linkRightClickedViewpointCoordinates ||
                        props.nodeRightClicked ||
                        props.nodeRightClickedViewpointCoordinates
                        // ("nodesSelected" in props && props.nodesSelected.length)
                    ) {

                        props.setProps({
                            "linkRightClicked": null,
                            "linkRightClickedViewpointCoordinates": null,
                            "nodeRightClicked": null,
                            "nodeRightClickedViewpointCoordinates": null
                        });

                    }

                    // refresh selected or clicked node (with new neighbours)
                    // if (props.nodesSelected) {
                    //     console.log("setting nodesSelected!")
                    //     props.setProps({
                    //         "nodesSelected": props.nodesSelected.map((nodeSel) => nodesById[nodeSel.__nodeId])
                    //     });
                    // }

                    // if (props.nodeClicked) {
                    //     console.log("setting nodeClicked!")
                    //     props.setProps({
                    //         "nodeClicked": nodesById[props.nodeClicked.__nodeId]
                    //     });
                    // }

                    if (props.nodeZoomId) {

                        if (props.nodeZoomId === nodeZoomId) {

                            // console.log("incrementing refreshNodeZoom");

                            setRefreshNodeZoom((rnz) => rnz + 1);


                        } else {

                            setNodeZoomId((nz) => props.nodeZoomId);

                        }

                    } else {

                        fgRef.current.d3ReheatSimulation();

                    }

                }

            }

        },
        [
            props.graphData.nodes,
            props.graphData.links,
            props.forceRefresh
        ]
    );

    // if (props.useCoordinates && props.pixelUnitRatio) {

    //     nodesClone.forEach((node) => {

    //         const [
    //             newX,
    //             newY
    //         ] = [
    //             props.pixelUnitRatio * node.__coord_x,
    //             props.pixelUnitRatio * node.__coord_y
    //         ];
    //         node.fx = props.centreCoordinates.x + newX;
    //         node.fy = props.centreCoordinates.y + newY;

    //     });

    // // pan to mean coordinates
    // if (nodesClone.every((node) => "fx" in node && "fy" in node) && fgRef.current) {

    //     const avg = (myArray) => myArray.reduce(
    //         (xCoord, yCoord) => xCoord + yCoord,
    //         0
    //     ) / myArray.length;

    //     //* eslint-disable camelcase */
    //     //* eslint-disable one-var */

    //     const [
    //         coordinate_x_mean,
    //         coordinate_y_mean
    //     ] = [
    //         avg(nodesClone.map((node) => node.fx)),
    //         avg(nodesClone.map((node) => node.fy))
    //     ]

    //     fgRef.current.centerAt(coordinate_x_mean, coordinate_y_mean, 250);


    /* eslint-disable complexity */
    /* eslint-disable max-depth */
    useEffect(
        () => {

            /**
             * an effect that runs when nodeZoomId changes
             * using useEffect allows for entering but also resetting nodeZoom view
             */

            // checkpoint 1: should the nodeZoom effect run at all?
            if (props.graphData && props.graphData.nodes.length > 1) {

                // console.log("useEffect: nodeZoomId");

                const [
                    nodeIdsVisibleNew,
                    linkIdsVisibleNew
                ] = [
                    [],
                    []
                ];

                // checkpoint 2: is nodeZoomId a node id or null?  And is everything else ready?
                if (nodeZoomId &&
                    nodesById &&
                    nodeZoomId in nodesById &&
                    "__source" in nodesById[nodeZoomId]) {

                    // console.log("nodeZoomId useEffect: block 1");

                    nodeIdsVisibleNew.push(nodeZoomId);

                    const [
                        nodesByIdNew,
                        marX,
                        marYMin,
                        targetNodeObjs,
                        sourceNodes
                    ] = [
                        cloneDeep(nodesById),
                        75,
                        22,
                        {},
                        {}
                    ];

                    // console.log("this is nodeZoom");
                    // console.log(cloneDeep(nodesByIdNew[nodeZoomId]));

                    nodesByIdNew[nodeZoomId].fx = "x" in nodesByIdNew[nodeZoomId]
                        ? nodesByIdNew[nodeZoomId].x
                        : "fx" in nodesByIdNew[nodeZoomId]
                            ? nodesByIdNew[nodeZoomId].fx
                            : 0;
                    nodesByIdNew[nodeZoomId].fy = "y" in nodesByIdNew[nodeZoomId]
                        ? nodesByIdNew[nodeZoomId].y
                        : "fy" in nodesByIdNew[nodeZoomId]
                            ? nodesByIdNew[nodeZoomId].fy
                            : 0;

                    nodesByIdNew[nodeZoomId].vx = nodesByIdNew[nodeZoomId].vy = 0;

                    if (Object.values(nodesByIdNew[nodeZoomId].__source).length) {

                        // for (const [role, obj] of Object.entries(nodeZoom.__source)) {
                        for (const [
                            linkLabel,
                            obj
                        ] of Object.entries(nodesByIdNew[nodeZoomId].__source)) {

                            if (!(linkLabel in targetNodeObjs)) {

                                targetNodeObjs[linkLabel] = [];

                            }

                            for (const [
                                linkId,
                                targetId
                            ] of Object.entries(obj)) {

                                const targetNode = nodesByIdNew[targetId];
                                targetNodeObjs[linkLabel].push({
                                    "targetNode": targetNode,
                                    "targetSourceNodes": {}
                                });
                                linkIdsVisibleNew.push(linkId);
                                nodeIdsVisibleNew.push(targetId);
                                // ~~check whether the target node has node_id === node thingtype, i.e. is a schema type. 
                                // If so, don't show its neighbours.~~
                                if (Object.values(targetNode.__target).length //&&
                                    // nodesById[nodeZoomId][props.nodeId] !== nodesById[nodeZoomId].__thingType
                                    ) {

                                    for (const [
                                        linkLabel1,
                                        obj1
                                    ] of Object.entries(targetNode.__target)) {

                                        if (nodesById[nodeZoomId][props.nodeId] !== nodesById[nodeZoomId].__thingType ||
                                            ["relates", "plays"].includes(linkLabel) && ["relates", "plays"].includes(linkLabel1)) {       

                                            if (!(linkLabel1 in targetNodeObjs[linkLabel][targetNodeObjs[linkLabel].length - 1].targetSourceNodes)) {

                                                targetNodeObjs[linkLabel][targetNodeObjs[linkLabel].length - 1].targetSourceNodes[linkLabel1] = [];

                                            }

                                            for (const [
                                                linkId1,
                                                targetSourceId
                                            ] of Object.entries(obj1)) {

                                                if (!nodeIdsVisibleNew.includes(targetSourceId)) {

                                                    // only allow role players to be placed once
                                                    targetNodeObjs[linkLabel][targetNodeObjs[linkLabel].length - 1]
                                                        .targetSourceNodes[linkLabel1].push(nodesByIdNew[targetSourceId]);
                                                    nodeIdsVisibleNew.push(targetSourceId);

                                                }
                                                // .. but always make the link visible
                                                linkIdsVisibleNew.push(linkId1);

                                            }

                                        }

                                    }

                                }

                            }

                        }

                    }

                    // if nodeZoom is itself a target (i.e. a relation), get its role players
                    if (Object.values(nodesByIdNew[nodeZoomId].__target).length) {

                        for (const [
                            linkLabel,
                            obj

                        ] of Object.entries(nodesByIdNew[nodeZoomId].__target)) {
                            
                            if (!(linkLabel in sourceNodes)) {

                                sourceNodes[linkLabel] = []

                            }

                            for (const [
                                linkId,
                                sourceId
                            ] of Object.entries(obj)) {

                                linkIdsVisibleNew.push(linkId);
                                if (!nodeIdsVisibleNew.includes(sourceId)) {

                                    sourceNodes[linkLabel].push(nodesByIdNew[sourceId]);
                                    nodeIdsVisibleNew.push(sourceId);

                                }

                            }

                        }

                    }

                    /**
                     * sort nodes
                     */

                    // REMOVED FOR NOW

                    // LAYOUT
                    // place node relative to node zoom node
                    /* eslint-disable one-var */
                    const sum = (array) => array.reduce(
                        (elA, elB) => elA + elB,
                        0
                    )
                    
                    // data: number of relations, other roleplayers, and roleplayers (if clicked node is relation)
                    // schema: different
                    const [
                        nTarget,
                        nSource
                    ] = [
                        Object.keys(targetNodeObjs).length
                            ? sum(Object.values(targetNodeObjs).map((arr) => arr.length))
                            : 0,
                        Object.keys(sourceNodes).length
                            ? sum(Object.values(sourceNodes).map((arr) => arr.length))
                            : 0
                    ];

                    let nTargetSource = Object.keys(targetNodeObjs).length
                        ? sum(Object.keys(targetNodeObjs)
                            .map((key) => sum(targetNodeObjs[key]
                                .map((targNodeObj) => sum(Object.values(targNodeObj.targetSourceNodes)
                                    .map((arr) => arr.length)
                                    )
                                )
                                )
                            )
                        )
                        : 0
                    
                    // if any target source nodes are also targets, subtract from nTargetSource sum
                    const targetNodeIds = []
                    
                    for (const arr of Object.values(targetNodeObjs)) {

                        for (const targetNodeObj of arr) {

                            targetNodeIds.push(targetNodeObj.targetNode[props.nodeId])

                        }

                    }

                    for (const label in targetNodeObjs) {

                        for (const targetNodeObj of targetNodeObjs[label]) {

                            for (const label1 in targetNodeObj.targetSourceNodes) {

                                for (const targetSourceNode of targetNodeObj.targetSourceNodes[label1]) {

                                    if (targetNodeIds.includes(targetSourceNode[props.nodeId])) {

                                        nTargetSource -= 1;

                                    }

                                }

                            }

                        }

                    }

                    // compute min y value (top)
                    const height = (Math.max(
                            nTarget,
                            nTargetSource,
                            nSource,
                            2
                        ) - 1) * marYMin;

                    const yMin = nodesByIdNew[nodeZoomId].fy - height / 2;

                    // compute y margins (spacing) for each column of nodes
                    const [
                        offsetYTarget,
                        offsetYTargetSource,
                        offsetYSource
                    ] = [
                        (height - (Math.max(nTarget - 1, 0) * marYMin)) / 2,
                        (height - (Math.max(nTargetSource - 1, 0) * marYMin)) / 2,
                        (height - (Math.max(nSource - 1, 0) * marYMin)) / 2
                    ];

                    /* eslint-enable one-var */

                    // initialise the position multiplier at 0.5 to get center vertical alignment
                    let [
                        // kRel,
                        kRelRp,
                        kRp,
                        relYMax
                    ] = [
                        // move role players up a bit
                        // 0,//0.5,
                        0,//-0.5,
                        0,//0.5
                        yMin - marYMin
                    ];
                    
                    // Sources can target the same target more than once. Avoid setting coordinates for a target more than once.
                    const targetSeenIds = new Set();
                    const targetSourceSeenIds = new Set();

                    let targetX = nodesByIdNew[nodeZoomId].fx + marX;
                    let targetSourceX = nodesByIdNew[nodeZoomId].fx + marX + 0.5 * marX * Object.keys(targetNodeObjs).length; 

                    for (const linkLabel of Object.keys(targetNodeObjs)) {

                        for (let i = 0; i < targetNodeObjs[linkLabel].length; i++) {
    
                            const targetNodeObj = targetNodeObjs[linkLabel][i];
    
                            const [
                                targetNode,
                                targetSourceNodes
                            ] = [
                                targetNodeObj.targetNode,
                                targetNodeObj.targetSourceNodes
                            ];
    
                            let rpYSum = 0;

                            let targetSourceLabelX = targetSourceX;

                            for (const label1 in targetSourceNodes) {                                 

                                for (const targetSourceNode of targetSourceNodes[label1]) {
    
                                    // if targetSourceNode isn't also a target node, give it coordinates
                                    if (!Object.values(targetNodeObjs).some((arr) => arr.some((targNodeObj) => targNodeObj.targetNode[props.nodeId] === targetSourceNode[props.nodeId])) &&
                                        !targetSourceSeenIds.has(targetSourceNode[props.nodeId])) {
    
                                        // nodesByIdNew[roleplayer[props.nodeId]].fx = nodeZoom.x + marX * 3;
                                        nodesByIdNew[targetSourceNode[props.nodeId]].fx = targetSourceLabelX;
                                        nodesByIdNew[targetSourceNode[props.nodeId]].fy = yMin + offsetYTargetSource + kRelRp * marYMin;
    
                                        kRelRp += 1;
                                        rpYSum += nodesByIdNew[targetSourceNode[props.nodeId]].fy;
                                        targetSourceSeenIds.add(targetSourceNode[props.nodeId])
    
                                    }

                                }
                                
                                // if (nodesById[nodeZoomId][props.nodeId] === nodesById[nodeZoomId].__thingType) {
                                //     // only space out nodes in schema view

                                //     targetSourceLabelX += marX * 0.5;

                                // }
                                

                            }
    
                            if (!targetSeenIds.has(targetNode[props.nodeId])) {
    
                                nodesByIdNew[targetNode[props.nodeId]].fx = targetX;
                                
                                const noTargetSourceNodesYcoord = i > 0
                                    ? nodesByIdNew[targetNodeObjs[linkLabel][i - 1].targetNode[props.nodeId]].fy + marYMin
                                    : yMin + offsetYTarget;//marYRelRp//  yMin + kRel * marYRel;

                                const yCoord = Object.keys(targetSourceNodes).length
                                    ? rpYSum / sum(Object.values(targetSourceNodes).map((arr) => arr.length))
                                    : noTargetSourceNodesYcoord;

                                nodesByIdNew[targetNode[props.nodeId]].fy = yCoord >= (relYMax + marYMin)
                                    ? yCoord
                                    : relYMax + marYMin;
    
                                targetSeenIds.add(targetNode[props.nodeId]);
                                relYMax = nodesByIdNew[targetNode[props.nodeId]].fy;

                                if (linkLabel === "sub") {
                                    console.log("targetNode[props.nodeId]")
                                    console.log(targetNode[props.nodeId])
                                    console.log("yCoord")
                                    console.log(yCoord)
                                    console.log("relYMax + marYMin")
                                    console.log(relYMax + marYMin)
                                    console.log("noTargetSourceNodesYcoord")
                                    console.log(noTargetSourceNodesYcoord)
                                    console.log(cloneDeep("nodesByIdNew[targetNode[props.nodeId]].fy"))
                                    console.log(cloneDeep(nodesByIdNew[targetNode[props.nodeId]].fy))
                                    

                                }
    
                            }
    
                        }
                        
                        // if schema, add some horizontal margin
                        if (nodesById[nodeZoomId][props.nodeId] === nodesById[nodeZoomId].__thingType) {

                            targetX += marX * 0.5;
                            targetSourceX += marX * 0.5;

                        }

                    }

                    // for (const linkLabel of Object.keys(targetNodeObjs)) {

                    //     for (let i = 0; i < targetNodeObjs[linkLabel].length; i++) {
    
                    //         const targetNodeObj = targetNodeObjs[linkLabel][i];
    
                    //         const [
                    //             targetNode,
                    //             targetSourceNodes
                    //         ] = [
                    //             targetNodeObj.targetNode,
                    //             targetNodeObj.targetSourceNodes
                    //         ];
    
                    //         let rpYSum = 0;

                    //         let targetSourceLabelX = targetSourceX;

                    //         for (const label1 in targetSourceNodes) {                                 

                    //             for (const targetSourceNode of targetSourceNodes[label1]) {
    
                    //                 // if targetSourceNode isn't also a target node, give it coordinates
                    //                 if (!Object.values(targetNodeObjs).some((arr) => arr.some((targNodeObj) => targNodeObj.targetNode[props.nodeId] === targetSourceNode[props.nodeId]))) {
    
                    //                     // nodesByIdNew[roleplayer[props.nodeId]].fx = nodeZoom.x + marX * 3;
                    //                     nodesByIdNew[targetSourceNode[props.nodeId]].fx = targetSourceLabelX;
                    //                     nodesByIdNew[targetSourceNode[props.nodeId]].fy = yMin + offsetYTargetSource + kRelRp * marYMin;
    
                    //                     kRelRp += 1;
                    //                     rpYSum += nodesByIdNew[targetSourceNode[props.nodeId]].fy;
    
                    //                 }

                    //             }
                                
                    //             // if (nodesById[nodeZoomId][props.nodeId] === nodesById[nodeZoomId].__thingType) {
                    //             //     // only space out nodes in schema view

                    //             //     targetSourceLabelX += marX * 0.5;

                    //             // }
                                

                    //         }
    
                    //         if (!targetSeenIds.has(targetNode[props.nodeId])) {
    
                    //             nodesByIdNew[targetNode[props.nodeId]].fx = targetX;
                                
                    //             const noTargetSourceNodesYcoord = i > 0
                    //                 ? nodesByIdNew[targetNodeObjs[linkLabel][i - 1].targetNode[props.nodeId]].fy + marYMin
                    //                 : yMin + offsetYTarget;//marYRelRp//  yMin + kRel * marYRel;

                    //             const yCoord = Object.keys(targetSourceNodes).length
                    //                 ? rpYSum / sum(Object.values(targetSourceNodes).map((arr) => arr.length))
                    //                 : noTargetSourceNodesYcoord;

                    //             nodesByIdNew[targetNode[props.nodeId]].fy = yCoord >= relYMax + marYMin
                    //                 ? yCoord
                    //                 : relYMax + marYMin;
    
                    //             targetSeenIds.add(targetNode[props.nodeId]);
                    //             relYMax = nodesByIdNew[targetNode[props.nodeId]].fy;
    
                    //         }
    
                    //     }
                        
                    //     // if schema, add some horizontal margin
                    //     if (nodesById[nodeZoomId][props.nodeId] === nodesById[nodeZoomId].__thingType) {

                    //         targetX += marX * 0.5;
                    //         targetSourceX += marX * 0.5;

                    //     }

                    // }




                    // group different source nodes in columns by link label
                    if (Object.keys(sourceNodes).length) {

                        let sourceX = nodesById[nodeZoomId][props.nodeId] === nodesById[nodeZoomId].__thingType
                            ? nodesByIdNew[nodeZoomId].fx - (marX + (Object.keys(sourceNodes).length - 1) * marX * 0.5)
                            : nodesByIdNew[nodeZoomId].fx - marX;

                        Object.keys(sourceNodes).forEach((key) => {
    
                            sourceNodes[key].forEach((sNode) => {
    
                                nodesByIdNew[sNode[props.nodeId]].fx = sourceX;
                                nodesByIdNew[sNode[props.nodeId]].fy = yMin + offsetYSource + (kRp * marYMin);
                                kRp += 1;
    
                            })
                            
                            if (nodesById[nodeZoomId][props.nodeId] === nodesById[nodeZoomId].__thingType) {

                                sourceX += marX * 0.5;

                            }
    
                        });

                    }


                    setGraphDataNodes((gDataNodes) => gDataNodes.map((node) => {

                        if (nodeIdsVisibleNew.includes(node[props.nodeId])) {

                            node.fx = nodesByIdNew[node[props.nodeId]].fx;
                            node.fy = nodesByIdNew[node[props.nodeId]].fy;

                        }
                        return node;

                    }));

                    if (fgRef) {

                        fgRef.current.centerAt(
                            nodesByIdNew[nodeZoomId].fx,
                            nodesByIdNew[nodeZoomId].fy,
                            250);

                        fgRef.current.zoom(
                            3,
                            250
                        );

                    }

                    setNodesById((_nbid) => nodesByIdNew);

                } else if (
                    props.useCoordinates && props.nodeCoordinates
                ) {

                    // ! nodeZoomId
                    // restore nodeCoordinates

                    setGraphDataNodes((gDataNodes) => gDataNodes.map((node) => {

                        const [
                            coordX,
                            coordY
                        ] = [
                            typeof props.nodeCoordinates === "string"
                                ? props.nodeCoordinates in node
                                    ? node[props.nodeCoordinates].x
                                    : null
                                : "x" in props.nodeCoordinates && props.nodeCoordinates.x in node
                                    ? node[props.nodeCoordinates.x]
                                    : null,
                            typeof props.nodeCoordinates === "string"
                                ? props.nodeCoordinates in node
                                    ? node[props.nodeCoordinates].y
                                    : null
                                : "y" in props.nodeCoordinates && props.nodeCoordinates.y in node
                                    ? node[props.nodeCoordinates.y]
                                    : null
                        ];

                        if (coordX && coordY) {

                            node.fx = coordX;
                            node.fy = coordY;

                        }

                        return node;

                    }));

                    // if (fgRef.current) {

                    //     fgRef.current.zoomToFit(
                    //         250,
                    //         10,
                    //         (node) => !props.nodeIdsInvisibleUser.includes(node[props.nodeId]) && !nodeIdsInvisibleAuto.includes(node[props.nodeId]) 
                    //     )

                    // }

                } else if (nodePreviousFCoordinatesById &&
                    Object.keys(nodePreviousFCoordinatesById).length &&
                    graphDataNodes.every((node) => node[props.nodeId] in nodePreviousFCoordinatesById)) {
                    
                    // ! nodeZoomId

                    // no nodeCoordinates, restore fixed coordinates

                    // console.log("nodeZoomId useEffect: block 3. Revert to nodePreviousFCoordinatesById");

                    setGraphDataNodes((gDataNodes) => gDataNodes.map((node) => {

                        [
                            node.fx,
                            node.fy
                        ] = nodePreviousFCoordinatesById[node[props.nodeId]];

                        return node;

                    }));

                    // if (fgRef.current) {

                    //     fgRef.current.zoomToFit(
                    //         250,
                    //         10,
                    //         (node) => !props.nodeIdsInvisibleUser.includes(node[props.nodeId]) && !nodeIdsInvisibleAuto.includes(node[props.nodeId]) 
                    //     );

                    // }

                } else {
                    
                    // ! nodeZoomI
                    // neither nodeCoordinates nor have nodes settled in fixed coordinates automatically
                    // set nodes free and reheat simulation

                    // console.log("nodeZoomId useEffect: block 4. Free nodes and reheat.")

                    setGraphDataNodes((gDataNodes) => gDataNodes.map((node) => {

                        if ("fx" in node) {

                            delete node.fx;
                            delete node.fy;

                        }
                        return node;

                    }));

                    props.setProps({"cooldownTime": Math.min(graphDataNodes.length*50, MAX_COOLDOWNTIME_MS)});

                    fgRef.current.d3ReheatSimulation();

                    // if (fgRef.current) {
                    //     fgRef.current.zoomToFit(
                    //         250,
                    //         10,
                    //         (node) => !props.nodeIdsInvisibleUser.includes(node[props.nodeId]) && !nodeIdsInvisibleAuto.includes(node[props.nodeId]) 
                    //     )
                    // }

                }

                setNodeIdsInvisibleAuto(niva => nodeZoomId
                    ? props.graphData.nodes.map((node) => node[props.nodeId]).filter((nodeId) => !nodeIdsVisibleNew.includes(nodeId))
                    : []);

                setLinkIdsInvisibleAuto(liva => nodeZoomId
                    ? props.graphData.links.map((link) => link[props.linkId]).filter((linkId) => !linkIdsVisibleNew.includes(linkId))
                    : []);

                if (nodeZoomId !== props.nodeZoomId) {

                    props.setProps({"nodeZoomId": nodeZoomId});

                }

                if (nodeZoomId &&
                    (!props.nodeClicked ||
                    props.nodeClicked.__nodeId !== nodeZoomId)) {

                    props.setProps({"nodeClicked": nodesById[nodeZoomId]});

                }

            }

        },
        [
            // props.useCoordinates,
            // props.pixelUnitRatio,
            // props.centreCoordinates,
            refreshNodeZoom,
            nodeZoomId,
            props.sortRelsBy1,
            props.sortRelsBy2,
            props.sortRoleplayersBy1,
            props.sortRoleplayersBy2,
            props.sortRels1Descend,
            props.sortRels2Descend,
            props.sortRoleplayers1Descend,
            props.sortRoleplayers2Descend
        ]
    );
    /* eslint-enable complexity */
    /* eslint-enable max-depth */

    /* eslint-disable one-var */

    // this function prepares the tooltip shown on node hover
    const nodeLabelFunction = (node) => {

        let identityRows = `<tr>
                <td><span style="font-weight:bold">root type</span></td>
                <td>&nbsp;${node.__rootType}</td>
            </tr>
            <tr>
                <td><span style="font-weight:bold">type</span></td>
                <td>&nbsp;${node.__thingType}</td>
            </tr>
            `;

        if ("iid" in node) {

            identityRows = `${identityRows}
                <tr>
                    <td><span style="font-weight:bold">iid</span></td>
                    <td>&nbsp;${node.iid}</td>
                </tr>`;

        }

        if ("__abstract" in node) {

            identityRows = `${identityRows}
                <tr>
                    <td><span style="font-weight:bold">abstract</span></td>
                    <td>&nbsp;${node.__abstract}</td>
                </tr>`;

        }
        if ("__is_inferred" in node) {

            identityRows = `${identityRows}
                <tr>
                    <td><span style="font-weight:bold">inferred</span></td>
                    <td>&nbsp;${node.__is_inferred}</td>
                </tr>`;

        }

        if ("__value" in node) {

            identityRows = `${identityRows}
                <tr>
                    <td><span style="font-weight:bold">value</span></td>
                    <td>&nbsp;${node.__value}</td>
                </tr>`;

        }

        if ("__valuetype" in node) {

            identityRows = `${identityRows}
                <tr>
                    <td><span style="font-weight:bold">valuetype</span></td>
                    <td>&nbsp;${node.__valuetype}</td>
                </tr>`;

        }

        if ("__scope" in node) {

            identityRows = `${identityRows}
                <tr>
                    <td><span style="font-weight:bold">scope</span></td>
                    <td>&nbsp;${node.__scope}</td>
                </tr>`;

        }

        // give text same color as links
        const color = props.linkAutoColor
            ? invert(props.backgroundColor)
            : validateColor(props.linkColor)
                ? props.linkColor
                : invert(props.backgroundColor);
        const tableOut = `<table style=background-color:${props.backgroundColor};color:${color}>${identityRows}</table>`;
        // const tableOut = attributeRows
        //     ? `<table style=background-color:${props.backgroundColor}>${identityRows}${attributeRows}</table>`
        //     : `<table style=background-color:${props.backgroundColor}>${identityRows}</table>`;

        return tableOut;

    };


     // this function prepares the tooltip shown on node hover
     const linkLabelFunction = (link) => {

        let identityRows = `<tr>
                <td><span style="font-weight:bold">link</span></td>
                <td>&nbsp;${link.label}</td>
            </tr>
            `;

        if ("type" in link) {

            identityRows = `${identityRows}
                <tr>
                    <td><span style="font-weight:bold">type</span></td>
                    <td>&nbsp;${link.type}</td>
                </tr>`;

        }

        if ("is_inherited" in link) {

            identityRows = `${identityRows}
                <tr>
                    <td><span style="font-weight:bold">inherited</span></td>
                    <td>&nbsp;${link.is_inherited}</td>
                </tr>`;

        }

        if ("is_inferred" in link) {

            identityRows = `${identityRows}
                <tr>
                    <td><span style="font-weight:bold">inferred</span></td>
                    <td>&nbsp;${link.is_inferred}</td>
                </tr>`;

        }

        // give text same color as links
        const color = props.linkAutoColor
            ? invert(props.backgroundColor)
            : validateColor(props.linkColor)
                ? props.linkColor
                : invert(props.backgroundColor);
        const tableOut = `<table style=background-color:${props.backgroundColor};color:${color}>${identityRows}</table>`;

        return tableOut;

    };



    const nodeVisibilityFunction = (node) => props.nodeIdsInvisibleUser === null
        ? !nodeIdsInvisibleAuto.includes(node[props.nodeId])
        : !nodeIdsInvisibleAuto.includes(node[props.nodeId]) && !props.nodeIdsInvisibleUser.includes(node[props.nodeId]);


    const nodeColorFunction =
        (node) => {

            let color = props.nodeColor in node
                ? validateColor(node[props.nodeColor])
                    ? node[props.nodeColor]
                    : "cornflowerblue"
                : "cornflowerblue";

            if ("__abstract" in node && node.__abstract) {

                color = transparentize(0.3, color);

            }

            if (props.nodesSelected && props.nodesSelected.length) {

                color = transparentize(0.3, color);
                if (props.nodesSelected.map((nodeSel) => nodeSel[props.nodeId]).indexOf(node[props.nodeId]) !== -1) {

                    color = saturate(0.3,color);
                    color = lighten(0.3, color);

                }

            }

            if (nodeIdsHighlight.length) {

                color = transparentize(0.2, color);
                if (nodeIdsHighlight.indexOf(node[props.nodeId]) !== -1) {

                    color = lighten(0.2, color);

                }

            }
            if (nodeIdsDrag.length) {

                color = transparentize(0.2, color);
                if (nodeIdsDrag.indexOf(node[props.nodeId]) !== -1) {

                    color = lighten(0.3, color);

                }

            }
            return color;

        };


    const getNodeNeighbourIds = (node, depth) => {

        /**
         * @usage: subroutine of handleNodeClick to extract the ids of neighbours
         * from the "__source" and "__target" items in the node object.
         * If all the nodes with these ids are already in nodesSelected
         * (if not null), call recursively on the nodes with these ids
         * until neighbourNodeIdsUnique contains nodes not in nodesSelected
         */

        if (depth === 0) {

            return [];

        }

        const neighbourNodeIds = [];

        if ("__source" in node) {

            if (Object.keys(node.__source).length) {

                Object.keys(node.__source).forEach((key) => {

                    // Iterate over roles
                    Object.values(node.__source[key])
                        .map((nodeId) => neighbourNodeIds.push(nodeId));

                });

            }

        }

        if ("__target" in node) {

            if (Object.keys(node.__target).length) {

                Object.keys(node.__target).forEach((key) => {

                    Object.values(node.__target[key])
                        .map((nodeId) => neighbourNodeIds.push(nodeId));

                });

            }

        }

        let neighbourNodeIdsUnique = neighbourNodeIds.length
            ? [...new Set(neighbourNodeIds)]
            : [];

        if (neighbourNodeIdsUnique.length) {

            // If all the neighbour nodes are already selected

            if (neighbourNodeIdsUnique
                .every((nnid) => props.nodesSelected
                    .map((ns) => ns[props.nodeId])
                    .includes(nnid))) {

                // Retrieve the nodes matching the neighbourNodeIds
                const neighbourNodesUnique = neighbourNodeIdsUnique
                    .map((nnidu) => nodesById[nnidu]);

                neighbourNodesUnique.forEach((nnu) => {

                    neighbourNodeIdsUnique = neighbourNodeIdsUnique
                        .concat(getNodeNeighbourIds(
                            nnu,
                            depth - 1
                        ));

                });

            }

        }
        neighbourNodeIdsUnique = neighbourNodeIdsUnique.length
            ? [...new Set(neighbourNodeIdsUnique)]
            : [];

        // If no new nodes were added, return empty array
        if (neighbourNodeIdsUnique.length) {
            if (neighbourNodeIdsUnique
                .every((nnid) => props.nodesSelected
                    .map((ns) => ns[props.nodeId])
                    .includes(nnid))) {

                neighbourNodeIdsUnique
                    .splice(
                        0,
                        neighbourNodeIdsUnique.length
                    );

            }
        }

        return neighbourNodeIdsUnique;

    };


    // https://github.com/vasturiano/force-graph/blob/master/example/multi-selection/index.html
    const handleNodeClick = (node, event) => {
        // console.log("handleNodeClick");

        /**
         * Node left click callback
         * outcome depends on whether node is already selected
         * and on key press events
         */

        // let nodeZoomIdTmp = null;
        const nodesSelectedNew = cloneDeep(props.nodesSelected);
        const linksSelectedNew = cloneDeep(props.linksSelected);

        // Get index of clicked node in nodesSelected
        const nodeIndex = nodesSelectedNew
            .map((nodeSel) => nodeSel[props.nodeId])
            .indexOf(node[props.nodeId]);

        if (event.shiftKey) {
            // Multi-select
            if (nodeIndex === -1) {

                nodesSelectedNew.push(node);

            } else {

                nodesSelectedNew.splice(
                    nodeIndex,
                    1
                );

            }

        } else {

            /* eslint-disable no-lonely-if */
            if (nodeIndex === -1) {

                // node not in nodesSelected
                nodesSelectedNew.splice(
                    0,
                    nodesSelectedNew.length
                );
                nodesSelectedNew.push(node);

            } else {

                // Node already selected
                if (event.altKey) {

                    // select neighbours of selected node(s)
                    const neighbourNodeIds = getNodeNeighbourIds(
                        node,
                        props.maxDepth_neighbours_select
                    );

                    if (neighbourNodeIds.length) {

                        const neighbourNodes = neighbourNodeIds.length
                            ? neighbourNodeIds
                                .map((neighbourNodeId) => nodesById[neighbourNodeId])
                            : [];

                        neighbourNodes.map((neighbourNode) => {

                            if (neighbourNode[props.nodeId] !== node[props.nodeId]) {

                                nodesSelectedNew.push(neighbourNode);

                            }

                        });

                    } else {

                        nodesSelectedNew.splice(
                            0,
                            nodesSelectedNew.length
                        );

                    }

                } else {

                    // Clicking already selected node with no key -> node zoom
                    if (nodeZoomId !== node[props.nodeId]) {

                        // console.log("setting nodeZoomId")

                        setNodeZoomId(nz => node[props.nodeId]);

                    }

                }

            }
            /* eslint-enable no-lonely-if */

            linksSelectedNew.splice(0, linksSelectedNew.length)

        }

        props.setProps({
            "linkClicked": null,
            "linkRightClicked": null,
            "linkRightClickedViewpointCoordinates": null,
            "linksSelected": linksSelectedNew,
            "nodeClicked": node,// event.shiftKey
                // ? null
                // : node,
            "nodeRightClicked": null,
            "nodeRightClickedViewpointCoordinates": null,
            "nodesSelected": nodesSelectedNew

        });

    };


    const handleNodeRightClick = (node, _event) => {

        if (node) {

            props.setProps({
                "linkClicked": null,
                "linkRightClicked": null,
                "linkRightClickedViewpointCoordinates": null,
                "linksSelected": [],
                "n_nodeRightClicks": props.n_nodeRightClicks
                    ? props.n_nodeRightClicks + 1
                    : 1,
                "nodeRightClicked": node,
                "nodeClicked": null,
                "nodeRightClickedViewpointCoordinates": fgRef.current
                    ? fgRef.current.graph2ScreenCoords(
                        node.x,
                        node.y
                    )
                    : null
            });

            // if there are selected nodes but they do not include the right clicked node, clear them
            if (props.nodesSelected && 
                !props.nodesSelected.map((nsel) => nsel.__nodeId)
                    .includes(node.__nodeId)
            ) {

                props.setProps({
                    "nodesSelected":[]
                })

            }

        }

    };


    const handleLinkRightClick = (link, event) => {

        if (link) {

            const start = link[props.linkSource];
            const end = link[props.linkTarget];

            // ignore unbound links
            if (typeof start !== "object" || typeof end !== "object") return;

            // calculate midpoint
            // const midPoint = {
            //     "x": start.x + (end.x - start.x) / 2,
            //     "y": start.y + (end.y - start.y) / 2
            // };

            props.setProps({
                "linkRightClicked": link,
                "linkRightClickedViewpointCoordinates": fgRef.current
                    ? {"x": event.offsetX, "y": event.offsetY}
                    // ? fgRef.current.graph2ScreenCoords(
                    //     midPoint.x,
                    //     midPoint.y 
                    // )
                    : null,
                "nodeRightClicked":null,
                "nodesSelected": [],
                "nodeClicked": null,
                "linkClicked": null,
                "nodeRightClickedViewpointCoordinates": null,
                "n_linkRightClicks": props.n_linkRightClicks
                    ? props.n_linkRightClicks + 1
                    : 1,
            });

            if (props.linksSelected && 
                !props.linksSelected.map((lsel) => lsel.id)
                    .includes(link.id)
            ) {

                props.setProps({
                    "linksSelected":[]
                })

            }

        }

    };


    const handleNodeDrag = (node, _translate) => {

        // console.log("handleNodeDrag");

        if (props.linkRightClicked ||
            props.linkRightClickedViewpointCoordinates || 
            props.nodeClicked ||
            props.nodeRightClicked ||
            props.nodeRightClickedViewpointCoordinates) {

            props.setProps({
                "linkRightClicked": null,
                "linkRightClickedViewpointCoordinates": null,
                "nodeClicked": null,
                "nodeRightClicked": null,
                "nodeRightClickedViewpointCoordinates": null
            });

        }

        // Highlight dragged node and immediate neighbours
        if (node) {

            const neighbourNodeIds = [];
            const linkIds = [];
            if ("__source" in node) {

                if (Object.keys(node.__source).length) {

                    Object.keys(node.__source).forEach((key) => {

                        // Iterate over roles
                        Object.values(node.__source[key])
                            .map((nodeId) => neighbourNodeIds.push(nodeId));
                        Object.keys(node.__source[key])
                            .map((linkId) => linkIds.push(linkId));

                    });

                }

            }
            if ("__target" in node) {

                if (Object.keys(node.__target).length) {

                    Object.keys(node.__target).forEach((key) => {

                        // iterate over roles
                        Object.values(node.__target[key])
                            .map((nodeId) => neighbourNodeIds.push(nodeId));
                        Object.keys(node.__target[key])
                            .map((linkId) => linkIds.push(linkId));

                    });

                }

            }

            // Two-step highlighting if rootType is entity and not a schema node
            // this is hard-coded for typedb-vis-utils
            if (node.__rootType === "entity" && node.__thingType !== node[props.nodeId]) {

                // We cannot simply iterate over neighbourNodeIds nor its length adding
                // since we are adding to it
                const nNeighbours = neighbourNodeIds.length

                for (let i = 0; i < nNeighbours; i++) {

                    const nnid = neighbourNodeIds[i];

                    const neighbourNode = nodesById[nnid];

                    /* eslint-disable max-depth */
                    if ("__source" in neighbourNode) {

                        if (Object.keys(neighbourNode.__source).length) {

                            Object.keys(neighbourNode.__source).forEach((key) => {

                                // Iterate over roles
                                Object.values(neighbourNode.__source[key])
                                    .map((nodeId) => neighbourNodeIds.push(nodeId));
                                Object.keys(neighbourNode.__source[key])
                                    .map((linkId) => linkIds.push(linkId));

                            });

                        }

                    }

                    if ("__target" in neighbourNode) {

                        if (Object.keys(neighbourNode.__target).length) {

                            Object.keys(neighbourNode.__target).forEach((key) => {

                                // iterate over roles
                                Object.values(neighbourNode.__target[key])
                                    .map((nodeId) => neighbourNodeIds.push(nodeId));
                                Object.keys(neighbourNode.__target[key])
                                    .map((linkId) => linkIds.push(linkId));

                            });

                        }

                    }
                    /* eslint-enable max-depth */

                }

            }

            // assign unique ids to nodeIdsDrag prop
            neighbourNodeIds.push(node[props.nodeId]);
            setNodeIdsDrag((_nid) => [...new Set(neighbourNodeIds)]);
            setLinkIdsNodesDrag((_lind) => [...new Set(linkIds)]);

            /**
             * drag all selected nodes and fix in place afterwards
             */
            // from https://github.com/vasturiano/force-graph/blob/master/example/multi-selection/index.html
            // if (nodesSelected.length) {

            //     const nodesSelectedNew = cloneDeep(nodesSelected);
            //     const nodesSelectedIds = nodesSelectedNew.map((nodeSel) => nodeSel[props.nodeId]);
            //     // Moving a selected node?
            //     if (nodesSelectedIds.includes(node[props.nodeId])) {

            //         // Move all other selected nodes as well
            //         nodesSelectedNew
            //             .filter((nodeSelected) => nodeSelected[[props.nodeId]] !== node[props.nodeId])
            //             .forEach((nodeSel) => ["x", "y"].forEach((coord) => nodeSel[`f${coord}`] = nodeSel[coord] + translate[coord])); 
            //             // translate other nodes by same amount => selNode !== node).forEach(node => ['x', 'y'].forEach(coord => node[`f${coord}`] = node[coord] + translate[coord])); // translate other nodes by same amount

            //     }

            //     setNodesSelected(nodesSelectedNew);

            // }

        } //else {
            // not sure this will ever happen
        //     setNodeIdsDrag([]);
        //     setLinkIdsNodesDrag([]);
        // }

    };


    // fix dragged nodes in place
    const handleNodeDragEnd = (node, _translate) => {

        // console.log("handleNodeDragEnd");
        if (nodeIdsDrag.length) {

            setNodeIdsDrag((_nids) => []);

        }
        if (linkIdsNodesDrag.length) {

            setLinkIdsNodesDrag((_lids) => []);

        }

        // because drag doesn't activate onChange event handler, clumsily update graphdata props in place
        for (const nodeOther of props.graphData.nodes) {

            if (nodeOther[props.nodeId] === node[props.nodeId]) {

                nodeOther.fx = node.fx;
                nodeOther.fy = node.y;
                break;

            }

        }

    };
        // from https://github.com/vasturiano/force-graph/blob/master/example/multi-selection/index.html
        // if (nodesSelected.length) {
        //     const nodesSelectedIds = nodesSelected.map(node=>node[props.nodeId])
        //     // moving a selected node?
        //     if (nodesSelectedIds.includes(node[props.nodeId])) {
        //         nodesSelected
        //             .filter(nodeSelected => nodeSelected !== node)
        //             .forEach(node => ['x', 'y'].forEach(coord => node[`f${coord}`] = undefined)); // unfix controlled nodes
        //     }
        // }
        // node.fx = node.x;
        // node.fy = node.y;
        // node.fz = node.z;
    // };

    // const handleNodeHover = node => {
    //     if (node) {
    //         setNodeHovered(node)
    //         setNodeHoveredViewpointCoordinates(fgRef.current.graph2ScreenCoords(node.x,node.y))
    //     } else {
    //         setNodeHovered(null)
    //         setNodeHoveredViewpointCoordinates(null)
    //     }
    // };

    // set centreCoordinates on component init
    // TODO: these coordinates are only needed for background image, which is currently not implemented
    // useEffect(
    //     () => {

    //         props.setProps(
    //             {
    //                 "centreCoordinates": graphDataNodes.length && fgRef.current.getGraphBbox()
    //                     ? {
    //                         "x": 0.5 * (fgRef.current.getGraphBbox().x[0] + fgRef.current.getGraphBbox().x[1]),
    //                         "y": 0.5 * (fgRef.current.getGraphBbox().y[0] + fgRef.current.getGraphBbox().y[1])
    //                     }
    //                     : fgRef.current.screen2GraphCoords(
    //                         window.innerWidth / 2,
    //                         window.innerHeight / 2
    //                     )
    //             });

    //     },
    //     []
    // );

    const handleBackgroundClick = (_event) => {

        // console.log("handleBackgroundClick");

        if (props.linkRightClicked ||
            props.linkRightClickedViewpointCoordinates ||
            (props.linksSelected && props.linksSelected.length) ||
            props.nodeClicked ||
            props.nodeRightClicked ||
            props.nodeRightClickedViewpointCoordinates ||
            (props.nodesSelected && props.nodesSelected.length)) {

            props.setProps({
                "linkClicked": null,
                "linkRightClicked": null,
                "linkRightClickedViewpointCoordinates": null,
                "linksSelected": [],
                "nodeClicked": null,
                "nodeRightClicked": null,
                "nodeRightClickedViewpointCoordinates": null,
                "nodesSelected": []
            });

        }

        if (nodeZoomId) {

            setNodeZoomId((_nz) => null);

        }

    };


    const handleBackgroundRightClick = (_event) => {

        // console.log("handleBackgroundRightClick");

        if (props.linkRightClicked ||
            props.linkRightClickedViewpointCoordinates ||
            (props.linksSelected && props.linksSelected.length) ||
            props.nodeClicked ||
            props.nodeRightClicked ||
            props.nodeRightClickedViewpointCoordinates ||
            (props.nodesSelected && props.nodesSelected.length)) {

            props.setProps({
                "linkRightClicked": null,
                "linkRightClickedViewpointCoordinates": null,
                "linksSelected": [],
                "nodeClicked": null,
                "nodeRightClicked": null,
                "nodeRightClickedViewpointCoordinates": null,
                "nodesSelected": []
            });

        }

        if (nodeZoomId) {

            setNodeZoomId((_nz) => null);

        }

    };


    const handleLinkClick = (link, event) => {

        if (link) {

            const linksSelectedNew = cloneDeep(props.linksSelected);
            const nodesSelectedNew = cloneDeep(props.nodesSelected);

            const linkIndex = linksSelectedNew.map((linkSel) => linkSel[props.linkId]).indexOf(link[props.linkId]);

            if (event.shiftKey) {
                // multi-selection
                if (linkIndex === -1) {

                    linksSelectedNew.push(link);

                } else {

                    linksSelectedNew.splice(linkIndex,1);

                }

            } else {

                linksSelectedNew.splice(0, linksSelectedNew.length);
                linksSelectedNew.push(link);
                nodesSelectedNew.splice(0, nodesSelectedNew.length);

            }

            props.setProps(
                {
                    "linksSelected": linksSelectedNew,
                    "linkRightClicked": null,
                    "linkRightClickedViewpointCoordinates":null,
                    "nodeClicked": null,
                    "nodeRightClicked": null,
                    "nodeRightClickedViewpointCoordinates": null,
                    "nodesSelected": nodesSelectedNew
                }
            );

        }

    };

    // useEffect(() => setNodeIdsVisible((nodeIdsVisible) => nodeIdsVisible.filter((nodeId) => props.nodeIdsVisibleFilter.includes(nodeId))),
    //     [props.nodeIdsVisibleFilter]
    // );

    // useEffect(() => setLinkIdsVisible((linkIdsVisible) => linkIdsVisible.filter((linkId) => props.linkIdsVisibleFilter.includes(linkId))),
    //     [props.linkIdsVisibleFilter]
    // );


    useEffect(
        () => {

            // console.log("useEffect: setNodeIdsHighlight");
            setNodeIdsHighlight((_nih) => props.nodeIdsHighlightUser
                ? props.nodeIdsHighlightUser
                : []);

        },
        [props.nodeIdsHighlightUser]
    );


    useEffect(
        () => {

            // console.log("useEffect: setLinkIdsHighlight");

            setLinkIdsHighlight(lih => props.linkIdsHighlightUser
            ? props.linkIdsHighlightUser
            : []);

        },
        [props.linkIdsHighlightUser]
    );

    // nodeCanvasObject function
    const nodeCanvasObjectFunction = (node, ctx, globalScale) => {
        // set global alpha for next drawing to value depending on whether node is selected
        // https://www.w3schools.com/tags/canvas_globalalpha.asp
        // initialize color
        // provide a sensible default
        let backgroundColor_tmp = props.backgroundColor
            ? validateColor(props.backgroundColor)
                ? props.backgroundColor
                : "#000000"
            : "#000000";
        let color = props.nodeColor in node 
            ? validateColor(node[props.nodeColor])
                ? node[props.nodeColor]
                : "#0000ff"
            : "#0000ff";
        let textColor = props.nodeTextColor && !props.nodeTextAutoColor ? props.nodeTextColor : invert(backgroundColor_tmp)
        let globalAlpha = 1
        
        // const iconSize = nodeIconRelSize ? nodeIconRelSize : 12; // sensible default
        
        // const imgSize = nodeImgRelSize ? nodeImgRelSize : 12; // sensible default

        // ctx.globalAlpha = 0.9;
        let fontWeightText = "normal";
        //let fontSize = Math.max(11 / globalScale,5);
        let fontSize = props.nodeLabelRelSize;

        // modify style parameters if node is selected and/or highlighted
        
        if ("__abstract" in node && node.__abstract) {

            color = transparentize(0.3, color);

        }

        if (props.nodesSelected && props.nodesSelected.length) {
            // make all other nodes more transparent
            // ctx.globalAlpha -= 0.3
            // color = transparentize(0.3, color);
            // textColor = transparentize(0.3, textColor);
            if (props.nodesSelected.map((nodeSel) => nodeSel[props.nodeId]).indexOf(node[props.nodeId]) !== -1) {
                // ctx.globalAlpha = 1
                color = saturate(0.2,color);
                textColor = saturate(0.2,textColor);
                textColor = lighten(0.2, textColor);
                color = lighten(0.2, color);
                fontSize = fontSize * 1.2;
            }  else {
                globalAlpha = globalAlpha * 0.8
            }
        }

        if (nodeIdsDrag.length) {
             // make all other nodes more transparent
            // ctx.globalAlpha -= 0.3
            color = transparentize(0.2, color);
            textColor = transparentize(0.2, textColor);
            if (nodeIdsDrag.indexOf(node[props.nodeId]) !== -1) {
                // ctx.globalAlpha = 1
                color = lighten(0.3, color);
                textColor = lighten(0.3, textColor);
                fontWeightText = "bold";
                globalAlpha = 1
            } else {
                globalAlpha = globalAlpha * 0.8
            }
        }

        if (nodeIdsHighlight.length) {
            // ctx.globalAlpha -= 0.3
            color = transparentize(0.2, color);
            textColor = transparentize(0.2, textColor);
            if (nodeIdsHighlight.indexOf(node[props.nodeId]) !== -1) {
                //ctx.globalAlpha = 1
                color = lighten(0.3, color);
                textColor = lighten(0.3, textColor);
                fontWeightText = "bold";
                globalAlpha = 1
            } else {
                globalAlpha = globalAlpha * 0.8
            }
        }

        node.__yNudge = 0
        node.__yNudgePaint = 0

        // paint node text background rectangle
        // is this necessary??
        // ctx.fillStyle = color
        // let backgroundColor_tmp = backgroundColor? validateColor(backgroundColor)? backgroundColor : "#000000" : "#000000"
        // ctx.fillStyle = backgroundColor_tmp;
        // add padding
        // const rectsize = size*0.2
        // ctx.fillRect(node.x-rectsize/2, node.y -rectsize, rectsize, rectsize);
        
        // From https://stackoverflow.com/questions/2359537/how-to-change-the-opacity-alpha-transparency-of-an-element-in-a-canvas-elemen
        
        ctx.save();
        ctx.globalAlpha = globalAlpha

        // set modified style parameters
        let img = null;
        let img_src = null;
        // if (props.nodeImg in node && useNodeImg) {
        if (props.nodeImg in node && node[props.nodeImg]) {

            img_src = node[props.nodeImg];
            if (
                typeof img_src === "string" && 
                (img_src.includes("http") || img_src.includes("www"))
            ) {

                img = new Image();
                img.src = img_src;

                if (img.complete) {

                    const heightWidthRatio = img.height / img.width
                    const imgWidth = props.nodeVal in node
                        ? node[props.nodeVal] * props.nodeRelSize * props.nodeImgSizeFactor 
                        : props.nodeRelSize * props.nodeImgSizeFactor;
                    const imgHeight = imgWidth * heightWidthRatio
                    node.__bckgDimensions = [imgWidth, imgHeight]
                    node.__yNudge = fontSize * 1.1
                    node.__yNudgePaint = node.__yNudge
                    ctx.drawImage(img, node.x - imgWidth / 2, node.y - (node.__bckgDimensions[1] + node.__yNudge), imgWidth, imgHeight);
                    
                    // save for nodePointerAreaPaintFunction

                }

            }

        }

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        if (
            (
                !img || !img_src || !img.complete
            ) &&
            props.nodeIcon in node &&
            node[props.nodeIcon]
            ) {

            // icon
            const iconSize = props.nodeVal in node
                ? node[props.nodeVal] * props.nodeRelSize * props.nodeIconSizeFactor
                : props.nodeRelSize * props.nodeIconSizeFactor;
            ctx.font = `${iconSize}px ${"FontAwesome"}`;

            ctx.fillStyle = color;
            ctx.fontWeight = 900;
            // const icon = String.fromCharCode(parseInt(node[props.nodeIcon], 16));
            // ctx.fillText(`${node[props.nodeIcon]}`, node.x, node.y - iconSize / 1.5, iconSize);
            // ctx.fillText(String.fromCharCode(61449), node.x, node.y - 10 / 1.5, iconSize);
            const iconWidth = ctx.measureText(node[props.nodeIcon]).width

            node.__bckgDimensions = [iconWidth, iconSize]
            node.__yNudge = -iconSize * 0.2
            node.__yNudgePaint = iconSize * 0.3
            // ctx.fillText(`${node[props.nodeIcon]}`, node.x, node.y - 10 / 1.5, iconSize);
            ctx.fillText(`${node[props.nodeIcon]}`, node.x, node.y - (node.__bckgDimensions[1] + node.__yNudge), iconSize);
    
            // save for nodePointerAreaPaintFunction

        }
        if (!(props.currentZoomPan && ("k" in props.currentZoomPan) && (props.currentZoomPan.k < 0.4))) {
            const label = props.nodeLabel in node
                ? node[props.nodeLabel]
                    ? node[props.nodeLabel]
                    : node[props.nodeId]
                : node[props.nodeId];
            ctx.fontWeight = fontWeightText
            // draw text background rectangle
            ctx.font = `${fontSize}px Sans-Serif`;
            const textWidth = ctx.measureText(label).width;
            // add padding
            const bckgDimensions = [textWidth, fontSize].map((n) => n + fontSize * 0.2);
            ctx.fillStyle = backgroundColor_tmp;
            ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);

            // draw text label
            if (nodeIdsDrag.indexOf(node[props.nodeId]) !== -1) {
                ctx.font = `${fontSize}px Sans-Serif bold`;
            }
            
            ctx.fillStyle = textColor
            ctx.fillText(label, node.x, node.y);

        }
        ctx.restore();
    };

    const nodePointerAreaPaintFunction = (node, color, ctx, globalScale) => {
        // examples
        // https://github.com/vasturiano/react-force-graph/blob/master/example/text-nodes/index-2d.html
        // https://github.com/vasturiano/react-force-graph/blob/e67177b3522e2ffd212f807cbb6b74ed04a39ab6/example/custom-node-shape/index-canvas.html
        ctx.fillStyle = color;
        
        if (node.__bckgDimensions) {
            // __bckgDimensions is only present when using icon or img
            ctx.fillRect(
                node.x - node.__bckgDimensions[0] / 2, 
                node.y - (node.__bckgDimensions[1] + node.__yNudgePaint),
                node.__bckgDimensions[0],
                node.__bckgDimensions[1] + node.__yNudgePaint // include text label area
            );
        } else {
            // draw circle
            const radius = props.nodeRelSize + (
                node[props.nodeVal] 
                    ? node[props.nodeVal]
                    : 0 
                )
            ctx.beginPath(); 
            ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false); 
            ctx.fill();
        }

    }


    // const nodeCanvasObjectModeFunction = (node) => useNodeImg && props.nodeImg in node && node[props.nodeImg] || useNodeIcon && props.nodeIcon in node && node[props.nodeIcon] ? "replace" : "after";
    const nodeCanvasObjectModeFunction = (node) => props.nodeImg in node && node[props.nodeImg] || props.nodeIcon in node && node[props.nodeIcon] ? "replace" : "after";

    const linkVisibilityFunction = (link) => props.linkIdsInvisibleUser === null
        ? !linkIdsInvisibleAuto.includes(link[props.linkId]) 
        : !linkIdsInvisibleAuto.includes(link[props.linkId]) && !props.linkIdsInvisibleUser.includes(link[props.linkId]);


    const linkColorFunction = (link) => {
        let color = props.linkAutoColor
            ? invert(props.backgroundColor)
            : validateColor(props.linkColor)
                ? props.linkColor
                : invert(props.backgroundColor);
        // is link selected?
        if (props.linksSelected && props.linksSelected.length) {

            color = transparentize(0.2, color);
            if (props.linksSelected.map((linkSel) => linkSel[props.linkId]).indexOf(link[props.linkId]) !== -1) {

                color = saturate(0.2, color);
                color = lighten(0.2, color);

            }
        }
        // is link connected to node being dragged?
        if (linkIdsNodesDrag.length) {

            color = transparentize(0.2, color);
            if (linkIdsNodesDrag.indexOf(link[props.linkId]) !== -1) {

                color = saturate(0.2,color);
                color = lighten(0.3, color);

            }
        }

        if (props.currentZoomPan && "k" in props.currentZoomPan) {

            // color = transparentize(1 / (1 + props.currentZoomPan.k / 1.5), color);
            color = transparentize(1 / (1 + props.currentZoomPan.k / 1.5), color);

        }

        // are link source and target selected?
        // if (nodesSelected.length) {

        //     color = transparentize(0.1, color);
        //     if (nodesSelected.map((node) => node[props.nodeId]).includes(link[props.linkSource]) && nodesSelected.map((node) => node[props.nodeId]).includes(link[props.linkTarget])) {

        //         color = saturate(0.1,color);
        //         color = lighten(0.2, color);

        //     }

        // }
        return color;
    };

    const linkCurvatureFunction = (link) => {
        
        return typeof props.linkCurvature === "string"
            ?  props.linkCurvature in link
                ? link[props.linkCurvature] 
                : 0
            :  typeof props.linkCurvature === "number"
                ? props.linkCurvature
                : 0
    }

    // const linkDirectionalArrowColorFunction = (link) => link.color

    const linkWidthFunction = (link) => {
        let width = props.linkWidth;
        // is link selected?
        if (props.linksSelected && props.linksSelected.length) {

            width *= 0.9;
            if (props.linksSelected.map((linkSel) => linkSel[props.linkId]).indexOf(link[props.linkId]) !== -1) {

                width *= 4;

            }

        }
        // is link highlighted?
        if (linkIdsNodesDrag.length) {

            width *= 0.9;

            if (linkIdsNodesDrag.indexOf(link[props.linkId]) !== -1) {

                width *= 1.5;

            }

        }
        // are link source and target selected?
        if (props.nodesSelected && props.nodesSelected.length) {

            width *= 0.9;
            if (props.nodesSelected.map((node) => node[props.nodeId]).includes(link[props.linkSource]) && props.nodesSelected.map((node) => node[props.nodeId]).includes(link[props.linkTarget])) {

                width *= 1.5;

            }

        }

        return width;
    };

    const linkLineDashFunction = (link) => {

        return "is_inherited" in link
            ? link.is_inherited
                ? [5,15]
                : null
            : null;

    }

    const linkCanvasObjectFunction = (link, ctx) => {

        // if (linkCurvature || link.__curvature) return;
        if (link.__curvature) return;

        if (!(props.currentZoomPan && ("k" in props.currentZoomPan) && (props.currentZoomPan.k < 0.4))) {
        
            const color = linkColorFunction(link);

            const MAX_FONT_SIZE = 4;
            const LABEL_NODE_MARGIN = props.nodeRelSize * 1.5;

            const start = link[props.linkSource];
            const end = link[props.linkTarget];

            // ignore unbound links
            if (typeof start !== "object" || typeof end !== "object") return;

            // calculate label positioning
            const textPos = Object.assign(...["x", "y"].map((c) => ({
                [c]: start[c] + (end[c] - start[c]) / 2 // calc middle point
            })));

            const relLink = { x: end.x - start.x, y: end.y - start.y };

            const maxTextLength = Math.sqrt(Math.pow(relLink.x, 2) + Math.pow(relLink.y, 2)) - LABEL_NODE_MARGIN * 2;

            let textAngle = Math.atan2(relLink.y, relLink.x);
            // maintain label vertical orientation for legibility
            if (textAngle > Math.PI / 2) textAngle = -(Math.PI - textAngle);
            if (textAngle < -Math.PI / 2) textAngle = -(-Math.PI - textAngle);

            const label = `${link[props.linkLabel]}`;

            // estimate fontSize to fit in link length
            ctx.font = "1px Sans-Serif";
            const fontSize = Math.min(MAX_FONT_SIZE, maxTextLength / ctx.measureText(label).width);
            ctx.font = `${fontSize}px Sans-Serif`;

            const textWidth = ctx.measureText(label).width;
            const bckgDimensions = [textWidth, fontSize].map((n) => n + fontSize * 0.2); // some padding

            // draw text label (with background rect)
            ctx.save();
            ctx.translate(textPos.x, textPos.y);
            ctx.rotate(textAngle);

            ctx.fillStyle = props.backgroundColor;
            ctx.fillRect(- bckgDimensions[0] / 2, - bckgDimensions[1] / 2, ...bckgDimensions);

            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = color;// invert(backgroundColor);
            ctx.fillText(label, 0, 0);
            ctx.restore();

        }

    };


    const onEngineStopFunction = () => {

        // 1. fix coordinates when nodes settle 
        // 2. update graphData props with node fx fy positions
        if (graphDataNodes &&
            graphDataNodes.length && 
            nodeZoomId === null
        ) {

            if (
                props.fixNodes
                ) {
    
                // console.log("onEngineStopFunction");
                
                // if any nodes have settled into coordinates that differ from the fixed coordinates
                if (graphDataNodes.some((node) => node.x !== node.fx || node.y !== node.fy)) { 
    
                    // set the new coordinates as the fixed coordinates
                    setGraphDataNodes((gDataNodes) => gDataNodes.map((node)=> {
        
                            if ("x" in node && "y" in node) {
        
                                node.fx = node.x;
                                node.fy = node.y;
        
                            }
                            return node;
        
                        }));
                    
                    // update nodePreviousFCoordinatesById too (used to 'recover' from nodeZoom view) 
                    setNodePreviousFCoordinatesById((_np) => Object.fromEntries(graphDataNodes
                        .map((node) => [
                            node[props.nodeId],
                            [
                                node.x,
                                node.y
                            ]
                        ])));
    
                    // finally, update graphdata props.
                    // this is needed to avoid resetting coordinates whenever Dash modifies the graphdata.
                    props.setProps(
                        {
                            "graphData": {
                                "links": props.graphData.links,
                                "nodes": graphDataNodes
                            }
                            // "updateNeighbours":false // not necessary since no change in nodes or links 
                    });
                }
    
            }
            // console.log("props.zoomToFit")
            // console.log(props.zoomToFit)
            // console.log("zoomToFitCount")
            // console.log(zoomToFitCount)

            if (props.zoomToFit > zoomToFitCount) {
                
                fgRef.current.zoomToFit(
                    250,
                    10,
                    (node) => !props.nodeIdsInvisibleUser.includes(node[props.nodeId]) && !nodeIdsInvisibleAuto.includes(node[props.nodeId]) 
                )
                setZoomToFitCount((_ztfcnt) => props.zoomToFit);

            }

        }

    };

    // draw backgroundImage
    // const onRenderFramePre = (ctx, globalScale) => {
    //     if (props.externalobject_source === "URL" && props.externalobjectInput) {
    //         // TODO: check if URL is valid
    //         const backgroundImg = new Image();
    //         backgroundImg.src = props.externalobjectInput;
    //         // backgroundImg.width = backgroundImg.width/globalScale
    //         // backgroundImg.height = backgroundImg.height/globalScale
    //         // the stretching needs to be optional
    //         // backgroundImg.width = props.size.width
    //         // const height = window.innerHeight*props.heightRatio
    //         // get the centre of the screen from existing graph or from translating screen to canvas coordinates
    //         // const centreCoordinates = {x:400, y:400}
    //         ctx.drawImage(backgroundImg, centreCoordinates.x - backgroundImg.width / 2,centreCoordinates.y - backgroundImg.height / 2);
    //         // ctx.drawImage(backgroundImg, 0,0);
    //     }
    // };

    const restoreDefaultForcesFunction = () => {

        // console.log("restoreDefaultForcesFunction");
        setGuiSettings( (gs) => ({...gs, 
                    "charge": -45,
                    "center": 0.52,
                    "link": 70,
                    "radial": 0.00
                }
        ))
    }

    
    // const dagNodeFilter = (node) => {
    //     return props.dagNodeIds.includes(node[props.nodeId]) ? true : false;
    // };

    // https://github.com/vasturiano/react-force-graph/issues/199
    // const onDagError = (loopNodeIds) => {};
    /**
     * call methods via higher order component props
     */

    useEffect( () => {

        if (props.graphData.nodes &&
            props.graphData.links &&
            fgRef &&
            "current" in fgRef &&
            fgRef.current &&
            props.emitParticle) {

            // console.log("useEffect: emitParticle");
            fgRef.current.emitParticle(props.emitParticle);

        }

    },[props.emitParticle]);


    useEffect ( 
        () => {

            if (props.graphData.nodes &&
                fgRef &&
                "current" in fgRef &&
                fgRef.current) {

                // console.log("useEffect: pauseAnimation");

                props.pauseAnimation
                    ? fgRef.current.pauseAnimation()
                    : fgRef.current.resumeAnimation();
        
            }
        },
        [props.pauseAnimation]
    )


    // useEffect( () => {
    //     if (pauseAnimation){
    //         fgRef.current.pauseAnimation();
    //     }
    //     setResumeAnimation(false);
    // },[pauseAnimation]);

    // useEffect( () => {
    //     if (resumeAnimation){
    //         fgRef.current.resumeAnimation();
    //     }
    //     setPauseAnimation(false);
    // },[resumeAnimation]);

    // useEffect( () => {
    //     if (props.cameraPosition){
    //         fgRef.current.zoom(...props.cameraPosition)
    //     }
    // },[props.cameraPosition])

    // useEffect( () => {
    //     if (props.refresh){
    //         fgRef.current.refresh()
    //     }
    //     props.setProps({refresh:false})
    // },[props.refresh])


    // useEffect( () => {
    //     // e.g. fgRef.current.d3Force('collide', d3.forceCollide(Graph.nodeRelSize()))
    //     if (props.forceEngine === "d3") {
    //        if ("name" in props.d3Force_define & "force" in props.d3Force_define & "force_args" in props.d3Force_define) {

    //          if (props.d3Force_define.name) {

    //            if (props.d3Force_define.force) {
    //              // define force

    //              fgRef.current.d3Force(props.d3Force_define.name, forceFunction(...props.d3Force_define.force_args))
    //            } else {
    //              // remove force
    //              fgRef.current.d3Force(props.d3Force_define.name, null)
    //            }
    //          }
    //        }
    //      }
    // },[props.d3Force_define])


    // useEffect( () => {
    //   // e.g. fgRef.current.d3Force('charge').strength(-70);
    //   if (props.forceEngine === "d3") {
    //     if ("name" in props.d3Force_call & "method" in props.d3Force_call & "method_args" in props.d3Force_call) {
    //       if (props.d3Force_call.name !== null & props.d3Force_call.method !== null) {
    //         fgRef.current.d3Force(props.d3Force_call.name)[props.d3Force_call.method](...props.d3Force_call.method_args)
    //       }
    //     }
    //   }
    // },[props.d3Force_call])


    // useEffect( () => {
    //     if (props.d3ReheatSimulation && forceEngine === "d3"){
    //         fgRef.current.d3ReheatSimulation()
    //     }
    // },[props.d3ReheatSimulation])

    useEffect( () => {

        if (props.graphData.nodes  &&
            props.getGraphBbox && 
            fgRef &&
            "current" in fgRef &&
            fgRef.current){

            // console.log("useEffect: set grappBbox props");
            props.setProps({"graphBbox":fgRef.current.getGraphBbox()});

        }

    },[props.getGraphBbox]);


    useEffect( () => {

        if (props.graphData.nodes &&
            fgRef &&
            "current" in fgRef &&
            fgRef.current && props.zoom) {

            // console.log("useEffect: zoom");

            fgRef.current.zoom(...props.zoom);

        }

    },[props.zoom]);


    const zoomToFitFunction = () => {

        // console.log("zoomToFitFunction");
        if (fgRef.current) {
            fgRef.current.zoomToFit(
                250,
                10,
                (node) => !props.nodeIdsInvisibleUser.includes(node[props.nodeId]) && !nodeIdsInvisibleAuto.includes(node[props.nodeId]) 
            )
        }
    }


    // useEffect( () => {

    //     if (props.graphData.nodes &&
    //         fgRef &&
    //         "current" in fgRef &&
    //         fgRef.current &&
    //         props.zoomToFit
    //         ) {
            
    //         // console.log("useEffect: zoomToFit");
    //         fgRef.current.zoomToFit(...props.zoomToFit);
    //     }

    // },[props.zoomToFit]);
    /*
    * Send selected state values to the parent component.
    * setProps is a prop that is automatically supplied
    * by dash's front-end ("dash-renderer").
    * In a Dash app, this will update the component's
    * props and send the data back to the Python Dash
    * app server if a callback uses the modified prop as
    * Input or State.
    */

    useEffect( () => {

        // console.log("useEffect: set nodeIdsInvisibleAuto prop");
        props.setProps({"nodeIdsInvisibleAuto":nodeIdsInvisibleAuto});

    },[nodeIdsInvisibleAuto]);


    useEffect( () => {

        // console.log("useEffect: set linkIdsInvisibleAuto prop");
        props.setProps({"linkIdsInvisibleAuto":linkIdsInvisibleAuto});

    },[linkIdsInvisibleAuto]);

    
    useEffect( () => {

        if (props.graphData.nodes &&
            fgRef &&
            "current" in fgRef &&
            fgRef.current &&
            props.centerAtZoom) {

            // console.log("useEffect: centerAtZoom");
            // fgRef.current.centerAt((initZoomPan.x-props.centerAtZoom.x)/props.centerAtZoom.k, (initZoomPan.y-props.centerAtZoom.y)/props.centerAtZoom.k)
            if ("k" in props.centerAtZoom) {

                fgRef.current.zoom(props.centerAtZoom.k)

            }

            if ("x" in props.centerAtZoom && "y" in props.centerAtZoom) {

                const centerAtZoom = props.centerAtZoom

                if (!("ms" in centerAtZoom)) {

                    centerAtZoom.ms = 0;

                }

                fgRef.current.centerAt(centerAtZoom.x, centerAtZoom.y, centerAtZoom.ms)
                
            }

        }
    }, 
    [props.centerAtZoom]
    )


    useEffect( () => {

        // console.log("useEffect: setNodeIdsInvisibleAuto");

        const [
            nodeIdsInvisibleAutoAdded,
            nodeIdsInvisibleAutoRemoved
        ] = [
            props.nodeIdsInvisibleAuto === null
                ? []
                : props.nodeIdsInvisibleAuto.filter((nodeId) => !nodeIdsInvisibleAuto.includes(nodeId)),
            props.nodeIdsInvisibleAuto === null
                ? nodeIdsInvisibleAuto
                : nodeIdsInvisibleAuto.filter((nodeId) => !props.nodeIdsInvisibleAuto.includes(nodeId))
        ];
        
        if (nodeIdsInvisibleAutoAdded.length || nodeIdsInvisibleAutoRemoved.length) {

            setNodeIdsInvisibleAuto((nodeIds) => {

                let nodeIdsOut = nodeIds;

                if (nodeIdsInvisibleAutoAdded.length) {

                    nodeIdsOut = nodeIdsOut.concat(nodeIdsInvisibleAutoAdded);

                }

                if (nodeIdsInvisibleAutoRemoved.length) {

                    nodeIdsOut = nodeIdsOut.filter((nodeId) => !nodeIdsInvisibleAutoRemoved.includes(nodeId));

                }

                return nodeIdsOut

            }
            );

        }

    },
    [props.nodeIdsInvisibleAuto],
    );


    useEffect( () => {

        // console.log("useEffect: setLinkIdsInvisibleAuto");

        const [
            linkIdsInvisibleAutoAdded,
            linkIdsInvisibleAutoRemoved
        ] = [
            props.linkIdsInvisibleAuto ? props.linkIdsInvisibleAuto.filter((linkId) => !linkIdsInvisibleAuto.includes(linkId)) : [],
            props.linkIdsInvisibleAuto ? linkIdsInvisibleAuto.filter((linkId) => !props.linkIdsInvisibleAuto.includes(linkId)) : linkIdsInvisibleAuto
        ];
        
        if (linkIdsInvisibleAutoAdded.length || linkIdsInvisibleAutoRemoved.length) {


            setLinkIdsInvisibleAuto((linkIds) => {

                let linkIdsOut = linkIds;
                if (linkIdsInvisibleAutoAdded.length) {

                    linkIdsOut = linkIdsOut.concat(linkIdsInvisibleAutoAdded);
                }
                if (linkIdsInvisibleAutoRemoved.length) {

                    linkIdsOut = linkIdsOut.filter((linkId) => !linkIdsInvisibleAutoRemoved.includes(linkId));
                }
                return linkIdsOut
            }
            );

        }

    },
    [props.linkIdsInvisibleAuto]
    )


    return (
        <div id={props.id}>
                <ForceGraph2D
                    ref={fgRef}
                    key={props.key}
                    /**
                    * data input
                    */
                    // props
                    autoPauseRedraw={true}
                    graphData={{"nodes":graphDataNodes? graphDataNodes : [], "links": props.graphData.links? props.graphData.links : []}}                    
                    nodeId={props.nodeId}
                    linkSource={props.linkSource}
                    linkTarget={props.linkTarget}
                    /**
                    * container layout
                    */
                    // props
                    width={props.size.width}
                    height={window.innerHeight * props.heightRatio}
                    backgroundColor={props.backgroundColor}
                    // showNavInfo={showNavInfo}
                    // yOffset: 1.5, // AR
                    // glScale: 200 // AR
                    // markerAttrs: { preset: 'hiro' } // AR
                    /**
                    * node styling
                    */
                    nodeRelSize={props.nodeRelSize}
                    nodeVal={props.nodeVal}
                    nodeLabel={nodeLabelFunction}
                    // nodeDesc: "desc" // VR only
                    nodeVisibility={nodeVisibilityFunction}
                    nodeColor={nodeColorFunction}
                    nodeAutoColorBy={props.nodeAutoColorBy}
                    // nodeOpacity={nodeOpacity}
                    //nodeResolution={props.nodeResolution}
                    nodeCanvasObject={nodeCanvasObjectFunction}
                    nodeCanvasObjectMode={nodeCanvasObjectModeFunction}
                    nodePointerAreaPaint={nodePointerAreaPaintFunction}
                    /**
                    * link styling
                    */
                    // linkLabel={props.linkLabel}
                    linkLabel={linkLabelFunction}
                    // linkDesc: "desc", // VR only,
                    linkVisibility={linkVisibilityFunction}
                    linkColor={linkColorFunction}
                    linkAutoColorBy={props.linkAutoColorBy}
                    linkOpacity={props.linkOpacity}
                    linkLineDash={linkLineDashFunction}
                    linkWidth={linkWidthFunction}
                    linkResolution={props.linkResolution}
                    linkCurvature={linkCurvatureFunction}
                    // linkCurveRotation={props.linkCurveRotation} // 3D, VR, AR,
                    // linkMaterial: null, // 3D, VR, AR, not exposed
                    linkCanvasObject={linkCanvasObjectFunction}
                    linkCanvasObjectMode={()=>"after"}
                    linkDirectionalArrowLength={props.linkDirectionalArrowLength}
                    linkDirectionalArrowColor={linkColorFunction}
                    linkDirectionalArrowRelPos={props.linkDirectionalArrowRelPos}
                    linkDirectionalArrowResolution={props.linkDirectionalArrowResolution}
                    linkDirectionalParticles={props.linkDirectionalParticles}
                    linkDirectionalParticleSpeed={props.linkDirectionalParticleSpeed}
                    linkDirectionalParticleWidth={props.linkDirectionalParticleSpeed}
                    linkDirectionalParticleColor={props.linkDirectionalParticleColor}
                    linkDirectionalParticleResolution={props.linkDirectionalParticleResolution}
                    /**
                    * Render control
                    */
                    // extraRenderers={extraRenderers} // not needed as canvas works,
                    // but maybe to align with 3D?
                    rendererConfig={props.rendererConfig}
                    minZoom={props.minZoom}
                    maxZoom={props.maxZoom}
                    // onRenderFramePre={onRenderFramePre}
                    // onRenderFramePost={(ctx, globalScale) => {

                    // }}
                    /**
                    * Render control
                    */
                    // numDimensions={props.numDimensions}
                    forceEngine={props.forceEngine}
                    // dagMode={dagMode}
                    // dagLevelDistance={props.dagLevelDistance}
                    // dagNodeFilter={dagNodeFilter} // TODO: function
                    // onDagError={onDagError}
                    // // // d3AlphaMin={d3AlphaMin}
                    // // d3AlphaDecay={d3AlphaDecay}
                    // d3VelocityDecay={d3VelocityDecay}
                    ngraphPhysics={props.ngraphPhysics}
                    warmupTicks={props.warmupTicks}
                    cooldownTicks={props.cooldownTicks}
                    cooldownTime={props.cooldownTime}
                    // onEngineTick: // TODO: function
                    onEngineStop={onEngineStopFunction}
                    /**
                    * interaction
                    */
                    onNodeClick={handleNodeClick}
                    onNodeRightClick={handleNodeRightClick}
                    // onNodeHover={handleNodeHover}
                    // onNodeCenterHover // not exposed, VR and AR
                    onNodeDrag={handleNodeDrag}
                    onNodeDragEnd={handleNodeDragEnd}
                    onLinkClick={handleLinkClick}
                    onLinkRightClick={handleLinkRightClick}
                    // onLinkHover={handleLinkHover}
                    // onLinkCenterHover // not exposed
                    onBackgroundClick={handleBackgroundClick}
                    onBackgroundRightClick={handleBackgroundRightClick}
                    onZoom={(args) => {
                        console.log("onZoom fired")
                        console.log("props.linkRightClicked")
                        console.log(cloneDeep(props.linkRightClicked))
                        console.log("props.linkRightClickedViewpointCoordinates")
                        console.log(cloneDeep(props.linkRightClickedViewpointCoordinates))
                        console.log("props.nodeRightClicked")
                        console.log(cloneDeep(props.nodeRightClicked))
                        console.log("props.nodeRightClickedViewpointCoordinates")
                        console.log(cloneDeep(props.nodeRightClickedViewpointCoordinates))

                        if ( 
                            args && 
                            ((props.currentZoomPan === null || typeof props.currentZoomPan === "undefined") ||
                                "k" in props.currentZoomPan &&
                                (
                                    props.currentZoomPan.k != args.k || 
                                    props.currentZoomPan.x != args.x ||
                                    props.currentZoomPan.y != args.y)
                                ) && (
                                props.linkRightClicked ||
                                props.linkRightClickedViewpointCoordinates ||
                                props.nodeRightClicked || 
                                props.nodeRightClickedViewpointCoordinates
                            )
                        ) {
                            console.log("onZoom: reset linkRightClicked, linkRightClickedViewpointCoordinates, nodeRightClicked, nodeRightClickedViewpointCoordinates");
                            props.setProps({
                                // we can use nodeRightClickedViewpointCoordinates to trigger menu close without losing nodeRightClicked
                                "linkRightClicked": null,
                                "linkRightClickedViewpointCoordinates":null,
                                "nodeRightClicked": null,
                                "nodeRightClickedViewpointCoordinates": null
                                // "n_nodeRightClicks": null
                            });

                        }

                    }}
                    onZoomEnd={(args) => {
                        // keep track of currentZoomPan
                        // console.log("onZoomEnd")
                        if (
                            args && 
                            ((props.currentZoomPan === null || typeof props.currentZoomPan === "undefined") ||
                                "k" in props.currentZoomPan &&
                                (
                                    props.currentZoomPan.k != args.k || 
                                    props.currentZoomPan.x != args.x ||
                                    props.currentZoomPan.y != args.y
                        ))) {

                            props.setProps({
                                "currentZoomPan":args
                                })
                        }
                        }}
                    linkHoverPrecision={props.linkHoverPrecision}
                    // controlType={controlType}
                    enableNodeDrag={props.enableNodeDrag}
                    enableZoomPanInteraction={props.enableZoomPanInteraction} 
                    // enableNavigationControls={enableNavigationControls} 
                    enablePointerInteraction={props.enablePointerInteraction} 
                    onChange={(e) => {
                        // props.setProps(
                        //     {
                        //     "graphData":e.target.graphData,
                        //     }
                        // );
                    }}
            />
            <div className="dat-gui-div">
                <DatGui
                    data={guiSettings}
                    onUpdate={handleUpdate}
                    >
                    {/* <DatFolder title='graph settings' closed={true}> */}
                    
                        {/* <DatFolder title='Container layout' closed={true}> */}
                            {/* <DatColor path='backgroundColor' label='backgroundColor'/> */}
                            {/* <DatBoolean path='showNavInfo' label='showNavInfo'/> */}
                            {/* </DatFolder> */}
                        <DatFolder title='Graph layout' closed={true}>
                            <DatNumber path='link' label='link' min={0} max={100} step={1} />
                            <DatNumber path='charge' label='charge' min={-100} max={100} step={1} />
                            <DatNumber path='center' label='center' min={0} max={1} step={0.01} />
                            <DatNumber path='radial' label='radial' min={0} max={1} step={0.01} />
                            <DatButton label='restore default forces' onClick={restoreDefaultForcesFunction}/>
                            <DatButton label='reheat simulation' onClick={reheatFunction}/>
                            <DatButton label='zoom to fit' onClick={zoomToFitFunction}/>
                        </DatFolder>
                        {/* <DatFolder title='force engine' closed = {true}> */}
                            {/* <DatSelect path='forceEngine' label='forceEngine' options={["d3", "ngraph"]}/> */}
                            {/* <DatBoolean path='dagModeOn' label='dagModeOn'/> */}
                            {/* <DatSelect path='dagMode' label='dagMode' options={["td", "bu", "lr", "rl", "radialout", "radialin"]}/> */}
                            {/* <DatNumber path='cooldownTime' label='cooldownTime' min={1000} max={15000} step={1000}/> */}
                            {/* <DatBoolean path='fixNodes' label='fix nodes'/> */}
                            
                            {/* </DatFolder> */}
                        {/* <DatFolder title='node and link style' closed={true}>
                            <DatNumber path='nodeLabelRelSize' label='node label size' min={1} max={50} step={1}/> */}
                            {/* <DatNumber path='nodeRelSize' label='node size' min={1} max={50} step={1}/> */}
                            {/* <DatNumber path='nodeOpacity' label='nodeOpacity' min={0} max={1} step={0.1}/> */}
                            {/* <DatBoolean path='useNodeIcon' label='use node icons'/>
                            <DatBoolean path='useNodeImg' label='use node images'/> */}
                            {/* <DatNumber path='linkCurvature' label='link curvature' min={0} max={1} step={0.01}/> */}
                            {/* <DatBoolean path='nodeTextAutoColor' label='nodeTextAutoColor'/> */}
                            {/* </DatFolder> */}
                        {/* <DatFolder title='Link styling' closed={true}>
                            <DatBoolean path='linkAutoColor' label='linkAutoColor'/>
                            <DatColor path='linkColor' label='linkColor'/>
                            <DatNumber path='linkWidth' label='linkWidth' min={0.1} max={5} step={0.1}/> */}
                            {/* <DatNumber path='linkCurvature' label='linkCurvature' min={0} max={1} step={0.1}/> */}
                            {/* </DatFolder> */}
                        {/* <DatFolder title='Interaction' closed = {true}> */}
                            {/* <DatSelect title='controlType' label='controlType' options={["trackball", "orbit", "fly"]}/> */}
                            {/* <DatBoolean path='enableNodeDrag' label='enableNodeDrag'/> */}
                            {/* <DatBoolean path='enableZoomPanInteraction' label='enableZoomPanInteraction'/> */}
                            {/* <DatBoolean path='enableNavigationControls' label='enableNavigationControls'/> */}
                            {/* <DatBoolean path='enablePointerInteraction' label='enablePointerInteraction'/> */}
                            {/* </DatFolder> */}
                        {/* </DatFolder> */}
                </DatGui>
            </div>
        </div>
    );
}
/* eslint-enable max-lines-per-function */
/* eslint-enable max-statements */
/* eslint-enable func-style */

const graphSharedProptypes = {

    /**
     * The ID used to identify this component in Dash callbacks.
     */
    "id": PropTypes.string.isRequired,

    /**
    * The key used to identify this component in React
     */
    "key": PropTypes.string,

    /**
     * Dash-assigned callback that should be called to report property changes
     * to Dash, to make them available for callbacks.
     */
    "setProps": PropTypes.func,

    /**
    * DATA INPUT
    */

    /**
     * Graph data structure. Prop which is provided by user.
     * Can also be used to apply incremental updates. Format {nodes:{}, links:{}}
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
     * Getter/setter for the canvas background color, default transparent
     */
    "backgroundColor": PropTypes.string,

    /**
     * Whether to show the navigation controls footer info.
     */
    // "showNavInfo": PropTypes.bool,

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
     *  controls nodeIcon size, relative to nodeRelSize
     */
    "nodeIconSizeFactor": PropTypes.number,
    
    /**
     *  controls node label size
     */
    "nodeLabelRelSize": PropTypes.number,
    /**
     *  controls nodeImg size, reltive to nodeRelSize
     */
    "nodeImgSizeFactor": PropTypes.number,
    
    /**
     * Node object accessor function or attribute for name (shown in label). Supports plain text or HTML content (except in VR).
     * 2D, 3D and VR
     */
    "nodeLabel":  PropTypes.oneOfType([
        PropTypes.string,
        //PropTypes.func
    ]),

    /**
     *  Ratio of node circle area (square px) [2D] or sphere volume (cubic px) [3D] per value unit.
     */
    "nodeVal": PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        //PropTypes.func
    ]),

    /**
     *  Ratio of node circle area (square px) [2D] or sphere volume (cubic px) [3D] per value unit.
    */
    "nodeCoordinates": PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.number),
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
     * Node text color
     */
     "nodeTextColor": PropTypes.string,

    /**
     * Automatically color node text with inverse of backgroundColor
     */
    "nodeTextAutoColor": PropTypes.bool,

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
     * String giving link color
     */
    "linkColor": PropTypes.string,

    /**
    * Automatically color link with inverse of background color
    */
    "linkAutoColor": PropTypes.bool,

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
    // "linkLineDash": PropTypes.oneOfType([
    //     PropTypes.number,
    //     PropTypes.string,
    // //     PropTypes.func,
    // ]),

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
    // "linkCurveRotation": PropTypes.oneOfType([
    //     PropTypes.number,
    //     PropTypes.string,
    // //    PropTypes.func
    // ]),


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
    // "resumeAnimation": PropTypes.bool,

    /**
    * This method can be used to perform panning on the 2D canvas programmatically. Note that the name is misleading: the arguments result in relative movement, not absolute location. Each of the x, y coordinates is optional, allowing for motion in just one dimension. An optional 3rd argument defines the duration of the transition (in ms) to animate the canvas motion.
    */
    // "centerAt": PropTypes.array,

    /**
    * calls centerAt, then zoom. Takes an object with keys "k", "x", "y"
    */
    "centerAtZoom": PropTypes.objectOf(PropTypes.number),

    /**
    * Automatically zooms/pans the canvas so that all of the nodes fit inside it. If no nodes are found no action is taken. It accepts two optional arguments: the first defines the duration of the transition (in ms) to animate the canvas motion (default: 0ms). The second argument is the amount of padding (in px) between the edge of the canvas and the outermost node (default: 10px). The third argument specifies a custom node filter: node => <boolean>, which should return a truthy value if the node is to be included. This can be useful for focusing on a portion of the graph. 2D, 3D
    */
    // "zoomToFit": PropTypes.arrayOf(PropTypes.number),

    /**
    * Re-position the camera, in terms of x, y, z coordinates. Each of the coordinates is optional, allowing for motion in just some dimensions. The optional second argument can be used to define the direction that the camera should aim at, in terms of an {x,y,z} point in the 3D space. The 3rd optional argument defines the duration of the transition (in ms) to animate the camera motion. A value of 0 (default) moves the camera immediately to the final position. By default the camera will face the center of the graph at a z distance proportional to the amount of nodes in the system. 3D
    */
    // "cameraPosition": PropTypes.array,

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
    // "dagMode": PropTypes.string,

    /**
    * Apply layout constraints based on the graph directionality. Only works correctly for DAG graph structures (without cycles). Choice between td (top-down), bu (bottom-up), lr (left-to-right), rl (right-to-left), zout (near-to-far), zin (far-to-near), radialout (outwards-radially) or radialin (inwards-radially).
    */
    // "dagModeOn": PropTypes.bool,

    /**
    * If dagMode is engaged, this specifies the distance between the different graph depths.
    */
    // "dagLevelDistance": PropTypes.number,

    /**
    * Node accessor function to specify nodes to ignore during the DAG layout processing. This accessor method receives a node object and should return a boolean value indicating whether the node is to be included. Excluded nodes will be left unconstrained and free to move in any direction.
    */
    // dagNodeFilter: PropTypes.func, // not exposed

    /**
    * Callback to invoke if a cycle is encountered while processing the data structure for a DAG layout. The loop segment of the graph is included for information, as an array of node ids. By default an exception will be thrown whenever a loop is encountered. You can override this method to handle this case externally and allow the graph to continue the DAG processing. Strict graph directionality is not guaranteed if a loop is encountered and the result is a best effort to establish a hierarchy.
    */
    // onDagError: PropTypes.func,

    /**
    * array of string ids for nodes to include in DAG layout
    */

    // "dagNodeIds": PropTypes.arrayOf(PropTypes.string),

    /**
    * Sets the simulation alpha min parameter. Only applicable if using the d3 simulation engine.
    */
    // "d3AlphaMin": PropTypes.number,

    /**
    * Sets the simulation intensity decay parameter. Only applicable if using the d3 simulation engine.
    */
    // "d3AlphaDecay": PropTypes.number,

    /**
    * Nodes' velocity decay that simulates the medium resistance. Only applicable if using the d3 simulation engine.
    */
    // "d3VelocityDecay": PropTypes.number,

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
     * Whether to fix node coordinates after simulation has cooled
     */
    "fixNodes": PropTypes.bool,

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

    //"d3Force_define": PropTypes.object,

        /**
     * object to call a method on an existing simulation force. E.g.
     * d3Force_call_method = {
     *    "name": "charge", // the name to which the force is assigned
     *    "method": "strength", // the name of a method to call on the force
     *    "method_args": [-50], // array of args to pass to force method
     *
     */

    //"d3Force_call": PropTypes.object,

    /**
     * Reheats the force simulation engine, by setting the alpha value to 1. Only applicable if using the d3 simulation engine.
     */
    // "d3ReheatSimulation": PropTypes.bool,

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
    * Calls zoom() method. ([number], [ms])
    */
    "zoom": PropTypes.arrayOf(PropTypes.number), // not exposed


    // "backgroundRightClickScreenCoords": PropTypes.objectOf(PropTypes.number),
    /**
    * Calls centerAt() method. ([x], [y], [ms])
    */
    // centerAt: PropTypes.arrayOf(PropTypes.number), // not exposed
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
    "enableZoomPanInteraction": PropTypes.bool,

    /**
     * Whether to enable the trackball navigation controls used to move the camera using mouse interactions (rotate/zoom/pan).
     */
    "enableNavigationControls":PropTypes.bool,

    /**
     * Whether to enable the mouse tracking events. This activates an internal tracker of the canvas mouse position and enables the functionality of object hover/click and tooltip labels, at the cost of performance. If you're looking for maximum gain in your graph performance it's recommended to switch off this property.
     */
    "enablePointerInteraction":PropTypes.bool,

    /**
    * Whether to enable the user interaction to drag nodes by click-dragging. If enabled, every time a node is dragged the simulation is re-heated so the other nodes react to the changes. Only applicable if enablePointerInteraction is true.
    */
    "enableNodeDrag": PropTypes.bool,

    /**
    * UTILITY
    */

    /**
    * Returns the current bounding box of the nodes in the graph, formatted as { x: [<num>, <num>], y: [<num>, <num>], z: [<num>, <num>] }. 
    * If no nodes are found, returns null. Accepts an optional argument to define a custom node filter: node => <boolean>, which should return a truthy value if the node is to be included. 
    * This can be useful to calculate the bounding box of a portion of the graph.
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
    // "nodeURL": PropTypes.string,

    /**
    * Whether or not to use the nodeImg. Overrides nodeIcon
    */
    // "useNodeImg": PropTypes.bool,

    /**
    * The node attribute containing url to image to display for each individual node
    */
    "nodeImg": PropTypes.string,

    /**
    * Whether or not to use the nodeIcon
    */
    // "useNodeIcon": PropTypes.bool,

    /**
    * The node attribute containing object with icon to display for each individual node.
    */
    "nodeIcon": PropTypes.string,

    /**
    * object with keys being fonts (string) and values being CSS sheets
    */
    // "nodeIcon_fontsheets": PropTypes.object,

    /**
    * The link attribute containing the unique link id
    */
    "linkId": PropTypes.string,

    /**
    * whether or not graphData has changed. Internally, sets interactive to False until (mainly used internally)
    */
    // "updated": PropTypes.bool,

    /**
    * id of node to zoom to
    */
    "nodeZoomId": PropTypes.string,

    /**
    * in zoom view, node attribute to sort relations by first
    */
    "sortRelsBy1":PropTypes.string,

    /**
    * in zoom view, node attribute to sort relations by after first sort
    */
    "sortRelsBy2":PropTypes.string,

    /**
    * in zoom view, node attribute to sort role players by first
    */
    "sortRoleplayersBy1":PropTypes.string,

    /**
    * in zoom view, node attribute to sort role players by after first sort
    */
    "sortRoleplayersBy2":PropTypes.string,

    /**
    * sort in descending order?
    */
    "sortRels1Descend":PropTypes.bool,

    /**
    * sort in descending order?
    */
    "sortRels2Descend":PropTypes.bool,

    /**
    * sort in descending order?
    */
    "sortRoleplayers1Descend":PropTypes.bool,

    /**
    * sort in descending order?
    */
    "sortRoleplayers2Descend":PropTypes.bool,

    /**
    * selected (clicked) nodes
    */
    "nodesSelected": PropTypes.arrayOf(
        PropTypes.object
    ),

    // "linksSelected": PropTypes.arrayOf(
    //     PropTypes.object
    // ),
    /**
    * ids of nodes highlighted due to being dragged
    */
    // "nodeIdsDrag": PropTypes.arrayOf(
    //     PropTypes.string
    // ),

    /**
    * left-clicked node
    */
    "nodeClicked": PropTypes.object,

    /**
    * right-clicked node
    */
    "nodeRightClicked": PropTypes.object,

    /**
    *  screen coordinates of right-clicked node
    */
    "nodeRightClickedViewpointCoordinates": PropTypes.objectOf(PropTypes.number),


    "linkRightClickedViewpointCoordinates": PropTypes.objectOf(PropTypes.number),

    /**
    * the currently hovered node
    */
    // "nodeHovered": PropTypes.object,

    /**
    *  screen coordinates of hovered node
    */
    // "nodeHoveredViewpointCoordinates": PropTypes.objectOf(PropTypes.number),

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
    // "linkHovered": PropTypes.object,

    /**
    *  selected (clicked) links
    */
    "linksSelected": PropTypes.arrayOf(
        PropTypes.object
    ),

    /**
    * ids of links highlighted due to being dragged
    */
    // "linkIdsNodesDrag": PropTypes.arrayOf(
    //     PropTypes.string
    // ),

    minZoom: PropTypes.number,

    maxZoom: PropTypes.number,
    /**
    * ids of highlighted nodes (through search)
    */
    "nodeIdsHighlightUser": PropTypes.arrayOf(PropTypes.string),

    /**
     * ids of visible nodes. Not to be supplied by user. Available to allow for saving state 
     */
    "nodeIdsInvisibleAuto": PropTypes.arrayOf(PropTypes.string),

    /**
     * ids of invisible nodes supplied by user as prop
     */
    "nodeIdsInvisibleUser": PropTypes.arrayOf(PropTypes.string),

    /**
    * ids of highlighted links (through search)
    */
    "linkIdsHighlightUser": PropTypes.arrayOf(PropTypes.string),

    "linkIdsInvisibleAuto": PropTypes.arrayOf(PropTypes.string),
    /**
     * ids of visible links
     */
    "linkIdsInvisibleUser": PropTypes.arrayOf(PropTypes.string),

    /**
    * externalobject_source:
    */
    "externalobject_source": PropTypes.string,

    /**
    * externalobject_source:
    */
    "externalobjectInput": PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.bool,
        PropTypes.array,
        PropTypes.object]),
    /**
    * addNodeNeighbours: if false, user must add neighbours to each node in graphdata before passing the prop.
    */
    // "addNodeNeighbours": PropTypes.bool,
    
    /**
    * origin graph coordinates. Read only! Updated when component initialized (and on zoom? https://github.com/vasturiano/react-force-graph/issues/33)
    */
    // "centreCoordinates": PropTypes.objectOf(PropTypes.number),

    /**
    * useCoordinates: whether to set nodeCoordinates for node coordinates
    */
    "useCoordinates": PropTypes.bool,

    /**
    * pixelUnitRatio: if node attribute (in some unit of measurement) is used as coordinates, pixel:unit scale
    */
    "pixelUnitRatio": PropTypes.number,

    /**
    * showCoordinates: whether or not to show pointer coordinates in hover tooltip (not yet used)
    */
    "showCoordinates": PropTypes.bool,

    /**
    * gravity: not yet used, prop to change three gravity. Not used in 2D
    */
    // "gravity": PropTypes.string,

    /**
    * node props to hide on hover, in addition to any with prop name prefixed by "__"
    */
    // "invisibleProps": PropTypes.arrayOf(PropTypes.string),

    /**
    * max levels of neighbourhood selection around a node by repeat clicking
    */
    "maxDepth_neighbours_select": PropTypes.number,

    "currentZoomPan":PropTypes.object,

    
    // As default, if no node or link ids have changed, the component usually skips cloning graphData and re-rendering.
    // These 'update' props can be set to True to force an update of node coordinates, neighbours or styles, respectively.
    // if set to False, that update is skipped. 
    // If left as null, the update occurs iff any node or link ids have (dis)apeared.
    // NB: if link styles have changed, just clone graphData before passing it to the Dash component, 
    // as it is provided directly to ForceGraph2D 

    "updateNeighbours": PropTypes.bool,
    
    "forceRefresh": PropTypes.number,

    "zoomToFit": PropTypes.number,
    
    "n_nodeRightClicks": PropTypes.number,
    "n_linkRightClicks": PropTypes.number,
    // "redraw": PropTypes.number
    "scripts":PropTypes.arrayOf(PropTypes.string)

};

Graph2D.propTypes = graphSharedProptypes;

objSharedProps.id = "Graph2D";

Graph2D.defaultProps = objSharedProps;

export default withSizeHOC(Graph2D);
/* eslint-enable max-lines */