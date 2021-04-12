import axios from 'axios'

export default function updateDisposition(disposition) {
  return function(dispatch){
    dispatch({ type: 'LOADING_DISPOSITIONS', loading: true })
    axios.put(`${process.env.REACT_APP_GARCON_API}/contacts/dispositions/${disposition.disposition_id}`, disposition)
      .then((response) => {
        dispatch({ type: 'UPDATE_DISPOSITION', payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: 'LOADING_DISPOSITIONS', loading: false })
        dispatch({ type: 'SHOW_ERROR', payload: { message: error.response.data.error, headline: 'Failed to update disposition' } })
      })
  }
}
