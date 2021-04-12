import axios from 'axios'

export default function getCampaignExperiment(experimentId) {
  return function(dispatch) {
    dispatch({ type: 'GETTING_CAMPAIGN_EXPERIMENT', payload: true })
    axios.get(`${process.env.REACT_APP_GARCON_API}/experiments/${experimentId}`)
      .then((response) => {
        dispatch({ type: 'GET_CAMPAIGN_EXPERIMENT', payload: response.data })
        dispatch({ type: 'SAVING_EXPERIMENT', payload: false })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: { message: error.response.data.error } })
        throw error
      })
  }
}
