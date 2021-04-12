import axios from 'axios'
import mapKeys from 'lodash/mapKeys'
import weeksFilterParams from '../utils/weeksFilterParams'

export function removePartner(locationSchedule, shift, weeksFilter) {
  return function(dispatch) {
    dispatch({ type: 'LOADING_LOCATIONS_CALENDARS', payload: true })
    axios.delete(`${process.env.REACT_APP_GARCON_API}/locations/${locationSchedule.location_code}/shifts/${shift.location_shift_id}?${weeksFilterParams(weeksFilter)}`)
      .then((response) => {
        const calendar = { [response.data.calendar.location.location_code]: response.data.calendar }
        dispatch({ type: 'GET_LOCATIONS_CALENDARS', payload: calendar })

        const schedule = response.data.schedule
        schedule.shifts.map((scheduleShift, index) => {
          return scheduleShift._id = index
        })
        schedule.shifts = mapKeys(schedule.shifts, (value) => {
          return value._id
        })
        dispatch({ type: 'GET_LOCATION_SCHEDULE', payload: schedule })

        dispatch({ type: 'LOADING_LOCATIONS_CALENDARS', payload: false })
      })
      .catch((error) => {
        dispatch({ type: 'LOADING_LOCATIONS_CALENDARS', payload: false })
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured deleting shift.' })
        throw error
      })
  }
}
