import React from "react";
import {ButtonProps} from "react-bootstrap";

export interface SolutionLetterProps extends ButtonProps {
    isPlaying: boolean
    onClick?: any
    value: string
    used: boolean
    solution: boolean
    solved: boolean
    flip: boolean
}

export const SolutionLetter: React.FC<SolutionLetterProps> = (props: SolutionLetterProps) => {
    var {value, used, onClick, isPlaying, solution, solved, flip = false} = props

    const click = () => {
        if (!used) {
            onClick()
        }
    }
    return (

        <button data-animation="once" onClick={click}
                className={`${flip ? "flip" :""} ${value == ""? "" : "filled"} clickable p-2 mb-2 ${used ? "used" : ""} ${solution ? "newNum" : "smallNum"}`}>{isPlaying || solved ? value : ""}</button>
    )
}