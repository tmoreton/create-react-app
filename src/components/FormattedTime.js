import React from 'react'

export default function FormattedTime({ date }) {

  const timeFormat = (dateTime) => {
    return new Date(dateTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })
  }

  return (
    <span>
      {timeFormat(date)}
    </span>
  )
}
