import React from "react";
import {ButtonProps} from "react-bootstrap";

export interface NumberProps extends ButtonProps {
    onClick?: any
    value: number
    used: boolean
}

export const Number: React.FC<NumberProps> = (props: NumberProps) => {
    var {value, used, onClick} = props

    const click = () => {
        if (!used) {
            onClick()
        }
    }

    return <button onClick={click} className={`btn clickable p-3 m-1 ${used ? "used" : ""}`}>{value}</button>
}