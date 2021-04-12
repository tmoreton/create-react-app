import axios from 'axios'
import mapKeys from 'lodash/mapKeys'
import weeksFilterParams from '../utils/weeksFilterParams'

export function createShifts(locationSchedule, shifts, source_code, office_code, weeksFilter) {
  return function(dispatch) {
    dispatch({ type: 'LOADING_LOCATIONS_CALENDARS', payload: true })
    axios.post(`${process.env.REACT_APP_GARCON_API}/locations/${locationSchedule.location_code}/shifts?${weeksFilterParams(weeksFilter)}`, { shifts, source_code, office_code })
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
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured creating shifts.' })
        throw error
      })
  }
}
