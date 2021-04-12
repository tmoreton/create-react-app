import axios from 'axios'

export default function revertToCorrespondenceTemplate(correspondenceTemplateId, correspondenceTemplateHistoryId, publish) {
  return function(dispatch){
    dispatch({ type: 'LOADING_CORRESPONDENCE_TEMPLATES', loading: true })
    axios.put(`${process.env.REACT_APP_GARCON_API}/correspondence/correspondence_templates/${correspondenceTemplateId}`, { correspondence_template_history_id: correspondenceTemplateHistoryId, publish })
      .then((response) => {
        dispatch({ type: 'GET_CORRESPONDENCE_TEMPLATE', payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: { message: error.response.data.error, headline: 'Failed to revert to history' } })
      })
  }
}
