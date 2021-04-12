import React from 'react'
import CalendarShift from './CalendarShift'

export default function CalendarShifts({ calendar, handleShiftSelect, handleEditShiftTime, partnerView, showPartner, view }) {

  const dayBg = (day) => {
    if (!day.scheduled) {
      return 'bg-white text-muted'
    } else {
      return 'bg-white'
    }
  }

  const renderCalendars = () => {
    let week = []
    const weeks = []
    calendar.dates.forEach((date, i) => {
      let content
      if (!date.scheduled) {
        content = <div>{date.date}</div>
      } else {
        content = (
          <CalendarShift
            handleEditShiftTime={handleEditShiftTime}
            handleShiftSelect={handleShiftSelect}
            partnerView={partnerView}
            shifts={date.shifts}
            showPartner={showPartner}
            view={view}
          />
        )
      }

      week.push(
        <div
          key={`${view}-calendar-${i}`}
          className={'location-calendar-day col-lg px-0 d-inline-block mb-2 align-top h-100 text-center border ' + dayBg(date)}
        >
          {content}
        </div>
      )

      if ((i + 1) % 7 === 0) {
        weeks.push(
          <div key={`row-${i}`} className="row">
            {week}
          </div>
        )
        week = []
      }
    })
    return weeks
  }

  return (
    <div>
      {renderCalendars()}
    </div>
  )
}
