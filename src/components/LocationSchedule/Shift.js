import React from 'react'
import FormattedTime from '../FormattedTime'
import FormattedDate from '../FormattedDate'

export default function Shift({ shift }) {
  return (
    <div className="py-2 border border-muted text-center">
      <div>
        <FormattedDate date={shift.start_dt} />
      </div>
      <div>
        <FormattedTime date={shift.start_dt} /> - <FormattedTime date={shift.end_dt} />
      </div>
    </div>
  )
}
