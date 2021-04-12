import axios from 'axios'
import getCase from './getCase'

export default (case_guid, case_notes) => {
  return async (dispatch, getState) => {
    try {
      const user = getState().user
      const params = {
        note_user_id: user.userId,
        case_notes,
      }
      const response = await axios.post(`${process.env.REACT_APP_GARCON_API}/cases/${case_guid}/note`, params)
      if (response){
        dispatch(getCase(response.data.case_guid))
      }
    } catch (error) {
      dispatch({ type: 'SHOW_ERROR', payload: 'An error occured adding note.' })
      throw error
    }
  }
}
