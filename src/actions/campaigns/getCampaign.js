import axios from 'axios'
import formatCampaign from '../../utils/formatCampaign'

export default function getCampaign(campaignId) {
  return function(dispatch) {
    axios.get(`${process.env.REACT_APP_GARCON_API}/campaigns/campaign/${campaignId}`)
      .then((response) => {
        const campaign = formatCampaign(response.data)
        dispatch({ type: 'GET_CAMPAIGN', payload: campaign })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting campaigns.' })
        throw error
      })
  }
}
