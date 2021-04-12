import axios from 'axios'

export default function getDispositions() {
  return function(dispatch){
    axios.get(`${process.env.REACT_APP_GARCON_API}/contacts/dispositions/all`)
      .then((response) => {
        dispatch({ type: 'GET_DISPOSITIONS', payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: { message: error.response.data.error, headline: 'Failed to get dispositions' } })
      })
  }
}
