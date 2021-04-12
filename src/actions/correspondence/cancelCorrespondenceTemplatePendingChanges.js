import axios from 'axios'

export default function cancelCorrespondenceTemplatePendingChanges(correspondenceTemplateId) {
  return function(dispatch){
    dispatch({ type: 'LOADING_CORRESPONDENCE_TEMPLATES', loading: true })
    axios.delete(`${process.env.REACT_APP_GARCON_API}/correspondence/correspondence_templates/${correspondenceTemplateId}/pending_changes`)
      .then((response) => {
        dispatch({ type: 'GET_CORRESPONDENCE_TEMPLATE', payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: { message: error.response.data.error, headline: 'Failed to cancel pending changes for template' } })
      })
  }
}
