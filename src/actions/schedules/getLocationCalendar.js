import axios from 'axios'
import weeksFilterParams from '../../utils/weeksFilterParams'

export default function getLocationCalendar(locationCode) {
  return function(dispatch, getState) {
    dispatch({ type: 'LOADING_LOCATIONS_CALENDARS', payload: true })
    const weeksFilter = getState().weeksFilter
    axios.get(`${process.env.REACT_APP_GARCON_API}/locations/${locationCode}/calendar?${weeksFilterParams(weeksFilter)}`)
      .then((response) => {
        dispatch({ type: 'GET_LOCATION_CALENDAR', payload: { [response.data.location.location_code]: response.data } })
        dispatch({ type: 'LOADING_LOCATIONS_CALENDARS', payload: false })
      })
      .catch((error) => {
        dispatch({ type: 'LOADING_LOCATIONS_CALENDARS', payload: false })
        dispatch({ type: 'SHOW_ERROR', payload: `An error occured getting ${locationCode} schedules.` })
        throw error
      })
  }
}
