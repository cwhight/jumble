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


    return         <div className="display" id="display">
          <span className="hint">
            {totals.total}
              {totals.operation}
              {totals.next}
          </span>
        <span className="total">
            {totals.next ?? totals.total ?? 0}
          </span>
    </div>
}