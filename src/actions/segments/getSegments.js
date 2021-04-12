import axios from 'axios'

export default function getSegments() {
  return function(dispatch) {
    dispatch({ type: 'GETTING_SEGMENTS', payload: true })
    axios.get(`${process.env.REACT_APP_GARCON_API}/segments`)
      .then((response) => {
        dispatch({ type: 'GET_SEGMENTS', payload: response.data })
        dispatch({ type: 'GETTING_SEGMENTS', payload: false })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting segments.' })
        dispatch({ type: 'GETTING_SEGMENTS', payload: false })
        throw error
      })
  }
}
