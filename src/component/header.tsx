import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {faChartBar, faInfo} from "@fortawesome/free-solid-svg-icons";

interface HeaderProps {
    showScores: any
    showRules: any
}


const Header: React.FC<HeaderProps> = (props: HeaderProps) => {

    const {showScores, showRules} = props

    return (
        <div className={`header mb-3`}>
            <div className={"w-90 d-flex justify-content-between align-items-center"}>
                <h2 className={"header-content header-links mb-0"} onClick={() => showScores()}>
                    <FontAwesomeIcon icon={faChartBar} />
                </h2>
                <h1 className={"header-content mb-0 page-title"}>Jumble</h1>
                <h2 className={"header-content header-links mb-0"} onClick={() => showRules()}>
                    <FontAwesomeIcon className={"header-links "} icon={faInfo} />
                </h2>
            </div>
        </div>
    )
}

export default Header;