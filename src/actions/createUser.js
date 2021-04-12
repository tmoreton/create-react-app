import axios from 'axios'

export const createUser = (input) => {
  return async(dispatch) => {
    try {
      const params = {
        'email': input.email,
        'agent_id': input.agent_id,
        'source_code': input.source_code,
        'office_code': input.office_code,
        'channel_code': input.channel_code,
        'first_name': input.first_name,
        'last_name': input.last_name,
        'phone': input.phone,
        'status': input.status,
        'vendor_code': input.vendor_code,
      }
      return await axios.post(`${process.env.REACT_APP_GARCON_API}/sales/app/users`, params)
    } catch (error) {
      dispatch({ type: 'SHOW_ERROR', payload: 'An error occured creating user.' })
      throw error
    }
  }
}
