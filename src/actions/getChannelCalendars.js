import axios from 'axios'
import mapKeys from 'lodash/mapKeys'
import weeksFilterParams from '../utils/weeksFilterParams'

export function getChannelCalendars(channelCode, weeksFilter) {
  return function(dispatch) {
    dispatch({ type: 'LOADING_LOCATIONS_CALENDARS', payload: true })
    dispatch({ type: 'SET_WEEKS_FILTER', payload: weeksFilter })
    axios.get(`${process.env.REACT_APP_GARCON_API}/locations/channels/${channelCode}/calendars?${weeksFilterParams(weeksFilter)}`)
      .then((response) => {
        const calendars = mapKeys(response.data, (value) => {
          return value.location.location_code
        })
        dispatch({ type: 'GET_LOCATIONS_CALENDARS', payload: calendars })
        dispatch({ type: 'LOADING_LOCATIONS_CALENDARS', payload: false })
      })
      .catch((error) => {
        dispatch({ type: 'LOADING_LOCATIONS_CALENDARS', payload: false })
        dispatch({ type: 'SHOW_ERROR', payload: `An error occured getting ${channelCode} schedules.` })
        throw error
      })
  }
}
