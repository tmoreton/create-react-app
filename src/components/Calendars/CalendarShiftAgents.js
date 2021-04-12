import React from 'react'
import CalendarShiftAgent from './CalendarShiftAgent'

export default function CalendarShiftAgents({ salesAgents }) {

  return (
    <div>
      <div className="py-1">
        {salesAgents.map(salesAgent => (
          <CalendarShiftAgent
            key={salesAgent.sales_agent_id}
            salesAgent={salesAgent}
          />
        ))}
      </div>
    </div>
  )
}
