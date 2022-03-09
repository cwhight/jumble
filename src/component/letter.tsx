import React from "react";
import {ButtonProps} from "react-bootstrap";

export interface LetterProps extends ButtonProps {
    isPlaying: boolean
    onClick?: any
    value: string
    used: boolean
    solution: boolean
    solved: boolean
    flip: boolean
    hint: boolean
}

export const Letter: React.FC<LetterProps> = (props: LetterProps) => {
    var {value, used, onClick, isPlaying, solution, solved, flip, hint} = props

    const click = () => {
        if (!used) {
            onClick()
        }
    }
    return (
        <button data-animation="once" onClick={click}
                className={`${(hint && value == "" ? "transparent" : "")} ${hint ? "hint" : ""} ${flip ? "flip" :""} ${value == ""? "" : "filled"} clickable p-2 mb-2 ${used ? "used" : ""} ${solution ? "newNum" : "smallNum"}`}>{isPlaying || solved ? value : ""}</button>
    )
}