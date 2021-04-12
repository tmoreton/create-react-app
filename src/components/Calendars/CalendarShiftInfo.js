import React from 'react'
import CalendarShiftSource from './CalendarShiftSource'
import CalendarShiftAgents from './CalendarShiftAgents'

export default function CalendarShiftInfo({ location, shift, handleShiftSelect, partnerView, view }) {

  const shiftBg = (calendarShift) => {
    if (view === 'salesAgent') return
    if (calendarShift.sales_agents.length > 0) {
      return 'bg-success text-white'
    } else if (calendarShift.source) {
      return 'bg-warning text-white'
    } else {
      return 'bg-danger text-white'
    }
  }

  const hasAgentsAssigned = (calendarShift) => {
    return calendarShift.sales_agents.length > 0
  }

  let agents
  if (hasAgentsAssigned(shift)) {
    agents = <CalendarShiftAgents key={`shift-${shift.location_shift_id}-calendar-shift-agents`} salesAgents={shift.sales_agents} />
  } else if (partnerView) {
    agents = <div key={`shift-${shift.location_shift_id}-calendar-shift-agents`}>Assign Agents</div>
  }

  let source
  if (shift.source && partnerView) {
    source = ''
  } else if (shift.source) {
    source = <CalendarShiftSource key={`shift-${shift.location_shift_id}-${shift.source.source_code}`} shift={shift} />
  } else {
    source = <div key={`shift-${shift.location_shift_id}-assign-partner`}>Assign Source</div>
  }

  const renderInfo = () => {
    switch (view) {
    case 'day':
      return [agents]
    case 'location':
      return [source, agents]
    case 'salesAgent':
      return <div>{location.location_name}</div>
    default:
      return [source, agents]
    }
  }

  const onClick = view === 'salesAgent' ? null : () => handleShiftSelect(location, shift)

  return (
    <div>
      {shift.office_code && <div className="mb-2" style={{ fontSize: '10px', color: '#555' }}>{shift.office_code}</div>}
      <a key={shift.location_shift_id} className={'d-block ' + shiftBg(shift)} onClick={onClick}>
        {renderInfo()}
      </a>
    </div>
  )
}

CalendarShiftInfo.defaultProps = {
  partnerView: false,
}
