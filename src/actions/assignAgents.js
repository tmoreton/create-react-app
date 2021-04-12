import axios from 'axios'
import weeksFilterParams from '../utils/weeksFilterParams'

export function assignAgents(shift, agentIds, userId, weeksFilter, callback) {
  return function(dispatch) {
    dispatch({ type: 'LOADING_SOURCE_LOCATIONS_CALENDARS', payload: true })
    axios.post(`${process.env.REACT_APP_GARCON_API}/locations/shifts/${shift.location_shift_id}/sales_agents?${weeksFilterParams(weeksFilter)}`, {
      sales_agent_ids: agentIds,
      user_id: userId,
    })
      .then((response) => {
        const locationCalendar = { [response.data.location_calendar.location.location_code]: response.data.location_calendar }
        dispatch({ type: 'GET_SOURCE_LOCATIONS_CALENDARS', payload: locationCalendar })

        dispatch({ type: 'GET_DAILY_CALENDAR', payload: response.data.daily_calendar })
        dispatch({ type: 'LOADING_SOURCE_LOCATIONS_CALENDARS', payload: false })
        callback(true, 'Success!')
      })
      .catch((error) => {
        callback(false, 'Error assigning agents')
        dispatch({ type: 'LOADING_SOURCE_LOCATIONS_CALENDARS', payload: false })
        throw error
      })
  }
}
