import axios from 'axios'
import mapKeys from 'lodash/mapKeys'
import weeksFilterParams from '../utils/weeksFilterParams'

export function publishCalendars(locationCodes, weeksFilter) {
  return function(dispatch) {
    axios.post(`${process.env.REACT_APP_GARCON_API}/locations/publish_shifts?${weeksFilterParams(weeksFilter)}`, {
      location_codes: locationCodes,
    })
      .then((response) => {
        const calendars = mapKeys(response.data, (value) => {
          return value.location.location_code
        })
        dispatch({ type: 'GET_LOCATIONS_CALENDARS', payload: calendars })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting publishing schedules.' })
        throw error
      })
  }
}
