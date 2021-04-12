import axios from 'axios'

export default function getCampaignSegments() {
  return function(dispatch) {
    dispatch({ type: 'GETTING_CAMPAIGN_SEGMENTS', payload: true })
    axios.get(`${process.env.REACT_APP_GARCON_API}/segments/campaign_segments`)
      .then((response) => {
        dispatch({ type: 'GET_CAMPAIGN_SEGMENTS', payload: response.data })
        dispatch({ type: 'GETTING_CAMPAIGN_SEGMENTS', payload: false })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting segments.' })
        dispatch({ type: 'GETTING_CAMPAIGN_SEGMENTS', payload: false })
        throw error
      })
  }
}
