import axios from 'axios'
import mapKeys from 'lodash/mapKeys'

export default function getCampaigns() {
  return function(dispatch) {
    dispatch({ type: 'GETTING_EXPERIMENTS', payload: true })
    axios.get(`${process.env.REACT_APP_GARCON_API}/experiments`)
      .then((response) => {
        const experiments = mapKeys(response.data, (experiment) => {
          return experiment.experiment_id
        })
        dispatch({ type: 'GET_EXPERIMENTS', payload: experiments })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting experiments.' })
        throw error
      })
  }
}
