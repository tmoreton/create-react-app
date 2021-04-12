import axios from 'axios'

export default function getCampaigns() {
  return function(dispatch) {
    axios.get(`${process.env.REACT_APP_GARCON_API}/experiments/types`, {})
      .then((response) => {
        dispatch({ type: 'GET_EXPERIMENT_TYPES', payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting channel partners.' })
        throw error
      })
  }
}
