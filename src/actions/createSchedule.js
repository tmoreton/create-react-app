import axios from 'axios'
import map from 'lodash/map'
import parseInt from 'lodash/parseInt'
import mapKeys from 'lodash/mapKeys'
import weeksFilterParams from '../utils/weeksFilterParams'

export function createSchedule(locationToSchedule, schedule, weeksFilter) {
  return function(dispatch) {
    dispatch({ type: 'LOADING_LOCATIONS_CALENDARS', payload: true })
    const days = map(Object.keys(schedule.selectedDays), parseInt)
    axios.post(`${process.env.REACT_APP_GARCON_API}/locations/${locationToSchedule.location_code}/schedules?${weeksFilterParams(weeksFilter)}`, {
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

        dispatch({ type: 'LOADING_LOCATIONS_CALENDARS', payload: false })
      })
      .catch((error) => {
        dispatch({ type: 'LOADING_LOCATIONS_CALENDARS', payload: false })
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured creating schedule.' })
        throw error
      })
  }
}
