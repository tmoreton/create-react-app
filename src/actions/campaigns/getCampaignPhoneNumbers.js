import axios from 'axios'

export default function getCampaignPhoneNumbers() {
  return function(dispatch) {
    axios.get(`${process.env.REACT_APP_GARCON_API}/campaigns/phone_numbers`)
      .then((response) => {
        dispatch({ type: 'GET_CAMPAIGN_PHONE_NUMBERS', payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting phone numbers.' })
        throw error
      })
  }
}
