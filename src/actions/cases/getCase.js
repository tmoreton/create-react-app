import axios from 'axios'

export default (case_guid) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_GARCON_API}/cases/${case_guid}/view`)
      if (response.data){
        dispatch({ type: 'GET_CASE', payload: response.data })
      }
    } catch (error) {
      dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting cases.' })
      throw error
    }
  }
}
