import axios from 'axios'

export default () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_GARCON_API}/cases/list?filterObj={}&page=1&per_page=1000&show_new=true&show_triage=true&show_working=true&show_pending=true&show_cancelled=true&show_closed=true`)
      if (response.data){
        dispatch({ type: 'GET_CASES', payload: response.data.data })
      }
    } catch (error) {
      dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting cases.' })
      throw error
    }
  }
}
