import React from "react";
import {Button} from "react-bootstrap";
import {score} from "./keypad";
import {faCross} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface FirstModalProps {
    show: boolean
    close: any
}

export const FirstModal: React.FC<FirstModalProps> = (props: FirstModalProps) => {
    let {show, close} = props
    const reset = () => {
        show = false
        close()
    }


    const buttons = <div className={"mt-3"}>
        <Button onClick={() => reset()} className={"btn"}>PLAY</Button>
    </div>

    const className = show ? "modal-cont display-block" : "modal-cont display-none"

    return <div className={className}>
        <div className={"p-3 modal-main-cont d-flex flex-column justify-content-around align-items-center"}>

            <h2>Welcome to Jumble!</h2>
            <p>A daily anagram</p>
            <p>You begin with nine letter word scrambled</p>
            <p>Solve the anagram to solve the Jumble</p>
            <p>Try to beat your best time!</p>
            {buttons}
        </div>
    </div>
}
