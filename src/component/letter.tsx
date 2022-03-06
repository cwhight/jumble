import React from "react";
import {ButtonProps} from "react-bootstrap";

export interface LetterProps extends ButtonProps {
    isPlaying: boolean
    onClick?: any
    value: string
    used: boolean
    solution: boolean
    solved: boolean
}

export const Letter: React.FC<LetterProps> = (props: LetterProps) => {
    var {value, used, onClick, isPlaying, solution, solved} = props

    const click = () => {
        if (!used) {
            onClick()
        }
    }

    return <button onClick={click} className={`clickable p-2 mb-2 ${used ? "used" : ""} ${solution ? "newNum" : "smallNum"}`}>{ isPlaying || solved ? value : ""}</button>
}