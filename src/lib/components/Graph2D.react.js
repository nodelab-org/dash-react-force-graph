import { ForceGraph2D } from 'react-force-graph';
import React, {useEffect, useRef, useState} from "react";
import {cloneDeep} from "lodash";
import {forceRadial} from 'd3-force';
import DatGui, {DatBoolean, DatColor, DatFolder,DatNumber,DatSelect} from 'react-dat-gui';
// react-dat-gui renders correctly only when importing these styles
import 'react-dat-gui/dist/index.css';

import PropTypes from 'prop-types';

import validateColor from "validate-color";

import importScript from '../customHooks/importScript.js';
// import useFontFace from '../customhooks/useFontFace.js';

// import {forceCenter, forceManyBody, forceLink, forceRadial} from "d3";

// https://github.com/ctrlplusb/react-sizeme

// import * as material_UI from '@material-ui/icon_s'; // doesn't work: Module not found: Error: Can't resolve '@material-ui/icons' in '/Users/rkm916/Sync/projects/2020-dashforcegraph/src/lib/components'

// See https://stackoverflow.com/questions/42051588/wildcard-or-asterisk-vs-named-or-selective-import-es6-javascript

// import graphSharedProptypes from "../graph_shared_proptypes.js"

import {darken, invert, lighten, saturate} from 'polished';

// https://github.com/ctrlplusb/react-sizeme
import {withSize} from 'react-sizeme';

import objSharedProps from "../shared_props_defaults.js"

// use react resize-me to make canvas container width responsive
const withSizeHOC = withSize({
    "monitorHeight": false,
    "monitorWidth": true,
    "noPlaceholder": true});

function Graph2D(props) {

  // initialise props that can be changed from within component as state

  // const [nodes,setNodes] = useState([{"nodeId":"node1"},{"nodeId":"node2"}])
  // const [links,setLinks] = useState([{"id":"link1", "source":"node1", "target":"node2"}])
  // const [graphData, setGraphData] = useState({"nodes":[{"nodeId":"node1"},{"nodeId":"node2"}], "links":[{"id":"link1", "source":"node1", "target":"node2"}]})
  const [backgroundColor,setBackgroundColor] = useState(props.backgroundColor)
  const [showNavInfo,setShowNavInfo] = useState(props.showNavInfo)
  const [nodeRelSize,setNodeRelSize] = useState(props.nodeRelSize)
  const [nodeOpacity,setNodeOpacity] = useState(props.nodeOpacity)
  const [useNodeImg,setUseNodeImg] = useState(props.useNodeImg)
  const [useNodeIcon,setUseNodeIcon] = useState(props.useNodeIcon)
  const [dagModeOn,setDagModeOn] = useState(props.dagModeOn)
  const [dagMode,setDagMode] = useState(props.dagMode)
  const [enableZoomPanInteraction,setEnableZoomPanInteraction] = useState(props.enableZoomPanInteraction)
  const [enableNavigationControls,setEnableNavigationControls] = useState(props.enableNavigationControls)
  const [enablePointerInteraction,setEnablePointerInteraction] = useState(props.enablePointerInteraction)
  const [nodeClicked,setNodeClicked] = useState(null)
  const [nodeClickedViewpointCoordinates,setNodeClickedViewpointCoordinates] = useState(null)
  const [nodeHovered,setNodeHovered] = useState(null)
  const [linkHovered,setLinkHovered] = useState(null)
  const [nodeHoveredViewpointCoordinates,setNodeHoveredViewpointCoordinates] = useState(null)
  const [nodeRightClicked,setNodeRightClicked] = useState(null)
  const [nodeRightClickedViewpointCoordinates,setNodeRightClickedViewpointCoordinates] = useState(null)
  const [linkClicked,setLinkClicked] = useState(null)
  const [linkRightClicked,setLinkRightClicked] = useState(null)
  const [nodeIdsDrag, setNodeIdsDrag] = useState([])
  const [linkIdsNodesDrag, setLinkIdsNodesDrag] = useState([])
  const [nodeZoomId,setNodeZoomId] = useState(null)
  const [nodeIdsVisible,setNodeIdsVisible] = useState(props.nodeIdsVisible)
  const [linkIdsVisible,setLinkIdsVisible] = useState(props.linkIdsVisible)
  const [nodeIdsHighlight,setNodeIdsHighlight] = useState(props.nodeIdsHighlight)
  const [linkIdsHighlight,setLinkIdsHighlight] = useState(props.linkIdsHighlight)
  const [pauseAnimation,setPauseAnimation] = useState(false)
  const [resumeAnimation,setResumeAnimation] = useState(true)
  const [graphBbox,setGraphBbox] = useState(null)
  const [nodesSelected, setNodesSelected] = useState([])
  const [linksSelected, setLinksSelected] = useState([])
  const [centreCoordinates, setCentreCoordinates] = useState({"x":1000,"y":1000})
  const [nodeIdsAll, setNodeIdsAll] = useState(new Set())
  const [linkIdsAll, setLinkIdsAll] = useState(new Set())


    // import scripts
    // https://fontawesome.com/kits/a6e0eeba63/use?welcome=yes
    // importScript("https://kit.fontawesome.com/a6e0eeba63.js");
    Object.keys(props.nodeIcon_fontsheets).map(key =>{
        // graph gui
        // importScript("//unpkg.com/d3-force")
        importScript(props.nodeIcon_fontsheets[key])
        // useFontFace(key, props.nodeIcon_fontsheets[key])
    })

    const fgRef = useRef(null);

    useEffect(() => {
        // add radial force
        // https://github.com/vasturiano/3d-force-graph/issues/228#
        fgRef.current.d3Force(
          'radial',forceRadial().radius(0).strength(0.00)) //Math.pow(Math.sqrt(node.x)+Math.sqrt(node.y),2)/2
        // add some negative charge (nodes repel each other) and lower the effective distance
        fgRef.current.d3Force('charge').strength(-10).distanceMax(50)
      }, [props.graphData]);
    // settings

    const [guiSettings,setGuiSettings] = useState({
        "backgroundColor":props.backgroundColor,
        "showNavInfo":props.showNavInfo,
        "nodeRelSize":props.nodeRelSize,
        "nodeOpacity":props.nodeOpacity,
        "link":50,
        "charge":-10,
        "center":1,
        "radial":0.0,
        "useNodeImg":props.useNodeImg,
        "useNodeIcon":props.useNodeIcon,
        "dagModeOn":props.dagModeOn,
        "dagMode":props.dagMode
    })

      // Update current state with changes from controls
    const handleUpdate = newData => setGuiSettings({ ...guiSettings, ...newData });

    useEffect( () => {
        setBackgroundColor(guiSettings.backgroundColor)
        setShowNavInfo(guiSettings.showNavInfo)
        setNodeRelSize(guiSettings.nodeRelSize)
        setNodeOpacity(guiSettings.nodeOpacity)

        if (props.forceEngine === "d3") {
          fgRef.current
              .d3Force('link')
              .distance(link => guiSettings.link)
          fgRef.current
              .d3Force('charge')
              .strength(() => guiSettings.charge)
          fgRef.current
              .d3Force('center')
              .strength(() => guiSettings.center)
            fgRef.current
                .d3Force('radial')
                .strength(() => guiSettings.radial)
          setDagMode(props.dagModeOn || guiSettings.dagModeOn? guiSettings.dagMode : null)
          fgRef.current.d3ReheatSimulation()
        }
        setUseNodeImg(guiSettings.useNodeImg)
        setUseNodeIcon(guiSettings.useNodeIcon)
    }, [guiSettings])

    const [nodesById, setNodesById] = useState(null)

    //let nodesById = Object.fromEntries(props.graphData.nodes.map(node => [node[props.nodeId], node]));

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



    useEffect(()=> {

      const nodeIdsAll_new = new Set(props.graphData.nodes.map(node => node[props.nodeId]))
      const linkIdsAll_new = new Set(props.graphData.nodes.map(node => node[props.nodeId]))

      function union(setA, setB) {
          let _union = new Set(setA)
              for (let elem of setB) {
                  _union.add(elem)
              }
              return _union
        }
      const nodes_union_size = union(nodeIdsAll_new, nodeIdsAll).size
      if ((nodes_union_size !== nodeIdsAll.size) || (nodes_union_size !== nodeIdsAll_new.size)) {
          setNodeIdsAll(nodeIdsAll_new)
      }

      const links_union_size = union(linkIdsAll_new, linkIdsAll).size
      if ((links_union_size !== linkIdsAll.size) || (links_union_size !== linkIdsAll_new.size)) {
          setLinkIdsAll(linkIdsAll_new)
      }
    },[props.graphData])

    // receive props.graphData
    // add node neighbours to nodes
    // save nodes and links to State
    // set nodesById
    useEffect( () => {
        // to each node, add a "__source" and "__target" attribute
        // each containing a dict, with linkLabels as keys, and values being dicts of {linkid1:nodeid1, linkid2:nodeid2..}
        // e.g. "__source":{"linkLabel1":{linkid343":"nodeid121"}, "linkLabel2":{..}}}
        if (nodeIdsAll.size) {
          // deep clone nodes and links
          const nodes_new = cloneDeep(props.graphData.nodes)
          const links_new = cloneDeep(props.graphData.links)
          // initialise __source and __target
          for (const node of nodes_new) {
              node.__source = {}
              node.__target = {}
            }

          if (links_new.length) {
              const nodeIds = nodes_new.map(node=>node[props.nodeId])
              for (const link of links_new) {
                  // temporarily replace full node object with just id
                  // without modifying props in place
                  // UPDATE: in props.graphData link source and target are str
                  // since we never pass graphData to props without making sure of this
                  // if (typeof(link[props.linkSource])==="object") {
                  //     link[props.linkSource] = link[props.linkSource].id
                  // }
                  // if (typeof(link[props.linkTarget])==="object") {
                  //     link[props.linkTarget] = link[props.linkTarget].id
                  // }
                  const idx_source_node = nodeIds.indexOf(link[props.linkSource])
                  // if not link[props.linkLabel] a key in node.__source, add new
                  if (!(props.linkLabel in link)) {
                      link[props.linkLabel] = link[props.linkId]
                  }

                  if (!(link[props.linkLabel] in nodes_new[idx_source_node].__source)) {
                      nodes_new[idx_source_node].__source[link[props.linkLabel]] = {}
                  }
                  nodes_new[idx_source_node].__source[link[props.linkLabel]] [link[props.linkId]] = link[props.linkTarget]
                  // if link[props.linkLabel] not in target node.__source, add new
                  const idx_target_node = nodeIds.indexOf(link[props.linkTarget])
                  // if not link[props.linkLabel] a key in node.__source, add new
                  if (!(link[props.linkLabel] in nodes_new[idx_target_node].__target)) {
                      nodes_new[idx_target_node].__target[link[props.linkLabel]] = {}
                  }
                  nodes_new[idx_target_node].__target[link[props.linkLabel]][link[props.linkId]] = link[props.linkSource]
              }
          }
          // const graphData_new = {"nodes":nodes_new, "links":links_new}
          // setGraphData(graphData_new)
          props.setProps({"graphData":{"nodes":nodes_new, "links":links_new}})
          setNodesById(Object.fromEntries(nodes_new.map(node => [node[props.nodeId], node])))
        }
    },[nodeIdsAll, linkIdsAll])

    // set node coordinates
    useEffect( () => {
        const origin = props.centreCoordinates? props.centreCoordinates : {"x":1000,"y":1000}
        const nodes_new = cloneDeep(props.graphData.nodes)
        if (props.useCoordinates && props.pixelUnitRatio && nodes_new) {
            nodes_new.forEach(node => {
                node.fx = origin+props.pixelUnitRatio*node.__coord_x;
                node.fy = origin+props.pixelUnitRatio*node.__coord_y;
              })
         } else {
            nodes_new.forEach(node => {
              if ("fx" in node) {
                  delete node.fx;
                  delete node.fy;
              }
            })
         }
         // generally, update nodes and links state when nodes is updated
         props.setProps({"graphData":{"nodes":nodes_new, "links":props.graphData.links}})
         // const graphData_new = {"nodes":nodes_new, "links":graphData.links}
         // setGraphData(graphData_new)
         // fgRef.current.d3ReheatSimulation()
    },[props.useCoordinates, props.pixelUnitRatio, props.centreCoordinates, nodeIdsAll])

    // when loading new graphData and rendering engine is running,
    // disable interactivity to improve performance
    useEffect( () => {
        setEnableZoomPanInteraction(false)
        setEnableNavigationControls(false)
        setEnablePointerInteraction(false)
    },[props.graphData])

    const nodeLabelFunction = node => props.nodeLabel in node? node[props.nodeLabel]? node[props.nodeLabel] : node[props.nodeId] : node[props.nodeId]

    const nodeVisibilityFunction = node => {
        let visible = true
        if (nodeIdsVisible.length) {
            if (nodeIdsVisible.indexOf(node[props.nodeId]) === -1) {
                visible = false
            }
        }
        return visible
    }


    const nodeColorFunction = (node => {
        let color = props.nodeColor in node? validateColor(node[props.nodeColor])? node[props.nodeColor] : "#0000ff" : "#0000ff"
        if (nodesSelected.length) {
          color = darken(0.2, color)
          if (nodesSelected.map(nodeSel => nodeSel[props.nodeId]).indexOf(node[props.nodeId]) !== -1) {
              color = saturate(0.2,color)
              color = lighten(0.2, color)
          }
        }

        if (nodeIdsHighlight.length) {
            color = darken(0.2, color)
            if (nodeIdsHighlight.indexOf(node[props.nodeId]) !== -1) {
                //color = saturate(0.2,color)
                color = lighten(0.2, color)
            }
        }
        if (nodeIdsDrag.length) {
            color = darken(0.2, color)
            if (nodeIdsDrag.indexOf(node[props.nodeId]) !== -1) {
                //color = saturate(0.2, color)
                color = lighten(0.3, color)
            }
        }
        return color
    })

    const get_node_neighbour_ids = (node, depth) => {
        /**
        * @usage: extract the ids of neighbours from the "__source" and "__target" items in the node object.
        *           If all the nodes with these ids are already in nodesSelected (if not null), call recursively on the
        *           nodes with these ids until the neighbourNodeIds_unique contain 'new' nodes that weren't already in nodesSelected
        */
        if (depth===0) {
            return []
        };
        const neighbourNodeIds = []
        if ("__source" in node) {
            if (Object.keys(node.__source).length) {
                Object.keys(node.__source).forEach(key=>{
                    // iterate over roles
                    Object.values(node.__source[key]).map(nodeId => neighbourNodeIds.push(nodeId))
                })
            }
        };
        if ("__target" in node) {
            if (Object.keys(node.__target).length) {
                Object.keys(node.__target).forEach(key => {
                    Object.values(node.__target[key]).map(nodeId => neighbourNodeIds.push(nodeId))
                });
            };
        };

        let neighbourNodeIds_unique = neighbourNodeIds.length? [...new Set(neighbourNodeIds)] : []

        if (neighbourNodeIds_unique.length) {
            // if all the neighbour nodes are already selected
            if (neighbourNodeIds_unique.every(nnid => nodesSelected.map(ns => ns[props.nodeId]).includes(nnid))) {

                // retrieve the nodes matching the neighbourNodeIds
                const neighbourNodes_unique = neighbourNodeIds_unique.map(nnidu => nodesById[nnidu])
                neighbourNodes_unique.forEach(nnu => {
                    neighbourNodeIds_unique = neighbourNodeIds_unique.concat(get_node_neighbour_ids(nnu, depth-1))
                })
            }
        }
        neighbourNodeIds_unique = neighbourNodeIds_unique.length? [...new Set(neighbourNodeIds_unique)] : []

        // if no new nodes were added, return empty array
        if (neighbourNodeIds_unique.length) {
            if (neighbourNodeIds_unique.every(nnid => nodesSelected.map(ns => ns[props.nodeId]).includes(nnid))) {
                neighbourNodeIds_unique.splice(0,neighbourNodeIds_unique.length)
            }
        }
        return neighbourNodeIds_unique
    };

    useEffect( () => {
        setNodesSelected(props.nodesSelected)
    }, [props.nodesSelected])


    // https://github.com/vasturiano/force-graph/blob/master/example/multi-selection/index.html
    const handleNodeClick = (node,event) => {
        /**
         * set props
        */
        const nodesSelected_new = cloneDeep(nodesSelected)
        // reset nodeRightClicked
        setNodeRightClicked(null)
        setNodeRightClickedViewpointCoordinates(null)
        // set nodeClicked
        setNodeClicked(node)
        setNodeClickedViewpointCoordinates(fgRef.current.graph2ScreenCoords(node.x,node.y))
        /**
         * node selection
        */
        const nodeIndex = nodesSelected_new.map(nodeSel => nodeSel[props.nodeId]).indexOf(node[props.nodeId])

        if (event.shiftKey) {
            // multi-selection
            if (nodeIndex === -1) {
                nodesSelected_new.push(node);
            } else {
                nodesSelected_new.splice(nodeIndex,1)
            };
        } else {
            // not shift
            //
            // if (event.detail == 2) {
                // setNodeZoomId(node[props.nodeId])
            // } else {
            if (nodeIndex === -1) {
              // node not in nodesSelected
              nodesSelected_new.splice(0,nodesSelected_new.length)
              nodesSelected_new.push(node);
            } else {
                // node already selected
                if (event.altKey) {
                    // select neighbours of selected node(s)
                    const neighbourNodeIds = get_node_neighbour_ids(node, props.maxDepth_neighbours_select)
                    const neighbourNodes = neighbourNodeIds.length? neighbourNodeIds.map(neighbourNodeId => nodesById[neighbourNodeId]) : []
                    if  (neighbourNodeIds.length) {
                        neighbourNodes.map(neighbourNode => {neighbourNode[props.nodeId] === node[props.nodeId]? null : nodesSelected_new.push(neighbourNode)})
                    } else {
                      nodesSelected_new.splice(0,nodesSelected_new.length)
                    }
                } else {
                    setNodeZoomId(node[props.nodeId])
                }
            }
            // }
        }
        setNodesSelected(nodesSelected_new)
    };

    const handleNodeRightClick = node=> {
        setNodeRightClicked(node)
        setNodeRightClickedViewpointCoordinates(fgRef.current.graph2ScreenCoords(node.x,node.y))
        // reset node clicked
        setNodeClicked(null)
        setNodeClickedViewpointCoordinates(null)
    }

    const handleLinkRightClick = link => {
        setLinkRightClicked(link)
        setLinkClicked(null)
    }

    const handleNodeDrag = (node, translate) => {
        setNodeIdsDrag([])
        setLinkIdsNodesDrag([])
        /**
         * highlight dragged node and immediate neighbours
         */
        if (node!==null) {
            const neighbourNodeIds = []
            const linkIds = []
            if ("__source" in node) {
            // if (Object.keys(node).includes("__source")) {
                if (Object.keys(node.__source).length > 0) {
                    Object.keys(node.__source).forEach(key=> {
                        // iterate over roles
                        Object.values(node.__source[key]).map(nodeId => neighbourNodeIds.push(nodeId))
                        Object.keys(node.__source[key]).map(linkId => linkIds.push(linkId))
                    })
                }
            };
            if ("__target" in node) {
            // if (Object.keys(node).includes("__target")) {
                if (Object.keys(node.__target).length > 0) {
                    Object.keys(node.__target).forEach(key => {
                        // iterate over roles
                        Object.values(node.__target[key]).map(nodeId => neighbourNodeIds.push(nodeId))
                        Object.keys(node.__target[key]).map(linkId => linkIds.push(linkId))
                    })
                }
            };

            // two-step highlighting for some nodes
            // if (node.__supertype === "entity" && !node.__is_type) {
            //     // if entity highlight second step neighbours
            //     const n = neighbourNodeIds.length

            //     for (const i = 0; i < n; i++) {
            //         let nnid = neighbourNodeIds[i]
            //         let neighbourNode = nodesById[nnid]

            //         if (Object.keys(neighbourNode).includes("__source")) {
            //             if (Object.keys(neighbourNode.__source).length > 0) {
            //                 for (const key in neighbourNode.__source){
            //                     // iterate over roles
            //                     Object.values(neighbourNode.__source[key]).map(nodeId => neighbourNodeIds.push(nodeId))
            //                     Object.keys(neighbourNode.__source[key]).map(linkId => linkIds.push(linkId))
            //                 }
            //             }
            //         };

            //         if (Object.keys(neighbourNode).includes("__target")) {
            //             if (Object.keys(neighbourNode.__target).length > 0) {
            //                 for (const key in neighbourNode.__target){
            //                     // iterate over roles
            //                     Object.values(neighbourNode.__target[key]).map(nodeId => neighbourNodeIds.push(nodeId))
            //                     Object.keys(neighbourNode.__target[key]).map(linkId => linkIds.push(linkId))
            //                 }
            //             }
            //         };
            //     }
            // }
            // assign unique ids to nodeIdsDrag prop
            neighbourNodeIds.push(node[props.nodeId])
            setNodeIdsDrag([...new Set(neighbourNodeIds)])
            setLinkIdsNodesDrag([...new Set(linkIds)])

            /**
             * drag all selected nodes and fix in place afterwards
             */
            // from https://github.com/vasturiano/force-graph/blob/master/example/multi-selection/index.html
            if (nodesSelected.length) {
                const nodesSelected_new = cloneDeep(nodesSelected)
                const nodesSelectedIds = nodesSelected_new.map(nodeSel=>nodeSel[props.nodeId])
                // moving a selected node?
                if (nodesSelectedIds.includes(node[props.nodeId])) {
                    // then move all other selected nodes as well
                    nodesSelected_new
                        .filter(nodeSelected => nodeSelected[[props.nodeId]] !== node[props.nodeId])
                        .forEach(nodeSel => ['x', 'y'].forEach(coord => nodeSel[`f${coord}`] = nodeSel[coord] + translate[coord])); // translate other nodes by same amount => selNode !== node).forEach(node => ['x', 'y'].forEach(coord => node[`f${coord}`] = node[coord] + translate[coord])); // translate other nodes by same amount
                };
                setNodesSelected(nodesSelected_new)
            }

        }
    };

    // fix dragged nodes in place
    const handleNodeDragEnd = (node, translate) => {
        setNodeIdsDrag([])
        setLinkIdsNodesDrag([])

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
        node.fx = node.x;
        node.fy = node.y;
        // node.fz = node.z;
    };

    const handleNodeHover = node => {
        if (node) {
            setNodeHovered(node)
            setNodeHoveredViewpointCoordinates(fgRef.current.graph2ScreenCoords(node.x,node.y))
        } else {
            setNodeHovered(null)
            setNodeHoveredViewpointCoordinates(null)
        }
    };

    const handleLinkHover = link => {
        link? setLinkHovered(link) : setLinkHovered(null)
    };

    // set centreCoordinates
    useEffect( () => {
        if (fgRef.current.getGraphBbox() !== null) {
            setCentreCoordinates(props.graphData.nodes.length ? {x:0.5*(fgRef.current.getGraphBbox().x[0]+fgRef.current.getGraphBbox().x[1]), y:0.5*(fgRef.current.getGraphBbox().y[0]+fgRef.current.getGraphBbox().y[1])} : fgRef.current.screen2GraphCoords(window.innerHeight/2, window.innerHeight/2))
        }
    },[props.graphData])

    const handleBackgroundClick = event => {
        setNodeClicked(null)
        setNodeClickedViewpointCoordinates(null)
        setNodeRightClicked(null)
        setNodeRightClickedViewpointCoordinates(null)
        setLinkClicked(null)
        setLinkRightClicked(null)
        setNodesSelected([])
        setLinksSelected([])
        if (event.detail == 2) {
          setNodeZoomId(null)
        }
    };

    const handleBackgroundRightClick = event => {
        setNodeClicked(null)
        setNodeClickedViewpointCoordinates(null)
        setNodeRightClicked(null)
        setNodeRightClickedViewpointCoordinates(null)
        setLinkClicked(null)
        setLinkRightClicked(null)
        setNodesSelected([])
        setLinksSelected([])
        setNodeZoomId(null)
    };

    const handleLinkClick = (link,event) => {
        // as a sideeffect, reset linkRightClicked
        setLinkRightClicked(null)
        setLinkClicked(link)
        const linksSelected_new = cloneDeep(linksSelected)

        const linkIndex = linksSelected_new.map(linkSel => linkSel[props.linkId]).indexOf(link[props.linkId])

        if (event.shiftKey) {
            // multi-selection
            if (linkIndex === -1) {
                linksSelected_new.push(link);
            } else {
                linksSelected_new.splice(linkIndex,1)
            };
        } else {
            linksSelected_new.splice(0,linksSelected_new.length)
            linksSelected_new.push(link);
        }
        setLinksSelected(linksSelected_new)
    };

    useEffect(() => setNodeIdsVisible(props.nodeIdsVisible),[props.nodeIdsVisible])
    useEffect(() => setLinkIdsVisible(props.linkIdsVisible),[props.linkIdsVisible])
    useEffect(() => setNodeIdsHighlight(props.nodeIdsHighlight),[props.nodeIdsHighlight])
    useEffect(() => setLinkIdsHighlight(props.linkIdsHighlight),[props.linkIdsHighlight])
    useEffect(() => setNodeZoomId(props.nodeZoomId),[props.nodeZoomId])

    // zoom to node
    useEffect(() => {
        if (props.graphData.nodes.length > 1) {
            if (nodeZoomId) {
                const nodeIdsVisible_new = []
                const linkIdsVisible_new = []
                nodeIdsVisible_new.push(nodeZoomId)

                // spacing between nodes
                const mar_x = 60
                const mar_y_min = 20

                const nodeZoom = nodesById[nodeZoomId]
                nodeZoom.fx = nodeZoom.x
                nodeZoom.fy = nodeZoom.y + mar_y_min/2 // shift a bit to avoid overlap

                const relations = []
                const related = []

                if (Object.values(nodeZoom.__source).length) {
                    for (const [role, obj] of Object.entries(nodeZoom.__source)) {
                        for (const [link_id, rel_id] of Object.entries(obj)) {
                            // set_rel_node_ids.add(rel_id)
                            const rel_node = nodesById[rel_id]
                            relations.push({"relation":rel_node, "roleplayers":[]})
                            linkIdsVisible_new.push(link_id)
                            nodeIdsVisible_new.push(rel_id)
                            // obj_rel_rp_node_ids[rel_id] = new Set(null)
                            if (Object.values(rel_node.__target).length) {
                                for (const [role_1,obj_1] of Object.entries(rel_node.__target)) {
                                    for (const [link_id_1, rp_id] of Object.entries(obj_1)) {
                                        if (!nodeIdsVisible_new.includes(rp_id)) {
                                            // only allow role players to be placed once
                                            relations[relations.length-1].roleplayers.push(nodesById[rp_id])
                                            nodeIdsVisible_new.push(rp_id)
                                        }
                                        // .. but always make the link visible
                                        linkIdsVisible_new.push(link_id_1)
                                    }
                                }
                            }
                        }
                    }
                }

                if (Object.values(nodeZoom.__target).length) {
                    for (const [role, obj] of Object.entries(nodeZoom.__target)) {
                        for (const [link_id, rp_id] of Object.entries(obj)) {
                            if (!nodeIdsVisible_new.includes(rp_id)) {
                                related.push(nodesById[rp_id])
                                linkIdsVisible_new.push(link_id)
                                nodeIdsVisible_new.push(rp_id)
                            }
                        }
                    }
                }
                /**
                 * sort nodes
                 */
                // relations
                // first rel sort
                if (props.sortRelsBy1 !== null) {
                    // find out the attribute type
                    const rel_obj_relHasAttr = relations.find(rel_obj => props.sortRelsBy1 in rel_obj.relation);
                    if (typeof(rel_obj_relHasAttr) !== "undefined") {
                        if (typeof(rel_obj_relHasAttr.relation[props.sortRelsBy1]) === "string") {
                            relations.sort((a,b)=> {
                                return (props.sortRelsBy1 in a.relation && props.sortRelsBy1 in b.relation) ? a.relation[props.sortRelsBy1].localeCompare(b.relation[props.sortRelsBy1]) > 0 ? props.sortRels1Descend ? -1 : 1 : -1 : 0
                            })
                        } else if (typeof(rel_obj_relHasAttr.relation[props.sortRelsBy1]) === "number") {
                            relations.sort((a, b) => {
                                return (props.sortRelsBy1 in a.relation && props.sortRelsBy1 in b.relation) ? a.relation[props.sortRelsBy1] - b.relation[props.sortRelsBy1] > 0 ? props.sortRels1Descend ? -1 : 1 : -1 : 0
                            })
                        } else if (typeof(rel_obj_relHasAttr.relation[props.sortRelsBy1]) === "boolean") {
                            relations.sort((a, b) => {
                                return (props.sortRelsBy1 in a.relation && props.sortRelsBy1 in b.relation) ? a.relation[props.sortRelsBy1] > b.relation[props.sortRelsBy1] ? props.sortRels1Descend ? -1 : 1 : -1 : 0
                            })
                        }
                    }
                }
                // second rel sort
                if (props.sortRelsBy2 !== null) {
                    // find out the attribute type
                    let rel_obj_relHasAttr = relations.find(rel_obj => props.sortRelsBy2 in rel_obj.relation);
                    if (typeof(rel_obj_relHasAttr) !== "undefined") {
                        if (typeof(rel_obj_relHasAttr.relation[props.sortRelsBy2]) === "string") {
                            relations.sort((a,b)=> {
                                return (props.sortRelsBy2 in a.relation && props.sortRelsBy2 in b.relation) ? a.relation[props.sortRelsBy2].localeCompare(b.relation[props.sortRelsBy2]) > 0 ? props.sortRels2Descend ? -1 : 1 : -1 : 0
                            })
                        } else if (typeof(rel_obj_relHasAttr.relation[props.sortRelsBy2]) === "number") {
                            relations.sort((a, b) => {
                                return (props.sortRelsBy2 in a.relation && props.sortRelsBy2 in b.relation) ? a.relation[props.sortRelsBy2] - b.relation[props.sortRelsBy2] > 0 ? props.sortRels2Descend ? -1 : 1 : -1 : 0
                            })
                        } else if (typeof(rel_obj_relHasAttr.relation[props.sortRelsBy2]) === "boolean") {
                            relations.sort((a, b) => {
                                return (props.sortRelsBy2 in a.relation && props.sortRelsBy2 in b.relation) ? a.relation[props.sortRelsBy2] > b.relation[props.sortRelsBy2] ? props.sortRels2Descend ? -1 : 1 : -1 : 0
                            })
                        }
                    }
                }
                // role players
                // first role player sort
                if (props.sortRoleplayersBy1 !== null) {
                    // relation role players
                    // find out the attribute type
                    for (const rel_obj of relations) {
                        let node_relRpHasAttr = rel_obj.roleplayers.find(rp => props.sortRoleplayersBy1 in rp)
                        if (typeof(node_relRpHasAttr) !== "undefined") {
                            break
                        }
                    }
                    if (typeof(node_relRpHasAttr) !== "undefined") {
                        for (const rel_obj of relations) {
                            if (typeof(node_relRpHasAttr[props.sortRoleplayersBy1]) === "string") {
                                rel_obj.roleplayers.sort((a,b)=> {
                                    return (props.sortRoleplayersBy1 in a && props.sortRoleplayersBy1 in b) ? a[props.sortRoleplayersBy1].localeCompare(b[props.sortRoleplayersBy1]) > 0 ? props.sortRoleplayers1Descend ? -1 : 1 : -1 : 0
                                })
                            } else if (typeof(node_relRpHasAttr[props.sortRoleplayersBy1]) === "number") {
                                rel_obj.roleplayers.sort((a, b) => {
                                    return (props.sortRoleplayersBy1 in a && props.sortRoleplayersBy1 in b) ? a[props.sortRoleplayersBy1] - b[props.sortRoleplayersBy1] > 0 ? props.sortRoleplayers1Descend ? -1 : 1 : -1 : 0
                                })
                            } else if (typeof(node_relRpHasAttr[props.sortRoleplayersBy1]) === "boolean") {
                                rel_obj.roleplayers.sort((a, b) => {
                                    return (props.sortRoleplayersBy1 in a && props.sortRoleplayersBy1 in b) ? a[props.sortRoleplayersBy1] > b[props.sortRoleplayersBy1] ? props.sortRoleplayers1Descend ? -1 : 1 : -1 : 0
                                })
                            }
                        }
                    }
  
                    // related role players
                    // find out the attribute type
                    let node_rpHasAttr = related.find(rp => props.sortRoleplayersBy1 in rp)
                    if (typeof(node_rpHasAttr) !== "undefined") {
                        if (typeof(node_rpHasAttr[props.sortRoleplayersBy1]) === "string") {
                            related.sort((a,b)=> {
                                return (props.sortRoleplayersBy1 in a && props.sortRoleplayersBy1 in b) ? a[props.sortRoleplayersBy1].localeCompare(b[props.sortRoleplayersBy1]) > 0 ? props.sortRoleplayers1Descend ? -1 : 1 : -1 : 0
                            })
                        } else if (typeof(node_rpHasAttr[props.sortRoleplayersBy1]) === "number") {
                            related.sort((a, b) => {
                                return (props.sortRoleplayersBy1 in a && props.sortRoleplayersBy1 in b) ? a[props.sortRoleplayersBy1] - b[props.sortRoleplayersBy1] > 0 ? props.sortRoleplayers1Descend ? -1 : 1 : -1 : 0
                            })
                        } else if (typeof(node_rpHasAttr[props.sortRoleplayersBy1]) === "boolean") {
                            related.sort((a, b) => {
                                return (props.sortRoleplayersBy1 in a && props.sortRoleplayersBy1 in b) ? a[props.sortRoleplayersBy1] > b[props.sortRoleplayersBy1] ? props.sortRoleplayers1Descend ? -1 : 1 : -1 : 0
                            })
                        }
                    }
                }
                // second role player sort
                if (props.sortRoleplayersBy2 !== null) {
                    // relation role players
                    // find out the attribute type
                    for (const rel_obj of relations) {
                        let node_relRpHasAttr = rel_obj.roleplayers.find(rp => props.sortRoleplayersBy2 in rp)
                        if (typeof(node_relRpHasAttr) !== "undefined") {
                            break
                        }
                    }
                    if (typeof(node_relRpHasAttr) !== "undefined") {
                        for (const rel_obj of relations) {
                            if (typeof(node_relRpHasAttr[props.sortRoleplayersBy2]) === "string") {
                                rel_obj.roleplayers.sort((a,b)=> {
                                    return (props.sortRoleplayersBy2 in a && props.sortRoleplayersBy2 in b) ? a[props.sortRoleplayersBy2].localeCompare(b[props.sortRoleplayersBy2]) > 0 ? props.sortRoleplayers2Descend ? -1 : 1 : -1 : 0
                                })
                            } else if (typeof(node_relRpHasAttr[props.sortRoleplayersBy2]) === "number") {
                                rel_obj.roleplayers.sort((a, b) => {
                                    return (props.sortRoleplayersBy2 in a && props.sortRoleplayersBy2 in b) ? a[props.sortRoleplayersBy2] - b[props.sortRoleplayersBy2] > 0 ? props.sortRoleplayers2Descend ? -1 : 1 : -1 : 0
                                })
                            } else if (typeof(node_relRpHasAttr[props.sortRoleplayersBy2]) === "boolean") {
                                rel_obj.roleplayers.sort((a, b) => {
                                    return (props.sortRoleplayersBy2 in a && props.sortRoleplayersBy2 in b) ? a[props.sortRoleplayersBy2] > b[props.sortRoleplayersBy2] ? props.sortRoleplayers2Descend ? -1 : 1 : -1 : 0
                                })
                            }
                        }
                    }
  
                    // related role players
                    // find out the attribute type
                    let node_rpHasAttr = related.find(rp => props.sortRoleplayersBy2 in rp)
                    if (typeof(node_rpHasAttr) !== "undefined") {
                        if (typeof(node_rpHasAttr[props.sortRoleplayersBy2]) === "string") {
                            related.sort((a,b)=> {
                                return (props.sortRoleplayersBy2 in a && props.sortRoleplayersBy2 in b) ? a[props.sortRoleplayersBy2].localeCompare(b[props.sortRoleplayersBy2]) > 0 ? props.sortRoleplayers2Descend ? -1 : 1 : -1 : 0
                            })
                        } else if (typeof(node_rpHasAttr[props.sortRoleplayersBy2]) === "number") {
                            related.sort((a, b) => {
                                return (props.sortRoleplayersBy2 in a && props.sortRoleplayersBy2 in b) ? a[props.sortRoleplayersBy2] - b[props.sortRoleplayersBy2] > 0 ? props.sortRoleplayers2Descend ? -1 : 1 : -1 : 0
                            })
                        } else if (typeof(node_rpHasAttr[props.sortRoleplayersBy2]) === "boolean") {
                            related.sort((a, b) => {
                                return (props.sortRoleplayersBy2 in a && props.sortRoleplayersBy2 in b) ? a[props.sortRoleplayersBy2] > b[props.sortRoleplayersBy2] ? props.sortRoleplayers2Descend ? -1 : 1 : -1 : 0
                            })
                        }
                    }
                }


                
                setNodeIdsVisible(nodeIdsVisible_new)
                setLinkIdsVisible(linkIdsVisible_new)

                // place node relative to node zoom node
                const n_rel = relations.length
                // add half a space also for extra spaces between relations, to group their roleplayers
                // we need n_rels/2 - 0.5 extra spaces
                const sum = array => array.reduce(function(a, b) {return a + b}, 0);
                const n_rel_rp = relations.length? sum(relations.map(rel => rel.roleplayers.length)) + relations.length/2 - 0.5 : 0
                const n_rp = related.length

                // compute min y value (top)
                const height = Math.max(n_rel, n_rel_rp, n_rp) * mar_y_min
                const y_min = nodeZoom.y - height/2

                // compute y margins (spacing) for each column of nodes
                const mar_y_rel = n_rel > 0 ? height / n_rel : mar_y_min
                const mar_y_rel_rp = n_rel_rp > 0 ? height / n_rel_rp : mar_y_min
                const mar_y_rp = n_rp > 0 ? height / n_rp : mar_y_min

                // initialise the position multiplier at 0.5 to get center vertical alignment
                let k_rel = 0.5
                let k_rel_rp = -0.5 // move role players up a bit
                let k_rp = 0.5

                relations.forEach(relation_obj => {
                    const rel_node = relation_obj.relation
                    const roleplayers = relation_obj.roleplayers
                    rel_node.fx = nodeZoom.x + mar_x * 2
                    rel_node.fy = y_min + k_rel * mar_y_rel
                    for (const roleplayer of roleplayers) {
                        roleplayer.fx = nodeZoom.x + mar_x
                        roleplayer.fy = y_min + k_rel_rp * mar_y_rel_rp
                        // if too close to nodeZoom and relation is below nodeZoom in height, shift rp down another notch
                        if ((roleplayer.fy - nodeZoom.y < mar_y_min) && (y_min + k_rel * mar_y_rel > nodeZoom.y)) {
                            roleplayer.fy = roleplayer.fy + mar_y_rel_rp
                            k_rel_rp = k_rel_rp + 1
                        }
                        k_rel_rp = k_rel_rp + 1
                    }
                    // add extra half space between rps of each rel
                    k_rel = k_rel + 1
                    k_rel_rp = k_rel_rp + 0.5
                })

                related.forEach(roleplayer => {
                    roleplayer.fx = nodeZoom.x - mar_x
                    roleplayer.fy = y_min + k_rp * mar_y_rp
                    k_rp = k_rp + 1
                })

                // pan and zoom
                const nodeFilterFn = n => {
                    return nodeIdsVisible_new.includes(n[props.nodeId])? true : false
                }
                fgRef.current.zoomToFit(250,40,nodeFilterFn)
                // <DELETE ?
                // fgRef.current.centerAt(nodeZoom.fx+mar_x/2, nodeZoom.fy, 250)
                // fgRef.current.zoom(4,250)
                // /DELETE>

            } else {
                for (const node of props.graphData.nodes) {
                    if ("fx" in node) {
                        delete node.fx
                        delete node.fy
                    }
                }
                setNodeIdsVisible([])
                setLinkIdsVisible([])
            }
        }
    },[
        nodeZoomId,
        props.sortRelsBy1,
        props.sortRelsBy2,
        props.sortRoleplayersBy1,
        props.sortRoleplayersBy2,
        props.sortRels1Descend,
        props.sortRels2Descend,
        props.sortRoleplayers1Descend,
        props.sortRoleplayers2Descend
    ])

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
        let color = props.nodeColor in node? validateColor(node[props.nodeColor])? node[props.nodeColor] : "#0000ff" : "#0000ff"
        const label = props.nodeLabel in node? node[props.nodeLabel]? node[props.nodeLabel] : node[props.nodeId] : node[props.nodeId]
        const size = 12;
        // ctx.globalAlpha = 0.9;
        ctx.fontWeight = "normal";
        let fontSize = Math.max(11/globalScale,5)

        // modify style parameters if node is selected and/or highlighted
        if (nodesSelected.length) {
            // make all other nodes more transparent
            // ctx.globalAlpha -= 0.3
            color = darken(0.2, color)
            if (nodesSelected.map(nodeSel => nodeSel[props.nodeId]).indexOf(node[props.nodeId]) !== -1) {
                // ctx.globalAlpha = 1
                color = saturate(0.2,color)
                color = lighten(0.2, color)
                fontSize = fontSize*1.2
            }
        }

        if (nodeIdsDrag.length) {
             // make all other nodes more transparent
            // ctx.globalAlpha -= 0.3
            color = darken(0.2, color)
            if (nodeIdsDrag.indexOf(node[props.nodeId]) !== -1) {
                // ctx.globalAlpha = 1
                color = lighten(0.3, color)
                ctx.fontWeight="bold"
            }
        }

        if (nodeIdsHighlight.length) {
            // ctx.globalAlpha -= 0.3
            color = darken(0.2, color)
            if (nodeIdsHighlight.indexOf(node[props.nodeId]) !== -1) {
                //ctx.globalAlpha = 1
                color = lighten(0.2, color)
                ctx.fontWeight="bold"
            }
        }

        // paint node text background rectangle
        // is this necessary??
        ctx.fillStyle = color
        let backgroundColor = backgroundColor? validateColor(backgroundColor)? backgroundColor : "#000000" : "#000000"
        ctx.fillStyle = lighten(0.2,backgroundColor);
        // add padding
        const rectsize = size*0.2
        ctx.fillRect(node.x-rectsize/2, node.y -rectsize, rectsize, rectsize);

        // set modified style parameters
        let img_src = null
        if (props.nodeImg in node && props.useNodeImg) {
            if (node[props.nodeImg]) {
                img_src = node[props.nodeImg]
                if (typeof(img_src)==="string" && (img_src.includes("http") || img_src.includes("www"))) {
                    const img = new Image();
                    img.src = img_src
                    //ctx.fillStyle = color;
                    ctx.drawImage(img, node.x - size / 2, node.y-size, size, size);
                }
            }
        }

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        if (img_src === null & props.nodeIcon in node & props.useNodeIcon) {
            // icon
            if (node[props.nodeIcon]) {
                const nodeIcon_obj = node[props.nodeIcon]
                ctx.font = `${size}px ${Object.keys(nodeIcon_obj)[0]}`
                ctx.fillStyle = color;
                ctx.fillText(`${Object.values(nodeIcon_obj)[0]}`, node.x, node.y-size/1.7, size);
            }
        }

        // draw text background rectangle
        ctx.font = `${fontSize}px Sans-Serif`;
        const textWidth = ctx.measureText(label).width;
        // add padding
        const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2);
        ctx.fillStyle = darken(0.2,backgroundColor);
        ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1]/2, ...bckgDimensions);

        // draw text label

        if (nodeIdsDrag.indexOf(node[props.nodeId]) !== -1) {
            ctx.font = `${fontSize}px Sans-Serif bold`;
        }
        ctx.fillStyle = color;
        ctx.fillText(label, node.x, node.y);
    }

    const nodeCanvasObjectModeFunction = node => props.nodeImg in node || props.nodeIcon in node? node[props.nodeImg] || node[props.nodeIcon] ? "replace" : "after" : "after"

    const linkVisibilityFunction = link => {
        let visible = true
        if (nodeIdsVisible.length) {
            // use nodeIdsVisible.length as criterion, since it shows whether or not a filter is applied.
            // if we use links, often it will be empty, and no links will be invisible
            if (linkIdsVisible.indexOf(link[props.linkId]) === -1) {
                visible = false
            }
        }
        return visible
    }

    const linkColorFunction = link => {
        let color = props.linkColor in link? validateColor(link[props.linkColor])? link[props.linkColor] :  invert(backgroundColor) : invert(backgroundColor)
        // is link selected?
        if (linksSelected.length) {
            color = darken(0.2, color)
            if (linksSelected.map(linkSel=>linkSel[props.linkId]).indexOf(link[props.linkId]) !== -1) {
                color = saturate(0.2,color)
                color = lighten(0.2,color)
            }
        }
        // is link connected to node being dragged?
        if (linkIdsNodesDrag.length) {
            color = darken(0.2, color)
            if (linkIdsNodesDrag.indexOf(link[props.linkId]) !== -1) {
                color = saturate(0.2,color)
                color = lighten(0.2, color)
            }
        }
        // are link source and target selected?
        if (nodesSelected.length) {
            color = darken(0.2, color)
            if (nodesSelected.map(node => node[props.nodeId]).includes(link[props.linkSource]) && nodesSelected.map(node => node[props.nodeId]).includes(link[props.linkTarget])) {
                color = saturate(0.2,color)
                color = lighten(0.2, color)
            }
        }
        return color
    }

    const linkWidthFunction = link => {
        let width = props.linkWidth
        // is link selected?
        if (linksSelected.length) {
            width = width*0.9
            if (linksSelected.map(linkSel=>linkSel[props.linkId]).indexOf(link[props.linkId]) !== -1) {
                width = width*4
            }
        }
        // is link highlighted?
        if (linkIdsNodesDrag.length) {
            width = width*0.9
            if (linkIdsNodesDrag.indexOf(link[props.linkId]) !== -1) {
                width = width*1.5
            }
        }
        // are link source and target selected?
        if (nodesSelected.length) {
            width = width*0.9
            if (nodesSelected.map(node => node[props.nodeId]).includes(link[props.linkSource]) && nodesSelected.map(node => node[props.nodeId]).includes(link[props.linkTarget])) {
                width = width*1.5
            }
        }
        return width
    }

    const linkCanvasObjectFunction = (link, ctx) => {
        const MAX_FONT_SIZE = 4;
        const LABEL_NODE_MARGIN = props.nodeRelSize * 1.5;

        const start = link[props.linkSource];
        const end = link[props.linkTarget];

        // ignore unbound links
        if (typeof start !== 'object' || typeof end !== 'object') return;

        // calculate label positioning
        const textPos = Object.assign(...['x', 'y'].map(c => ({
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
        ctx.font = '1px Sans-Serif';
        const fontSize = Math.min(MAX_FONT_SIZE, maxTextLength / ctx.measureText(label).width);
        ctx.font = `${fontSize}px Sans-Serif`;

        const textWidth = ctx.measureText(label).width;
        const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

        // draw text label (with background rect)
        ctx.save();
        ctx.translate(textPos.x, textPos.y);
        ctx.rotate(textAngle);

        ctx.fillStyle = backgroundColor
        ctx.fillRect(- bckgDimensions[0] / 2, - bckgDimensions[1] / 2, ...bckgDimensions);

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = props.linkColor in link? validateColor(link[props.linkColor])? link[props.linkColor] :  invert(backgroundColor) : invert(backgroundColor)
        ctx.fillText(label, 0, 0);
        ctx.restore();
    }

    const onEngineStopFunction = () => {
        setEnableZoomPanInteraction(props.interactive? true : false)
        setEnablePointerInteraction(props.interactive? true : false)
        setEnableNavigationControls(props.interactive? true : false)
        // if (props.graphData.nodes.length) {
        //   props.graphData.nodes.forEach(node=> {
        //     node.fx = node.x
        //     node.fy = node.y
        //     node.fz = node.z
        //   })
        // }
    }

    // draw backgroundImage
    const onRenderFramePre = (ctx, globalScale) => {
        if (props.externalobject_source === "URL" && props.externalobject_input) {
            // TODO: check if URL is valid
            const backgroundImg = new Image();
            backgroundImg.src = props.externalobject_input;
            // backgroundImg.width = backgroundImg.width/globalScale
            // backgroundImg.height = backgroundImg.height/globalScale
            // the stretching needs to be optional
            // backgroundImg.width = props.size.width
            // const height = window.innerHeight*props.heightRatio
            // get the centre of the screen from existing graph or from translating screen to canvas coordinates
            // const centreCoordinates = {x:400, y:400}
            ctx.drawImage(backgroundImg, props.centreCoordinates.x-backgroundImg.width/2,props.centreCoordinates.y - backgroundImg.height/2);
            // ctx.drawImage(backgroundImg, 0,0);
        }
    }

    const dagNodeFilter = node => {
        return props.dagNodeIds.includes(node[props.nodeId])? true : false
    }

    // https://github.com/vasturiano/react-force-graph/issues/199
    const onDagError = loopNodeIds => {}
    /**
     * call methods via higher order component props
     */

    useEffect( () => {
        if (props.emitParticle!==null){
            fgRef.current.emitParticle(props.emitParticle)
        }
    },[props.emitParticle])

    useEffect( () => {
        if (props.pauseAnimation){
            fgRef.current.pauseAnimation()
        }
        setResumeAnimation(false)
    },[props.pauseAnimation])

    useEffect( () => {
        if (props.resumeAnimation){
            fgRef.current.resumeAnimation()
        }
        setPauseAnimation(false)
    },[props.resumeAnimation])

    useEffect( () => {
        if (props.centerAt){
            fgRef.current.centerAt(...props.centerAt)
        }
    },[props.centerAt])

    useEffect( () => {
        if (props.zoom){
            fgRef.current.zoom(...props.zoom)
        }
    },[props.zoom])

    useEffect( () => {
        if (props.zoomToFit){
            fgRef.current.zoomToFit(...props.zoomToFit)
        }
    },[props.zoomToFit])

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


    useEffect( () => {
        if (props.d3ReheatSimulation && props.forceEngine === "d3"){
            fgRef.current.d3ReheatSimulation()
        }
    },[props.d3ReheatSimulation])

    useEffect( () => {
        if (props.getGraphBbox){
            setGraphBbox(fgRef.current.getGraphBbox())
        }
    },[props.getGraphBbox])


    /*
    * Send selected state values to the parent component.
    * setProps is a prop that is automatically supplied
    * by dash's front-end ("dash-renderer").
    * In a Dash app, this will update the component's
    * props and send the data back to the Python Dash
    * app server if a callback uses the modified prop as
    * Input or State.
    */

    // instead return graphData from ForceGraph2D, so we get a single update,
    // and coordinates
    // useEffect( () => {props.setProps({"graphData":graphData})},[graphData])
    useEffect( () => {props.setProps({"nodeClicked":nodeClicked})},[nodeClicked])
    useEffect( () => {props.setProps({"nodeClickedViewpointCoordinates":nodeClickedViewpointCoordinates})},[nodeClickedViewpointCoordinates])
    useEffect( () => {props.setProps({"nodeRightClicked":nodeRightClicked})},[nodeRightClicked])
    useEffect( () => {props.setProps({"nodeRightClickedViewpointCoordinates":nodeRightClickedViewpointCoordinates})},[nodeRightClickedViewpointCoordinates])
    useEffect( () => {props.setProps({"linkClicked":linkClicked})},[linkClicked])
    useEffect( () => {props.setProps({"linkRightClicked":linkRightClicked})},[linkRightClicked])
    useEffect( () => {props.setProps({"graphBbox":graphBbox})},[graphBbox])
    useEffect( () => {props.setProps({"nodesSelected":nodesSelected})},[nodesSelected])
    useEffect( () => {props.setProps({"linksSelected":linksSelected})},[linksSelected])

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
                    height={window.innerHeight*props.heightRatio}
                    backgroundColor={backgroundColor}
                    showNavInfo={props.showNavInfo}
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
                    nodeOpacity={props.nodeOpacity}
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
                    linkCurvature={props.linkCurvature}
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
                    forceEngine={props.forceEngine}
                    dagMode={props.dagMode}
                    dagLevelDistance={props.dagLevelDistance}
                    dagNodeFilter={dagNodeFilter} // TODO: function
                    onDagError={onDagError}
                    d3AlphaMin={props.d3AlphaMin}
                    d3AlphaDecay={props.d3AlphaDecay}
                    d3VelocityDecay={props.d3VelocityDecay}
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
                    onNodeHover={handleNodeHover}
                    // onNodeCenterHover // not exposed, VR and AR
                    onNodeDrag={handleNodeDrag}
                    onNodeDragEnd={handleNodeDragEnd}
                    onLinkClick={handleLinkClick}
                    onLinkRightClick={handleLinkRightClick}
                    onLinkHover={handleLinkHover}
                    // onLinkCenterHover // not exposed
                    onBackgroundClick={handleBackgroundClick}
                    onBackgroundRightClick={handleBackgroundRightClick}
                    linkHoverPrecision={props.linkHoverPrecision}
                    // onZoom // TODO: function
                    // onZoomEnd // TODO: function
                    controlType={props.controlType}
                    enableNodeDrag={props.enableNodeDrag}
                    // enableZoomPanInteraction // overridden by 'interactive' parameter
                    // enableNavigationControls // overridden by 'interactive' parameter
                    // enablePointerInteraction // overridden by 'interactive' parameter
                    onChange={e => {props.setProps({graphData:e.target.graphData})}}
            />
            <div id = "dat-gui-div">
                <DatGui
                    data={guiSettings}
                    onUpdate={handleUpdate}>
                    <DatFolder title='settings' closed={true}>
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
                            <DatNumber path='nodeRelSize' label='nodeRelSize' min={1} max={25} step={1}/>
                            <DatNumber path='nodeOpacity' label='nodeOpacity' min={0} max={1} step={0.1}/>
                            <DatBoolean path='useNodeImg' label='useNodeImg'/>
                            <DatBoolean path='useNodeIcon' label='useNodeIcon'/>
                            </DatFolder>
                        <DatFolder title='Force engine configuration' closed = {true}>
                            <DatBoolean path='datModeOn' label='datModeOn'/>
                            <DatSelect path='dagMode' label='dagMode' options={['td', 'bu', 'lr', 'rl', 'radialout', 'radialin']}/>
                            </DatFolder>
                        </DatFolder>
                </DatGui>
            </div>
        </div>
    );
}

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
    * Apply layout constraints based on the graph directionality. Only works correctly for DAG graph structures (without cycles). Choice between td (top-down), bu (bottom-up), lr (left-to-right), rl (right-to-left), zout (near-to-far), zin (far-to-near), radialout (outwards-radially) or radialin (inwards-radially).
    */
    "dagModeOn": PropTypes.bool,

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
    * array of string ids for nodes to include in DAG layout
    */

    "dagNodeIds": PropTypes.arrayOf(PropTypes.string),

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

Graph2D.propTypes = graphSharedProptypes

objSharedProps.id = "Graph2D"

Graph2D.defaultProps = objSharedProps;

export default withSizeHOC(Graph2D)
