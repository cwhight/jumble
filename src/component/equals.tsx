import React from "react";

export interface EqualsProps {
    onClick: any
}

export const Equals: React.FC<EqualsProps> = (props: EqualsProps) => {
    const {onClick} = props

    return <div  onClick={onClick}  className={`equals clickable p-3 m-1`}>=</div>
}