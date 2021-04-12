import axios from 'axios'
import mapKeys from 'lodash/mapKeys'
import weeksFilterParams from '../utils/weeksFilterParams'

export function getLocationSchedule(locationCode, weeksFilter) {
  return function(dispatch) {
    axios.get(`${process.env.REACT_APP_GARCON_API}/locations/${locationCode}/schedules?${weeksFilterParams(weeksFilter)}`)
      .then((response) => {
        const schedule = response.data
        schedule.shifts.map((shift, index) => {
          return shift._id = index
        })
        schedule.shifts = mapKeys(schedule.shifts, (value) => {
          return value._id
        })
        dispatch({ type: 'GET_LOCATION_SCHEDULE', payload: schedule })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting location schedule.' })
        throw error
      })
  }
}
