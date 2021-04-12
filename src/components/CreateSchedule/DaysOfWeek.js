import React from 'react'

export default function DaysOfWeek({ selectDay, isSelected }) {
  const daysOfWeek = {
    0: { _id: 0, name: 'Sunday' },
    1: { _id: 1, name: 'Monday' },
    2: { _id: 2, name: 'Tuesday' },
    3: { _id: 3, name: 'Wednesday' },
    4: { _id: 4, name: 'Thursday' },
    5: { _id: 5, name: 'Friday' },
    6: { _id: 6, name: 'Saturday' },
  }

  const selectedClasses = dayIndex => {
    if (isSelected(daysOfWeek[dayIndex])) {
      return 'bg-success text-white'
    } else {
      return 'bg-white'
    }
  }

  return (
    <div className="my-4 text-center row justify-content-around">
      {Object.keys(daysOfWeek).map((dayIndex) => (
        <div key={dayIndex} className={'px-2 border rounded ' + selectedClasses(dayIndex)}>
          <input
            className="d-none"
            id={dayIndex}
            type="checkbox"
            onChange={() => selectDay(daysOfWeek[dayIndex])}
          />
          <label className="m-0" htmlFor={dayIndex}>
            <a>{daysOfWeek[dayIndex].name}</a>
          </label>
        </div>
      ))}
    </div>
  )
}
