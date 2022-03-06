import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPause} from '@fortawesome/free-solid-svg-icons'

const Pause = ({onPlayerClick} : any) => {
    return (
        <div className="d-flex justify-content-around play" onClick={onPlayerClick}>
            <FontAwesomeIcon icon={faPause} />
        </div>
    )
}

export default Pause