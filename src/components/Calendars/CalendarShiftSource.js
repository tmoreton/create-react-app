import React from 'react'

export default function CalendarShiftSource({ shift }) {
  return (
    <div className="m-0 py-1 text-white">
      <strong>{shift.source.source_name}</strong>
      <div style={{ fontSize: '10px' }}>{shift.office_code}</div>
    </div>
  )
}
