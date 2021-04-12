import axios from 'axios'

export default function createCampaignExperiment(experiment) {
  return function(dispatch, getState) {

    const campaign = getState().campaign.info

    delete experiment.experiment_id

    campaign.campaign_experiments_attributes.push({
      ...experiment,
    })

    dispatch({ type: 'SAVING_EXPERIMENT', payload: true })
    axios.post(`${process.env.REACT_APP_GARCON_API}/campaigns/campaign`, campaign)
      .then((response) => {
        dispatch({ type: 'GET_CAMPAIGN', payload: response.data })
        dispatch({ type: 'SAVING_EXPERIMENT', payload: false })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: { message: error.response.data.error } })
        throw error
      })
  }
}
