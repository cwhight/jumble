import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlay} from '@fortawesome/free-solid-svg-icons'

const Play = ({onPlayerClick} :any ) => {
    return (
        <div className="d-flex justify-content-around play" onClick={onPlayerClick}>
            <FontAwesomeIcon icon={faPlay} />
        </div>
    )
}

export default Play