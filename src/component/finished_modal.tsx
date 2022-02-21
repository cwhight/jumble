import React from "react";
import {Button, Modal} from "react-bootstrap";

export interface FinishedModalProps {
    clear: any
    success: boolean
    show: boolean
}

export const FinishedModal: React.FC<FinishedModalProps> = (props: FinishedModalProps) => {
    const {success, show, clear} = props

    const reset = () => {
        clear()
    }

    const message = success ? "Well done" : "Try again"

    const buttons = success ? null : <div className={"mt-3"}>
        <Button onClick={clear} className={"btn"}>Try Again</Button>
        <Button className={"btn"}>I've done my Best</Button>
    </div>

    return <Modal ariaHideApp={false}
                  show={show}
                  aria-labelledby="contained-modal-title-vcenter"
                  contentLabel="Example Modal">
        <div className={"p-3 h-75 d-flex flex-column align-items-center justify-content-around"}>
            <h1 className={"grey-text"}>You have finished</h1>
            <div>
                {message}
            </div>
            {buttons}
        </div>
    </Modal>
}
