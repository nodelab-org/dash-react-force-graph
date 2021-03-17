import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {ForceGraph2D} from 'react-force-graph';
import importScript from '../customHooks/importScript.js';
// import useFontFace from '../customhooks/useFontFace.js';
// https://github.com/ctrlplusb/react-sizeme
import { withSize } from 'react-sizeme';
import {saturate, lighten, darken} from 'polished';
// import {forceCenter, forceManyBody, forceLink, forceRadial} from "d3";
 
// https://github.com/ctrlplusb/react-sizeme
// import * as material_UI from '@material-ui/icon_s'; // doesn't work: Module not found: Error: Can't resolve '@material-ui/icons' in '/Users/rkm916/Sync/projects/2020-dashforcegraph/src/lib/components'
// see https://stackoverflow.com/questions/42051588/wildcard-or-asterisk-vs-named-or-selective-import-es6-javascript

import {obj_shared_props} from "../shared_props_defaults.js"

// use react resize-me to make canvas container width responsive
const withSizeHOC = withSize({monitorWidth:true, monitorHeight:false, noPlaceholder:true});

function Graph2D(props) {
    
    // import scripts 
    // https://fontawesome.com/kits/a6e0eeba63/use?welcome=yes
    // importScript("https://kit.fontawesome.com/a6e0eeba63.js");
    for (let key in props.nodeIcon_fontsheets) {
        importScript(props.nodeIcon_fontsheets[key])
        // useFontFace(key, props.nodeIcon_fontsheets[key]) 
    }

    const fgRef = useRef(null);
  
    var nodesById = Object.fromEntries(props.graphData.nodes.map(node => [node[props.nodeId], node]));

    // display standard browser warning before navigating away from page
    // https://stackoverflow.com/questions/1119289/how-to-show-the-are-you-sure-you-want-to-navigate-away-from-this-page-when-ch
    useEffect( () => {
        if (props.active && props.graphData.nodes.length>0) {
            window.onbeforeunload = () => true
        } else {
            window.onbeforeunload = () => false
        }
      },[props.graphData, props.active])


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

    // set node coordinates
    useEffect( () => {
        const nodesUpdated = []
        const origin = props.centreCoordinates? props.centreCoordinates : {"x":1000,"y":1000}
         if (props.useCoordinates && props.pixelUnitRatio && props.graphData) {
            for (let node of props.graphData.nodes) {
                node.fx = origin+props.pixelUnitRatio*node.__coord_x
                node.fy =origin+props.pixelUnitRatio*node.__coord_y
                // node.fz =props.centreCoordinates+props.pixelUnitRatio*node.__coord_z
                nodesUpdated.push(node)
            } 
         } else {
            for (let node of props.graphData.nodes) {
                delete node.fx
                delete node.fy
                // node.fz =props.centreCoordinates+props.pixelUnitRatio*node.__coord_z
                nodesUpdated.push(node)
            } 
         }  
         props.setProps({graphData:{"nodes": nodesUpdated, "links":props.graphData.links}})
    },[props.useCoordinates, props.pixelUnitRatio,props.graphData, props.centreCoordinates])

    // when loading new graphData and rendering engine is running, disable interactivity
    useEffect( () => {
        props.setProps({enableZoomPanInteraction:false})
        props.setProps({enableNavigationControls:false})
        props.setProps({enablePointerInteraction:false})
    },[props.graphData])

    // add node neighbours to nodes
    useEffect( () => {
        // to each node, add a "__source" and "__target" attribute
        // each containing a dict, with linkLabels as keys, and values being dicts of {linkid1:nodeid1, linkid2:nodeid2..}
        // e.g. "__source":{"linkLabel1":{linkid343":"nodeid121"}, "linkLabel2":{..}}}
        if (props.graphData.nodes.length && props.graphData.links.length) {
            const nodes = []
            const nodeIds = props.graphData.nodes.map(node=>node[props.nodeId])
            // initialise __source and __target while copying nodes
            for (let node of props.graphData.nodes) { 
                node.__source = {}
                node.__target = {}  
                nodes.push(node)
            }
            for (let link of props.graphData.links) {  

                if (typeof(link.source)==="object") {
                    link.source = link.source.id
                }
                if (typeof(link.target)==="object") {
                    link.target = link.target.id
                }

                const idx_source_node = nodeIds.indexOf(link.source)
                // if not link[props.linkLabel] a key in node.__source, add new 
                if (!(props.linkLabel in link)) {
                    link[props.linkLabel] = link[props.linkId]
                }

                if (!Object.keys(nodes[idx_source_node].__source).includes(link[props.linkLabel])) {
                    nodes[idx_source_node].__source[link[props.linkLabel]] = {}
                }
                nodes[idx_source_node].__source[link[props.linkLabel]][link[props.linkId]] = link.target
                // if link[props.linkLabel] not in taget nodes.__source, add new 
                const idx_target_node = nodeIds.indexOf(link.target)
                // if not link[props.linkLabel] a key in node.__source, add new 
                if (!Object.keys(nodes[idx_target_node].__target).includes(link[props.linkLabel])) {
                    nodes[idx_target_node].__target[link[props.linkLabel]] = {}
                }
                nodes[idx_target_node].__target[link[props.linkLabel]][link[props.linkId]] = link.source
                
            }
            props.setProps({graphData:{"nodes":nodes, "links":props.graphData.links}})
        }
    },[props.graphData])

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
        // if (Object.keys(node).includes("__source")) {
            if (node.__source.length) {
                for (let key in node.__source){ 
                    // iterate over roles
                    Object.values(node.__source[key]).map(nodeId => neighbourNodeIds.push(nodeId))
                }
            }
        };
        if ("__target" in node) {
        // if (Object.keys(node).includes("__target")) {
            if (node.__target.length) {
                for (let key in node.__target){ 
                    // iterate over roles
                    Object.values(node.__target[key]).map(nodeId => neighbourNodeIds.push(nodeId))
                };
            };
        };
        
        var neighbourNodeIds_unique = neighbourNodeIds.length? [...new Set(neighbourNodeIds)] : []

        //if (props.nodesSelected) {
        if (props.nodesSelected.length>0) {
            if (neighbourNodeIds_unique.length) {
                if (neighbourNodeIds_unique.every(nnid => props.nodesSelected.map(ns => ns.id).includes(nnid))) {
                    // retrieve the nodes matching the neighbourNodeIds
                    const neighbourNodes_unique = neighbourNodeIds_unique.map(nnidu => nodesById[nnidu])
                    for (let neighbourNode_unique of neighbourNodes_unique) {
                        neighbourNodeIds_unique = neighbourNodeIds_unique.concat(get_node_neighbour_ids(neighbourNode_unique, depth-1))
                    }
                }
            }
        }
        //}
        neighbourNodeIds_unique = neighbourNodeIds_unique.length? [...new Set(neighbourNodeIds_unique)] : []

        // if no new nodes were added, return empty array
        if (neighbourNodeIds_unique.length) {    
            if (neighbourNodeIds_unique.every(nnid => props.nodesSelected.map(ns => ns.id).includes(nnid))) {
                neighbourNodeIds_unique.splice(0,neighbourNodeIds_unique.length)
            } 
        }
        return neighbourNodeIds_unique 
    };

     // https://github.com/vasturiano/force-graph/blob/master/example/multi-selection/index.html
    const handleNodeClick = (node,event) => {        
        /**
         * set props
        */
        // reset nodeRightClicked
        props.setProps({nodeRightClicked:null});
        props.setProps({nodeRightClickedViewpointCoordinates:null})
        // set props
        props.setProps({nodeClicked:node});
        props.setProps({nodeClickedViewpointCoordinates:fgRef.current.graph2ScreenCoords(node.x,node.y)})

        /**
         * node selection
        */

        // deep copy props.nodesSelected
        const nodesSelected_tmp = []    
        for (let node_tmp of props.nodesSelected) {
            nodesSelected_tmp.push(node_tmp)
        }
        const nodeIndex = nodesSelected_tmp.map(node => node[props.nodeId]).indexOf(node[props.nodeId])
        if (event.shiftKey) { 
            // multi-selection
            if (nodeIndex === -1) { 
                nodesSelected_tmp.push(node);   
            } else {
                nodesSelected_tmp.splice(nodeIndex,1)  
            }; 
        } else { 
            // not shift 
            if (nodeIndex === -1) {    
                // node not in nodesSelected
                nodesSelected_tmp.splice(0,nodesSelected_tmp.length) 
                nodesSelected_tmp.push(node); 
            } else {
                // node already selected

                const neighbourNodeIds = get_node_neighbour_ids(node, props.maxDepth_neighbours_select) 

                var neighbourNodes = neighbourNodeIds.length > 0 ? neighbourNodeIds.map(neighbourNodeId => nodesById[neighbourNodeId]) : []
                if  (neighbourNodeIds.length > 0) {
                    neighbourNodes.map(neighbourNode => neighbourNode[props.nodeId] === node[props.nodeId]? null : nodesSelected_tmp.push(neighbourNode))
                }   
            }
        }
        props.setProps({nodesSelected:nodesSelected_tmp});
        
    };

    const handleNodeRightClick = node=> {
        props.setProps({nodeRightClicked:node});
        props.setProps({nodeRightClickedViewpointCoordinates:fgRef.current.graph2ScreenCoords(node.x,node.y)})
        // reset node clicked
        props.setProps({nodeClicked:null});
        props.setProps({nodeClickedViewpointCoordinates:null});
    }
    
    const handleLinkRightClick = link => {
        props.setProps({linkRightClicked:link});
        props.setProps({linkClicked:null});
    }

    const handleNodeDrag = (node, translate) => {
        // reset nodeRightClicked (kludge)
        // props.setProps({nodeClicked:null});
        // props.setProps({nodeRightClicked:null});

        props.setProps({nodeIdsDrag:[]});
        props.setProps({linkIdsNodesDrag:[]}); 
        /**
         * highlight dragged node and immediate neighbours
         */
        if (node!==null) {
            const neighbourNodeIds = []
            const linkIds = [] 
            if ("__source" in node) {
            // if (Object.keys(node).includes("__source")) {
                if (Object.keys(node.__source).length > 0) {
                    for (let key in node.__source){ 
                        // iterate over roles
                        Object.values(node.__source[key]).map(nodeId => neighbourNodeIds.push(nodeId))
                        Object.keys(node.__source[key]).map(linkId => linkIds.push(linkId))
                    }
                }
            };
            if ("__target" in node) {
            // if (Object.keys(node).includes("__target")) {
                if (Object.keys(node.__target).length > 0) {
                    for (let key in node.__target){ 
                        // iterate over roles
                        Object.values(node.__target[key]).map(nodeId => neighbourNodeIds.push(nodeId))
                        Object.keys(node.__target[key]).map(linkId => linkIds.push(linkId))
                    }
                }
            };
            
            // two-step highlighting for some nodes
            // if (node.__supertype === "entity" && !node.__is_type) {
            //     // if entity highlight second step neighbours
            //     const n = neighbourNodeIds.length

            //     for (let i = 0; i < n; i++) { 
            //         let nnid = neighbourNodeIds[i]
            //         let neighbourNode = nodesById[nnid]
                    
            //         if (Object.keys(neighbourNode).includes("__source")) {
            //             if (Object.keys(neighbourNode.__source).length > 0) {
            //                 for (let key in neighbourNode.__source){ 
            //                     // iterate over roles
            //                     Object.values(neighbourNode.__source[key]).map(nodeId => neighbourNodeIds.push(nodeId))
            //                     Object.keys(neighbourNode.__source[key]).map(linkId => linkIds.push(linkId))
            //                 }
            //             }
            //         };
                    
            //         if (Object.keys(neighbourNode).includes("__target")) {
            //             if (Object.keys(neighbourNode.__target).length > 0) {
            //                 for (let key in neighbourNode.__target){ 
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
            const nodeIdsDragNew = neighbourNodeIds.length? [...new Set(neighbourNodeIds)] : []
            props.setProps({nodeIdsDrag:nodeIdsDragNew});
            props.setProps({linkIdsNodesDrag:linkIds}); 
            
            /**
             * drag all selected nodes and fix in place afterwards
             */
            // from https://github.com/vasturiano/force-graph/blob/master/example/multi-selection/index.html
            if (props.nodesSelected.length) {
                const nodesSelectedIds = props.nodesSelected.map(node=>node[props.nodeId])
                // moving a selected node?
                if (nodesSelectedIds.includes(node[props.nodeId])) { 
                    // then move all other selected nodes as well 
                    props.nodesSelected
                        .filter(nodeSelected => nodeSelected !== node)
                        .forEach(node => ['x', 'y'].forEach(coord => node[`f${coord}`] = node[coord] + translate[coord])); // translate other nodes by same amount => selNode !== node).forEach(node => ['x', 'y'].forEach(coord => node[`f${coord}`] = node[coord] + translate[coord])); // translate other nodes by same amount
                };
            }

        }
    };
    
    // fix dragged nodes in place
    const handleNodeDragEnd = (node, translate) => {
        props.setProps({nodeIdsDrag:[]});
        props.setProps({linkIdsNodesDrag:[]});

        // from https://github.com/vasturiano/force-graph/blob/master/example/multi-selection/index.html
        // if (props.nodesSelected.length) {
        //     const nodesSelectedIds = props.nodesSelected.map(node=>node[props.nodeId])
        //     // moving a selected node?
        //     if (nodesSelectedIds.includes(node[props.nodeId])) { 
        //         props.nodesSelected
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
            props.setProps({nodeHovered:node})   
            props.setProps({nodeHoveredViewpointCoordinates:fgRef.current.graph2ScreenCoords(node.x,node.y)})
        } else {
            props.setProps({nodeHovered:null})   
            props.setProps({nodeHoveredViewpointCoordinates:null})            
        }
    };

    const handleLinkHover = link => {
        link? props.setProps({linkHovered:link}) : props.setProps({linkHovered:null})           
    };

    // set centreCoordinates
    useEffect( () => {
        if (! fgRef.current.getGraphBbox() === null) { 
            props.setProps({centreCoordinates:props.graphData.nodes.length ? {x:0.5*(fgRef.current.getGraphBbox().x[0]+fgRef.current.getGraphBbox().x[1]), y:0.5*(fgRef.current.getGraphBbox().y[0]+fgRef.current.getGraphBbox().y[1])} : fgRef.current.screen2GraphCoords(window.innerHeight/2, window.innerHeight/2)})
        }
    },[props.graphData])

    const handleBackgroundClick = event => {        
        props.setProps({nodeClicked:null})   
        props.setProps({nodeClickedViewpointCoordinates:null})
        props.setProps({nodeRightClicked:null});
        props.setProps({nodeRightClickedViewpointCoordinates:null});
        props.setProps({linkClicked:null})   
        props.setProps({linkRightClicked:null});
        props.setProps({nodesSelected:[]});
        props.setProps({linksSelected:[]});
    };

    const handleBackgroundRightClick = event => {        
        props.setProps({nodeClicked:null})   
        props.setProps({nodeClickedViewpointCoordinates:null})
        props.setProps({nodeRightClicked:null});
        props.setProps({nodeRightClickedViewpointCoordinates:null});
        props.setProps({linkClicked:null})   
        props.setProps({linkRightClicked:null});
        props.setProps({nodesSelected:[]});
        props.setProps({linksSelected:[]});
    };

    useEffect(()=> {
        props.setProps({updated:false})
    }, [props.nodeIdsDrag, props.nodesSelected])

    const handleLinkClick = (link,event) => {
        
        // as a sideeffect, reset linkRightClicked 
        props.setProps({linkRightClicked:null});
        props.setProps({linkClicked:link});
        
        // deep copy props.nodesSelected
        const linksSelected_tmp = [] 
        
        for (let link_tmp of props.linksSelected) {
            linksSelected_tmp.push(link_tmp)
        }
        const linkIndex = linksSelected_tmp.map(link => link[props.linkId]).indexOf(link[props.linkId])

        if (event.shiftKey) { 
            // multi-selection
            if (linkIndex === -1) { 
                linksSelected_tmp.push(link);   
            } else {
                linksSelected_tmp.splice(linkIndex,1)  
            }; 
        } else { 

            linksSelected_tmp.splice(0,linksSelected_tmp.length) 
            linksSelected_tmp.push(link); 
        }
        props.setProps({linksSelected:linksSelected_tmp});
    };

    // zoom to node
    useEffect(() => {
        if (props.nodeZoomId) {
            // new position
            fgRef.current.centerAt(nodesById[props.nodeZoomId].x, nodesById[props.nodeZoomId].y, 250) 
            fgRef.current.zoom(4,250)
        }
    },[props.nodeZoomId])

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
        var fillStyle = props.nodeColor in node? node[props.nodeColor]? node[props.nodeColor] : "#0000ff" : "#0000ff" 
        const label = props.nodeLabel in node? node[props.nodeLabel]? node[props.nodeLabel] : node[props.nodeId] : node[props.nodeId]
        const size = 12;
        ctx.globalAlpha = 0.9;
        ctx.fontWeight = "normal";
        var fontSize = Math.max(11/globalScale,5)

        // modify style parameters if node is selected and/or highlighted
        if (props.nodesSelected.length) {
            // make all other nodes more transparent
            ctx.globalAlpha -= 0.3
            if (props.nodesSelected.map(node => node[props.nodeId]).indexOf(node[props.nodeId]) !== -1) {
                ctx.globalAlpha = 1
                fillStyle = saturate(0.2,fillStyle)
                fillStyle = lighten(0.2, fillStyle)
                fontSize = fontSize*1.2
            }
        }

        if (props.nodeIdsDrag.length) {
             // make all other nodes more transparent
            ctx.globalAlpha -= 0.3
            if (props.nodeIdsDrag.indexOf(node[props.nodeId]) !== -1) {
                ctx.globalAlpha = 1
                fillStyle = lighten(0.2, fillStyle)
                ctx.fontWeight="bold"
            } 
        }

        if (props.nodeIdsHighlight.length) {
            ctx.globalAlpha -= 0.3
            if (props.nodeIdsHighlight.indexOf(node[props.nodeId]) !== -1) {
                ctx.globalAlpha = 1
                fillStyle = lighten(0.2, fillStyle)
                ctx.fontWeight="bold"
            }
        }

        // paint node text background rectangle
        // is this necessary??
        ctx.fillStyle = fillStyle  
        var backgroundColor = !(props.backgroundColor===null)? props.backgroundColor : "#000000"
        ctx.fillStyle = lighten(0.2,backgroundColor); 
        // add padding
        const rectsize = size*0.2 
        ctx.fillRect(node.x-rectsize/2, node.y -rectsize, rectsize, rectsize);
                
        // set modified style parameters
        var img_src = null 
        if (props.nodeImg in node) {
            if (node[props.nodeImg]) {
                img_src = node[props.nodeImg] 
                if (typeof(img_src)==="string" && (img_src.includes("http") || img_src.includes("www"))) {
                    const img = new Image();
                    img.src = img_src
                    ctx.fillStyle = fillStyle
                    ctx.drawImage(img, node.x - size / 2, node.y-size, size, size);
                }
            }
        } 
        
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        if (img_src === null & props.nodeIcon in node) {
            // icon
            if (node[props.nodeIcon]) {
                const icon_src = node[props.nodeIcon]
                if (icon_src) {
                    ctx.font = `${size}px ${Object.keys(icon_src)[0]}`
                    ctx.fillStyle = fillStyle
                    ctx.fillText(`${Object.values(icon_src)[0]}`, node.x, node.y-size/1.7, size);
                }
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

        if (props.nodeIdsDrag.indexOf(node[props.nodeId]) !== -1) {
            ctx.font = `${fontSize}px Sans-Serif bold`;
        } 
        ctx.fillStyle = fillStyle  
        ctx.fillText(label, node.x, node.y); 
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

    /**
     * call methods via higher order component props
     */

    useEffect( () => {
        if (!props.emitParticle===null){
            fgRef.current.emitParticle(props.emitParticle)
        }
    },[props.emitParticle])
    
    useEffect( () => {
        if (props.pauseAnimation){
            fgRef.current.pauseAnimation()
        }
        props.setProps({resumeAnimation:false})
    },[props.pauseAnimation])

    useEffect( () => {
        if (props.resumeAnimation){
            fgRef.current.resumeAnimation()
        }
        props.setProps({pauseAnimation:false})
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

    useEffect( () => {
        if (props.d3Force && props.forceEngine === "d3"){
            fgRef.current.d3Force(...props.d3Force)
        }
    },[props.d3Force])

    useEffect( () => {
        if (props.d3ReheatSimulation && props.forceEngine === "d3"){
            fgRef.current.d3ReheatSimulation()
        }
    },[props.d3ReheatSimulation])

    useEffect( () => {
        if (props.getGraphBbox){
            props.setProps({graphBbox:fgRef.current.getGraphBbox()})
        }
    },[props.getGraphBbox])

    return (
        <div id={props.id}>
            Graph2D:
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
                    backgroundColor={props.backgroundColor}
                    showNavInfo={props.showNavInfo}
                    // yOffset: 1.5, // AR 
                    // glScale: 200 // AR 
                    // markerAttrs: { preset: 'hiro' } // AR
                    /**
                    * node styling
                    */
                    nodeRelSize={props.nodeRelSize}
                    nodeVal={props.nodeVal}
                    nodeLabel={(node => 
                        props.nodeLabel in node? node[props.nodeLabel]? node[props.nodeLabel] : node[props.nodeId] : node[props.nodeId]
                        // node must contain id, so fall back on id as label
                        )} 
                    // nodeDesc: "desc" // VR only
                    nodeVisibility={(node => {
                        var visible = true 

                        if (props.nodeIdsVisible.length) {
                            if (props.nodeIdsVisible.indexOf(node[props.nodeId]) === -1) {
                                visible = false 
                            }
                        }
                        return visible 
                    })}
                    nodeColor={(node => {
                        var color = props.nodeColor in node? node[props.nodeColor]? node[props.nodeColor] : "#0000ff" : "#0000ff"
                        if (props.nodesSelected.map(node => node[props.nodeId]).indexOf(node[props.nodeId]) !== -1) {
                            color = saturate(0.2,color)
                            color = lighten(0.2, color)
                        }         
                        if (props.nodeIdsHighlight.length) {
                            if (props.nodeIdsHighlight.indexOf(node[props.nodeId]) !== -1) {
                                color = saturate(0.2,color)
                                color = lighten(0.2, color)
                            }
                        }        
                        if (props.nodeIdsDrag.length) {
                            if (props.nodeIdsDrag.indexOf(node[props.nodeId]) !== -1) {
                                color = saturate(0.2, color)
                                color = lighten(0.2, color)
                            }
                        } 
                        return color
                    })}
                    nodeAutoColorBy={props.nodeAutoColorBy}
                    nodeOpacity={props.nodeOpacity}
                    nodeResolution={props.nodeResolution}
                    nodeCanvasObject={nodeCanvasObjectFunction}
                    nodeCanvasObjectMode={(node => {   
                        "after"
                        //return (props.nodeImg in node || props.nodeIcon in node? node[props.nodeImg] || node[props.nodeIcon] ? "replace" : "after" : "after")
                    })}   
                    // nodeThreeObject: none // 3D, VR, AR, not exposed
                    // nodeThreeObjectExtend: true,
                    /**
                    * link styling
                    */
                   linkLabel={props.linkLabel}
                   // linkDesc: "desc", // VR only,
                   linkVisibility={(link => {
                        var visible = true 
                        if (props.nodeIdsVisible.length) {
                            // use nodeIdsVisible.length as criterion, since it shows whether or not a filter is applied. 
                            // if we use links, often it will be empty, and no links will be invisible
                            if (props.linkIdsVisible.indexOf(link[props.linkId]) === -1) {
                                visible = false 
                            }
                        }
                        return visible 
                        }
                    )}
                    linkColor={(link => {
                        var color = props.linkColor in link? link[props.linkColor] : "#ffffff";                                  
                        // is link selected?
                        if (props.linksSelected.length) {
                            color = darken(0.1, color)
                            if (props.linksSelected.map(link=>link[props.linkId]).indexOf(link[props.linkId]) !== -1) {
                                color = saturate(0.2,color)
                                color = lighten(0.1,color)
                            }
                        }
                        // is link highlighted?
                        if (props.linkIdsNodesDrag.length) {
                            color = darken(0.2, color)
                            if (props.linkIdsNodesDrag.indexOf(link[props.linkId]) !== -1) {
                                color = saturate(0.2,color)
                                color = lighten(0.2, color)
                            }
                        }        
                        // are link source and target selected?
                        if (props.nodesSelected.length) {
                            color = darken(0.2, color)
                            if (props.nodesSelected.map(node => node[props.nodeId]).includes(link.source) && props.nodesSelected.map(node => node[props.nodeId]).includes(link.target)) {
                                color = saturate(0.2,color)
                                color = lighten(0.2, color)
                            }       
                        }
                        return color 
                    })}
                    linkAutoColorBy={props.linkAutoColorBy}
                    linkOpacity={props.linkOpacity}
                    linkLineDash={props.linkLineDash}
                    linkWidth={(link => {
                        var width = props.linkWidth
                        // is link selected?
                        if (props.linksSelected.length) {
                            width = width*0.9
                            if (props.linksSelected.map(link=>link[props.linkId]).indexOf(link[props.linkId]) !== -1) {
                                width = width*4
                            }
                        }
                        // is link highlighted?
                        if (props.linkIdsNodesDrag.length) {
                            width = width*0.9
                            if (props.linkIdsNodesDrag.indexOf(link[props.linkId]) !== -1) {
                                width = width*1.5
                            }
                        }  
                        // are link source and target selected?
                        if (props.nodesSelected.length) {
                            width = width*0.9
                            if (props.nodesSelected.map(node => node[props.nodeId]).includes(link.source) && props.nodesSelected.map(node => node[props.nodeId]).includes(link.target)) {
                                width = width*1.5
                            } 
                        }
                        return width 
                    })}
                    linkResolution={props.linkResolution}
                    linkCurvature={props.linkCurvature}
                    // linkCurveRotation={props.linkCurveRotation} // 3D, VR, AR, 
                    // linkMaterial: null, // 3D, VR, AR, not exposed
                    // linkCanvasObject: null // 2D, not exposed
                    // linkCanvasObjectMode: "replace", // 2D, not exposed
                    // linkThreeObject={link => {
                    //     // extend link with text sprite
                    //     const sprite = new SpriteText(link[props.linkLabel]);
                    //     sprite.color = highlightNodes.indexOf(link.source) == -1? 'rgb(100,160,190,0.5)' : 'rgb(100,160,190,1)';
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
                    // dagNodeFilter: // TODO: function
                    // onDagError: // TODO: function
                    d3AlphaMin={props.d3AlphaMin}
                    d3AlphaDecay={props.d3AlphaDecay}
                    d3VelocityDecay={props.d3VelocityDecay}
                    ngraphPhysics={props.ngraphPhysics}
                    warmupTicks={props.warmupTicks}
                    cooldownTicks={props.cooldownTicks}
                    cooldownTime={props.cooldownTime} 
                    // Math.max(0.8*1000*Math.log10(props.graphData.nodes.length),1)
                    // onEngineTick: // TODO: function 
                    onEngineStop={()=>{
                        props.setProps({enableZoomPanInteraction: props.interactive? true : false})
                        props.setProps({enablePointerInteraction: props.interactive? true : false})
                        props.setProps({enableNavigationControls: props.interactive? true : false})
                    }}
                    d3Force={() => {
                        ('charge').strength(-50)
                    }}
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
                    onChange={
                        /*
                        * Send the new value to the parent component.
                        * setProps is a prop that is automatically supplied
                        * by dash's front-end ("dash-renderer").
                        * In a Dash app, this will update the component's
                        * props and send the data back to the Python Dash
                        * app server if a callback uses the modified prop as
                        * Input or State.
                        */
                        e => props.setProps({ 
                            graphData: e.target.graphData,
                            })
                    }
            />
        </div>
    );
}

Graph2D.propTypes = {
    /**
     * The ID used to identify this component in Dash callbacks.
     */
    id: PropTypes.string.isRequired,
    
    /**
     * Dash-assigned callback that should be called to report property changes
     * to Dash, to make them available for callbacks.
     */
    setProps: PropTypes.func,

    /**
    * DATA INPUT
    */

    /**
     * Graph data structure. Can also be used to apply incremental updates. Format {nodes:{}, links:{}}
     */
    graphData: PropTypes.object.isRequired,

    /**
     * Node object accessor attribute for unique node id (used in link objects source/target).
     */
    nodeId: PropTypes.string,
    
    /**
     * Link object accessor attribute referring to id of source node.
     */
    linkSource: PropTypes.string,

    /**
     * Link object accessor attribute referring to id of target node.
     */
    linkTarget: PropTypes.string,

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
    backgroundColor: PropTypes.string,
   
    /**
     * Whether to show the navigation controls footer info.
     */
    showNavInfo: PropTypes.bool,
   
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
    nodeRelSize: PropTypes.number, 
    
    /**
     *  Ratio of node circle area (square px) [2D] or sphere volume (cubic px) [3D] per value unit.
     */
    nodeVal: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        //PropTypes.func
    ]),

    /**
     * Node object accessor function or attribute for name (shown in label). Supports plain text or HTML content (except in VR).
     * 2D, 3D and VR
     */ 
    nodeLabel:  PropTypes.oneOfType([
        PropTypes.string,
        //PropTypes.func
    ]),
    
    /**
     * For VR only. Node object accessor function or attribute for description (shown under label).
     */ 
    nodeDesc:  PropTypes.oneOfType([
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
    nodeColor: PropTypes.oneOfType([
        PropTypes.string,
        // PropTypes.func
    ]),
   
    /**
     * Node object accessor function or attribute to automatically group colors by. Only affects nodes without a color attribute.
     */
    nodeAutoColorBy: PropTypes.oneOfType([
        PropTypes.string,
    //    PropTypes.func
    ]),


    /**
     * Nodes sphere opacity, between [0,1]. 3D, VR, AR
     */
    nodeOpacity: PropTypes.number,


    /**
     * Geometric resolution of each node's sphere, expressed in how many slice segments to divide the circumference. Higher values yield smoother spheres. Only applicable to 3D modes.
     * 3D, VR, AR
     */
    nodeResolution: PropTypes.number,

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
    linkLabel: PropTypes.oneOfType([
        PropTypes.string,
        // PropTypes.func
    ]),

    /**
     * For VR only. Link object accessor function or attribute for description (shown under label).
     */ 
    linkDesc: PropTypes.oneOfType([
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
    linkColor: PropTypes.oneOfType([
        PropTypes.string,
    //    PropTypes.func
    ]),
        
    /**
     * Link object accessor function or attribute to automatically group colors by. Only affects links without a color attribute.
     */ 
    linkAutoColorBy: PropTypes.oneOfType([
        PropTypes.string,
    //    PropTypes.func
    ]),
        
    /**
     * Line opacity of links, between [0,1]. 3D, VR, AR
     */ 
    linkOpacity: PropTypes.number,

    /**
     * Link object accessor function, attribute or number array (e.g. [5, 15]) to determine if a line dash should be applied to this rendered link. Refer to the HTML canvas setLineDash API for example values. Either a falsy value or an empty array will disable dashing. 
     */ 
    linkLineDash: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    //     PropTypes.func,
    ]), 
    
    /**
     * Link object accessor function, attribute or a numeric constant for the link line width.
     */ 
    linkWidth: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    //    PropTypes.func
    ]),

    /**
     * Geometric resolution of each link 3D line, expressed in how many radial segments to divide the cylinder. Higher values yield smoother cylinders. Applicable only to links with positive width. 3D, VR, AR
     */ 
    linkResolution: PropTypes.number,

     /**
     * Link object accessor function, attribute or a numeric constant for the curvature radius of the link line. A value of 0 renders a straight line. 1 indicates a radius equal to half of the line length, causing the curve to approximate a semi-circle. For self-referencing links (source equal to target) the curve is represented as a loop around the node, with length proportional to the curvature value.
     */ 
    linkCurvature: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    //    PropTypes.func
    ]),

    /**
     * Link object accessor function, attribute or a numeric constant for the rotation along the line axis to apply to the curve. Has no effect on straight lines. At 0 rotation, the curve is oriented in the direction of the intersection with the XY plane. The rotation angle (in radians) will rotate the curved line clockwise around the "start-to-end" axis from this reference orientation.
     */ 
    linkCurveRotation: PropTypes.oneOfType([
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
    linkDirectionalArrowLength: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        //     PropTypes.func,
        ]),
    

    /**
     * Link object accessor function or attribute for the color of the arrow head.
     */ 
    linkDirectionalArrowColor: PropTypes.oneOfType([
        PropTypes.string,
    //     PropTypes.func,
    ]),
    
    /**
    * Link object accessor function, attribute or a numeric constant for the longitudinal position of the arrow head along the link line, expressed as a ratio between 0 and 1, where 0 indicates immediately next to the source node, 1 next to the target node, and 0.5 right in the middle.
    */ 
    linkDirectionalArrowRelPos: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    //     PropTypes.func,
    ]),

   /**
    * Geometric resolution of the arrow head, expressed in how many slice segments to divide the cone base circumference. Higher values yield smoother arrows.
    */ 
   linkDirectionalArrowResolution: PropTypes.number,


   /**
    * Link object accessor function, attribute or a numeric constant for the number of particles (small spheres) to display over the link line. The particles are distributed equi-spaced along the line, travel in the direction source > target, and can be used to indicate link directionality.
    */ 
   linkDirectionalParticles: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    // PropTypes.func,
    ]),

   /**
    * Link object accessor function, attribute or a numeric constant for the directional particles speed, expressed as the ratio of the link length to travel per frame. Values above 0.5 are discouraged.
    */ 
   linkDirectionalParticleSpeed: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    // PropTypes.func,
    ]),

   /**
    * Link object accessor function, attribute or a numeric constant for the directional particles width. Values are rounded to the nearest decimal for indexing purposes.
    */ 
   linkDirectionalParticleWidth: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    // PropTypes.func,
    ]),

   /**
    * Link object accessor function or attribute for the directional particles color.
    */ 
   linkDirectionalParticleColor: PropTypes.oneOfType([
    PropTypes.string,
    // PropTypes.func,
    ]),

   /**
    * Geometric resolution of each 3D directional particle, expressed in how many slice segments to divide the circumference. Higher values yield smoother particles.
    */ 
   linkDirectionalParticleResolution: PropTypes.number,
   
   // METHODS
    /**
    * An alternative mechanism for generating particles, this method emits a non-cyclical single particle within a specific link. The emitted particle shares the styling (speed, width, color) of the regular particle props. A valid link object that is included in graphData should be passed as a single parameter.
    */ 
   emitParticle: PropTypes.object,
   
    /**
    * RENDER CONTROL
    */
    
    /**
    * Configuration parameters to pass to the ThreeJS WebGLRenderer constructor. This prop only has an effect on component mount. 3D only
    */ 
   rendererConfig: PropTypes.object,
   
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
   pauseAnimation: PropTypes.bool,

    /**
    * Resumes the rendering cycle of the component, and re-enables the user interaction. This method can be used together with pauseAnimation for performance optimization purposes.
    */ 
   resumeAnimation: PropTypes.bool,

    /**
    * Set the coordinates of the center of the viewport. This method can be used to perform panning on the 2D canvas programmatically. Each of the x, y coordinates is optional, allowing for motion in just one dimension. An optional 3rd argument defines the duration of the transition (in ms) to animate the canvas motion.
    */ 
   centerAt: PropTypes.array,

    /**
    * Set the 2D canvas zoom amount. The zoom is defined in terms of the scale transform of each px. A value of 1 indicates unity, larger values zoom in and smaller values zoom out. An optional 2nd argument defines the duration of the transition (in ms) to animate the canvas motion. By default the zoom is set to a value inversely proportional to the amount of nodes in the system.
    */ 
   zoom: PropTypes.array,

    /**
    * Automatically zooms/pans the canvas so that all of the nodes fit inside it. If no nodes are found no action is taken. It accepts two optional arguments: the first defines the duration of the transition (in ms) to animate the canvas motion (default: 0ms). The second argument is the amount of padding (in px) between the edge of the canvas and the outermost node (default: 10px). The third argument specifies a custom node filter: node => <boolean>, which should return a truthy value if the node is to be included. This can be useful for focusing on a portion of the graph. 2D, 3D
    */ 
   zoomToFit: PropTypes.array,

    /**
    * Re-position the camera, in terms of x, y, z coordinates. Each of the coordinates is optional, allowing for motion in just some dimensions. The optional second argument can be used to define the direction that the camera should aim at, in terms of an {x,y,z} point in the 3D space. The 3rd optional argument defines the duration of the transition (in ms) to animate the camera motion. A value of 0 (default) moves the camera immediately to the final position. By default the camera will face the center of the graph at a z distance proportional to the amount of nodes in the system. 3D
    */ 
    cameraPosition: PropTypes.array, 

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
    refresh: PropTypes.bool,

    /**
    * FORCE ENGINGE CONFIGURATION
    */ 

    /**
    * Not applicable to 2D mode. Number of dimensions to run the force simulation on. 3D, VR, AR
    */ 
   numDimensions: PropTypes.number,
     
    /**
    * Which force-simulation engine to use (d3 or ngraph).
    */ 
   forceEngine: PropTypes.string,

    /**
    * Apply layout constraints based on the graph directionality. Only works correctly for DAG graph structures (without cycles). Choice between td (top-down), bu (bottom-up), lr (left-to-right), rl (right-to-left), zout (near-to-far), zin (far-to-near), radialout (outwards-radially) or radialin (inwards-radially).
    */ 
   dagMode: PropTypes.string,

    /**
    * If dagMode is engaged, this specifies the distance between the different graph depths.
    */ 
   dagLevelDistance: PropTypes.number,

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
   d3AlphaMin: PropTypes.number,

    /**
    * Sets the simulation intensity decay parameter. Only applicable if using the d3 simulation engine.
    */ 
   d3AlphaDecay: PropTypes.number,

    /**
    * Nodes' velocity decay that simulates the medium resistance. Only applicable if using the d3 simulation engine.
    */ 
   d3VelocityDecay: PropTypes.number,

    /**
    * Specify custom physics configuration for ngraph, according to its configuration object syntax. Only applicable if using the ngraph simulation engine.
    */ 
   ngraphPhysics: PropTypes.object,

    /**
    * Number of layout engine cycles to dry-run at ignition before starting to render.
    */ 
   warmupTicks: PropTypes.number,

    /**
    * How many build-in frames to render before stopping and freezing the layout engine.
    */ 
   cooldownTicks: PropTypes.number,

    /**
     * How long (ms) to render for before stopping and freezing the layout engine.
     */  
    cooldownTime:PropTypes.number,

    /**
     * Callback function invoked at every tick of the simulation engine.
     */  
    // onEngineTick: PropTypes.func, // not exposed

    /**
     * Callback function invoked when the simulation engine stops and the layout is frozen.
     */  
    // onEngineStop: PropTypes.func, // not exposed

    /**
     * Access to the internal forces that control the d3 simulation engine. Follows the same interface as d3-force-3d's simulation.force. Three forces are included by default: 'link' (based on forceLink), 'charge' (based on forceManyBody) and 'center' (based on forceCenter). Each of these forces can be reconfigured, or new forces can be added to the system. Only applicable if using the d3 simulation engine.
     */  
    d3Force: PropTypes.oneOfType([
        PropTypes.string,
    //    PropTypes.func
    ]),
    
    /**
     * Reheats the force simulation engine, by setting the alpha value to 1. Only applicable if using the d3 simulation engine.
     */  
    d3ReheatSimulation: PropTypes.bool,

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
    linkHoverPrecision: PropTypes.number, 

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
   controlType: PropTypes.string,

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
    enableNodeDrag: PropTypes.bool,
    
    /**
    * UTILITY
    */ 

    /**
    * Returns the current bounding box of the nodes in the graph, formatted as { x: [<num>, <num>], y: [<num>, <num>], z: [<num>, <num>] }. If no nodes are found, returns null. Accepts an optional argument to define a custom node filter: node => <boolean>, which should return a truthy value if the node is to be included. This can be useful to calculate the bounding box of a portion of the graph.
    * Bounding box is saved as the graphBbox prop
    */ 
   getGraphBbox: PropTypes.bool, 

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
    heightRatio: PropTypes.number,
   
    /**
    * provided react-sizeme. Contains an object with "width" and "height" attributes
    */
    size: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.object]),


    /**
    * whether or not session is active. Used to enable or disable warning browser dialog when closing 
    */
    active: PropTypes.bool,
   
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
    nodeURL: PropTypes.string,
   
    /**
    * The node attribute containing url to image to display for each individual node
    */
    nodeImg: PropTypes.string,

    /** 
    * The node attribute containing object with icon to display for each individual node.
    */
    nodeIcon: PropTypes.string,
    
    /** 
    * object with keys being fonts (string) and values being CSS sheets
    */
    nodeIcon_fontsheets: PropTypes.object,

    /** 
    * The link attribute containing the unique link id
    */
    linkId: PropTypes.string,
    
    /**
    * toggle enableZoomPanInteraction, enablePointerInteraction, enableNavigationControls with a single control 
    */
    interactive: PropTypes.bool,
    
    /**
    * whether or not graphData has changed. Internally, sets interactive to False until (mainly used internally)
    */
    updated: PropTypes.bool,

    /**
    * id of node to zoom to
    */ 
    nodeZoomId: PropTypes.string,

    /**
    * selected (clicked) nodes
    */
    nodesSelected: PropTypes.arrayOf(
        PropTypes.object
    ),
    
    /**
    * ids of nodes highlighted due to being dragged
    */
    nodeIdsDrag: PropTypes.arrayOf(
        PropTypes.string
    ),
   
    /**
    * clicked node
    */
    nodeClicked: PropTypes.object,

    /**
    *  screen coordinates of clicked node
    */
    nodeClickedViewpointCoordinates: PropTypes.objectOf(PropTypes.number),
    
    /**
    * right-clicked node
    */
    nodeRightClicked: PropTypes.object,

    /**
    *  screen coordinates of right-clicked node
    */
    nodeRightClickedViewpointCoordinates: PropTypes.objectOf(PropTypes.number),

    /**
    * the currently hovered node
    */
    nodeHovered: PropTypes.object,

    /**
    *  screen coordinates of hovered node
    */
    nodeHoveredViewpointCoordinates: PropTypes.objectOf(PropTypes.number),
        
    /**
    * clicked link
    */
    linkClicked: PropTypes.object,

    /**
    * right-clicked link
    */
    linkRightClicked: PropTypes.object,

    /**
    * hovered link
    */
    linkHovered: PropTypes.object,

    /**
    *  selected (clicked) links
    */
    linksSelected: PropTypes.arrayOf(
        PropTypes.object
    ),
   
    /**
    * ids of links highlighted due to being dragged
    */
    linkIdsNodesDrag: PropTypes.arrayOf(
        PropTypes.string
    ),
    
 
    /**
    * ids of highlighted nodes (through searcha)
    */  
   nodeIdsHighlight: PropTypes.arrayOf(PropTypes.string),
    
   /**
   * ids of visible nodes
   */  
   nodeIdsVisible: PropTypes.arrayOf(PropTypes.string),
   
   /**
   * ids of visible links
   */  
   linkIdsVisible: PropTypes.arrayOf(PropTypes.string),

    /**
    * externalobject_source: 
    */  
    externalobject_source: PropTypes.string, 

    /**
    * externalobject_source: 
    */  
    externalobject_input: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.bool,
        PropTypes.array,
        PropTypes.object]),

    /**
    * origin coordinates
    */  
    centreCoordinates: PropTypes.objectOf(PropTypes.number),

    /**
    * useCoordinates: whether to use node attribute to set node coordinates
    */
    useCoordinates: PropTypes.bool,
    
    /**
    * pixelUnitRatio: if node attribute (in some unit of measurement) is used as coordinates, pixel:unit scale
    */
    pixelUnitRatio: PropTypes.number,
    
    /**
    * showCoordinates: whether or not to show pointer coordinates as tooltip (not yet used)
    */
    showCoordinates: PropTypes.bool, 
    
    /**
    * gravity: not yet used, prop to change three gravity. Not used in 2D
    */
    gravity: PropTypes.string,
    
    /**
    * max levels of neighbourhood selection around a node by repeat clicking
    */
   maxDepth_neighbours_select: PropTypes.number, 

};

obj_shared_props.id = "Graph2D"

Graph2D.defaultProps = obj_shared_props;

export default withSizeHOC(Graph2D)
