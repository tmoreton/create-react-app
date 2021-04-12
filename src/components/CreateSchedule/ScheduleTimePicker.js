import React from 'react'
import { TimePicker } from 'antd'
import moment from 'moment'

export default function ScheduleTimePicker({ handleStartTime, handleHours, startDt, shiftHours }) {

  let endTime
  let momentStartTime

  const timeFormat = (date) => {
    return new Date(date).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })
  }

  if (startDt && startDt._isAMomentObject) {
    const start = startDt.clone()
    endTime = start.add({ hours: shiftHours }).format('h:mm a')
    momentStartTime = startDt
  } else if (startDt && shiftHours > 0) {
    momentStartTime = moment(timeFormat(startDt), 'HH:mm a')
    const start = momentStartTime.clone()
    endTime = start.add({ hours: shiftHours }).format('h:mm a')
  }

  let scheduleDuration
  if (endTime && shiftHours > 0) {
    scheduleDuration = `${momentStartTime.format('h:mm a')} - ${endTime}`
  }

  const hours = [0, .5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12]

  return (
    <div className="row my-4">
      <div className="col-12 text-center">
        <h5>{scheduleDuration}</h5>
      </div>
      <div className="row col-12 d-flex align-items-center">
        <div className="col-1">
          From:
        </div>
        <div className="col-4">
          <TimePicker
            use12Hours
            className={'border rounded border-' + (startDt ? 'success' : 'danger')}
            format={'h:mm a'}
            minuteStep={15}
            value={momentStartTime}
            onChange={handleStartTime}
          />
        </div>
      </div>
      <div className="row col-12 d-flex align-items-center">
        <div className="col-1">
          Hours:
        </div>
        <div className="col-2">
          <select
            className={'custom-select border border-' + (shiftHours > 0 ? 'success' : 'danger')}
            defaultValue={shiftHours}
            onChange={handleHours}
          >
            {hours.map(num => <option key={num} value={num}>{num}</option>) }
          </select>
        </div>
      </div>
    </div>
  )
}
