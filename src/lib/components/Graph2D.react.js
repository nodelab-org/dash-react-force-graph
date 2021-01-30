import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {ForceGraph2D} from 'react-force-graph';
import importScript from '../customHooks/importScript.js';
// import useFontFace from '../customhooks/useFontFace.js';
// https://github.com/ctrlplusb/react-sizeme
import { withSize } from 'react-sizeme';
import {saturate, lighten, darken} from 'polished';

// https://github.com/ctrlplusb/react-sizeme
// import {max,log10} from 'Math';
// import { is, prop, none } from 'ramda';
// import * as material_UI from '@material-ui/icon_s'; // doesn't work: Module not found: Error: Can't resolve '@material-ui/icons' in '/Users/rkm916/Sync/projects/2020-dashforcegraph/src/lib/components'
// see https://stackoverflow.com/questions/42051588/wildcard-or-asterisk-vs-named-or-selective-import-es6-javascript

import {obj_shared_props} from "../shared_props_defaults.js"

// use react resize-me to make canvas container width responsive
const withSizeHOC = withSize({monitorWidth:true, monitorHeight:false, noPlaceholder:true});

function Graph2D(props) {
    
    // Dummy set of variables for testing
    // var graphDataState = {nodes:[],links:[]} 
    // var graphDataState = {nodes:[{"id":"man3","__label":"Bob"},{"id":"person1", "__label":"Jules"}],links:[{"id":"link3","source":"man1", "target":"man3"},{"source":"person1", "target":"man2", "id":"link4"}]}
    // var nodesById = {} 
    // var props = {}
    // props.graphData =  {nodes:[{"id":"man1", "__label":"Joe"},{"id":"man2", "__label":"Ben"}], links:[{"source":"man1", "target":"man2", "id":"link1"},{"source":"man2", "target":"man1", "id":"link2"}]} 
    // props.collapseNeighboursNodeId = null 
    // props.currentNodeIds = [] 
    // props.keepCurrentGraphData = false
    
    // import scripts 
    // https://fontawesome.com/kits/a6e0eeba63/use?welcome=yes
    //importScript("https://kit.fontawesome.com/a6e0eeba63.js");
    for (let key in props.nodeIcon_fontsheets) {
        importScript(props.nodeIcon_fontsheets[key])
        //useFontFace(key, props.nodeIcon_fontsheets[key]) 
    }

    const fgRef = useRef(null);
    // const [highlightNodes, setHighlightNodes] = useState({});

    var nodesById = Object.fromEntries(props.graphData.nodes.map(node => [node.id, node]));

    // display standard browser warning before navigating away from page
    // https://stackoverflow.com/questions/1119289/how-to-show-the-are-you-sure-you-want-to-navigate-away-from-this-page-when-ch
    useEffect( () => {
        if (props.graknStatus === "on" && props.graphData.nodes.length>0) {
            window.onbeforeunload = () => true
        } else {
            window.onbeforeunload = () => false
        }
      },[props.graphData, props.graknStatus])

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
                //node.fz =props.centreCoordinates+props.pixelUnitRatio*node.__coord_z
                nodesUpdated.push(node)
            } 
         } else {
            for (let node of props.graphData.nodes) {
                delete node.fx
                delete node.fy
                //node.fz =props.centreCoordinates+props.pixelUnitRatio*node.__coord_z
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
        if (Object.keys(node).includes("__source")) {
            if (Object.keys(node.__source).length > 0) {
                for (let key in node.__source){ 
                    // iterate over roles
                    Object.values(node.__source[key]).map(nodeId => neighbourNodeIds.push(nodeId))
                }
            }
        };
        if (Object.keys(node).includes("__target")) {
            if (Object.keys(node.__target).length > 0) {
                for (let key in node.__target){ 
                    // iterate over roles
                    Object.values(node.__target[key]).map(nodeId => neighbourNodeIds.push(nodeId))
                };
            };
        };
        
        var neighbourNodeIds_unique = [...new Set(neighbourNodeIds)] 

        if (props.nodesSelected !== null) {
            if (props.nodesSelected.length>0) {
                if (neighbourNodeIds_unique.every(nnid => props.nodesSelected.map(ns => ns.id).includes(nnid))) {
                    // retrieve the nodes matching the neighbourNodeIds
                    const neighbourNodes_unique = neighbourNodeIds_unique.map(nnidu => nodesById[nnidu])
                    for (let neighbourNode_unique of neighbourNodes_unique) {
                        neighbourNodeIds_unique = neighbourNodeIds_unique.concat(get_node_neighbour_ids(neighbourNode_unique, depth-1))
                    }
                }
            }
        }
        neighbourNodeIds_unique = [...new Set(neighbourNodeIds_unique)] 

        // if no new nodes were added, return empty array
        if (neighbourNodeIds_unique.every(nnid => props.nodesSelected.map(ns => ns.id).includes(nnid))) {
            neighbourNodeIds_unique.splice(0,neighbourNodeIds_unique.length)
        } 
        return neighbourNodeIds_unique 
    };

     // https://github.com/vasturiano/force-graph/blob/master/example/multi-selection/index.html
    const handleNodeClick = (node,event) => {
        
        // reset nodeRightClicked (kludge)
        props.setProps({nodeRightClicked:null});
        
        // if (event.altKey) {
        //     // open URL
        //     // const win = window.open(node[props.nodeURL], '_blank');
        //     // if (win !== null) {
        //     //     win.focus();
        //     // }
        //     // const altClick = props.altClick+1
        //     // props.setProps({altClick:altClick});
        //     const altClickCoordinates = fgRef.current.graph2ScreenCoords(node.x,node.y,node.z)    
        //     props.setProps({altClickCoordinates:altClickCoordinates})
        // }
            
        // deep copy props.nodesSelected
        const nodesSelected_tmp = [] 
        
        for (let node_tmp of props.nodesSelected) {
            nodesSelected_tmp.push(node_tmp)
        }
        const nodeIndex = nodesSelected_tmp.map(node => node.id).indexOf(node.id)
        if (event.shiftKey) { 
            // multi-selection
            if (nodeIndex === -1) { 
                nodesSelected_tmp.push(node);   
            } else {
                nodesSelected_tmp.splice(nodeIndex,1)  
            }; 
        } else { 

            //props.setProps({nodeClicked:node});
            // const click = props.click+1
            // props.setProps({click:click});
            //const nodeCoordinates = fgRef.current.graph2ScreenCoords(node.x,node.y)    
            //props.setProps({nodeClickedViewpointCoordinates:nodeCoordinates})

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
                    neighbourNodes.map(neighbourNode => neighbourNode.id === node.id? null : nodesSelected_tmp.push(neighbourNode))
                } 
                
            }

        }
        
        props.setProps({nodesSelected:nodesSelected_tmp});
        
    };

    const handleNodeRightClick = node=> {
        
        //props.setProps({nodeClicked:null});
        props.setProps({nodeRightClicked:node});
        // console.log("props.nodeRightClicked")
        // console.log(props.nodeRightClicked)
        
        const nodeCoordinates = fgRef.current.graph2ScreenCoords(node.x,node.y)
        props.setProps({nodeRightClickedViewpointCoordinates:nodeCoordinates})
        // console.log("props.nodeRightClickedViewpointCoordinates")
        // console.log(props.nodeRightClickedViewpointCoordinates)

        //const rightClick = props.rightClick+1
        // console.log("rightClick:")
        //// console.log(rightClick)  
        //props.setProps({rightClick:rightClick});
    }
    

    const handleNodeDrag = (node, translate) => {
        
        // reset nodeRightClicked (kludge)
        // props.setProps({nodeClicked:null});
        // props.setProps({nodeRightClicked:null});

        props.setProps({nodeIdsHighlightDrag:[]});
        props.setProps({linkIdsHighlightDrag:[]}); 
        
        console.log("node:")
        console.log(node)

        if (node!==null) {
            
            const neighbourNodeIds = []
            const linkIds = [] 

            if (Object.keys(node).includes("__source")) {
                if (Object.keys(node.__source).length > 0) {
                    for (let key in node.__source){ 
                        // iterate over roles
                        Object.values(node.__source[key]).map(nodeId => neighbourNodeIds.push(nodeId))
                        Object.keys(node.__source[key]).map(linkId => linkIds.push(linkId))
                    }
                }
            };
            
            if (Object.keys(node).includes("__target")) {
                if (Object.keys(node.__target).length > 0) {
                    for (let key in node.__target){ 
                        // iterate over roles
                        Object.values(node.__target[key]).map(nodeId => neighbourNodeIds.push(nodeId))
                        Object.keys(node.__target[key]).map(linkId => linkIds.push(linkId))
                    }
                }
            };
            
            if (node.__supertype === "entity" && !node.__is_type) {
                // if entity highlight second step neighbours
                const n = neighbourNodeIds.length

                for (let i = 0; i < n; i++) { 
                    let nnid = neighbourNodeIds[i]
                    let neighbourNode = nodesById[nnid]
                    
                    if (Object.keys(neighbourNode).includes("__source")) {
                        if (Object.keys(neighbourNode.__source).length > 0) {
                            for (let key in neighbourNode.__source){ 
                                // iterate over roles
                                Object.values(neighbourNode.__source[key]).map(nodeId => neighbourNodeIds.push(nodeId))
                                Object.keys(neighbourNode.__source[key]).map(linkId => linkIds.push(linkId))
                            }
                        }
                    };
                    
                    if (Object.keys(neighbourNode).includes("__target")) {
                        if (Object.keys(neighbourNode.__target).length > 0) {
                            for (let key in neighbourNode.__target){ 
                                // iterate over roles
                                Object.values(neighbourNode.__target[key]).map(nodeId => neighbourNodeIds.push(nodeId))
                                Object.keys(neighbourNode.__target[key]).map(linkId => linkIds.push(linkId))
                            }
                        }
                    };
                }
            }
            // assign unique ids to nodeIdsHighlightDrag prop
            neighbourNodeIds.push(node.id)

            console.log("new nodeIdsHighlightDrag:")
            console.log(neighbourNodeIds)

            props.setProps({nodeIdsHighlightDrag:[...new Set(neighbourNodeIds)]});
            props.setProps({linkIdsHighlightDrag:linkIds}); 
        }
    };


    const handleNodeDragEnd = (node, translate) => {
        props.setProps({nodeIdsHighlightDrag:[]});
        props.setProps({linkIdsHighlightDrag:[]});
        node.fx = node.x;
        node.fy = node.y;
        // node.fz = node.z;
    };

    
    const handleNodeHover = node => {
        props.setProps({nodeHovered:node})   
    };

    // set centreCoordinates
    useEffect( () => {
        if (! fgRef.current.getGraphBbox() === null) { 
            props.setProps({centreCoordinates:props.graphData.nodes.length ? {x:0.5*(fgRef.current.getGraphBbox().x[0]+fgRef.current.getGraphBbox().x[1]), y:0.5*(fgRef.current.getGraphBbox().y[0]+fgRef.current.getGraphBbox().y[1])} : fgRef.current.screen2GraphCoords(window.innerHeight/2, window.innerHeight/2)})
        }
    },[props.graphData])


    const handleBackgroundClick = event => {        
        
        //props.setProps({nodeClicked:null});
        //props.setProps({nodeClickedViewpointCoordinates:null});
        props.setProps({nodeRightClicked:null});
        props.setProps({nodeRightClickedViewpointCoordinates:null});
        
        
        console.log("handleBackgroundClick")

        // if (event.altKey) { 
        //     // const altClick = props.altClick+1
        //     // props.setProps({altClick:altClick});
        //     props.setProps({altClickCoordinates:{"x":event.clientX, "y": event.clientY}})     
            

        // } else {
            //props.setProps({nodeAltClicked:null});            
            props.setProps({nodesSelected:[]});
            props.setProps({linksSelected:[]});
        //}
    };
    

    useEffect(()=> {
        props.setProps({graphData_changed:true})
    }, [props.graphData])
    

    useEffect(()=> {
        props.setProps({updated:false})
    }, [props.nodeIdsHighlightDrag, props.nodesSelected])
    


    const handleLinkClick = (link,event) => {
        
        // as a sideeffect, reset nodeRightClicked (kludge)
        props.setProps({nodeRightClicked:null});
        
        // if (event.altKey) {
        //     props.setProps({altClickCoordinates:{"x":event.clientX, "y": event.clientY}})     
        // }
            
        // deep copy props.nodesSelected
        const linksSelected_tmp = [] 
        
        for (let link_tmp of props.linksSelected) {
            linksSelected_tmp.push(link_tmp)
        }
        const linkIndex = linksSelected_tmp.map(link => link.id).indexOf(link.id)

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

        
    // },[]);

    // from https://github.com/vasturiano/force-graph/blob/master/example/multi-selection/index.html
    // can't get it to work; comment out
    // const handleNodeDrag = useCallback((node, translate) => {
    //     const nodeIndex = props.nodesSelected.map(node => node.id).indexOf(node.id)
    //     if (nodeIndex !== -1) { // moving a selected node
    //         props.nodesSelected.filter(selNode => selNode !== node).forEach(node => ['x', 'y'].forEach(coord => node[`f${coord}`] = node[coord] + translate[coord])); // translate other nodes by same amount
    //     };
    // });
    // const handleNodeDragEnd = useCallback(node => {
    //     const nodeIndex = props.nodesSelected.map(node => node.id).indexOf(node.id)
    //     if (nodeIndex !== -1) { // finished moving a selected node
    //         props.nodesSelected.filter(selNode => selNode !== node).forEach(node => ['x', 'y'].forEach(coord => node[`f${coord}`] = undefined)); // unfix controlled nodes
    //     }
    //   });

    // const handleNodeDragEnd = useCallback(node => {
    //     node.fx = node.x;
    //     node.fy = node.y;
    //     node.fz = node.z;
    //   })

    // zoom to node
    useEffect(() => {
        if (props.nodeZoomId !== null) {
            fgRef.current.centerAt(nodesById[props.nodeZoomId].x, nodesById[props.nodeZoomId].y, 250) // new position
            fgRef.current.zoom(4,250)
        }
    },[props.nodeZoomId])


    // nodeCanvasObject function 
    const nodeCanvasObjectFunction = (node, ctx, globalScale) => {
        // set global alpha for next drawing to value depending on whether node is selected 
        // https://www.w3schools.com/tags/canvas_globalalpha.asp
        // initialize color
        var fillStyle = props.nodeColor in node? node[props.nodeColor] : node.__type in props.nodeColor_common_type? props.nodeColor_common_type[node.__type] : node.__supertype in props.nodeColor_common_supertype? props.nodeColor_common_supertype[node.__supertype] : node.color;                                  
        const label = node.__type in props.nodeLabel_attr_type? node[props.nodeLabel_attr_type[node.__type]] : node.__supertype in props.nodeLabel_attr_supertype? node[props.nodeLabel_attr_supertype[node.__supertype]] : props.nodeLabel in node? node.__type + "-" + node[props.nodeLabel] : node.__type + "-" + node.id;
        const size = 12;
        ctx.globalAlpha = 0.9;
        ctx.fontWeight = "normal";
        var fontSize = Math.max(11/globalScale,5)

        // modify style parameters if node is selected and/or highlighted
        if (props.nodesSelected.length) {
            // make all other nodes more transparent
            ctx.globalAlpha -= 0.3
            if (props.nodesSelected.map(node => node.id).indexOf(node.id) !== -1) {
                ctx.globalAlpha = 1
                fillStyle = saturate(0.2,fillStyle)
                fillStyle = lighten(0.2, fillStyle)
                fontSize = fontSize*1.2
            }
        }
        if (props.nodeIdsHighlightDrag.length) {
             // make all other nodes more transparent
            ctx.globalAlpha -= 0.3
            if (props.nodeIdsHighlightDrag.indexOf(node.id) !== -1) {
                ctx.globalAlpha = 1
                fillStyle = lighten(0.2, fillStyle)
                ctx.fontWeight="bold"
            } 
        }

        if (props.nodeIdsHighlight.length) {
            ctx.globalAlpha -= 0.3
            if (props.nodeIdsHighlight.indexOf(node.id) !== -1) {
                ctx.globalAlpha = 1
                fillStyle = lighten(0.2, fillStyle)
                ctx.fontWeight="bold"
            }
        }

        // paint node text background rectangle
        ctx.fillStyle = fillStyle  // is this necessary??
        ctx.fillStyle = lighten(0.2,props.backgroundColor); // 'rgba(255, 255, 255, 0.8)'; 
        const rectsize = size*0.2 // padding
        ctx.fillRect(node.x-rectsize/2, node.y -rectsize, rectsize, rectsize);
                
        // set modified style parameters
        var img_src = null 
        if (props.useNodeImg) {
            img_src = node.__type in props.nodeImg_attr_type? node[props.nodeImg_attr_type[node.__type]] : node.__supertype in props.nodeImg_attr_supertype? node[props.nodeImg_attr_supertype[node.__supertype]] : props.nodeImg in node? node[props.nodeImg] : node.__type in props.nodeImg_common_type? props.nodeImg_common_type[node.__type] :  node.__supertype in props.nodeImg_common_supertype? props.nodeImg_common_supertype[node.__supertype] : null 
            if (typeof(img_src)==="string" && (img_src.includes("http") || img_src.includes("www"))) {
                const img = new Image();
                img.src = img_src
                ctx.fillStyle = fillStyle
                ctx.drawImage(img, node.x - size / 2, node.y-size/1.5, size, size);
            }
        } 
        
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        if (img_src === null & props.useNodeIcon) {
            // icon
            const icon_src = node.__type in props.nodeIcon_attr_type? node[props.nodeIcon_attr_type[node.__type]] : node.__supertype in props.nodeIcon_attr_supertype? node[props.nodeIcon_attr_supertype[node.__supertype]] : props.nodeIcon in node? node[props.nodeIcon] : node.__type in props.nodeIcon_common_type? props.nodeIcon_common_type[node.__type] :  node.__supertype in props.nodeIcon_common_supertype?  props.nodeIcon_common_supertype[node.__supertype] : null
            if (icon_src !== null) {
                ctx.font = `${size}px ${Object.keys(icon_src)[0]}`
                ctx.fillStyle = fillStyle
                ctx.fillText(`${Object.values(icon_src)[0]}`, node.x, node.y-size/1.7, size);
            }
        }
        
        // draw text background rectangle
        ctx.font = `${fontSize}px Sans-Serif`;
        const textWidth = ctx.measureText(label).width;
        const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding
        ctx.fillStyle = darken(0.2,props.backgroundColor);// 'rgba(255, 255, 255, 0.8)';
        ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1]/2, ...bckgDimensions);
        
        // draw text label

        if (props.nodeIdsHighlightDrag.indexOf(node.id) !== -1) {
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
            //backgroundImg.width = backgroundImg.width/globalScale
            //backgroundImg.height = backgroundImg.height/globalScale
            // the stretching needs to be optional
            //backgroundImg.width = props.size.width
            //const height = window.innerHeight*props.heightRatio
            // get the centre of the screen from existing graph or from translating screen to canvas coordinates            
            //const centreCoordinates = {x:400, y:400}
            ctx.drawImage(backgroundImg, props.centreCoordinates.x-backgroundImg.width/2,props.centreCoordinates.y - backgroundImg.height/2);
            //ctx.drawImage(backgroundImg, 0,0);
        }        
    }
    
   
    // adapt graph height to changing window (size-me doesn't work for hight expands without bound..)
    // useLayoutEffect( () => {
    //     // props.setProps({width:window.innerWidth*11/14})
    //     // props.setProps({height:window.innerHeight*props.heightRatio})
    //     //props.setProps({height:window.innerHeight*props.heightRatio})
    //     fgRef.current({height:window.innerHeight*props.heightRatio})
    // },[props.heightRatio])
    
    return (
        <div id={props.id}>
            Graph2D:
                <ForceGraph2D
                    ref={fgRef}
                    graphData={props.graphData}
                    // Container layout
                    width={props.size.width}
                    height={window.innerHeight*props.heightRatio}
                    backgroundColor={props.backgroundColor}
                    // node styling
                    nodeColor={(node => {
                        var color = props.nodeColor in node? node[props.nodeColor] : node.__type in props.nodeColor_common_type? props.nodeColor_common_type[node.__type] : node.__supertype in props.nodeColor_common_supertype? props.nodeColor_common_supertype[node.__supertype] : node.color;                                  
                        
                        // if (props.nodesSelected.map(node => node.id).indexOf(node.id) !== -1) {
                        //     color = saturate(0.2,color)
                        //     color = lighten(0.2, color)
                        // }         

                        // if (props.nodeIdsHighlight.length) {
                        //     if (props.nodeIdsHighlight.indexOf(node.id) !== -1) {
                        //         color = saturate(0.2,color)
                        //         color = lighten(0.2, color)
                        //     }
                        // }        
                        // if (props.nodeIdsHighlightDrag.length) {
                        //     if (props.nodeIdsHighlightDrag.indexOf(node.id) !== -1) {
                        //         color = saturate(0.2, color)
                        //         color = lighten(0.2, color)
                        //     }
                        // } 

                        return color
                    })}
                    nodeVisibility={(node => {
                        var visible = true 

                        if (props.nodeIdsFilter.length) {
                            if (props.nodeIdsFilter.indexOf(node.id) === -1) {
                                visible = false 
                            }
                        }
                        return visible 
                    })}
                    nodeRelSize={props.nodeRelSize}
                    nodeLabel={(node => 
                        node.__type in props.nodeLabel_attr_type? node[props.nodeLabel_attr_type[node.__type]] : node.__supertype in props.nodeLabel_attr_supertype? node[props.nodeLabel_attr_supertype[node.__supertype]] : props.nodeLabel in node? node.__type + "-" + node[props.nodeLabel] : node.__type + "-" + node.id)} 
                    nodeAutoColorBy={props.nodeAutoColorBy}
                    nodeCanvasObject={nodeCanvasObjectFunction}
                    nodeCanvasObjectMode={(node => {   
                        return (props.useNodeImg && (node.__type in props.nodeImg_attr_type || node.__supertype in props.nodeImg_attr_supertype || props.nodeImg in node || node.__type in props.nodeImg_common_type || node.__supertype in props.nodeImg_common_supertype)) ||  (props.useNodeIcon && (node.__type in props.nodeIcon_attr_type || node.__supertype in props.nodeIcon_attr_supertype || props.nodeIcon in node || node.__type in props.nodeIcon_common_type || node.__supertype in props.nodeIcon_common_supertype))? "replace" : "after"
                    })}   
                    // nodeCanvasObjectMode={props.nodeCanvasObjectMode} //TODO
                    // linkCanvasObject={} // TODO
                    // linkCanvasObjectMode={props.linkCanvasObjectMode} // TODO
                    // link styling
                    linkLabel={props.linkLabel}
                    linkColor={(link => {
                        var color = props.linkColor in link? link[props.linkColor] : link.__type in props.linkColor_attr_type? props.linkColor_attr_type[link.__type] : link.__supertype in props.linkColor_attr_supertype? props.linkColor_attr_supertype[link.__supertype] : "#ffffff";                                  
                        
                        // is link selected?
                        if (props.linksSelected.length) {
                            color = darken(0.1, color)
                            if (props.linksSelected.map(link=>link.id).indexOf(link.id) !== -1) {
                                color = saturate(0.2,color)
                                color = lighten(0.1,color)
                            }
                        }
                        
                        // is link highlighted?
                        if (props.linkIdsHighlightDrag.length) {
                            color = darken(0.2, color)
                            if (props.linkIdsHighlightDrag.indexOf(link.id) !== -1) {
                                color = saturate(0.2,color)
                                color = lighten(0.2, color)
                            }
                        }        

                        // are link source and target selected?
                        if (props.nodesSelected.length) {
                            color = darken(0.2, color)
                            if (props.nodesSelected.map(node => node.id).includes(link.source) && props.nodesSelected.map(node => node.id).includes(link.target)) {
                                color = saturate(0.2,color)
                                color = lighten(0.2, color)
                            }
                            
                        }

                        // are link source and target highlighted?
                        // if (props.nodeIdsHighlightDrag.length) {
                        //     if (props.nodeIdsHighlightDrag.includes(link.source) && props.nodeIdsHighlightDrag.includes(link.target)) {
                        //        color = saturate(0.2, color)
                        //        color = lighten(0.2, color)
                        //    }
                        // } 

                        return color 
                    })}
                    //linkColor={(link => props.linksSelected.map(link => link.id).indexOf(link.id) === -1? saturate(1,props.linkColor) : props.linkColor)}
                    linkAutoColorBy={props.linkAutoColorBy}
                    linkVisibility={(link => {
                        var visible = true 

                        if (props.nodeIdsFilter.length) {
                            // use nodeIdsFilter.length as criterion, since it shows whether or not a filter is applied. 
                            // if we use links, often it will be empty, and no links will be invisible
                            if (props.linkIdsFilter.indexOf(link.id) === -1) {
                                visible = false 
                            }
                        }
                        return visible 
                    })}
                    // linkLineDash={props.linkLineDash}
                    linkWidth={(link => {
                        var width = props.linkWidth
                        
                        // is link selected?
                        if (props.linksSelected.length) {
                            width = width*0.9
                            if (props.linksSelected.map(link=>link.id).indexOf(link.id) !== -1) {
                                width = width*4
                            }
                        }

                        // is link highlighted?
                        if (props.linkIdsHighlightDrag.length) {
                            width = width*0.9
                            if (props.linkIdsHighlightDrag.indexOf(link.id) !== -1) {
                                width = width*1.5
                            }
                        }  

                        // are link source and target selected?
                        if (props.nodesSelected.length) {
                            width = width*0.9
                            if (props.nodesSelected.map(node => node.id).includes(link.source) && props.nodesSelected.map(node => node.id).includes(link.target)) {
                                width = width*1.5
                            }
                            
                        }
                        return width 
                    })}
                        
                    // linkWidth={(link => highlightNodes.indexOf(link.source) == -1? 0.5 : 3)}
                    linkCurvature={props.linkCurvature}
                    // linkThreeObject={link => {
                    //     // extend link with text sprite
                    //     const sprite = new SpriteText(link.__label);
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
                    linkDirectionalArrowLength={props.linkDirectionalArrowLength}
                    linkDirectionalArrowRelPos={props.linkDirectionalArrowRelPos}
                    // Render control
                    onRenderFramePre={onRenderFramePre}
                    // zoomToFit={props.zoomToFit}
                    // Force engine (d3-force) configuration
                    cooldownTime={props.cooldownTime} // Math.max(0.8*1000*Math.log10(props.graphData.nodes.length),1)
                    d3Force={() => {
                        // if (props.node_attribute_txt || props.nodeImg) {
                            ('charge').strength(-50)}
                        // }
                        }
                    //zoom={props.zoom}
                    //centerAt={props.centerAt}
                    onEngineStop={()=>{

                        props.setProps({enableZoomPanInteraction: props.interactive? true : false})
                        props.setProps({enablePointerInteraction: props.interactive? true : false})
                        
                        // props.setProps({nodesSelected:[]})
                        
                        // props.setProps({updated:updated+1}) failed since it seems to fire continuously at init
                        if (props.graphData_changed) {
                            props.setProps({updated:true})
                        }
                        props.setProps({graphData_changed:false})
            
                        

                        // fix background position  
                        // }
                         // Center on node rightclicked or else middle of canvas                    
                        // if (props.backgroundImgURL) {
                        //     if (props.graphData.nodes[0].id === "canvasBackground") {
                        //         const graphData_new = props.graphData
                        //         graphData_new.nodes[0].fx = graphData_new.nodes[0].x 
                        //         graphData_new.nodes[0].fy = graphData_new.nodes[0].y
                        //         props.setProps({graphData:graphData_new})
                        //     }
                        // }   
                        if (props.nodeRightClicked !== null) {
                            
                            // const node = nodesById[props.nodeRightClicked.id]
                            // fgRef.current.centerAt(node.x, node.y, 250);
                            // fgRef.current.zoom(4, 250);   
                            // props.setProps({nodeRightClicked:null})
                        } else {
                            if (props.zoomOut) {
                                fgRef.current.zoom(Math.max(1,3/Math.log10(props.graphData.nodes.length+10)),250)
                                props.setProps({zoomOut:false}) 
                                
                            }
                            if (props.center) {
                                fgRef.current.centerAt(0,0,100)
                                props.setProps({center:false}) 
                            }
                            // if (props.zoom) {
                            //     fgRef.current.zoom(props.zoom)
                            //     props.setProps({zoom:null})
                            // } 
                            // if (props.centerAt) {
                            //     fgRef.current.centerAt(props.centerAt)
                            //     props.setProps({centerAt:null})
                            // }
                        }
                        
                    }}
                    // Interaction
                    onNodeClick={handleNodeClick}
                    onNodeRightClick={handleNodeRightClick}
                    onNodeHover={handleNodeHover}
                    onLinkClick={handleLinkClick}
                    // onLinkHover={handleLinkHover} 
                    enableNodeDrag={props.enableNodeDrag}
                    onNodeDrag={handleNodeDrag}
                    onNodeDragEnd={handleNodeDragEnd}
                    onBackgroundClick={handleBackgroundClick}
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
    id: PropTypes.string,

     /**
     * A label that will be printed when this component is rendered.
     */
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func]).isRequired,

    /**
     * Dash-assigned callback that should be called to report property changes
     * to Dash, to make them available for callbacks.
     */
    setProps: PropTypes.func,

    /**
     * The data to display. Format {nodes:{}, links:{}}
     */
    graphData: PropTypes.object.isRequired,

    
    // height: PropTypes.number,
    // Container layout
    heightRatio: PropTypes.number,

     /**
     * backgroundColor: Getter/setter for the chart background color, default transparent
     */
    backgroundColor: PropTypes.string,
    /**
     * width: Canvas width, in px.
     */
    width: PropTypes.number,

     /**
     * heigh: Canvas heigh, in px.
     */
    // height: PropTypes.number,

    // node styling
    
    /**
     *  Ratio of node circle area (square px) per value unit.
     */
    nodeRelSize: PropTypes.number, 
    /**
     * The node attribute whose value should be displayed as label
     */ 
    nodeLabel: PropTypes.string,

    /**
     * The node attribute whose value should be displayed as label, by type
    */ 
    nodeLabel_attr_type: PropTypes.objectOf(PropTypes.string),

    /**
     * The node attribute whose value should be displayed as label, by supertype
    */ 
    nodeLabel_attr_supertype: PropTypes.objectOf(PropTypes.string),

    /**
     * The node attribute whose value should be used for coloring nodes,
     * overrides all others
     */
    nodeColor: PropTypes.string,
    
    /**
     * common node colors by type, overrides nodeColor_common_supertype
     */
    nodeColor_common_type: PropTypes.objectOf(PropTypes.string),
    
    /**
    * common node colors by supertype (relation, entity, attribute)
    */
    nodeColor_common_supertype: PropTypes.objectOf(PropTypes.string),

    /**
     * The node attribute which is activated upon Cmd click
     */
    nodeURL: PropTypes.string,
    
    /**
    * specify node URL attribute by type, overrides nodeImg_attr_supertype and nodeImg_common_*
    */
    nodeURL_attr_type: PropTypes.objectOf(PropTypes.string),
   
    /**
     * specify node URL attribute by supertype (relation, entity, attribute), overrides nodeImg_common_*
     */
    nodeURL_attr_supertype: PropTypes.objectOf(PropTypes.string),
    

    /**
     * The node attribute whose value should be used for coloring nodes
     */
    nodeAutoColorBy: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func]),

    /**
     * node opacity (not used, included for compatibility)
     */
    nodeOpacity: PropTypes.number,

     /**
     * The function that defines the alternative node representation
     */ 
    nodeCanvasObject: PropTypes.func,
    
    /**
     * when showing nodeThreeObject, keep showing default node object as well as text or image
     */
    // nodeCanvasObjectMode: PropTypes.oneOfType([
    //     PropTypes.string,
    //     PropTypes.func]),
    
    /**
    * Whether to use nodeIcon*
    */
    useNodeIcon: PropTypes.bool,
    /**
    * The node attribute containing url to image to display for each individual node. Takes precedence over nodeIcon_supertype and nodeIcon_type
    */
    nodeIcon: PropTypes.string,

    /**
    * specify node image attribute by type, overrides nodeIcon_attr_supertype and nodeIcon_common_*
    */
    nodeIcon_attr_type: PropTypes.objectOf(PropTypes.string),
   
    /**
    * specify node image attribute by supertype (relation, entity, attribute), overrides nodeIcon_common_*
    */
    nodeIcon_attr_supertype: PropTypes.objectOf(PropTypes.string),
   
    /**
    * Common node image by type   overrides nodeIcon_supertype
    */
    nodeIcon_common_type: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),

    /**
    * Common node image by supertype (relation, entity, attribute)
    */
    nodeIcon_common_supertype: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string)),
   
    nodeIcon_fontsheets: PropTypes.object,

    /**
    * Whether to use nodeImg*
    */
    useNodeImg: PropTypes.bool,
    /**
    * The node attribute containing url to image to display for each individual node. Takes precedence over nodeIcon_supertype and nodeIcon_type
    */
    nodeImg: PropTypes.string,

    /**
    * specify node image attribute by type, overrides nodeImg_attr_supertype and nodeImg_common_*
    */
    nodeImg_attr_type: PropTypes.objectOf(PropTypes.string),

    /**
    * specify node image attribute by supertype (relation, entity, attribute), overrides nodeImg_common_*
    */
    nodeImg_attr_supertype: PropTypes.objectOf(PropTypes.string),

    /**
    * Common node image by type   overrides nodeImg_supertype
    */
    nodeImg_common_type: PropTypes.objectOf(PropTypes.string),

    /**
    * Common node image by supertype (relation, entity, attribute)
    */
    nodeImg_common_supertype: PropTypes.objectOf(PropTypes.string),


    // link styling
    /**
     * The node attribute whose value should be displayed as label
     */ 
    linkLabel: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func]),
    /**
     * linkColor
     */ 
    linkColor: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func]),
        
    linkColor_attr_type: PropTypes.objectOf(PropTypes.string),

    linkColor_attr_supertype: PropTypes.objectOf(PropTypes.string),
    /**
     * autocolor the links by some link attribute
     */ 
    linkAutoColorBy: PropTypes.string,
    /**
     * linkOpacity - only for 3D graph, included here for compatibility
     */ 
    linkOpacity: PropTypes.number,
    /**
     * linkLineDash
     */ 
    // linkLineDash: PropTypes.oneOfType([
    //     PropTypes.number,
    //     PropTypes.string,
    //     PropTypes.func,
    // ]),
    /**
     * linkWidth
     */ 
    linkWidth: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.func]),
     /**
     * linkCurvature
     */ 
    linkCurvature: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.func]),
    /**
     * object to display (instead of normal link)
     */ 
    linkCanvasObject: PropTypes.func,
    /**
     * also show normal link
     */ 
    linkCanvasObjectMode: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string]),

    /**
     * link arrow length
     */ 
    linkDirectionalArrowLength: PropTypes.number,
    
    /**
    * link arrow position
    */ 
    linkDirectionalArrowRelPos: PropTypes.number,

    // render control
    /**
    * zoomToFit
    */ 
    // zoomToFit: PropTypes.arrayOf(PropTypes.number),
    // zoomToFit: PropTypes.bool, 
    /**
    * zoom
    */ 
    zoomOut: PropTypes.bool,
    center: PropTypes.bool,
    // zoom: PropTypes.arrayOf(PropTypes.number),

    /**
    * centerAt
    */
    // centerAt: PropTypes.arrayOf(PropTypes.number),
    // Force engine (d3-force) configuration
     
    /**
     * cooldown time
     */  

    cooldownTime:PropTypes.number,

    d3Force: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string]),

    // interaction

    /**
    * onNodeClick
    */
    onNodeClick: PropTypes.func,

    /**
    * onNodeRightClick
    */
    onNodeRightClick: PropTypes.func,

    /**
    * onNodeHover
    */
    onNodeHover: PropTypes.func,
    
    /**
    * onLinkClick
    */
    onLinkClick: PropTypes.func,

    /**
    * onLinkRightClick
    */
    onLinkRightClick: PropTypes.func,

    /**
    * onLinkHover
    */
    onLinkHover: PropTypes.func,

    /**
    * onBackgroundClick
    */
    onBackgroundClick: PropTypes.func,


    /**
    * toggle with a single control whether graph is interactive
    */
    interactive: PropTypes.bool,

    /**
    * onBackgroundRightClick
    */
    onBackgroundRightClick: PropTypes.func,
    /**
    * enable zoom and panning? (2D)
    */ 
    enableZoomPanInteraction:PropTypes.bool,
    /**
     * enable navigation? (3D)
     */ 
    enableNavigationControls:PropTypes.bool,
    /**
     * enable pointer interaction such as hover, click, drag?
     */ 
    enablePointerInteraction:PropTypes.bool,

    /**
    * enable node drag? more efficient if false
    */ 
    enableNodeDrag: PropTypes.bool,
    
    /**
    * id of node to zoom to
    */ 
    nodeZoomId: PropTypes.string,

    // nodesClicked: PropTypes.arrayOf(
    //     PropTypes.string
    // ),
    nodesSelected: PropTypes.arrayOf(
        PropTypes.object
    ),
    
    nodeIdsHighlightDrag: PropTypes.arrayOf(
        PropTypes.string
    ),
   
    // nodeClicked: PropTypes.object,
    // click: PropTypes.number,

    // rightClick: PropTypes.number,

    // nodeClicked: PropTypes.object,

    nodeRightClicked: PropTypes.object,

    //nodeClickedViewpointCoordinates: PropTypes.objectOf(PropTypes.number),

    nodeRightClickedViewpointCoordinates: PropTypes.objectOf(PropTypes.number),
    
    // nodeShiftClicked: PropTypes.object,

    // nodeAltClicked: PropTypes.object,

    linksSelected: PropTypes.arrayOf(
        PropTypes.object
    ),
   
    linkIdsHighlightDrag: PropTypes.arrayOf(
        PropTypes.string
    ),
   
    // linkClicked: PropTypes.object,

    // linkRightClicked: PropTypes.object,

    // linkShiftClicked: PropTypes.object,

    // linkAltClicked: PropTypes.object,

    // altClick: PropTypes.number,

    // altClickCoordinates: PropTypes.objectOf(PropTypes.number),

    graknStatus: PropTypes.string,

    maxDepth_neighbours_select: PropTypes.number,

    max_nodes_render: PropTypes.number,

    size: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.object]),

    /**
    * three_obj_name: name of three object to add to scene. Not used in Graph2D, included for compatibility.
    */  
    externalobject_source: PropTypes.string, 

    externalobject_input: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.bool,
        PropTypes.array,
        PropTypes.object]),

    nodeHovered: PropTypes.object,

    centreCoordinates: PropTypes.objectOf(PropTypes.number),

    graphData_changed: PropTypes.bool,

    updated: PropTypes.bool,

    nodeIdsHighlight: PropTypes.arrayOf(PropTypes.string),

    //linkIdsHighlight: PropTypes.arrayOf(PropTypes.string),

    nodeIdsFilter: PropTypes.arrayOf(PropTypes.string),

    linkIdsFilter: PropTypes.arrayOf(PropTypes.string),

    // COORDINATE SYSTEM PROPS
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
    * focused: whether component is focused
    */
    focused: PropTypes.bool,

};

obj_shared_props.id = "Graph2D"

Graph2D.defaultProps = obj_shared_props;

export default withSizeHOC(Graph2D)