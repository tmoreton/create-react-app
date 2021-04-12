import axios from 'axios'

export default function getEarlyCancellationFees() {
  return function(dispatch) {
    axios.get(`${process.env.REACT_APP_GARCON_API}/offers/early_cancellation_fees`)
      .then((response) => {
        dispatch({ type: 'GET_EARLY_CANCELLATION_FEES', payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting early cancellation fees.' })
        throw error
      })
  }
}
