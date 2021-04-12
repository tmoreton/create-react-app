import axios from 'axios'
import getCase from './getCase'

export default (case_guid, userId) => {
  return async (dispatch, getState) => {
    try {
      const id = userId || getState().user.userId
      const response = await axios.post(`${process.env.REACT_APP_GARCON_API}/cases/${case_guid}/assignment`, { user_id: id })
      if (response){
        dispatch(getCase(case_guid))
      }
    } catch (error) {
      dispatch({ type: 'SHOW_ERROR', payload: 'An error occured assigning case.' })
      throw error
    }
  }
}
