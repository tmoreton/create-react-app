import axios from 'axios'
import weeksFilterParams from '../../utils/weeksFilterParams'

export default function getSourceCalendarsByDay(sourceCode) {
  return function(dispatch, getState) {
    const weeksFilter = getState().weeksFilter
    dispatch({ type: 'LOADING_DAILY_CALENDARS', payload: true })
    dispatch({ type: 'SET_WEEKS_FILTER', payload: weeksFilter })
    axios.get(`${process.env.REACT_APP_GARCON_API}/users/sources/${sourceCode}/daily_calendars?${weeksFilterParams(weeksFilter)}`)
      .then((response) => {
        dispatch({ type: 'LOADING_DAILY_CALENDARS', payload: false })
        dispatch({ type: 'GET_DAILY_CALENDARS', payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: 'LOADING_LOCATIONS_CALENDARS', payload: false })
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting your daily schedules.' })
        throw error
      })
  }
}
