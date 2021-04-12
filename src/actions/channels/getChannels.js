import axios from 'axios'

export default function getChannels() {
  return function(dispatch) {
    axios.get(`${process.env.REACT_APP_GARCON_API}/offers/channels/all`, {})
      .then((response) => {
        dispatch({ type: 'GET_CHANNELS', payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting channels.' })
        throw error
      })
  }
}
