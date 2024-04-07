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
} from '@fortawesome/free-solid-svg-icons'


function ContextPieMenu(props) {

    const {contextObj, schemaOrData, centerX, centerY, radius, centerRadius, sliceCallback} = props;

    const isNode = contextObj && "__rootType" in contextObj;

    const isType = contextObj && schemaOrData === "schema";

    const rootType = contextObj && isNode
        ? contextObj.__rootType
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
                    !contextObj && <></>
                }
                {
                    !isNode && (
                        <Slice onSelect = {(e) => {sliceCallback("delete")}}>
                            <FontAwesomeIcon icon={faTrash} size="2x" color="black" key="1"/>
                        </Slice>
                    )
                }
                { isNode && !isType && (
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
                )}
                {/* <Slice onSelect={sliceCallback("expand-neighbours")}>
                    <FontAwesomeIcon icon={faArrowsAlt} size="2x" color = "cyan"/>
                </Slice>
                <Slice onSelect={sliceCallback("find-connecting-relations")}>
                    <FontAwesomeIcon icon={faRoute} size="2x" color="cyan"/>
                </Slice>
                <Slice onSelect={sliceCallback("hide-selected")}>
                    <FontAwesomeIcon icon={faEyeSlash} size="2x" color="red"/>
                </Slice> */}
                {isNode && isType && rootType === "thing" && (<></>)}
                {isNode && isType && rootType === "entity" && (<></>)}
                {isNode && isType && rootType === "attribute" && (<></>)}
                {isNode && isType && rootType === "role" && (<></>)}
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
    "sliceCallback":PropTypes.func
}


ContextPieMenu.defaultProps = {
    "id": "context-pie-menu",
    "contextObj": null,
    "schemaOrData": "data",
    centerX: "0px",
    centerY: "0px",
    "radius": "125px",
    "centerRadius": "30px",
    "sliceCallback": null
}

export default ContextPieMenu;
