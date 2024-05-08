/* eslint-disable max-lines */
/* eslint-disable no-ternary */
/* eslint-disable no-nested-ternary */
/* eslint-disable sort-imports */
/* eslint-disable capitalized-comments */
import React, {useState} from "react";
import PieMenu, { PieCenter, Slice } from 'react-pie-menu';
import PropTypes from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { 
    faArrowsAlt,
    faArrowAltCircleLeft,
    faBezierCurve,
    faCaretLeft,
    faChevronLeft,
    faEdit,
    faEyeSlash, 
    faExpandAlt,
    faFillDrip,
    faHandHolding,
    faHardHat,
    faIcons,
    faImages,
    faKey,
    faPencilSquare,
    faRoute,
    faSitemap,
    faTag, 
    faTerminal,
    faIdBadge,
    faUser
} from '@fortawesome/free-solid-svg-icons'


 


function ContextPieMenu(props) {
    // contextObj is typically a node, but could be a link

    const {contextObj, schemaOrData, centerX, centerY, radius, centerRadius, sliceCallback, rootTypeKey} = props;

    // determine contextObj characteristics
    const isNode = contextObj && rootTypeKey in contextObj;

    const isType = contextObj && schemaOrData === "schema";

    const rootType = contextObj && isNode
        ? contextObj[rootTypeKey]
        : null;

    // define menu logic
    const INITIAL = 0;
    const STYLE = 1;
    const QUERY = 2;

    const [
        choice,
        setChoice
    ] = useState(0);

    const showStyleChoices = () => {
        setChoice( (_c) => STYLE );
    };

    const showQueryChoices = () => {
        setChoice( (_c) => QUERY );
    };

    // const goBack = () => {
    //     if (choice === INITIAL) return;
    //     setChoice( (_c) => INITIAL)
    // };

    // const Center = props => ( // eslint-disable-line react/no-unstable-nested-components
    //     <PieCenter {...props} onClick={goBack} centerRadius={centerRadius*2.5}>
    //         {isType && choice !== INITIAL && <FontAwesomeIcon icon={faCaretLeft} size="3x" color="white" />}
    //     </PieCenter>
    // );

    return (
        <div id={props.id}>
            <PieMenu
                centerRadius={centerRadius}
                radius={radius}
                centerX={centerX}
                centerY={centerY}
                // Center={Center}
            >
                {
                    ( 
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
                    ) || (    
                        rootType === "relation:role" && (
                                    // it's an entity type (could be the root entity type)
                                    // allow styling and queries
                                    <Slice onSelect={(e) => {sliceCallback("query-plays-x")}}>
                                        <FontAwesomeIcon icon={faHardHat} size="2x" color="red"/>
                                    </Slice>
                        )
                    ) || (   
                        isNode && isType && (
                            choice === INITIAL && (
                                <>
                                    <Slice onSelect={showStyleChoices}>
                                        <FontAwesomeIcon icon={faPencilSquare} size="2x" color="red"/>
                                    </Slice>
                                    <Slice onSelect={showQueryChoices}>
                                        <FontAwesomeIcon icon={faTerminal} size="2x" color="red"/>
                                    </Slice>
                                </>
                            )
                        ) || (
                            choice == STYLE && (
                                <>
                                    <Slice onSelect={(e) => {sliceCallback("color")}}>
                                        <FontAwesomeIcon icon={faFillDrip} size="2x" color="red"/>
                                    </Slice>
                                    <Slice onSelect={(e) => {sliceCallback("icon")}}>
                                        <FontAwesomeIcon icon={faIcons} size="2x" color="red"/>
                                    </Slice>
                                    <Slice onSelect={(e) => {sliceCallback("image")}}>
                                        <FontAwesomeIcon icon={faImages} size="2x" color="red"/>
                                    </Slice>
                                    <Slice onSelect={(e) => {sliceCallback("label")}}>
                                        <FontAwesomeIcon icon={faIdBadge} size="2x" color="red"/>
                                    </Slice>
                                    <Slice onSelect={(e) => {sliceCallback("size")}}>
                                        <FontAwesomeIcon icon={faExpandAlt} size="2x" color="red"/>
                                    </Slice>
                                </>
                            )
                        ) || (
                            choice === QUERY && (
                                rootType === "attribute" && (
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
                            )
                        )
                    )
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
    "rootTypeKey": "__rootType"
}

export default ContextPieMenu;
