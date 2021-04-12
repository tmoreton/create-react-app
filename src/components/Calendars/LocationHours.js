import React from 'react'

export default function LocationHours({ calendar }) {

  let totalAvailable = 0
  let totalAssigned = 0
  let totalStaffed = 0
  const sources = {}

  calendar.dates.forEach(date => {
    if (!date.scheduled) return
    date.shifts.forEach(shift => {
      totalAvailable += shift.shift_hours

      if (!shift.source) return
      const sourceCode = shift.source.source_code
      const source = sources[sourceCode] || { shiftHours: 0, staffedHours: 0, sourceName: shift.source.source_name, salesAgents: {} }
      sources[sourceCode] = source
      source.shiftHours = source.shiftHours += shift.shift_hours
      totalAssigned += shift.shift_hours

      shift.sales_agents.forEach(shiftAgent => {
        const salesAgentId = shiftAgent.sales_agent_id
        const agent = sources[sourceCode].salesAgents[salesAgentId] || { hours: 0, fullName: `${shiftAgent.first_name} ${shiftAgent.last_name}` }
        sources[sourceCode].salesAgents[salesAgentId] = agent
        agent.hours = agent.hours += shift.shift_hours
        source.staffedHours = source.staffedHours += shift.shift_hours
        totalStaffed += shift.shift_hours
      })
    })
  })

  return (
    <div className="row row-eq-height">
      <div className="col-12">
        <p>Total Available: {totalAvailable}</p>
        <p>Total Assigned: {totalAssigned}</p>
        <p>Total Staffed: {totalStaffed}</p>
      </div>
      {Object.keys(sources).map(sourceCode => (
        <div key={`hours-${sourceCode}`} className="col-xl-3 mb-2">
          <div className="border p-2 h-100">
            <h6><u>{sources[sourceCode].sourceName}</u></h6>
            {Object.keys(sources[sourceCode].salesAgents).map(agentId => (
              <div key={`hours-${sourceCode}-${agentId}`}>
                {sources[sourceCode].salesAgents[agentId].fullName}: {sources[sourceCode].salesAgents[agentId].hours}
              </div>
            ))}
            <div><strong>Total Shift Hours: {sources[sourceCode].shiftHours}</strong></div>
            <div><strong>Total Staffed Hours: {sources[sourceCode].staffedHours}</strong></div>
          </div>
        </div>
      ))}
    </div>
  )
}
