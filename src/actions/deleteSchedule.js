import axios from 'axios'
import mapKeys from 'lodash/mapKeys'
import weeksFilterParams from '../utils/weeksFilterParams'

export function deleteSchedule(locationSchedule, schedule, weeksFilter) {
  return function(dispatch) {
    dispatch({ type: 'LOADING_LOCATIONS_CALENDARS', payload: true })
    axios.delete(`${process.env.REACT_APP_GARCON_API}/locations/${locationSchedule.location_code}/location_schedule_configs/${schedule.location_schedule_config_id}?${weeksFilterParams(weeksFilter)}`)
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
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured deleting schedule.' })
        throw error
      })
  }
}
