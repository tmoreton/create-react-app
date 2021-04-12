import axios from 'axios'

export const updateSource = (input) => {
  return async(dispatch) => {
    try {
      const params = {
        'source_code': input.source_code,
        'source_name': input.source_name,
        'source_short_code': input.source_short_code,
      }
      return await axios.post(`${process.env.REACT_APP_GARCON_API}/offers/sources/source/${input.source_code}`, params)
    } catch (error) {
      dispatch({ type: 'SHOW ERROR', payload: 'An error occured updating source.' })
      throw error
    }
  }
}
