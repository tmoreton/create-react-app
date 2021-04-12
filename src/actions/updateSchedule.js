import axios from 'axios'
import map from 'lodash/map'
import parseInt from 'lodash/parseInt'
import mapKeys from 'lodash/mapKeys'
import weeksFilterParams from '../utils/weeksFilterParams'

export function updateSchedule(schedule, weeksFilter) {
  return function(dispatch) {
    const days = map(Object.keys(schedule.selectedDays), parseInt)
    axios.put(`${process.env.REACT_APP_GARCON_API}/locations/location_schedule_configs/${schedule.locationScheduleConfigId}?${weeksFilterParams(weeksFilter)}`, {
      selected_days: days,
      start_dt: schedule.startDt,
      shift_hours: schedule.shiftHours,
    })
      .then((response) => {
        const calendar = { [response.data.calendar.location.location_code]: response.data.calendar }
        dispatch({ type: 'GET_LOCATIONS_CALENDARS', payload: calendar })

        const responseSchedule = response.data.schedule
        responseSchedule.shifts.map((shift, index) => {
          return shift._id = index
        })
        responseSchedule.shifts = mapKeys(responseSchedule.shifts, (value) => {
          return value._id
        })
        dispatch({ type: 'GET_LOCATION_SCHEDULE', payload: responseSchedule })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured updating schedule.' })
        throw error
      })
  }
}
