import axios from 'axios'

export const createOffice = (input) => {
  return async(dispatch) => {
    try {
      const params = {
        'source_code': input.source_code,
        'office_code': input.office_code,
      }
      return await axios.post(`${process.env.REACT_APP_GARCON_API}/sales/office`, params)
    } catch (error) {
      dispatch({ type: 'SHOW ERROR', payload: 'An error occured creating office.' })
      throw error
    }
  }
}
