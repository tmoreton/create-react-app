import axios from 'axios'
import weeksFilterParams from '../utils/weeksFilterParams'
import mapKeys from 'lodash/mapKeys'

export function editShift(shift, startDt, shiftHours) {
  return function(dispatch, getState) {
    const weeksFilter = getState().weeksFilter
    dispatch({ type: 'LOADING_SOURCE_LOCATIONS_CALENDARS', payload: true })
    dispatch({ type: 'LOADING_LOCATIONS_CALENDARS', payload: true })
    dispatch({ type: 'SAVING_SHIFT', payload: true })
    axios.put(`${process.env.REACT_APP_GARCON_API}/locations/${shift.location.location_code}/shifts/${shift.location_shift_id}?${weeksFilterParams(weeksFilter)}`, {
      start_dt: startDt.format(),
      shift_hours: parseInt(shiftHours, 10),
    })
      .then((response) => {
        const calendar = { [response.data.calendar.location.location_code]: response.data.calendar }
        dispatch({ type: 'GET_LOCATIONS_CALENDARS', payload: calendar })
        dispatch({ type: 'GET_SOURCE_LOCATIONS_CALENDARS', payload: calendar })
        dispatch({ type: 'LOADING_SOURCE_LOCATIONS_CALENDARS', payload: false })

        const schedule = response.data.schedule
        schedule.shifts.map((scheduleShift, index) => {
          return scheduleShift._id = index
        })
        schedule.shifts = mapKeys(schedule.shifts, (value) => {
          return value._id
        })
        dispatch({ type: 'GET_LOCATION_SCHEDULE', payload: schedule })

        dispatch({ type: 'LOADING_LOCATIONS_CALENDARS', payload: false })
        dispatch({ type: 'SAVING_SHIFT', payload: false })
      })
      .catch((error) => {
        dispatch({ type: 'SAVING_SHIFT', payload: false })
        dispatch({ type: 'LOADING_LOCATIONS_CALENDARS', payload: false })
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured editing shift.' })
        throw error
      })
  }
}
