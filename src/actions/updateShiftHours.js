import axios from 'axios'

export function updateTime(eventCode, shiftId, locationCode, newTime, agentId) {
  return function(dispatch) {
    axios.post(`${process.env.REACT_APP_GARCON_API}/locations/shifts/${shiftId}/event`,
      {
        'shift_event_code': eventCode,
        'start_dt': newTime,
        'duration': null,
        'agent_id': agentId,
        'location_code': locationCode,
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured updating hours.' })
        throw error
      })
  }
}
