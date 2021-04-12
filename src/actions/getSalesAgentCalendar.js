import axios from 'axios'
import weeksFilterParams from '../utils/weeksFilterParams'

export function getSalesAgentCalendar(salesAgentId) {
  return function(dispatch, getState) {
    dispatch({ type: 'LOADING_SALES_AGENTS_CALENDARS', payload: true })
    axios.get(`${process.env.REACT_APP_GARCON_API}/users/sales_agents/${salesAgentId}/calendar?${weeksFilterParams(getState().weeksFilter)}`)
      .then((response) => {
        const calendar = { [response.data.sales_agent.sales_agent_id]: response.data }
        dispatch({ type: 'GET_SALES_AGENTS_CALENDARS', payload: calendar })
        dispatch({ type: 'LOADING_SALES_AGENTS_CALENDARS', payload: false })
      })
      .catch((error) => {
        dispatch({ type: 'LOADING_SALES_AGENTS_CALENDARS', payload: false })
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting your schedule.' })
        throw error
      })
  }
}
