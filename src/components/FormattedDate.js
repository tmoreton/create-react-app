import React from 'react'

export default function FormattedDate({ date }) {

  const dateFormat = (newDate) => {
    return new Date(newDate).toLocaleDateString('en-US', { weekday: 'long', month: 'numeric', day: 'numeric' })
  }

  return (
    <span>
      {dateFormat(date)}
    </span>
  )
}
