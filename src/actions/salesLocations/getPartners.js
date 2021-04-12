import axios from 'axios'

export default () => {
  return async(dispatch) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_GARCON_API}/partners/all`)
      dispatch({ type: 'GET_PARTNERS', payload: response.data })
    } catch (error) {
      dispatch({ type: 'SHOW ERROR', payload: 'An error occured creating Location.' })
      throw error
    }
  }
}
