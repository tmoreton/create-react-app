import axios from 'axios'

export default () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_GARCON_API}/users`)
      if (response){
        dispatch({ type: 'GET_ALL_USERS', payload: response.data })
      }
    } catch (error) {
      dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting users.' })
      throw error
    }
  }
}
