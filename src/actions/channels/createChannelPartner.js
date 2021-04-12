import axios from 'axios'

export const createChannelPartner = (input) => {
  return async(dispatch) => {
    try {
      const params = {
        'channel_partner_code': input.channelPartnerCode,
        'channel_partner_name': input.channelPartnerName,
      }
      return await axios.post(`${process.env.REACT_APP_GARCON_API}/partners/partner/${input.channelPartnerCode}`, params)
    } catch (error) {
      dispatch({ type: 'SHOW ERROR', payload: 'An error occured creating source.' })
      throw error
    }
  }
}
