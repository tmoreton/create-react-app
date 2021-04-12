import axios from 'axios'

export function getShift(locationCode, shiftId) {
  return function(dispatch) {
    axios.get(`${process.env.REACT_APP_GARCON_API}/locations/${locationCode}/shifts/${shiftId}`)
      .then((response) => {
        dispatch({ type: 'GET_SHIFT', payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting shift.' })
        throw error
      })
  }
}
