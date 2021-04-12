import axios from 'axios'
import map from 'lodash/map'
import parseInt from 'lodash/parseInt'
import mapKeys from 'lodash/mapKeys'

export function bulkCreateSchedule(locationsToSchedule, schedule) {
  return function(dispatch) {
    dispatch({ type: 'LOADING_LOCATIONS_CALENDARS', payload: true })
    const days = map(Object.keys(schedule.selectedDays), parseInt)
    axios.post(`${process.env.REACT_APP_GARCON_API}/locations/schedules`, {
      locations: locationsToSchedule.map(location => location.location_code),
      schedule: {
        selected_days: days,
        start_dt: schedule.startDt,
        shift_hours: schedule.shiftHours,
      },
    })
      .then((response) => {
        const calendars = mapKeys(response.data, (value) => {
          return value.location.location_code
        })
        dispatch({ type: 'GET_LOCATIONS_CALENDARS', payload: calendars })
        dispatch({ type: 'LOADING_LOCATIONS_CALENDARS', payload: false })
      })
      .catch((error) => {
        dispatch({ type: 'LOADING_LOCATIONS_CALENDARS', payload: false })
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured creating schedules.' })
        throw error
      })
  }
}
