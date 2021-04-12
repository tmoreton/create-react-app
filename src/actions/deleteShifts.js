import axios from 'axios'
import forOwn from 'lodash/forOwn'
import mapKeys from 'lodash/mapKeys'

export function deleteShifts(locationSchedule, shiftsToDelete, weeksFilter) {
  return function(dispatch) {
    dispatch({ type: 'LOADING_LOCATIONS_CALENDARS', payload: true })
    const shifts = []
    forOwn(shiftsToDelete, (value) => shifts.push(value))
    axios.put(`${process.env.REACT_APP_GARCON_API}/locations/${locationSchedule.location_code}/shifts`, {
      start_dt: weeksFilter.startDt.format(),
      end_dt: weeksFilter.endDt.format(),
      shifts,
    })
      .then((response) => {
        const calendar = { [response.data.calendar.location.location_code]: response.data.calendar }
        dispatch({ type: 'GET_LOCATIONS_CALENDARS', payload: calendar })

        const schedule = response.data.schedule
        schedule.shifts.map((shift, index) => {
          return shift._id = index
        })
        schedule.shifts = mapKeys(schedule.shifts, (value) => {
          return value._id
        })
        dispatch({ type: 'GET_LOCATION_SCHEDULE', payload: schedule })

        dispatch({ type: 'LOADING_LOCATIONS_CALENDARS', payload: false })
      })
      .catch((error) => {
        dispatch({ type: 'LOADING_LOCATIONS_CALENDARS', payload: false })
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured deleting schedule.' })
        throw error
      })
  }
}
