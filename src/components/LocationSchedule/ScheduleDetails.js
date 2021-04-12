import React from 'react'
import { Link } from 'react-router-dom'
import ScheduleDescription from './ScheduleDescription'
import ShiftContainer from './ShiftContainer'
import Shift from './Shift'

export default function ScheduleDetails({ locationSchedule, assignedPartner, manageShifts }) {

  const scheduleDescription = locationSchedule.schedule_descs.map((desc, index) => (
    <ScheduleDescription key={index} description={desc} />
  ))

  return (
    <div>
      <div className="row">
        <div className="col-12">
          {scheduleDescription}
        </div>
      </div>
      <div className="row">
        {Object.keys(locationSchedule.shifts).map( shiftCode => (
          <div key={shiftCode} className="col-xl-3 text-center">
            <ShiftContainer>
              <Shift key={shiftCode} shift={locationSchedule.shifts[shiftCode]} />
              <span className="text-primary">{assignedPartner(locationSchedule.shifts[shiftCode])}</span>
            </ShiftContainer>
          </div>
        ))}
      </div>
      <div className="my-3">
        <button className="btn btn-primary" onClick={manageShifts}>
          Manage Shifts
        </button>
        <Link
          className="ml-2 btn btn-secondary"
          to={`/schedules/channels/retail/locations/${locationSchedule.location_code}/edit`}
        >
          Manage Schedules
        </Link>
      </div>
    </div>
  )
}
