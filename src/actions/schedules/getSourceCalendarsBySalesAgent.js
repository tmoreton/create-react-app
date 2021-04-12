import axios from 'axios'
import mapKeys from 'lodash/mapKeys'
import weeksFilterParams from '../../utils/weeksFilterParams'

export default function getSourceCalendarsBySalesAgent(sourceCode) {
  return function(dispatch, getState) {
    const weeksFilter = getState().weeksFilter
    dispatch({ type: 'LOADING_SALES_AGENTS_CALENDARS', payload: true })
    dispatch({ type: 'SET_WEEKS_FILTER', payload: weeksFilter })
    axios.get(`${process.env.REACT_APP_GARCON_API}/users/sources/${sourceCode}/sales_agents_calendars?${weeksFilterParams(weeksFilter)}`)
      .then((response) => {
        const calendars = mapKeys(response.data, (value) => {
          return value.sales_agent.sales_agent_id
        })
        dispatch({ type: 'GET_SALES_AGENTS_CALENDARS', payload: calendars })
        dispatch({ type: 'LOADING_SALES_AGENTS_CALENDARS', payload: false })
      })
      .catch((error) => {
        dispatch({ type: 'LOADING_SALES_AGENTS_CALENDARS', payload: false })
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting your schedules by sales agent.' })
        throw error
      })
  }
}
