import React, {useState} from "react";
import {Button} from "react-bootstrap";
import {score} from "./keypad";
import {faCross} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export interface HintsModalProps {
    show: boolean
    close: any
    showHint: any
    index: number
}

export const HintsModal: React.FC<HintsModalProps> = (props: HintsModalProps) => {
    let {show, close, showHint} = props
    const reset = () => {
        show = false
        close()
    }

    const buttons = <div className={"w-100 mt-3 d-flex flex-column justify-content-around"}>
        <button className={"mb-3 btn btn-secondary"} onClick={() => showHint()}>Reveal this letter</button>
        <Button onClick={() => reset()} className={"mb-3 btn btn-primary"}>Close</Button>
    </div>

    const className = show ? "modal-cont display-block" : "modal-cont display-none"

    return <div className={className}>
        <div className={"p-3 modal-main-cont d-flex flex-column justify-content-around align-items-center"}>
            <p className={"text-center"}>You can reveal a letter, but it will end your streak</p>
            {buttons}
        </div>
    </div>
}
