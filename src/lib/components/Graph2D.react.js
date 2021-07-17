/* eslint-disable max-lines */
/* eslint-disable no-ternary */
/* eslint-disable no-nested-ternary */
/* eslint-disable sort-imports */
/* eslint-disable capitalized-comments */
import {ForceGraph2D} from "react-force-graph";
import {cloneDeep} from "lodash";
import {forceRadial} from "d3-force";
import DatGui, {
    DatBoolean,
    DatButton,
    DatColor,
    DatFolder,
    DatNumber,
    DatSelect
} from "react-dat-gui";
import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import validateColor from "validate-color";
import importScript from "../customHooks/importScript.js";

// import useFontFace from '../customhooks/useFontFace.js';

// import {forceCenter, forceManyBody, forceLink, forceRadial} from "d3";

// import * as material_UI from '@material-ui/icon_s';
// doesn't work: Module not found: Error: Can't resolve '@material-ui/icons' in '/Users/rkm916/Sync/projects/2020-dashforcegraph/src/lib/components'

// See https://stackoverflow.com/questions/42051588/wildcard-or-asterisk-vs-named-or-selective-import-es6-javascript

import {darken, invert, lighten, saturate} from "polished";
import {withSize} from "react-sizeme";
import objSharedProps from "../shared_props_defaults.js";
import "react-dat-gui/dist/index.css";
/* eslint-enable sort-imports */

// Use react resize-me to make canvas container width responsive
const withSizeHOC = withSize({
    "monitorHeight": false,
    "monitorWidth": true, "noPlaceholder": true
});
/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
/* eslint-disable func-style */

function Graph2D (props) {

    // Initialise props that can be changed from within component as state
    const [
        [
            backgroundColor,
            setBackgroundColor
        ],
        [
            showNavInfo,
            setShowNavInfo
        ],
        [
            nodeRelSize,
            setNodeRelSize
        ],
        [
            nodeIconRelSize,
            setNodeIconRelSize
        ],
        [
            nodeImgRelSize,
            setNodeImgRelSize
        ],
        [
            nodeOpacity,
            setNodeOpacity
        ],
        [
            useNodeImg,
            setUseNodeImg
        ],
        [
            useNodeIcon,
            setUseNodeIcon
        ],
        [
            forceEngine,
            setForceEngine
        ],
        [
            cooldownTime,
            setCooldownTime
        ],
        [
            fixNodes,
            setFixNodes
        ],
        // [
        //     dagModeOn,
        //     setDagModeOn
        // ],
        // [
        //     dagMode,
        //     setDagMode
        // ],
        [
            controlType,
            setControlType
        ],
        [
            enableNodeDrag,
            setEnableNodeDrag
        ],
        [
            enableZoomPanInteraction,
            setEnableZoomPanInteraction
        ],
        [
            enableNavigationControls,
            setEnableNavigationControls
        ],
        [
            enablePointerInteraction,
            setEnablePointerInteraction
        ],
        [
            nodeClicked,
            setNodeClicked
        ],
        [
            nodeClickedViewpointCoordinates,
            setNodeClickedViewpointCoordinates
        ],
        [
            nodeRightClicked,
            setNodeRightClicked
        ],
        [
            nodeRightClickedViewpointCoordinates,
            setNodeRightClickedViewpointCoordinates
        ],
        [
            linkClicked,
            setLinkClicked
        ],
        [
            linkRightClicked,
            setLinkRightClicked
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
            nodeIdsVisible,
            setNodeIdsVisible
        ],
        [
            linkIdsVisible,
            setLinkIdsVisible
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
            pauseAnimation,
            setPauseAnimation
        ],
        [
            resumeAnimation,
            setResumeAnimation
        ],
        [
            graphBbox,
            setGraphBbox
        ],
        [
            nodesSelected,
            setNodesSelected
        ],
        [
            linksSelected,
            setLinksSelected
        ],
        [
            centreCoordinates,
            setCentreCoordinates
        ],
        [
            graphDataIdsAll,
            setGraphDataIdsAll
        ],
        [
            nodeTextAutoColor,
            setNodeTextAutoColor
        ],
        [
            linkAutoColor,
            setLinkAutoColor
        ],
        [
            linkColor,
            setLinkColor
        ],
        [
            linkWidth,
            setLinkWidth
        ],
        // [
        //     linkCurvature,
        //     setLinkCurvature
        // ],
        [
            guiSettings,
            setGuiSettings
        ],
        fgRef
    ] = [
        useState(props.backgroundColor),
        useState(props.showNavInfo),
        useState(props.nodeRelSize),
        useState(props.nodeIconRelSize),
        useState(props.nodeImgRelSize),
        useState(props.nodeOpacity),
        useState(props.useNodeImg),
        useState(props.useNodeIcon),
        useState(props.forceEngine),
        useState(props.cooldownTime),
        useState(props.fixNodes),
        // useState(props.dagModeOn),
        // useState(props.dagMode),
        useState(props.controlType),
        useState(props.enableNodeDrag),
        useState(props.enableZoomPanInteraction),
        useState(props.enableNavigationControls),
        useState(props.enablePointerInteraction),
        useState(null),
        useState(null),
        useState(null),
        useState(null),
        useState(null),
        useState(null),
        useState([]),
        useState([]),
        useState(null),
        useState(props.nodeIdsVisible),
        useState(props.linkIdsVisible),
        useState(props.nodeIdsHighlight),
        useState(props.linkIdsHighlight),
        useState(false),
        useState(true),
        useState(null),
        useState([]),
        useState([]),
        useState({
            "x": 1000,
            "y": 1000
        }),
        useState({
            "links": new Set(),
            "nodes": new Set()
        }),
        useState(false),
        useState(true),
        useState(props.linkColor),
        useState(props.linkWidth),
        // useState(props.linkCurvature),
        useState({
            "backgroundColor": props.backgroundColor,
            "center": 0.52,
            "charge": -10,
            "controlType": props.controlType,
            "cooldownTime": props.cooldownTime,
            // "dagMode": props.dagMode,
            // "dagModeOn": props.dagModeOn,
            "enableNavigationControls": props.enableNavigationControls,
            "enableNodeDrag": props.enableNodeDrag,
            "enablePointerInteraction": props.enablePointerInteraction,
            "enableZoomPanInteraction": props.enableZoomPanInteraction,
            "fixNodes": props.fixNodes,
            "forceEngine": props.forceEngine,
            "link": 50,
            "linkAutoColor": props.linkAutoColor,
            "linkColor": props.linkColor,
            // "linkCurvature": props.linkCurvature,
            "linkWidth": props.linkWidth,
            "nodeIconRelSize": props.nodeIconRelSize,
            "nodeImgRelSize": props.nodeImgRelSize,
            "nodeOpacity": props.nodeOpacity,
            "nodeRelSize": props.nodeRelSize,
            "nodeTextAutoColor": props.nodeTextAutoColor,
            "radial": 0.0,
            "showNavInfo": props.showNavInfo,
            "useNodeIcon": props.useNodeIcon,
            "useNodeImg": props.useNodeImg
        }),
        useRef(null)
    ];

    //const [nodeHovered,setNodeHovered] = useState(null)

    //const [linkHovered,setLinkHovered = useState(null)

    // const [
        // nodeHoveredViewpointCoordinates,
        // setNodeHoveredViewpointCoordinates] = useState(null)

    // Import scripts https://fontawesome.com/kits/a6e0eeba63/use?welcome=yes
    Object.keys(props.nodeIcon_fontsheets).map((key) => {

        importScript(props.nodeIcon_fontsheets[key]);
        // useFontFace(key, props.nodeIcon_fontsheets[key])
    });

    useEffect(
        () => {

            /**
             * Add radial force
             * https://github.com/vasturiano/3d-force-graph/issues/228#
             */

            fgRef.current.d3Force(
                "radial",
                forceRadial()
                    .radius(0)
                    .strength(0.00)
            );
            // Math.pow(Math.sqrt(node.x)+Math.sqrt(node.y),2)/2
            const [
                newStrength,
                newDistMax
            ] = [
                -50,
                100
            ];
            // Add negative charge and lower effective distance
            fgRef.current.d3Force("charge")
                .strength(newStrength)
                .distanceMax(newDistMax);

        },
        []
    );

    // Update current state with changes from controls
    /* eslint-disable one-var */
    const handleUpdate = (newData) => setGuiSettings({...guiSettings,
        ...newData});
    /* eslint-enable one-var */

    useEffect(
        () => {
            setBackgroundColor(guiSettings.backgroundColor);
            setShowNavInfo(guiSettings.showNavInfo);
            setNodeRelSize(guiSettings.nodeRelSize);
            setNodeIconRelSize(guiSettings.nodeIconRelSize);
            setNodeImgRelSize(guiSettings.nodeImgRelSize);
            setNodeOpacity(guiSettings.nodeOpacity);
            setUseNodeImg(guiSettings.useNodeImg);
            setUseNodeIcon(guiSettings.useNodeIcon);
            setNodeTextAutoColor(guiSettings.nodeTextAutoColor);
            setLinkAutoColor(guiSettings.linkAutoColor);
            setLinkColor(guiSettings.linkColor);
            setLinkWidth(guiSettings.linkWidth);
            // setLinkCurvature(guiSettings.linkCurvature);
            setForceEngine(guiSettings.forceEngine);
            if (forceEngine === "d3") {

                fgRef.current
                    .d3Force("link")
                    .distance((link) => guiSettings.link);
                fgRef.current
                    .d3Force("charge")
                    .strength(() => guiSettings.charge);
                fgRef.current
                    .d3Force("center")
                    .strength(() => guiSettings.center);
                fgRef.current
                    .d3Force("radial")
                    .strength(() => guiSettings.radial);

                // setD3AlphaMin(guiSettings.d3AlphaMin)

                // setD3AlphaDecay(guiSettings.d3AlphaDecay)

                // setD3VelocityDecay(guiSettings.d3VelocityDecay)

                fgRef.current.d3ReheatSimulation();

            }

            /**
             * dagMode only works with d3 forceengine,
             * but hooks cannot be inside a conditional block
             */

            // setDagModeOn(guiSettings.dagModeOn);
            // setDagMode(dagModeOn || guiSettings.dagModeOn
            //     ? guiSettings.dagMode
            //     : null);
            setFixNodes(guiSettings.fixNodes);
            setCooldownTime(guiSettings.cooldownTime);
            setControlType(guiSettings.controlType);
            setEnableNodeDrag(guiSettings.enableNodeDrag);
            setEnableZoomPanInteraction(guiSettings.enableZoomPanInteraction);
            setEnableNavigationControls(guiSettings.enableNavigationControls);
            setEnablePointerInteraction(guiSettings.enablePointerInteraction);

        },
        [guiSettings]
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
    //     console.log("document.activeElement")
    //     console.log(document.activeElement)
    //     console.log("fgRef.current")
    //     console.log(fgRef.current)
    //     console.log("document.activeElement === fgRef.current")
    //     console.log(document.activeElement === fgRef.current)
    //     props.setProps({focused:document.activeElement === fgRef.current})
    //     //}
    // });


    /**
     * Check whether any node or links ids have changed
     * by comparing graphDataIdsAll and ids in new props.graphData prop
     * Whenever node and/or link ids change, update graphData in place
     * To each node, add "__source" and "__target" attributes,
     * containing a dict, with linkLabels as keys,
     * and dicts of {linkid1:nodeid1, linkid2:nodeid2..} as values.
     * Then add coordinates if fixed coordinate attributes are used.
     * Finally, update nodesById 
     */

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
    /* eslint-enable one-var */

    if (nodeIdsAddedNew.size ||
        nodeIdsRemovedNew.size ||
        linkIdsAddedNew.size ||
        linkIdsRemovedNew.size) {

        /**
         * Fine for setGraphDataIdsAll to update asynchronously
         * since we only need it on the next render
         */

        setNodeZoomId(null);

        setGraphDataIdsAll({
            "links": linkIdsAllNew,
            "nodes": nodeIdsAllNew
        });

        // console.log("detected new props.graphData, update neighbours");
        // console.log("graphDataIdsAll");
        // console.log(graphDataIdsAll);
        // console.log("props.graphData");
        // console.log(props.graphData);

        /**
         * Initialise __source and __target
         */

        props.graphData.nodes.forEach((node) => {

            node.__source = {};
            node.__target = {};

        });

        if (props.graphData.links.length) {

            const nodeIds = props.graphData.nodes.map((node) => node[props.nodeId]);
            props.graphData.links.forEach((link) => {

                const [
                    idxSourceNode,
                    idxTargetNode
                ] = [
                    nodeIds.indexOf(link[props.linkSource]),
                    nodeIds.indexOf(link[props.linkTarget])
                ];
                // If not props.linkLabel in link, set to link id
                if (!(props.linkLabel in link)) {

                    link[props.linkLabel] = link[props.linkId];

                }

                // If link label type not in node.__source, add key
                if (!(link[props.linkLabel] in props.graphData.nodes[idxSourceNode].__source)) {

                    props.graphData.nodes[idxSourceNode]
                        .__source[link[props.linkLabel]] = {};

                }

                props.graphData.nodes[idxSourceNode]
                    .__source[link[props.linkLabel]][link[props.linkId]] = link[props.linkTarget];

                // If link label type not in node.__target, add key
                if (!(link[props.linkLabel] in props.graphData.nodes[idxTargetNode].__target)) {

                    props.graphData.nodes[idxTargetNode].__target[link[props.linkLabel]] = {};

                }

                props.graphData.nodes[idxTargetNode]
                    .__target[link[props.linkLabel]][link[props.linkId]] =
                        link[props.linkSource];

            })

        }

        if (props.useCoordinates && props.pixelUnitRatio) {

            // Fix node coordinates to attribute values

            /* eslint-disable one-var */
            const origin = centreCoordinates
                ? centreCoordinates
                : {
                /* eslint-disable no-magic-numbers */
                    "x": 1000,
                    "y": 1000
                    /* eslint-enable no-magic-numbers */
                };
            /* eslint-enable one-var */
    
            props.graphData.nodes.forEach((node) => {
    
                const [
                    newX,
                    newY
                ] = [
                    props.pixelUnitRatio * node.__coord_x,
                    props.pixelUnitRatio * node.__coord_y
                ];
                node.fx = origin + newX;
                node.fy = origin + newY;

            });

        }

        // console.log("props.graphData after adding neighbours and coordinates:");
        // console.log(props.graphData);

    } 

    const nodesById = Object.fromEntries(
        props.graphData.nodes.map((node) => [
            node[props.nodeId],
            node
    ]));

    /* eslint-disable complexity */
    /* eslint-disable max-depth */
    useEffect(() => {

        /**
         * an effect that runs when nodeZoomId changes
         * using useEffect allows for entering but also resetting nodeZoom view
         */

        if (props.graphData.nodes.length > 1) {

            const [
                nodeIdsVisibleNew,
                linkIdsVisibleNew
            ] = [
                [],
                []
            ];

            // console.log("UseEffect: nodeZoom");

            if (nodeZoomId) {

                nodeIdsVisibleNew.push(nodeZoomId);

                const [
                    marX,
                    marYMin,
                    nodeZoom,
                    relations,
                    related
                ] = [
                    60,
                    20,
                    nodesById[nodeZoomId],
                    [],
                    []
                ];

                nodeZoom.fx = nodeZoom.x;
                nodeZoom.fy = nodeZoom.y + marYMin / 2; // shift a bit to avoid overlap

                if (Object.values(nodeZoom.__source).length) {

                    for (const [role, obj] of Object.entries(nodeZoom.__source)) {

                        for (const [linkId, relId] of Object.entries(obj)) {

                            const relNode = nodesById[relId];
                            relations.push({
                                "relation": relNode,
                                "roleplayers": []
                            });
                            linkIdsVisibleNew.push(linkId);
                            nodeIdsVisibleNew.push(relId);
                            if (Object.values(relNode.__target).length) {

                                for (const [
                                    role1,
                                    obj1
                                ] of Object.entries(relNode.__target)) {

                                    for (const [
                                        linkId1,
                                        rpId
                                    ] of Object.entries(obj1)) {

                                        if (!nodeIdsVisibleNew.includes(rpId)) {

                                            // only allow role players to be placed once
                                            relations[relations.length - 1]
                                                .roleplayers.push(nodesById[rpId]);
                                            nodeIdsVisibleNew.push(rpId);

                                        }
                                        // .. but always make the link visible
                                        linkIdsVisibleNew.push(linkId1);

                                    }

                                }

                            }

                        }

                    }

                }

                if (Object.values(nodeZoom.__target).length) {

                    for (const [
                        role,
                        obj
                    ] of Object.entries(nodeZoom.__target)) {

                        for (const [
                            linkId,
                            rpId
                        ] of Object.entries(obj)) {

                            linkIdsVisibleNew.push(linkId);
                            if (!nodeIdsVisibleNew.includes(rpId)) {

                                related.push(nodesById[rpId]);
                                nodeIdsVisibleNew.push(rpId);

                            }

                        }

                    }

                }

                /**
                 * sort nodes
                 */
                if (true) {
                    // relations

                    // first rel sort

                    if (props.sortRelsBy1) {

                        // find out the attribute type

                        const relObjRelHasAttr = relations
                            .find((relObj) => props.sortRelsBy1 in relObj.relation);
                        if (typeof relObjRelHasAttr !== "undefined") {

                            if (typeof relObjRelHasAttr.relation[props.sortRelsBy1] === "string") {

                                relations.sort((objA, objB) => {

                                    return props.sortRelsBy1 in objA.relation && props.sortRelsBy1 in objB.relation
                                        ? objA.relation[props.sortRelsBy1].localeCompare(objB.relation[props.sortRelsBy1]) > 0
                                            ? props.sortRels1Descend
                                                ? -1
                                                : 1
                                            : -1
                                        : 0;

                                });

                            } else if (typeof relObjRelHasAttr.relation[props.sortRelsBy1] === "number") {

                                relations.sort((objA, objB) => {
                                    return props.sortRelsBy1 in objA.relation && props.sortRelsBy1 in objB.relation
                                        ? objB.relation[props.sortRelsBy1] - objB.relation[props.sortRelsBy1] > 0
                                            ? props.sortRels1Descend
                                                ? -1
                                                : 1
                                            : -1
                                        : 0;
                                });

                            } else if (typeof relObjRelHasAttr.relation[props.sortRelsBy1] === "boolean") {

                                relations.sort((objA, objB) => {

                                    return props.sortRelsBy1 in objA.relation && props.sortRelsBy1 in objB.relation
                                        ? objA.relation[props.sortRelsBy1] > objB.relation[props.sortRelsBy1]
                                            ? props.sortRels1Descend
                                                ? -1
                                                : 1
                                            : -1
                                        : 0;

                                });

                            }

                        }

                    }
                    // second rel sort
                    if (props.sortRelsBy2) {

                        // find out the attribute type
                        const relObjRelHasAttr = relations.find((relObj) => props.sortRelsBy2 in relObj.relation);

                        if (typeof relObjRelHasAttr !== "undefined") {

                            if (typeof relObjRelHasAttr.relation[props.sortRelsBy2] === "string") {

                                relations.sort((objA, objB) => {

                                    return props.sortRelsBy2 in objA.relation && props.sortRelsBy2 in objB.relation
                                        ? objA.relation[props.sortRelsBy2].localeCompare(objB.relation[props.sortRelsBy2]) > 0
                                            ? props.sortRels2Descend
                                                ? -1
                                                : 1
                                            : -1
                                        : 0;

                                });

                            } else if (typeof relObjRelHasAttr.relation[props.sortRelsBy2] === "number") {

                                relations.sort((objA, objB) => {

                                    return props.sortRelsBy2 in objA.relation && props.sortRelsBy2 in objB.relation
                                        ? objA.relation[props.sortRelsBy2] - objB.relation[props.sortRelsBy2] > 0
                                            ? props.sortRels2Descend
                                                ? -1
                                                : 1
                                            : -1
                                        : 0;

                                });

                            } else if (typeof relObjRelHasAttr.relation[props.sortRelsBy2] === "boolean") {

                                relations.sort((objA, objB) => {

                                    return props.sortRelsBy2 in objA.relation && props.sortRelsBy2 in objB.relation
                                        ? objA.relation[props.sortRelsBy2] > objB.relation[props.sortRelsBy2]
                                            ? props.sortRels2Descend
                                                ? -1
                                                : 1
                                            : -1
                                        : 0;

                                });

                            }

                        }

                    }

                    // Sort role players

                    // First role player sort

                    if (props.sortRoleplayersBy1) {

                        // Relation role players

                        // Find out the attribute type
                        let nodeRelRpHasAttr = undefined;

                        for (const relObj of relations) {

                            nodeRelRpHasAttr = relObj.roleplayers.find((rp) => props.sortRoleplayersBy1 in rp);
                            if (typeof nodeRelRpHasAttr !== "undefined") {

                                break;

                            }

                        }
                        if (typeof nodeRelRpHasAttr !== "undefined") {

                            for (const relObj of relations) {

                                if (typeof nodeRelRpHasAttr[props.sortRoleplayersBy1] === "string") {

                                    relObj.roleplayers.sort((objA, objB) => {

                                        return props.sortRoleplayersBy1 in objA && props.sortRoleplayersBy1 in objB
                                            ? objA[props.sortRoleplayersBy1].localeCompare(objB[props.sortRoleplayersBy1]) > 0
                                                ? props.sortRoleplayers1Descend
                                                    ? -1
                                                    : 1
                                                : -1
                                            : 0;

                                    });

                                } else if (typeof nodeRelRpHasAttr[props.sortRoleplayersBy1] === "number") {

                                    relObj.roleplayers.sort((objA, objB) => {

                                        return props.sortRoleplayersBy1 in objA && props.sortRoleplayersBy1 in objB
                                            ? objA[props.sortRoleplayersBy1] - objB[props.sortRoleplayersBy1] > 0
                                                ? props.sortRoleplayers1Descend
                                                    ? -1
                                                    : 1
                                                : -1
                                            : 0;

                                    });

                                } else if (typeof nodeRelRpHasAttr[props.sortRoleplayersBy1] === "boolean") {

                                    relObj.roleplayers.sort((objA, objB) => {

                                        return props.sortRoleplayersBy1 in objA && props.sortRoleplayersBy1 in objB
                                            ? objA[props.sortRoleplayersBy1] > objB[props.sortRoleplayersBy1]
                                                ? props.sortRoleplayers1Descend
                                                    ? -1
                                                    : 1
                                                : -1
                                            : 0;

                                    });

                                }

                            }

                        }

                        // Related role players

                        // Find out the attribute type

                        let nodeRpHasAttr = related.find((rp) => props.sortRoleplayersBy1 in rp);

                        if (typeof nodeRpHasAttr !== "undefined") {

                            if (typeof nodeRpHasAttr[props.sortRoleplayersBy1] === "string") {

                                related.sort((objA, objB) => {

                                    return props.sortRoleplayersBy1 in objA && props.sortRoleplayersBy1 in objB
                                        ? objA[props.sortRoleplayersBy1].localeCompare(objB[props.sortRoleplayersBy1]) > 0
                                            ? props.sortRoleplayers1Descend
                                                ? -1
                                                : 1
                                            : -1
                                        : 0;

                                });

                            } else if (typeof nodeRpHasAttr[props.sortRoleplayersBy1] === "number") {

                                related.sort((objA, objB) => {

                                    return props.sortRoleplayersBy1 in objA && props.sortRoleplayersBy1 in objB
                                        ? objA[props.sortRoleplayersBy1] - objB[props.sortRoleplayersBy1] > 0
                                            ? props.sortRoleplayers1Descend
                                                ? -1
                                                : 1
                                            : -1
                                        : 0;

                                });

                            } else if (typeof nodeRpHasAttr[props.sortRoleplayersBy1] === "boolean") {

                                related.sort((objA, objB) => {

                                    return props.sortRoleplayersBy1 in objA && props.sortRoleplayersBy1 in objB
                                        ? objA[props.sortRoleplayersBy1] > objB[props.sortRoleplayersBy1]
                                            ? props.sortRoleplayers1Descend
                                                ? -1
                                                : 1
                                            : -1
                                        : 0;

                                });

                            }

                        }

                    }

                    // Second role player sort

                    if (props.sortRoleplayersBy2) {

                        // relation role players
                        // find out the attribute type
                        let nodeRelRpHasAttr = undefined;

                        for (const relObj of relations) {

                            nodeRelRpHasAttr = relObj.roleplayers.find((rp) => props.sortRoleplayersBy2 in rp);
                            if (typeof nodeRelRpHasAttr !== "undefined") {

                                break;

                            }

                        }

                        if (typeof nodeRelRpHasAttr !== "undefined") {

                            for (const relObj of relations) {

                                if (typeof nodeRelRpHasAttr[props.sortRoleplayersBy2] === "string") {

                                    relObj.roleplayers.sort((objA, objB)=> {

                                        return props.sortRoleplayersBy2 in objA && props.sortRoleplayersBy2 in objB
                                            ? objA[props.sortRoleplayersBy2].localeCompare(objB[props.sortRoleplayersBy2]) > 0
                                                ? props.sortRoleplayers2Descend
                                                    ? -1
                                                    : 1
                                                : -1
                                            : 0;
                                    });

                                } else if (typeof nodeRelRpHasAttr[props.sortRoleplayersBy2] === "number") {

                                    relObj.roleplayers.sort((objA, objB) => {

                                        return props.sortRoleplayersBy2 in objA && props.sortRoleplayersBy2 in objB
                                            ? objA[props.sortRoleplayersBy2] - objB[props.sortRoleplayersBy2] > 0
                                                ? props.sortRoleplayers2Descend
                                                    ? -1
                                                    : 1
                                                : -1
                                            : 0;

                                    });

                                } else if (typeof nodeRelRpHasAttr[props.sortRoleplayersBy2] === "boolean") {

                                    relObj.roleplayers.sort((objA, objB) => {

                                        return props.sortRoleplayersBy2 in objA && props.sortRoleplayersBy2 in objB
                                            ? objA[props.sortRoleplayersBy2] > objB[props.sortRoleplayersBy2]
                                                ? props.sortRoleplayers2Descend
                                                    ? -1
                                                    : 1
                                                : -1
                                            : 0;

                                    });

                                }

                            }

                        }

                        // Related role players

                        // Find out the attribute type

                        const nodeRpHasAttr = related.find((rp) => props.sortRoleplayersBy2 in rp);

                        if (typeof nodeRpHasAttr !== "undefined") {

                            if (typeof nodeRpHasAttr[props.sortRoleplayersBy2] === "string") {

                                related.sort((objA, objB) => {

                                    return props.sortRoleplayersBy2 in objA && props.sortRoleplayersBy2 in objB
                                        ? objA[props.sortRoleplayersBy2].localeCompare(objB[props.sortRoleplayersBy2]) > 0
                                            ? props.sortRoleplayers2Descend
                                                ? -1
                                                : 1
                                            : -1
                                        : 0;

                                });

                            } else if (typeof nodeRpHasAttr[props.sortRoleplayersBy2] === "number") {

                                related.sort((objA, objB) => {

                                    return props.sortRoleplayersBy2 in objA && props.sortRoleplayersBy2 in objB
                                        ? objA[props.sortRoleplayersBy2] - objB[props.sortRoleplayersBy2] > 0
                                            ? props.sortRoleplayers2Descend
                                                ? -1
                                                : 1
                                            : -1
                                        : 0;

                                });

                            } else if (typeof nodeRpHasAttr[props.sortRoleplayersBy2] === "boolean") {

                                related.sort((objA, objB) => {

                                    return props.sortRoleplayersBy2 in objA && props.sortRoleplayersBy2 in objB
                                        ? objA[props.sortRoleplayersBy2] > objB[props.sortRoleplayersBy2]
                                            ? props.sortRoleplayers2Descend
                                                ? -1
                                                : 1
                                            : -1
                                        : 0;

                                });

                            }

                        }

                    }

                }

                // place node relative to node zoom node
                /* eslint-disable one-var */
                const [
                    nRel,
                    sum
                ] = [
                    relations.length,
                    (array) => array.reduce(
                        (elA, elB) => elA + elB,
                        0
                    )
                ];

                const [
                    nRelRp,
                    nRp
                ] = [
                    relations.length
                        ? sum(relations.map((rel) => rel.roleplayers.length)) + relations.length / 2 - 0.5
                        : 0,
                    related.length

                ];

                // compute min y value (top)
                const height = Math.max(nRel, nRelRp, nRp) * marYMin;
                const yMin = nodeZoom.y - height / 2;

                // compute y margins (spacing) for each column of nodes
                const [
                    marYRel,
                    marYRelRp,
                    marYRp
                ] = [
                    nRel > 0
                        ? height / nRel
                        : marYMin,
                    nRelRp > 0
                        ? height / nRelRp
                        : marYMin,
                    nRp > 0
                        ? height / nRp
                        : marYMin
                ];

                /* eslint-enable one-var */

                // initialise the position multiplier at 0.5 to get center vertical alignment
                let [
                    kRel,
                    kRelRp,
                    kRp
                ] = [
                    // move role players up a bit
                    0.5,
                    -0.5,
                    0.5
                ];

                relations.forEach((relationObj) => {

                    const [
                        relNode,
                        roleplayers
                    ] = [
                        relationObj.relation,
                        relationObj.roleplayers
                    ];

                    relNode.fx = nodeZoom.x + marX * 2;
                    relNode.fy = yMin + kRel * marYRel;

                    for (const roleplayer of roleplayers) {

                        roleplayer.fx = nodeZoom.x + marX * 2 / 3;
                        roleplayer.fy = yMin + kRelRp * marYRelRp;
                        // if too close to nodeZoom and relation is below nodeZoom in height, shift rp down another notch
                        if (roleplayer.fy - nodeZoom.y < marYMin && (yMin + kRel * marYRel > nodeZoom.y)) {

                            roleplayer.fy += marYRelRp;
                            kRelRp += 1;

                        }
                        kRelRp += 1;

                    }
                    // add extra half space between rps of each rel
                    kRel += 1;
                    kRelRp += 0.5;

                });


                related.forEach((roleplayer) => {

                    roleplayer.fx = nodeZoom.x - marX;
                    roleplayer.fy = yMin + kRp * marYRp;
                    kRp += 1;

                });

                props.graphData.nodes.forEach((node) => {

                    if (nodeIdsVisibleNew.includes(node[props.nodeId])) {

                        node.fx = nodesById[node[props.nodeId]].fx;
                        node.fy = nodesById[node[props.nodeId]].fy;

                    }

                });

                // pan and zoom
                const nodeFilterFn = (nodeTmp) => {

                    return nodeIdsVisibleNew.includes(nodeTmp[props.nodeId]) 
                        ? true 
                        : false;

                };
                
                fgRef.current.zoomToFit(
                    250,
                    40,
                    nodeFilterFn
                );
                
                // <DELETE ?

                fgRef.current.centerAt(
                    nodeZoom.fx + marX / 2,
                    nodeZoom.fy,
                    250
                );

                // fgRef.current.zoom(4,250)

                // /DELETE>

            } else {

                // If nodeZoomId is null

                props.graphData.nodes.forEach((node) => {

                    if ("fx" in node) {

                        delete node.fx;
                        delete node.fy;

                    }

                });
                fgRef.current.d3ReheatSimulation();

            }

            setNodeIdsVisible(nodeIdsVisibleNew);
            setLinkIdsVisible(linkIdsVisibleNew);

            // console.log("useEffect on nodeZoomId ran");

        }

    },
    [
        props.useCoordinates,
        props.pixelUnitRatio,
        centreCoordinates,
        nodeZoomId,
        props.sortRelsBy1,
        props.sortRelsBy2,
        props.sortRoleplayersBy1,
        props.sortRoleplayersBy2,
        props.sortRels1Descend,
        props.sortRels2Descend,
        props.sortRoleplayers1Descend,
        props.sortRoleplayers2Descend
    ]);
    /* eslint-enable complexity */
    /* eslint-ensable max-depth */

    /**
     * Set node coordinates
     * delete fixed coordinates if disactivated or new graphData
     */

    // useEffect(
    //     () => {
    //         const [
    //             origin,
    //             nodesClone
    //         ] = [
    //             centreCoordinates
    //                 ? centreCoordinates
    //                 : {
    //                     /* eslint-disable no-magic-numbers */
    //                     "x": 1000,
    //                     "y": 1000
    //                     /* eslint-enable no-magic-numbers */
    //                 },
    //             cloneDeep(props.graphData.nodes)
    //         ];

    //         if (props.useCoordinates && props.pixelUnitRatio && nodesClone) {

    //             nodesClone.forEach((node) => {

    //                 const [
    //                     newX,
    //                     newY
    //                 ] = [
    //                     props.pixelUnitRatio * node.__coord_x,
    //                     props.pixelUnitRatio * node.__coord_y
    //                 ];
    //                 node.fx = origin + newX;
    //                 node.fy = origin + newY;

    //             });

    //         } else {

    //             nodesClone.forEach((node) => {

    //                 if ("fx" in node) {

    //                     delete node.fx;
    //                     delete node.fy;

    //                 }

    //             });

    //         }

    //         props.setProps({
    //             "graphData": {
    //                 "links": props.graphData.links,
    //                 "nodes": nodesClone
    //             }
    //         });

    //     },
    //     [
    //         props.useCoordinates,
    //         props.pixelUnitRatio,
    //         centreCoordinates,
    //         nodeIdsAll
    //     ]
    // );

    // when loading new graphData and rendering engine is running,
    // disable interactivity to improve performance
    // useEffect( () => {
    //     setEnableZoomPanInteraction(false)
    //     setEnableNavigationControls(false)
    //     setEnablePointerInteraction(false)
    // },[props.graphData])

    /* eslint-disable one-var */
    const nodeLabelFunction = (node) => {

        props.nodeLabel in node
            ? node[props.nodeLabel]
                ? node[props.nodeLabel]
                : node[props.nodeId]
            : node[props.nodeId];

    };


    const nodeVisibilityFunction = (node) => {

        let visible = true;
        if (nodeIdsVisible.length) {

            if (nodeIdsVisible.indexOf(node[props.nodeId]) === -1) {

                visible = false;

            }

        }
        return visible;

    };


    const nodeColorFunction =
        (node) => {

            let color = props.nodeColor in node
                ? validateColor(node[props.nodeColor])
                    ? node[props.nodeColor]
                    : "cornflowerblue"
                : "cornflowerblue";

            if (nodesSelected.length) {

                color = darken(0.3, color);
                if (nodesSelected.map((nodeSel) => nodeSel[props.nodeId]).indexOf(node[props.nodeId]) !== -1) {

                    color = saturate(0.2,color);
                    color = lighten(0.3, color);

                }

            }

            if (nodeIdsHighlight.length) {

                color = darken(0.2, color);
                if (nodeIdsHighlight.indexOf(node[props.nodeId]) !== -1) {

                    color = lighten(0.2, color);

                }

            }
            if (nodeIdsDrag.length) {

                color = darken(0.2, color);
                if (nodeIdsDrag.indexOf(node[props.nodeId]) !== -1) {

                    color = lighten(0.3, color);

                }

            }
            return color;

        }

    ;

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
                .every((nnid) => nodesSelected
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
                .every((nnid) => nodesSelected
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

    useEffect(
        () => {

            setNodesSelected(props.nodesSelected);

        },
        [props.nodesSelected]
    );

    // https://github.com/vasturiano/force-graph/blob/master/example/multi-selection/index.html
    const handleNodeClick = (node, event) => {

        /**
         * Node left click callback
         * outcome depends on whether node is already selected
         * and on key press events
         */

        // let nodeZoomIdTmp = null;

        const nodesSelectedNew = cloneDeep(nodesSelected);

        // Reset nodeRightClicked
        setNodeRightClicked(null);
        setNodeRightClickedViewpointCoordinates(null);

        // Set nodeClicked
        setNodeClicked(node);
        setNodeClickedViewpointCoordinates(fgRef.current.graph2ScreenCoords(
            node.x,
            node.y
        ));

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

            // Not shift

            // if (event.detail == 2) {
                // setNodeZoomId(node[props.nodeId])
            // } else {

            /* eslint-disable no-lonely-if */
            if (nodeIndex === -1) {

                // node not in nodesSelected
                nodesSelectedNew.splice(
                    0,
                    nodesSelectedNew.length);
                nodesSelectedNew.push(node);

            } else {

                // Node already selected
                if (event.altKey) {

                    // select neighbours of selected node(s)
                    const neighbourNodeIds = getNodeNeighbourIds(
                        node,
                        props.maxDepth_neighbours_select
                    );
                    const neighbourNodes = neighbourNodeIds.length
                        ? neighbourNodeIds
                            .map((neighbourNodeId) => nodesById[neighbourNodeId])
                        : [];
                    if (neighbourNodeIds.length) {

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
                    setNodeZoomId(node[props.nodeId]);

                }

            }
            /* eslint-enable no-lonely-if */

        }

        setNodesSelected(nodesSelectedNew);

    };

    const handleNodeRightClick = (node) => {

        setNodeRightClicked(node);
        setNodeRightClickedViewpointCoordinates(fgRef.current.graph2ScreenCoords(
                node.x,
                node.y
            ));

        // Reset node clicked
        setNodeClicked(null);
        setNodeClickedViewpointCoordinates(null);

    };

    const handleLinkRightClick = (link) => {

        setLinkRightClicked(link);
        setLinkClicked(null);

    };

    const handleNodeDrag = (node, translate) => {

        setNodeIdsDrag([]);
        setLinkIdsNodesDrag([]);

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

            // Two-step highlighting if rootType is entity
            if (node.rootType === "entity") {

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
            setNodeIdsDrag([...new Set(neighbourNodeIds)]);
            setLinkIdsNodesDrag([...new Set(linkIds)]);

            /**
             * drag all selected nodes and fix in place afterwards
             */
            // from https://github.com/vasturiano/force-graph/blob/master/example/multi-selection/index.html
            if (nodesSelected.length) {

                const nodesSelectedNew = cloneDeep(nodesSelected);
                const nodesSelectedIds = nodesSelectedNew.map((nodeSel) => nodeSel[props.nodeId]);
                // Moving a selected node?
                if (nodesSelectedIds.includes(node[props.nodeId])) {

                    // Move all other selected nodes as well
                    nodesSelectedNew
                        .filter((nodeSelected) => nodeSelected[[props.nodeId]] !== node[props.nodeId])
                        .forEach((nodeSel) => ["x", "y"].forEach((coord) => nodeSel[`f${coord}`] = nodeSel[coord] + translate[coord])); 
                        // translate other nodes by same amount => selNode !== node).forEach(node => ['x', 'y'].forEach(coord => node[`f${coord}`] = node[coord] + translate[coord])); // translate other nodes by same amount

                }

                setNodesSelected(nodesSelectedNew);

            }

        }

    };

    // fix dragged nodes in place
    const handleNodeDragEnd = (node, translate) => {
        setNodeIdsDrag([]);
        setLinkIdsNodesDrag([]);

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
    };

    // const handleNodeHover = node => {
    //     if (node) {
    //         setNodeHovered(node)
    //         setNodeHoveredViewpointCoordinates(fgRef.current.graph2ScreenCoords(node.x,node.y))
    //     } else {
    //         setNodeHovered(null)
    //         setNodeHoveredViewpointCoordinates(null)
    //     }
    // };

    // const handleLinkHover = link => {
    //     link? setLinkHovered(link) : setLinkHovered(null)
    // };

    // set centreCoordinates
    useEffect( () => {

        if (fgRef.current.getGraphBbox() && props.centreCoordinates) {

            setCentreCoordinates(props.graphData.nodes.length
                ? {
                    "x": 0.5 * (fgRef.current.getGraphBbox().x[0] + fgRef.current.getGraphBbox().x[1]),
                    "y": 0.5 * (fgRef.current.getGraphBbox().y[0] + fgRef.current.getGraphBbox().y[1])
                } 
                : fgRef.current.screen2GraphCoords(window.innerWidth / 2, 
                    window.innerHeight / 2));

        }

    },
    [props.centreCoordinates]
    );

    const handleBackgroundClick = (event) => {

        setNodeClicked(null);
        setNodeClickedViewpointCoordinates(null);
        setNodeRightClicked(null);
        setNodeRightClickedViewpointCoordinates(null);
        setLinkClicked(null);
        setLinkRightClicked(null);
        setNodesSelected([]);
        setLinksSelected([]);
        setNodeZoomId(null);

    };

    const handleBackgroundRightClick = (event) => {
        setNodeClicked(null);
        setNodeClickedViewpointCoordinates(null);
        setNodeRightClicked(null);
        setNodeRightClickedViewpointCoordinates(null);
        setLinkClicked(null);
        setLinkRightClicked(null);
        setNodesSelected([]);
        setLinksSelected([]);
        setNodeZoomId(null);
    };

    const handleLinkClick = (link,event) => {
        // as a sideeffect, reset linkRightClicked
        setLinkRightClicked(null);
        setLinkClicked(link);
        const linksSelected_new = cloneDeep(linksSelected);

        const linkIndex = linksSelected_new.map((linkSel) => linkSel[props.linkId]).indexOf(link[props.linkId]);

        if (event.shiftKey) {
            // multi-selection
            if (linkIndex === -1) {
                linksSelected_new.push(link);
            } else {
                linksSelected_new.splice(linkIndex,1);
            }
        } else {
            linksSelected_new.splice(0,linksSelected_new.length);
            linksSelected_new.push(link);
        }
        setLinksSelected(linksSelected_new);
    };

    useEffect(() => setNodeIdsVisible(props.nodeIdsVisible),[props.nodeIdsVisible]);
    useEffect(() => setLinkIdsVisible(props.linkIdsVisible),[props.linkIdsVisible]);
    useEffect(() => setNodeIdsHighlight(props.nodeIdsHighlight),[props.nodeIdsHighlight]);
    useEffect(() => setLinkIdsHighlight(props.linkIdsHighlight),[props.linkIdsHighlight]);
    useEffect(() => {

        if (props.nodeZoomId) {

            setNodeZoomId(props.nodeZoomId);

        }

    },
    [props.nodeZoomId]
    );


    // useEffect(() => {
    //     if (props.forceEngine === "d3") {
    //         fgRef.current
    //             .d3Force("center", forceCenter())
    //             .d3Force("charge", forceManyBody())
    //             .d3Force("link", forceLink())
    //             .d3Force("radial", forceRadial())
    //     }
    // }, [props.updated])

    // nodeCanvasObject function
    const nodeCanvasObjectFunction = (node, ctx, globalScale) => {
        // set global alpha for next drawing to value depending on whether node is selected
        // https://www.w3schools.com/tags/canvas_globalalpha.asp
        // initialize color
        // provide a sensible default
        let backgroundColor_tmp = backgroundColor ? validateColor(backgroundColor) ? backgroundColor : "#000000" : "#000000";
        let color = props.nodeColor in node ? validateColor(node[props.nodeColor]) ? node[props.nodeColor] : "#0000ff" : "#0000ff";
        let textColor = nodeTextAutoColor ? invert(backgroundColor_tmp) : color;
        let globalAlpha = 1
        const label = props.nodeLabel in node ? node[props.nodeLabel] ? node[props.nodeLabel] : node[props.nodeId] : node[props.nodeId];
        const iconSize = nodeIconRelSize ? nodeIconRelSize : 12; // sensible default
        const imgSize = nodeImgRelSize ? nodeImgRelSize : 12; // sensible default

        // ctx.globalAlpha = 0.9;
        ctx.fontWeight = "normal";
        let fontSize = Math.max(11 / globalScale,5);

        // modify style parameters if node is selected and/or highlighted
        if (nodesSelected.length) {
            // make all other nodes more transparent
            // ctx.globalAlpha -= 0.3
            // color = darken(0.3, color);
            // textColor = darken(0.3, textColor);
            if (nodesSelected.map((nodeSel) => nodeSel[props.nodeId]).indexOf(node[props.nodeId]) !== -1) {
                // ctx.globalAlpha = 1
                color = saturate(0.2,color);
                textColor = saturate(0.2,textColor);
                // color = lighten(0.3, color);
                // textColor = lighten(0.3, textColor);
                fontSize = fontSize * 1.2;
            }  else {
                globalAlpha = globalAlpha * 0.8
            }
        }

        if (nodeIdsDrag.length) {
             // make all other nodes more transparent
            // ctx.globalAlpha -= 0.3
            color = darken(0.3, color);
            textColor = darken(0.3, textColor);
            if (nodeIdsDrag.indexOf(node[props.nodeId]) !== -1) {
                // ctx.globalAlpha = 1
                color = lighten(0.3, color);
                textColor = lighten(0.3, textColor);
                ctx.fontWeight = "bold";
                globalAlpha = 1
            } else {
                globalAlpha = globalAlpha * 0.8
            }
        }

        if (nodeIdsHighlight.length) {
            // ctx.globalAlpha -= 0.3
            color = darken(0.3, color);
            textColor = darken(0.3, textColor);
            if (nodeIdsHighlight.indexOf(node[props.nodeId]) !== -1) {
                //ctx.globalAlpha = 1
                color = lighten(0.3, color);
                textColor = lighten(0.3, textColor);
                ctx.fontWeight = "bold";
                globalAlpha = 1
            } else {
                globalAlpha = globalAlpha * 0.8
            }
        }

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
        let img_src = null;
        if (props.nodeImg in node && useNodeImg) {
            if (node[props.nodeImg]) {
                img_src = node[props.nodeImg];
                if (typeof img_src === "string" && (img_src.includes("http") || img_src.includes("www"))) {
                    const img = new Image();
                    img.src = img_src;
                    //ctx.fillStyle = color;
                    ctx.drawImage(img, node.x - imgSize / 2, node.y - imgSize, imgSize, imgSize);
                }
            }
        }

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        if (img_src === null & props.nodeIcon in node & useNodeIcon) {
            // icon
            if (node[props.nodeIcon]) {
                const nodeIcon_obj = node[props.nodeIcon];
                ctx.font = `${iconSize}px ${Object.keys(nodeIcon_obj)[0]}`;
                ctx.fillStyle = color;
                ctx.fillText(`${Object.values(nodeIcon_obj)[0]}`, node.x, node.y - iconSize / 1.7, iconSize);
            }
        }

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

        ctx.restore();
    };

    const nodeCanvasObjectModeFunction = (node) => props.nodeImg in node && useNodeImg || props.nodeIcon in node && useNodeIcon ? node[props.nodeImg] || node[props.nodeIcon] ? "replace" : "after" : "after";

    const linkVisibilityFunction = (link) => {
        let visible = true;
        if (nodeIdsVisible.length) {
            // use nodeIdsVisible.length as criterion, since it shows whether or not a filter is applied.
            // if we use links, often it will be empty, and no links will be invisible
            if (linkIdsVisible.indexOf(link[props.linkId]) === -1) {
                visible = false;
            }
        }
        return visible;
    };

    const linkColorFunction = (link) => {
        let color = linkAutoColor
            ? invert(backgroundColor)
            : validateColor(linkColor)
                ? linkColor
                :  invert(backgroundColor)
        // is link selected?
        if (linksSelected.length) {
            color = darken(0.2, color);
            if (linksSelected.map((linkSel)=>linkSel[props.linkId]).indexOf(link[props.linkId]) !== -1) {
                color = saturate(0.2,color);
                color = lighten(0.2,color);
            }
        }
        // is link connected to node being dragged?
        if (linkIdsNodesDrag.length) {
            color = darken(0.2, color);
            if (linkIdsNodesDrag.indexOf(link[props.linkId]) !== -1) {
                color = saturate(0.2,color);
                color = lighten(0.2, color);
            }
        }
        // are link source and target selected?
        if (nodesSelected.length) {
            color = darken(0.3, color);
            if (nodesSelected.map((node) => node[props.nodeId]).includes(link[props.linkSource]) && nodesSelected.map((node) => node[props.nodeId]).includes(link[props.linkTarget])) {
                color = saturate(0.2,color);
                color = lighten(0.3, color);
            }
        }
        return color;
    };

    const linkWidthFunction = (link) => {
        let width = linkWidth;
        // is link selected?
        if (linksSelected.length) {
            width = width * 0.9;
            if (linksSelected.map((linkSel)=>linkSel[props.linkId]).indexOf(link[props.linkId]) !== -1) {
                width = width * 4;
            }
        }
        // is link highlighted?
        if (linkIdsNodesDrag.length) {
            width = width * 0.9;
            if (linkIdsNodesDrag.indexOf(link[props.linkId]) !== -1) {
                width = width * 1.5;
            }
        }
        // are link source and target selected?
        if (nodesSelected.length) {
            width = width * 0.9;
            if (nodesSelected.map((node) => node[props.nodeId]).includes(link[props.linkSource]) && nodesSelected.map((node) => node[props.nodeId]).includes(link[props.linkTarget])) {
                width = width * 1.5;
            }
        }
        return width;
    };

    const linkCanvasObjectFunction = (link, ctx) => {
        let color = linkAutoColor
            ? invert(backgroundColor)
            : validateColor(linkColor)
                ? linkColor
                :  invert(backgroundColor)
        // is link selected?
        if (linksSelected.length) {
            color = darken(0.2, color);
            if (linksSelected.map((linkSel)=>linkSel[props.linkId]).indexOf(link[props.linkId]) !== -1) {
                color = saturate(0.2,color);
                color = lighten(0.2,color);
            }
        }
        // is link connected to node being dragged?
        if (linkIdsNodesDrag.length) {
            color = darken(0.2, color);
            if (linkIdsNodesDrag.indexOf(link[props.linkId]) !== -1) {
                color = saturate(0.2,color);
                color = lighten(0.2, color);
            }
        }
        // are link source and target selected?
        if (nodesSelected.length) {
            color = darken(0.3, color);
            if (nodesSelected.map((node) => node[props.nodeId]).includes(link[props.linkSource]) && nodesSelected.map((node) => node[props.nodeId]).includes(link[props.linkTarget])) {
                color = saturate(0.2,color);
                color = lighten(0.3, color);
            }
        }
        
        const MAX_FONT_SIZE = 4;
        const LABEL_NODE_MARGIN = nodeRelSize * 1.5;

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

        ctx.fillStyle = backgroundColor;
        ctx.fillRect(- bckgDimensions[0] / 2, - bckgDimensions[1] / 2, ...bckgDimensions);

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = color;// invert(backgroundColor);
        ctx.fillText(label, 0, 0);
        ctx.restore();
    };

    const onEngineStopFunction = () => {
        // setEnableZoomPanInteraction(props.interactive? true : false)
        // setEnablePointerInteraction(props.interactive? true : false)
        // setEnableNavigationControls(props.interactive? true : false)
        if (props.graphData.nodes.length && fixNodes) {
            
            props.graphData.nodes.forEach((node)=> {
                node.fx = node.x;
                node.fy = node.y;
            });

        }
    };

    // useEffect( ()=> {
    //     if (!fixNodes && props.graphData.nodes) {
    //         props.graphData.nodes.forEach(node=> {
    //             delete node.fx
    //             delete node.fy
    //         })
    //         }
    // },[fixNodes])


    // draw backgroundImage
    const onRenderFramePre = (ctx, globalScale) => {
        if (props.externalobject_source === "URL" && props.externalobjectInput) {
            // TODO: check if URL is valid
            const backgroundImg = new Image();
            backgroundImg.src = props.externalobjectInput;
            // backgroundImg.width = backgroundImg.width/globalScale
            // backgroundImg.height = backgroundImg.height/globalScale
            // the stretching needs to be optional
            // backgroundImg.width = props.size.width
            // const height = window.innerHeight*props.heightRatio
            // get the centre of the screen from existing graph or from translating screen to canvas coordinates
            // const centreCoordinates = {x:400, y:400}
            ctx.drawImage(backgroundImg, centreCoordinates.x - backgroundImg.width / 2,centreCoordinates.y - backgroundImg.height / 2);
            // ctx.drawImage(backgroundImg, 0,0);
        }
    };

    // const dagNodeFilter = (node) => {
    //     return props.dagNodeIds.includes(node[props.nodeId]) ? true : false;
    // };

    // https://github.com/vasturiano/react-force-graph/issues/199
    // const onDagError = (loopNodeIds) => {};
    /**
     * call methods via higher order component props
     */

    useEffect( () => {
        if (props.emitParticle) {
            fgRef.current.emitParticle(props.emitParticle);
        }
    },[props.emitParticle]);

    useEffect( () => {
        if (pauseAnimation){
            fgRef.current.pauseAnimation();
        }
        setResumeAnimation(false);
    },[pauseAnimation]);

    useEffect( () => {
        if (resumeAnimation){
            fgRef.current.resumeAnimation();
        }
        setPauseAnimation(false);
    },[resumeAnimation]);

    useEffect( () => {
        if (props.centerAt){
            fgRef.current.centerAt(...props.centerAt);
        }
    },[props.centerAt]);

    useEffect( () => {
        if (props.zoom){
            fgRef.current.zoom(...props.zoom);
        }
    },[props.zoom]);

    useEffect( () => {
        if (props.zoomToFit){
            fgRef.current.zoomToFit(...props.zoomToFit);
        }
    },[props.zoomToFit]);

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
        if (props.getGraphBbox){
            setGraphBbox(fgRef.current.getGraphBbox());
        }
    },[props.getGraphBbox]);


    /*
    * Send selected state values to the parent component.
    * setProps is a prop that is automatically supplied
    * by dash's front-end ("dash-renderer").
    * In a Dash app, this will update the component's
    * props and send the data back to the Python Dash
    * app server if a callback uses the modified prop as
    * Input or State.
    */

    useEffect( () => {props.setProps({"nodeClicked":nodeClicked});},[nodeClicked]);
    useEffect( () => {props.setProps({"nodeClickedViewpointCoordinates":nodeClickedViewpointCoordinates});},[nodeClickedViewpointCoordinates]);
    useEffect( () => {props.setProps({"nodeRightClicked":nodeRightClicked});},[nodeRightClicked]);
    useEffect( () => {props.setProps({"nodeRightClickedViewpointCoordinates":nodeRightClickedViewpointCoordinates});},[nodeRightClickedViewpointCoordinates]);
    useEffect( () => {props.setProps({"linkClicked":linkClicked});},[linkClicked]);
    useEffect( () => {props.setProps({"linkRightClicked":linkRightClicked});},[linkRightClicked]);
    useEffect( () => {props.setProps({"graphBbox":graphBbox});},[graphBbox]);
    useEffect( () => {props.setProps({"nodesSelected":nodesSelected});},[nodesSelected]);
    useEffect( () => {props.setProps({"linksSelected":linksSelected});},[linksSelected]);

    return (
        <div id={props.id}>
                <ForceGraph2D
                    ref={fgRef}
                    /**
                    * data input
                    */
                    // props
                    graphData={props.graphData}
                    nodeId={props.nodeId}
                    linkSource={props.linkSource}
                    linkTarget={props.linkTarget}
                    /**
                    * container layout
                    */
                    // props
                    width={props.size.width}
                    height={window.innerHeight * props.heightRatio}
                    backgroundColor={backgroundColor}
                    showNavInfo={showNavInfo}
                    // yOffset: 1.5, // AR
                    // glScale: 200 // AR
                    // markerAttrs: { preset: 'hiro' } // AR
                    /**
                    * node styling
                    */
                    nodeRelSize={nodeRelSize}
                    nodeVal={props.nodeVal}
                    nodeLabel={nodeLabelFunction}
                    // nodeDesc: "desc" // VR only
                    nodeVisibility={nodeVisibilityFunction}
                    nodeColor={nodeColorFunction}
                    nodeAutoColorBy={props.nodeAutoColorBy}
                    nodeOpacity={nodeOpacity}
                    //nodeResolution={props.nodeResolution}
                    nodeCanvasObject={nodeCanvasObjectFunction}
                    nodeCanvasObjectMode={nodeCanvasObjectModeFunction}
                    /**
                    * link styling
                    */
                    linkLabel={props.linkLabel}
                    // linkDesc: "desc", // VR only,
                    linkVisibility={linkVisibilityFunction}
                    linkColor={linkColorFunction}
                    linkAutoColorBy={props.linkAutoColorBy}
                    linkOpacity={props.linkOpacity}
                    linkLineDash={props.linkLineDash}
                    linkWidth={linkWidthFunction}
                    linkResolution={props.linkResolution}
                    // linkCurvature={linkCurvature}
                    // linkCurveRotation={props.linkCurveRotation} // 3D, VR, AR,
                    // linkMaterial: null, // 3D, VR, AR, not exposed
                    linkCanvasObject={linkCanvasObjectFunction}
                    linkCanvasObjectMode={()=>"after"}
                    // linkThreeObject={link => {
                    //     // extend link with text sprite
                    //     const sprite = new SpriteText(link[props.linkLabel]);
                    //     sprite.color = highlightNodes.indexOf(link[props.linkSource]) == -1? 'rgb(100,160,190,0.5)' : 'rgb(100,160,190,1)';
                    //     sprite.textHeight = 2;
                    //     return sprite;
                    //     }}
                    //     linkPositionUpdate={(sprite, { start, end }) => {
                    //     const middlePos = Object.assign(...['x', 'y', 'z'].map(c => ({
                    //         [c]: start[c] + (end[c] - start[c]) / 2 // calc middle point
                    //     })));

                    //     // Position sprite
                    //     Object.assign(sprite.position, middlePos);
                    //     }}
                    // linkThreeObjectExtend={props.linkThreeObjectExtend}
                    // linkPositionUpdate: null, // function, not exposed
                    linkDirectionalArrowLength={props.linkDirectionalArrowLength}
                    linkDirectionalArrowColor={props.linkDirectionalArrowColor}
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
                    onRenderFramePre={onRenderFramePre}
                    // onRenderFramePost={props.onRenderFramePost}
                    /**
                    * Render control
                    */
                    // numDimensions={props.numDimensions}
                    forceEngine={forceEngine}
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
                    cooldownTime={cooldownTime}
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
                    linkHoverPrecision={props.linkHoverPrecision}
                    // onZoom // TODO: function
                    // onZoomEnd // TODO: function
                    controlType={controlType}
                    enableNodeDrag={enableNodeDrag}
                    enableZoomPanInteraction={enableZoomPanInteraction} // overridden by 'interactive' parameter
                    enableNavigationControls={enableNavigationControls} // overridden by 'interactive' parameter
                    enablePointerInteraction={enablePointerInteraction} // overridden by 'interactive' parameter
                    onChange={(e) => {
                        props.setProps({
                            "graphData":e.target.graphData
                        });}}
            />
            <div id = "dat-gui-div">
                <DatGui
                    data={guiSettings}
                    onUpdate={handleUpdate}>
                    <DatFolder title='graph settings' closed={true}>
                        <DatFolder title='Container layout' closed={true}>
                            <DatColor path='backgroundColor' label='backgroundColor'/>
                            <DatBoolean path='showNavInfo' label='showNavInfo'/>
                            </DatFolder>
                        <DatFolder title='d3Force' closed={true}>
                            <DatNumber path='link' label='link' min={0} max={100} step={1} />
                            <DatNumber path='charge' label='charge' min={-100} max={100} step={1} />
                            <DatNumber path='center' label='center' min={0} max={1} step={0.01} />
                            <DatNumber path='radial' label='radial' min={0} max={1} step={0.01} />
                            </DatFolder>
                        <DatFolder title='Node styling' closed={true}>
                            <DatNumber path='nodeRelSize' label='nodeRelSize' min={1} max={50} step={1}/>
                            <DatNumber path='nodeIconRelSize' label='nodeIconRelSize' min={1} max={50} step={1}/>
                            <DatNumber path='nodeImgRelSize' label='nodeImgRelSize' min={1} max={50} step={1}/>
                            <DatNumber path='nodeOpacity' label='nodeOpacity' min={0} max={1} step={0.1}/>
                            <DatBoolean path='useNodeIcon' label='useNodeIcon'/>
                            <DatBoolean path='useNodeImg' label='useNodeImg'/>
                            <DatBoolean path='nodeTextAutoColor' label='nodeTextAutoColor'/>
                            </DatFolder>
                        <DatFolder title='Link styling' closed={true}>
                            <DatBoolean path='linkAutoColor' label='linkAutoColor'/>
                            <DatColor path='linkColor' label='linkColor'/>
                            <DatNumber path='linkWidth' label='linkWidth' min={0.1} max={5} step={0.1}/>
                            {/* <DatNumber path='linkCurvature' label='linkCurvature' min={0} max={1} step={0.1}/> */}
                            </DatFolder>
                        <DatFolder title='Force engine configuration' closed = {true}>
                            <DatSelect path='forceEngine' label='forceEngine' options={["d3", "ngraph"]}/>
                            {/* <DatBoolean path='dagModeOn' label='dagModeOn'/> */}
                            {/* <DatSelect path='dagMode' label='dagMode' options={["td", "bu", "lr", "rl", "radialout", "radialin"]}/> */}
                            <DatNumber path='cooldownTime' label='cooldownTime' min={1000} max={30000} step={1000}/>
                            <DatBoolean path='fixNodes' label='fixNodes'/>
                            <DatButton label='reheat simulation' onClick={() => {
                                if (nodeZoomId) {
                                    setNodeZoomId(null)    
                                } else {
                                    fgRef.current.d3ReheatSimulation()
                                }
                            }
                            }/>
                            </DatFolder>
                        <DatFolder title='Interaction' closed = {true}>
                            <DatSelect title='controlType' label='controlType' options={["trackball", "orbit", "fly"]}/>
                            <DatBoolean path='enableNodeDrag' label='enableNodeDrag'/>
                            <DatBoolean path='enableZoomPanInteraction' label='enableZoomPanInteraction'/>
                            <DatBoolean path='enableNavigationControls' label='enableNavigationControls'/>
                            <DatBoolean path='enablePointerInteraction' label='enablePointerInteraction'/>
                            </DatFolder>
                        </DatFolder>
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
     *  controls nodeIcon size
     */
     "nodeIconRelSize": PropTypes.number,

    /**
     *  controls nodeImg size
     */
    "nodeImgRelSize": PropTypes.number,

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
    // "linkCurvature": PropTypes.oneOfType([
    //     PropTypes.number,
    //     PropTypes.string,
    // //    PropTypes.func
    // ]),

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

    /**
    * ids of nodes highlighted due to being dragged
    */
    // "nodeIdsDrag": PropTypes.arrayOf(
    //     PropTypes.string
    // ),

    /**
    * clicked node
    */
    // "nodeClicked": PropTypes.object,

    /**
    *  screen coordinates of clicked node
    */
    // "nodeClickedViewpointCoordinates": PropTypes.objectOf(PropTypes.number),

    /**
    * right-clicked node
    */
    // "nodeRightClicked": PropTypes.object,

    /**
    *  screen coordinates of right-clicked node
    */
    // "nodeRightClickedViewpointCoordinates": PropTypes.objectOf(PropTypes.number),

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
    // "linkClicked": PropTypes.object,

    /**
    * right-clicked link
    */
    // "linkRightClicked": PropTypes.object,

    /**
    * hovered link
    */
    // "linkHovered": PropTypes.object,

    /**
    *  selected (clicked) links
    */
    // "linksSelected": PropTypes.arrayOf(
    //     PropTypes.object
    // ),

    /**
    * ids of links highlighted due to being dragged
    */
    // "linkIdsNodesDrag": PropTypes.arrayOf(
    //     PropTypes.string
    // ),


    /**
    * ids of highlighted nodes (through search)
    */
    "nodeIdsHighlight": PropTypes.arrayOf(PropTypes.string),

    /**
     * ids of visible nodes
     */
    "nodeIdsVisible": PropTypes.arrayOf(PropTypes.string),

    /**
    * ids of highlighted links (through search)
    */
    "linkIdsHighlight": PropTypes.arrayOf(PropTypes.string),

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
    "externalobjectInput": PropTypes.oneOfType([
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

Graph2D.propTypes = graphSharedProptypes;

objSharedProps.id = "Graph2D";

Graph2D.defaultProps = objSharedProps;

export default withSizeHOC(Graph2D);
/* eslint-enable max-lines */