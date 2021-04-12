import axios from 'axios'
import mapKeys from 'lodash/mapKeys'

export default function getSourceOffices(source) {
  return function(dispatch) {
    axios.get(`${process.env.REACT_APP_GARCON_API}/offers/sources/${source}/offices`)
      .then((response) => {
        const offices = mapKeys(response.data, office => {
          return office.office_code
        })
        dispatch({ type: 'GET_SOURCE_OFFICES', payload: offices })
      })
      .catch((error) => {
        throw error
      })
  }
}
