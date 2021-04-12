import React from 'react'
import FormattedTime from '../FormattedTime'

export default function ScheduleDescription({ description, selectButton }) {

  if (!description.friendly) return null

  return (
    <p>
      {selectButton} {description.friendly} from <FormattedTime date={description.start_dt} /> to <FormattedTime date={description.end_dt} />
    </p>
  )
}
