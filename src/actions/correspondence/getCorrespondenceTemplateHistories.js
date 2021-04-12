import axios from 'axios'

export default function getCorrespondenceTemplate(correspondenceTemplateId) {
  return function(dispatch){
    dispatch({ type: 'LOADING_CORRESPONDENCE_TEMPLATES', loading: true })
    axios.get(`${process.env.REACT_APP_GARCON_API}/correspondence/correspondence_templates/${correspondenceTemplateId}/histories`)
      .then((response) => {
        dispatch({ type: 'GET_CORRESPONDENCE_TEMPLATE_HISTORIES', payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: { message: error.response.data.error, headline: 'Failed to get correspondence template histories' } })
      })
  }
}
