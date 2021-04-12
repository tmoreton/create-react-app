import React from 'react'
import CalendarDayLocation from './CalendarDayLocation'

export default function CalendarDay({ date, calendarDay, handleShiftSelect, sourceCode }) {

  return (
    <div className="my-4 p-4 w-100 border border-muted">
      <h4>{date}</h4>
      <div className="row">
        {Object.keys(calendarDay).map(locationShifts => (
          <div key={calendarDay[locationShifts].location.location_code} className="col-print-3 col-xl-3">
            <CalendarDayLocation
              handleShiftSelect={handleShiftSelect}
              location={calendarDay[locationShifts].location}
              shifts={calendarDay[locationShifts].shifts}
              sourceCode={sourceCode}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
