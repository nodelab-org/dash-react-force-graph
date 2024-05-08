/* eslint-disable max-lines */
/* eslint-disable no-ternary */
/* eslint-disable no-nested-ternary */
/* eslint-disable sort-imports */
/* eslint-disable capitalized-comments */
import React from "react";
import PieMenu, { Slice } from 'react-pie-menu';
import PropTypes from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { 
    faArrowsAlt,
    faArrowAltCircleLeft,
    faBezierCurve,
    faEdit,
    faEyeSlash, 
    faExpandAlt,
    faFillDrip,
    faHandHolding,
    faHardHat,
    faIcons,
    faImages,
    faKey,
    faRoute,
    faSitemap,
    faTag, 
    faTrash,
    faIdBadge,
    faUser
} from '@fortawesome/free-solid-svg-icons'


function ContextPieMenu(props) {
    // contextObj is typically a node, but could be a link

    const {contextObj, schemaOrData, centerX, centerY, radius, centerRadius, sliceCallback, thingTypeKey, rootTypeKey} = props;

    const isNode = contextObj && rootTypeKey in contextObj;

    const isType = contextObj && schemaOrData === "schema";

    const rootType = contextObj && isNode
        ? contextObj[rootTypeKey]
        : null;
    
    const thingType = contextObj && isNode
        ? contextObj[thingTypeKey]
        : null;

    return (
        <div id={props.id}>
            <PieMenu
                radius={radius}
                centerRadius={centerRadius}
                centerX={centerX}
                centerY={centerY}
            >
                {
                    (!contextObj || !isNode) && <></>
                }
                { 
                    isNode && !isType && (
                        // it's a thing (data)
                        // so we enable queries and hiding it
                        <>
                            <Slice onSelect={(e) => {sliceCallback("expand-neighbours")}}>
                                <FontAwesomeIcon icon={faArrowsAlt} size="2x" color = "cyan"/>
                            </Slice>
                            <Slice onSelect={(e) => {sliceCallback("find-connecting-relations")}}>
                                <FontAwesomeIcon icon={faRoute} size="2x" color="cyan"/>
                            </Slice>
                            <Slice onSelect={(e) => {sliceCallback("hide")}}>
                                <FontAwesomeIcon icon={faEyeSlash} size="2x" color="red"/>
                            </Slice>
                        </>
                    )
                }
                {
                    isNode && isType && ((
                        rootType === "thing" && (
                            // it's the thing type
                            // don't allow anything
                            <></>
                        )
                    ) || (rootType === "relation:role" && (
                        // it's an entity type (could be the root entity type)
                        // allow styling and queries
                        <Slice onSelect={(e) => {sliceCallback("query-plays-x")}}>
                            <FontAwesomeIcon icon={faHardHat} size="2x" color="red"/>
                        </Slice>
                        )
                    ) || (rootType === "attribute" && (
                        // it's an entity type (could be the root entity type)
                        // allow styling and queries
                        <>
                            <Slice onSelect={(e) => {sliceCallback("query-isa")}}>
                                <FontAwesomeIcon icon={faUser} size="2x" color="red"/>
                            </Slice>
                            <Slice onSelect={(e) => {sliceCallback("query-has")}}>
                                <FontAwesomeIcon icon={faHandHolding} size="2x" color="red"/>
                            </Slice>
                            <Slice onSelect={(e) => {sliceCallback("query-has-x")}}>
                                <FontAwesomeIcon icon={faHandHolding} size="2x" color="red"/>
                            </Slice>
                            <Slice onSelect={(e) => {sliceCallback("query-plays")}}>
                                <FontAwesomeIcon icon={faHardHat} size="2x" color="red"/>
                            </Slice>
                        </>
                        )
                    ) || (
                        ["relation", "entity"].includes(rootType) && (
                            // it's an relation type (could be the root relation type)
                            // allow styling and queries
                            <>
                                <Slice onSelect={(e) => {sliceCallback("query-isa")}}>
                                    <FontAwesomeIcon icon={faUser} size="2x" color="red"/>
                                </Slice>
                                <Slice onSelect={(e) => {sliceCallback("query-plays")}}>
                                    <FontAwesomeIcon icon={faHardHat} size="2x" color = "cyan"/>
                                </Slice>
                                <Slice onSelect={(e) => {sliceCallback("query-has")}}>
                                    <FontAwesomeIcon icon={faHandHolding} size="2x" color="red"/>
                                </Slice>
                            </>
                        )
                    ))
                }
            </PieMenu>
        </div>
    )
}


ContextPieMenu.propTypes = {
    id: PropTypes.string,
    contextObj: PropTypes.object,
    schemaOrData: PropTypes.string,
    centerX: PropTypes.string,
    centerY: PropTypes.string,
    "radius": PropTypes.string,
    "centerRadius": PropTypes.string,
    "sliceCallback":PropTypes.func,
    "thingTypeKey": PropTypes.string,
    "rootTypeKey": PropTypes.string
}


ContextPieMenu.defaultProps = {
    "id": "context-pie-menu",
    "contextObj": null,
    "schemaOrData": "data",
    centerX: "0px",
    centerY: "0px",
    "radius": "125px",
    "centerRadius": "30px",
    "sliceCallback": null,
    "thingTypeKey": "__thingType",
    "rootTypeKey": "__rootType"
}

export default ContextPieMenu;
