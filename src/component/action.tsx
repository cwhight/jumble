import React from "react";

export interface ActionProps {
    onClick: any
    method: string
}

export const Action: React.FC<ActionProps> = (props: ActionProps) => {
    const {method, onClick} = props

    return <div onClick={onClick} className={`btn clickable p-3 m-1`}>{method}</div>
}