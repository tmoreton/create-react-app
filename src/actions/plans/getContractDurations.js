import axios from 'axios'

export default function getContractDurations() {
  return function(dispatch) {
    axios.get(`${process.env.REACT_APP_GARCON_API}/offers/contract_durations`)
      .then((response) => {
        dispatch({ type: 'GET_CONTRACT_DURATIONS', payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting contract durations.' })
        throw error
      })
  }
}
