import axios from 'axios'
import mapKeys from 'lodash/mapKeys'

export default function getCampaigns() {
  return function(dispatch) {
    axios.get(`${process.env.REACT_APP_GARCON_API}/campaigns`, {})
      .then((response) => {
        const campaigns = mapKeys(response.data, (campaign) => {
          return campaign.campaign_id
        })
        dispatch({ type: 'GET_CAMPAIGNS', payload: campaigns })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting campaigns.' })
        throw error
      })
  }
}
