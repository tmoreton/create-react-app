import axios from 'axios'

export default (case_guid, file) => {
  return (dispatch, getState) => {
    try {
      const user = getState().user
      const params = {
        user_id: user.userId,
        case_guid,
        file,
      }
      axios.post(`${process.env.REACT_APP_GARCON_API}/cases/${case_guid}/attach`, params)
    } catch (error) {
      dispatch({ type: 'SHOW_ERROR', payload: 'An error occured adding attachment.' })
      throw error
    }
  }
}
