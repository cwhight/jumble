import React from "react";

interface totals {
    total: number
    next: any
    operation: any
}

export interface WorkingProps {
    totals: totals
}

export const Working: React.FC<WorkingProps> = (props: WorkingProps) => {
    const {totals} = props


    return <div className="display" id="display">
              <span className="mb-3 total">
                  {totals.total}
                  {totals.operation}
                  {totals.next}
              </span>
           </div>
}