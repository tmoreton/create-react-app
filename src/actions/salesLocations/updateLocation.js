/* global alert: false */
import axios from 'axios'

export default (input) => {
  return async(dispatch) => {
    try {
      const params = {
        'location_active': input.location_active,
        'location_code': input.location_code,
        'location_name': input.location_name,
        'location_desc': input.location_desc,
        'sales_location_type_code': input.sales_location_type_code,
        'channel_code': input.channel_code,
        'sourced_by_source_code': input.sourced_by_source_code,
        'channel_partner_code': input.channel_partner_code,
        'address': input.address,
        'city': input.city,
        'state_code': input.state_code,
        'zip_code': input.zip_code,
      }
      const response = await axios.post(`${process.env.REACT_APP_GARCON_API}/offers/locations`, params)
      if (response.status === 200){
        alert('Created Location')
        window.location.href = '/locations'
      }
    } catch (error) {
      dispatch({ type: 'SHOW ERROR', payload: 'An error occured creating Location.' })
      throw error
    }
  }
}
