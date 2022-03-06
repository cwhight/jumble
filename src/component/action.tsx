import React from "react";

export interface ActionProps {
    onClick: any
    method: string
}

export const Action: React.FC<ActionProps> = (props: ActionProps) => {
    const {method, onClick} = props

    return <button onClick={onClick} className={`btn w-100 clickable p-3 m-1`}>{method}</button>
}