import axios from 'axios'

export function getSourceScheduleHistory(sourceCode) {
  return function(dispatch) {
    axios.get(`${process.env.REACT_APP_GARCON_API}/users/sources/${sourceCode}/schedule_history`)
      .then((response) => {
        dispatch({ type: 'GET_SOURCE_SCHEDULE_HISTORY', payload: response.data })
      })
      .catch((error) => {
        throw error
      })
  }
}
