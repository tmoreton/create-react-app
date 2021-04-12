import axios from 'axios'

export function getLocation(locationCode) {
  return function(dispatch) {
    axios.get(`${process.env.REACT_APP_GARCON_API}/locations/${locationCode}`)
      .then((response) => {
        dispatch({ type: 'GET_LOCATION', payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting location.' })
        throw error
      })
  }
}
