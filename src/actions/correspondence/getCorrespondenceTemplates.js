import axios from 'axios'

export default function getCorrespondenceTemplates() {
  return function(dispatch){
    axios.get(`${process.env.REACT_APP_GARCON_API}/correspondence/correspondence_templates`)
      .then((response) => {
        dispatch({ type: 'GET_CORRESPONDENCE_TEMPLATES', payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: { message: error.response.data.error, headline: 'Failed to get correspondence templates' } })
      })
  }
}
