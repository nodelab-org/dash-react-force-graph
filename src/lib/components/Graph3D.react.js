import React, {useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {ForceGraph3D} from 'react-force-graph';
import importScript from '../customHooks/importScript.js';
// import useFontFace from '../customhooks/useFontFace.js';
// https://github.com/ctrlplusb/react-sizeme
import { withSize } from 'react-sizeme';
import {saturate, darken, lighten} from 'polished';

// THREE imports
// import {SpriteIcon} from "./SpriteIcon.react.js"
import SpriteText from 'three-spritetext';
import * as THREE from 'THREE';
import ThreeGeo from 'three-geo';
// import * as material_UI from '@material-ui/icon_fontsheets'; // doesn't work: Module not found: Error: Can't resolve '@material-ui/icon_fontsheets' in '/Users/rkm916/Sync/projects/2020-dashforcegraph/src/lib/components'
// see https://stackoverflow.com/questions/42051588/wildcard-or-asterisk-vs-named-or-selective-import-es6-javascript

import {obj_shared_props} from "../shared_props_defaults.js"

// use react resize-me to make canvas container width responsive
const withSizeHOC = withSize({monitorWidth:true, monitorHeight:false, noPlaceholder:true})

function Graph3D(props) {

    // import scripts
    // https://fontawesome.com/kits/a6e0eeba63/use?welcome=yes
    // importScript("https://kit.fontawesome.com/a6e0eeba63.js");
    for (let key in props.icon_fontsheets) {
        // useFontFace(key, props.icon_fontsheets[key])
        importScript(props.icon_fontsheets[key])
    }

    const fgRef = useRef(null);

    var nodesById = Object.fromEntries(props.graphData.nodes.map(node => [node.id, node]));

    // display standard browser warning before navigating away from page
    // https://stackoverflow.com/questions/1119289/how-to-show-the-are-you-sure-you-want-to-navigate-away-from-this-page-when-ch
    useEffect( () => {
        if (props.graknStatus === "on") {
            window.onbeforeunload = () => true
        } else {
            window.onbeforeunload = () => false
        }
    },[props.graphData, props.graknStatus])


    // set node coordinates
    useEffect( () => {
        const nodesUpdated = []
        const origin = [0,0,0]
        if (props.useCoordinates && props.pixelUnitRatio && props.graphData) {
           for (let node of props.graphData.nodes) {
               node.fx =origin+props.pixelUnitRatio*node.__coord_x
               node.fy =origin+props.pixelUnitRatio*node.__coord_y
               node.fz =origin+props.pixelUnitRatio*node.__coord_z
               nodesUpdated.push(node)
           }
        }  else {
            for (let node of props.graphData.nodes) {
                delete node.fx
                delete node.fy
                delete node.fz
                nodesUpdated.push(node)
            }
        }
        props.setProps({graphData:{"nodes": nodesUpdated, "links":props.graphData.links}})
   },[props.useCoordinates, props.pixelUnitRatio, props.graphData])

    // when loading new graphData and rendering engine is running, disable interactivity
    useEffect( () => {
        props.setProps({enableZoomPanInteraction:false})
        props.setProps({enableNavigationControls:false})
        props.setProps({enablePointerInteraction:false})
    },[props.graphData])


    const get_node_neighbour_ids = (node, depth) => {
        /**
        * @usage: extract the ids of neighbours from the "__source" and "__target" items in the node object.
        *           If all the nodes with these ids are alupdated in nodesSelected (if not null), call recursively on the
        *           nodes with these ids until the neighbourNodeIds_unique contain 'new' nodes that weren't alupdated in nodesSelected
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
        }
        neighbourNodeIds_unique = [...new Set(neighbourNodeIds_unique)]

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

        // reset nodeRightClicked (kludge)
        props.setProps({nodeRightClicked:null});

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
            // const nodeCoordinates = fgRef.current.graph2ScreenCoords(node.x,node.y,node.z)
            //props.setProps({nodeClickedViewpointCoordinates:nodeCoordinates})

            // not shift
            if (nodeIndex === -1) {
                // node not in nodesSelected
                nodesSelected_tmp.splice(0,nodesSelected_tmp.length)
                nodesSelected_tmp.push(node);
            } else {
                // node alupdated selected

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

        // props.setProps({nodeClicked:null});
        //props.setProps({nodeAltClicked:null});
        props.setProps({nodeRightClicked:node});
        //console.log("props.nodeRightClicked")
        console.log(props.nodeRightClicked)

        const nodeCoordinates = fgRef.current.graph2ScreenCoords(node.x,node.y, node.z)
        props.setProps({nodeRightClickedViewpointCoordinates:nodeCoordinates})
        console.log("props.nodeRightClickedViewpointCoordinates")
        console.log(props.nodeRightClickedViewpointCoordinates)

        // const rightClick = props.rightClick+1
        // console.log("rightClick:")
        // console.log(rightClick)
        // props.setProps({rightClick:rightClick});
    }


    const handleNodeDrag = (node, translate) => {

        // reset nodeRightClicked (kludge)
        // props.setProps({nodeClicked:null});
        // props.setProps({nodeRightClicked:null});

        props.setProps({nodeIdsDrag:[]});
        props.setProps({linkIdsDrag:[]});

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
            // assign unique ids to nodeIdsDrag prop
            neighbourNodeIds.push(node.id)

            console.log("new nodeIdsDrag:")
            console.log(neighbourNodeIds)

            props.setProps({nodeIdsDrag:[...new Set(neighbourNodeIds)]});
            props.setProps({linkIdsNodesDrag:linkIds});
        }
    };

    const handleNodeDragEnd = (node, translate) => {

        props.setProps({nodeIdsDrag:[]});
        props.setProps({linkIdsNodesDrag:[]});

        node.fx = node.x;
        node.fy = node.y;
        node.fz = node.z;

    };


    const handleNodeHover = node => {
        props.setProps({nodeHovered:node})
    }

    // set centreCoordinates
    // useEffect( () => {
    //     if (! fgRef.current.getGraphBbox() === null) {
    //         props.setProps({centreCoordinates:props.graphData.nodes.length ? {x:0.5*(fgRef.current.getGraphBbox().x[0]+fgRef.current.getGraphBbox().x[1]), y:0.5*(fgRef.current.getGraphBbox().y[0]+fgRef.current.getGraphBbox().y[1]), z:0.5*(fgRef.current.getGraphBbox().z[0]+fgRef.current.getGraphBbox().z[1])} : [0,0,0]})
    //     }
    // },[props.graphData])


    const handleBackgroundClick = event => {

        //props.setProps({nodeAltClicked:null});
        // props.setProps({nodeClicked:null});
        // props.setProps({nodeClickedViewpointCoordinates:null});
        props.setProps({nodeRightClicked:null});
        props.setProps({nodeRightClickedViewpointCoordinates:null});


        console.log("handleBackgroundClick")

       // if (event.altKey) {
            // const altClick = props.altClick+1
            // props.setProps({altClick:altClick});
            props.setProps({altClickCoordinates:{"x":event.clientX, "y": event.clientY}})
       // } else {
            //props.setProps({nodeAltClicked:null});
            props.setProps({nodesSelected:[]});
            props.setProps({linksSelected:[]});
       // }
    };


    useEffect(()=> {
        props.setProps({graphData_changed:true})
    }, [props.graphData])


    useEffect(()=> {
        props.setProps({updated:false})
    }, [props.nodeIdsDrag, props.nodesSelected])


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

    
    useEffect( () => {
        // e.g. fgRef.current.d3Force('collide', d3.forceCollide(Graph.nodeRelSize()))
        if (props.forceEngine === "d3" & props.d3Force_define.name) {
          if (props.d3Force_define.force) {
            // define force
            fgRef.current.d3Force(props.d3Force_define.name, forceFunction(...props.d3Force_define.force_args))
          } else {
            // remove force
            fgRef.current.d3Force(props.d3Force_define.name, null)
          }
        }
    },[props.d3Force_define])


    useEffect( () => {
      // e.g. fgRef.current.d3Force('charge').strength(-70);
        if (props.forceEngine === "d3" & props.d3Force_call.name & props.d3Force_call.method) {
            fgRef.current.d3Force(props.d3Force.name, d3[props.d3Force_call.method](...props.d3Force_call.method_args))
        }
    },[props.d3Force_call])


    // zoom to node
    useEffect(() => {
        if (props.nodeZoomId !== null) {
            const distance = 40;
            const distRatio = 1 + distance/Math.hypot(nodesById[props.nodeZoomId].x, nodesById[props.nodeZoomId].y, nodesById[props.nodeZoomId].z);
            fgRef.current.cameraPosition(
            { x: nodesById[props.nodeZoomId].x * distRatio, y: nodesById[props.nodeZoomId].y * distRatio, z: nodesById[props.nodeZoomId].z * distRatio }, // new position
            nodesById[props.nodeZoomId], // lookAt ({ x, y, z })
            750  // ms transition duration
            );
        }
    },[props.nodeZoomId])

    // prepare icon_fontsheets

    const generateicon_fontsheetsprite = (iconName, fontFace, size, color) => {
        const spriteImg = new SpriteText(iconName);// `${Object.values(icon_src)[0]}`);
        spriteImg.material.depthWrite = false;
        spriteImg.color = color; // spriteText.color;
        spriteImg.textHeight = size;
        spriteImg.fontFace = fontFace
        return(spriteImg)
    }//, [props.graphData, props.icon_fontsheets, props.nodeColor_common_supertype, props.nodeColor_common_type, props.nodeImg_attr_supertype, props.nodeImg_attr_type, props.nodeImg_common_supertype, props.nodeImg_common_type] )

    const nodeThreeObjectFunction = node => {

        var color = props.nodeColor in node? node[props.nodeColor] : node.__type in props.nodeColor_common_type? props.nodeColor_common_type[node.__type] : node.__supertype in props.nodeColor_common_supertype? props.nodeColor_common_supertype[node.__supertype] : node.color;
        const label = props.nodeLabel in node? node.__type+"-"+node[props.nodeLabel] : node.__type+"-"+node.id;
        const size = 12;
        var opacity = 0.9;

        const spriteText = new SpriteText(label);

        spriteText.color =  color;
        spriteText.fontWeight = "normal";
        spriteText.textHeight = 3;

        // adapt style parameters if node is selected and/or highlighted
        if (props.nodesSelected.length) {
            // make all other nodes more transparent
            opacity -= 0.3
            //spriteText.color = darken(0.3, spriteText.color)

            if (props.nodesSelected.map(node => node.id).indexOf(node.id) !== -1) {
                opacity = 1
                // spriteText.color = opacify(0.4, spriteText.color)
                spriteText.color = saturate(0.2,spriteText.color)
                spriteText.color = lighten(0.2, spriteText.color)
                spriteText.textHeight += 2

            }
        }
        if (props.nodeIdsDrag.length) {
             // make all other nodes more transparent
            opacity -= 0.3
            // spriteText.color = transparentize(0.3, spriteText.color)
            if (props.nodeIdsDrag.indexOf(node.id) !== -1) {
                opacity = 1
                // spriteText.color = opacify(0.4, spriteText.color)
                spriteText.color = saturate(0.2, spriteText.color)
                spriteText.color = lighten(0.2, spriteText.color)
                spriteText.fontWeight = "bold"

            }
        }

        if (props.nodeIdsHighlight.length) {
            opacity -= 0.3
            if (props.nodeIdsHighlight.indexOf(node.id) !== -1) {
                opacity = 1
                spriteText.color = lighten(0.2, spriteText.color)
                spriteText.fontWeight="bold"
            }
        }

        var img_src = null
        var spriteImg
        if (props.useNodeImg) {
            img_src = node.__type in props.nodeImg_attr_type? node[props.nodeImg_attr_type[node.__type]] : node.__supertype in props.nodeImg_attr_supertype? node[props.nodeImg_attr_supertype[node.__supertype]] : props.nodeImg in node? node[props.nodeImg] : node.__type in props.nodeImg_common_type? props.nodeImg_common_type[node.__type] :  node.__supertype in props.nodeImg_common_supertype? props.nodeImg_common_supertype[node.__supertype] : null
            if (typeof(img_src)==="string" && (img_src.includes("http") || img_src.includes("www"))) {
                // if URL, get image and make it into a sprite
                const map = new THREE.TextureLoader().load(img_src); // "https://picsum.photos/100/100/?random"); //
                map.minFilter = THREE.LinearFilter;
                const material = new THREE.SpriteMaterial( {
                    map: map,
                    transparent: true,
                    opacity: opacity } );
                spriteImg =  new THREE.Sprite( material );
                spriteImg.scale.set(size,size,1); // leave sprite size unchanged when selecting
                spriteImg.color =  darken(0.1, spriteText.color)
            }
        }
        if (img_src === null && props.useNodeIcon) {
            const icon_src = node.__type in props.nodeIcon_attr_type? node[props.nodeIcon_attr_type[node.__type]] : node.__supertype in props.nodeIcon_attr_supertype? node[props.nodeIcon_attr_supertype[node.__supertype]] : props.nodeIcon in node? node[props.nodeIcon] : node.__type in props.nodeIcon_common_type? props.nodeIcon_common_type[node.__type] :  node.__supertype in props.nodeIcon_common_supertype? props.nodeIcon_common_supertype[node.__supertype] : null
            if (typeof(icon_src)==="object") {
                spriteImg = generateicon_fontsheetsprite(Object.values(icon_src)[0], Object.keys(icon_src)[0], size, darken(0.1,spriteText.color))
            }
        }
        var out
        if (spriteImg!==null) {
            var group = new THREE.Group();
            const pos_adj1 = new THREE.Vector3( 0, -5, 0 );
            const pos_adj2 = new THREE.Vector3( 0, 5, 0 );
            spriteText.position.add(pos_adj1)
            spriteImg.position.add(pos_adj2)
            group.add( spriteText );
            group.add( spriteImg );
            out = group;
            // return spriteImg
        } else {
            out = spriteText
        }
        return out

    }

    // three-geo: add terrain to scene
    useEffect(() => {
        if (props.externalobject_source && props.externalobject_input) {
            if (props.externalobject_source === "mapbox_API" && props.externalobject_input.length === 3){
                // TODO: Check more rigorously whether input is valid
                // TODO: provide defaults otherwise

                console.log("props.externalobject_source")
                console.log(props.externalobject_source)
                console.log("props.externalobject_input")
                console.log(props.externalobject_input)

                console.log("props.externalobject_input[0")
                console.log(props.externalobject_input[0])

                const ioToken = 'pk.eyJ1Ijoiam90aG8iLCJhIjoiY2tnYjg0eG5yMGVqOTJ5bDR6ZnJtZmVlaCJ9.O_-MmTlY8bfMT0CMty4oeg'
                const tgeo = new ThreeGeo({
                    // tokenMapbox: '********', // <---- set your Mapbox API token here
                    tokenMapbox: ioToken,
                    useNodePixels: false//true
                });

                // console.log("tgeo")
                // console.log(tgeo)
                // const terrain = await tgeo.getTerrainVector(
                //     [props.externalobject_input[0], props.externalobject_input[1]], // [lat, lng]
                //     props.externalobject_input[2],               // radius of bounding circle (km)
                //     13)               // zoom resolution

                // console.log("terrain")
                // console.log(terrain)
                // fgRef.current.scene().add(terrain);

                async function fetchGeo() {
                    // three-geo
                    // https://github.com/w3reality/three-geo/blob/master/examples/projection/index.html
                    const terrain = await tgeo.getTerrainRgb(
                        [props.externalobject_input[0], props.externalobject_input[1]], // [lat, lng]
                        props.externalobject_input[2],               // radius of bounding circle (km)
                        13)               // zoom resolution

                    return terrain
                };

                fetchGeo().catch(()=> null).then((value)=>{
                    console.log("promise value")
                    console.log(value)
                    fgRef.current.scene().add(value.children[0])
                })

            }
            // else {
            //     const objs_add =fnc_make_three_obj(props.externalobject_source)
            //     for (let obj_add of objs_add) {
            //         fgRef.current.scene().add(obj_add);
            //     }
            // }
    }
    }, [props.externalobject_source,props.externalobject_input])


    return (
        <div id={props.id}>
            Graph3D:
                <ForceGraph3D
                    ref={fgRef}
                    graphData={props.graphData}
                    // Container layout
                    width={props.size.width}
                    height={window.innerHeight*props.heightRatio}
                    backgroundColor={props.backgroundColor}
                    // node styling
                    nodeColor={(node => {
                        var color = props.nodeColor in node? node[props.nodeColor] : node.__type in props.nodeColor_common_type? props.nodeColor_common_type[node.__type] : node.__supertype in props.nodeColor_common_supertype? props.nodeColor_common_supertype[node.__supertype] : node.color;

                        if (props.nodesSelected.map(node => node.id).indexOf(node.id) !== -1) {
                            color = saturate(0.2,color)
                            color = lighten(0.2, color)
                        }

                        if (props.nodeIdsHighlight.length) {
                            if (props.nodeIdsHighlight.indexOf(node.id) !== -1) {
                                color = saturate(0.2,color)
                                color = lighten(0.2, color)
                            }
                        }

                        if (props.nodeIdsDrag.length) {
                           if (props.nodeIdsDrag.indexOf(node.id) !== -1) {
                               color = saturate(0.2, color)
                               color = lighten(0.2, color)
                           }
                       }

                        return color
                    })}
                    nodeVisibility={(node => {
                        var visible = true

                        if (props.nodeIdsVisible.length) {
                            if (props.nodeIdsVisible.indexOf(node.id) === -1) {
                                visible = false
                            }
                        }
                        return visible
                    })}
                    nodeRelSize={props.nodeRelSize}
                    nodeLabel={(node =>
                        node.__type in props.nodeLabel_attr_type? node[props.nodeLabel_attr_type[node.__type]] : node.__supertype in props.nodeLabel_attr_supertype? node[props.nodeLabel_attr_supertype[node.__supertype]] : props.nodeLabel in node? node.__type + "-" + node[props.nodeLabel] : node.__type + "-" + node.id)}
                    nodeAutoColorBy={props.nodeAutoColorBy}
                    nodeOpacity={props.nodeOpacity}//{(node => props.node_attr_opacity in node? node[props.node_attr_opacity] : props.nodeOpacity)}
                    nodeThreeObject={nodeThreeObjectFunction}
                    nodeThreeObjectExtend={(node => {
                        //return !(props.nodeImg in node || node.__type in props.nodeImg_type || node.__supertype in props.nodeImg_supertype)
                        return (props.useNodeImg && (node.__type in props.nodeImg_attr_type || node.__supertype in props.nodeImg_attr_supertype || props.nodeImg in node || node.__type in props.nodeImg_common_type || node.__supertype in props.nodeImg_common_supertype)) ||  (props.useNodeIcon && (node.__type in props.nodeIcon_attr_type || node.__supertype in props.nodeIcon_attr_supertype || props.nodeIcon in node || node.__type in props.nodeIcon_common_type || node.__supertype in props.nodeIcon_common_supertype))? false : true;
                    }
                    )}
                    // link styling
                    linkLabel={props.linkLabel}
                    linkColor={(link => {
                        var color = props.linkColor in link? link[props.linkColor] : link.__type in props.linkColor_attr_type? props.linkColor_attr_type[link.__type] : link.__supertype in props.linkColor_attr_supertype? props.linkColor_attr_supertype[link.__supertype] : "#ffffff";

                        // is link selected?
                         if (props.linksSelected.length) {
                            color = darken(0.1, color)
                            if (props.linksSelected.indexOf(link.id) !== -1) {
                                color = saturate(0.2,color)
                            }
                        }

                        // is link highlighted?
                        if (props.linkIdsNodesDrag.length) {
                            color = darken(0.2, color)
                            if (props.linkIdsNodesDrag.indexOf(link.id) !== -1) {
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

                        return color
                    })}
                    linkVisibility={(link => {
                        var visible = true

                        if (props.nodeIdsVisible.length) {
                            // use nodeIdsVisible.length as criterion, since it shows whether or not a filter is applied.
                            // if we use links, often it will be empty, and no links will be invisible
                            if (props.linkIdsFilter.indexOf(link.id) === -1) {
                                visible = false
                            }
                        }
                        return visible
                    })}
                    // linkColor={(link => props.linksSelected.map(link => link.id).indexOf(link.id) === -1? saturate(1,props.linkColor) : transparentize(0.5, props.linkColor))}
                    linkAutoColorBy={props.linkAutoColorBy}
                    linkOpacity={props.linkOpacity}
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
                        if (props.linkIdsNodesDrag.length) {
                            width = width*0.9
                            if (props.linkIdsNodesDrag.indexOf(link.id) !== -1) {
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
                    //linkWidth={(link => highlightNodes.indexOf(link.source) == -1? 0.5 : 3)}
                    linkCurvature={props.linkCurvature}
                    linkThreeObject={link => {
                        // extend link with text sprite
                        const sprite = new SpriteText(link.linkLabel);
                        var color = props.linkColor in link? link[props.linkColor] : link.__type in props.linkColor_attr_type? props.linkColor_attr_type[link.__type] : link.__supertype in props.linkColor_attr_supertype? props.linkColor_attr_supertype[link.__supertype] : "#ffffff";

                        // is link selected?
                         // is link selected?
                         if (props.linksSelected.length) {
                            color = darken(0.1, color)
                            if (props.linksSelected.map(link=>link.id).indexOf(link.id) !== -1) {
                                color = saturate(0.2,color)
                                color = lighten(0.1,color)
                            }
                        }

                        // is link highlighted?
                        if (props.linkIdsNodesDrag.length) {
                            color = darken(0.3, color)
                            if (props.linkIdsNodesDrag.indexOf(link.id) !== -1) {
                                color = saturate(0.2,color)
                                color = lighten(0.3, color)
                            }
                        }

                        // are link source and target selected?
                        if (props.nodesSelected.length) {
                            color = darken(0.3, color)
                            if (props.nodesSelected.map(node => node.id).includes(link.source) && props.nodesSelected.map(node => node.id).includes(link.target)) {
                                color = saturate(0.2,color)
                                color = lighten(0.2, color)
                            }

                        }

                        // if (props.nodeIdsHighlight.length) {
                        //     if (props.nodeIdsHighlight.includes(link.source) || props.nodeIdsHighlight.includes(link.target)) {
                        //         color = saturate(0.2,color)
                        //         color = lighten(0.2, color)
                        //     }
                        // }

                        // if (props.nodeIdsDrag.length) {
                        //     if (props.nodeIdsDrag.includes(link.source) || props.nodeIdsDrag.includes(link.target)) {
                        //        color = saturate(0.2, color)
                        //        color = lighten(0.2, color)
                        //    }
                        // }

                        sprite.color = color
                        sprite.textHeight = 2;
                        return sprite;
                        }}
                    linkPositionUpdate={(sprite, { start, end }) => {
                        const middlePos = Object.assign(...['x', 'y', 'z'].map(c => ({
                            [c]: start[c] + (end[c] - start[c]) / 2 // calc middle point
                        })));

                        // Position sprite
                        Object.assign(sprite.position, middlePos);
                    }}
                    linkThreeObjectExtend={props.linkThreeObjectExtend}
                    linkDirectionalArrowLength={props.linkDirectionalArrowLength}
                    linkDirectionalArrowRelPos={props.linkDirectionalArrowRelPos}
                    // Render control
                    // zoomToFit={props.zoomToFit}
                    // Force engine (d3-force) configuration
                    cooldownTime={props.cooldownTime} // Math.max(0.8*1000*Math.log10(props.graphData.nodes.length),1)
                    // d3Force={() => {
                    //     // if (props.node_attr_label || props.nodeImg) {
                    //         ('charge').strength(-50)}
                    //     // }
                    //     }
                    //zoom={props.zoom}
                    //centerAt={props.centerAt}
                    onEngineStop={()=>{

                        props.setProps({enableNavigationControls: props.interactive? true : false})
                        props.setProps({enablePointerInteraction: props.interactive? true : false})

                        // props.setProps({nodesSelected:[]})
                        // props.setProps({updated:updated+1}) failed since it seems to fire continuously at init
                        if (props.graphData_changed) {
                            props.setProps({updated:true})
                        }
                        props.setProps({graphData_changed:false})
                        // // Center on node rightclicked or else middle of canvas
                        if (props.nodeRightClicked !== null) {
                            // //     // need to obtain the node's new coordinates!
                            // //     fgRef.current.centerAt(props.nodeRightClicked.x, props.nodeRightClicked.y, 250);
                            // const node = nodesById[props.nodeRightClicked.id]
                            // const distance = 40;
                            // const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);
                            // fgRef.current.cameraPosition({
                            //     x: node.x * distRatio,
                            //     y: node.y * distRatio,
                            //     z: node.z * distRatio
                            // }, 750);
                            // props.setProps({nodeRightClicked:null})
                        }
                        else {
                            if (props.center) {
                                fgRef.current.cameraPosition({
                                    x:0,
                                    y:0,
                                    z:0
                                }, 500)
                                props.setProps({center:false})
                            }
                        }



                    }}
                    // Interaction
                    onNodeClick={handleNodeClick}
                    onNodeRightClick={handleNodeRightClick}
                    controlType={"trackball"}
                    onNodeHover={handleNodeHover}
                    onLinkClick={handleLinkClick}
                    // onLinkHover={handleLinkHover}
                    enableNavigationControls={props.enableNavigationControls}
                    enablePointerInteraction={props.enablePointerInteraction}
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
                            //center: e.target.center,
                            //cooldownTime: e.target.cooldownTime,
                            //nodesSelected: e.target.nodesSelected,
                            //rightClick: e.target.rightClick,
                            //nodeRightClicked: e.target.nodeRightClicked,
                            //nodeAltClicked: e.target.nodeAltClicked,
                            //nodeZoomId: e.target.nodeZoomId,
                            //graknStatus: e.target.graknStatus,
                            })
                    }
           />
        </div>
    );

}




Graph3D.propTypes = {
    /**
     * The ID used to identify this component in Dash callbacks.
     */
    id: PropTypes.string,

    //  /**
    //  * A label that will be printed when this component is rendered.
    //  */
    // label: PropTypes.oneOfType([
    //     PropTypes.string,
    //     PropTypes.func]),//.isRequired,

    /**
     * Dash-assigned callback that should be called to report property changes
     * to Dash, to make them available for callbacks.
     */
    setProps: PropTypes.func,

    /**
     * The data to display. Format {nodes:{}, links:{}}
     */
    graphData: PropTypes.object.isRequired,


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
    nodeRelSize:  PropTypes.number,

    // node_attr_size: PropTypes.string,
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
     * The node attribute whose value should be used for coloring nodes
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
    * specify node URL attribute by type, override nodeURL_attr_supertype and nodeURL_common_*
    */
   nodeURL_attr_type: PropTypes.objectOf(PropTypes.string),

   /**
    * specify node URL attribute by supertype (relation, entity, attribute), overrides nodeURL_common_*
    */
   nodeURL_attr_supertype: PropTypes.objectOf(PropTypes.string),

    /**
     * The node attribute whose value should be used for coloring nodes
     */
    nodeAutoColorBy: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func]),

    /**
     * node opacity
     */
    nodeOpacity: PropTypes.number,
    // node_attr_opacity: PropTypes.string,

     /**
     * The function that defines the alternative node representation
     */
    //nodeCanvasObject: PropTypes.func,

    /**
     * when showing nodeThreeObject, keep showing default node object as well as text or image
     */
    nodeCanvasObjectMode: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func]),
    nodeThreeObject: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string,
        PropTypes.func]),

    // nodeThreeObjectExtend: PropTypes.oneOfType([
    //     PropTypes.bool,
    //     PropTypes.string,
    //     PropTypes.func]),
     /**
     * The node attribute whose value to display for each node
     */
    // node_attribute_txt: PropTypes.oneOfType([
    //     PropTypes.bool,
    //     PropTypes.string]),

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
     * opacity, in [0,1]
     */
    linkOpacity: PropTypes.number,
    /**
     * linkLineDash - only for 2D graph, included here for compatibility
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
    // linkCanvasObject: PropTypes.func,
    linkThreeObject: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func,
        PropTypes.string]),
    /**
     * also show normal link
     */
    linkThreeObjectExtend:  PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.func,
        PropTypes.string]),
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

     d3Force_define: PropTypes.object,

     /**
     * object to call a method on an existing simulation force. E.g.
     * d3Force_call_method = {
     *    "name": "charge", // the name to which the force is assigned
     *    "method": "strength", // the name of a method to call on the force
     *    "method_args": [-50], // array of args to pass to force method
     *
     */

    d3Force_call: PropTypes.object,

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
    * onBackgroundRightClick
    */
    onBackgroundRightClick: PropTypes.func,

    /**
    * toggle with a single control whether graph is interactive
    */
   interactive: PropTypes.bool,
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

    nodeIdsDrag: PropTypes.arrayOf(
        PropTypes.string
    ),

    // click: PropTypes.number,

    // rightClick: PropTypes.number,
    // nodeClicked: PropTypes.object,

    // nodeClicked: PropTypes.object,

    nodeRightClicked: PropTypes.object,

    //nodeClickedViewpointCoordinates: PropTypes.objectOf(PropTypes.number),

    nodeRightClickedViewpointCoordinates: PropTypes.objectOf(PropTypes.number),
    // nodeShiftClicked: PropTypes.object,

    // nodeAltClicked: PropTypes.object,

    linksSelected: PropTypes.arrayOf(
        PropTypes.object
    ),

    linkIdsNodesDrag: PropTypes.arrayOf(
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

    externalobject_source: PropTypes.string,

    externalobject_input: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.bool,
        PropTypes.array,
        PropTypes.object]),

    // backgroundImgURL: PropTypes.string, // 2D only

    nodeHovered: PropTypes.object,

    centreCoordinates: PropTypes.objectOf(PropTypes.number),

    graphData_changed: PropTypes.bool,

    updated: PropTypes.bool,

    nodeIdsHighlight: PropTypes.arrayOf(PropTypes.string),

    // linkIdsHighlight: PropTypes.arrayOf(PropTypes.string),

    nodeIdsVisible: PropTypes.arrayOf(PropTypes.string),

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


obj_shared_props.id = "Graph3D"

Graph3D.defaultProps = obj_shared_props;

export default withSizeHOC(Graph3D)
