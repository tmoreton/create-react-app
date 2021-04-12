import axios from 'axios'
import camelCaseKeysDeep from '../../utils/camelCaseKeysDeep'

export function getChannelPartners() {
  return function(dispatch) {
    axios.get(`${process.env.REACT_APP_GARCON_API}/partners/all`, {})
      .then((response) => {
        dispatch({ type: 'GET_CHANNEL_PARTNERS', payload: camelCaseKeysDeep(response.data) })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting channel partners.' })
        throw error
      })
  }
}
