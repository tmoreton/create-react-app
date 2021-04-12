import axios from 'axios'
import getCases from './getCases'

export default (case_guid, event_code, case_status_change_reason_code) => {
  return async (dispatch, getState) => {
    try {
      const user = getState().user
      const params = {
        user_id: user.userId,
        event_code,
        case_status_change_reason_code,
      }
      const response = await axios.post(`${process.env.REACT_APP_GARCON_API}/cases/${case_guid}/transition`, params)
      if (response){
        dispatch(getCases())
        dispatch({ type: 'GET_CASE', payload: response.data })
      }
    } catch (error) {
      dispatch({ type: 'SHOW_ERROR', payload: 'An error occured assigning case.' })
      throw error
    }
  }
}
