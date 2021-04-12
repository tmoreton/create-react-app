import axios from 'axios'

export default function updateCorrespondenceTemplate({ correspondenceTemplateId, html, publish }) {
  return function(dispatch){
    dispatch({ type: 'SAVING_CORRESPONDENCE_TEMPLATE', saving: true })
    axios.put(`${process.env.REACT_APP_GARCON_API}/correspondence/correspondence_templates/${correspondenceTemplateId}`, { publish, html })
      .then((response) => {
        dispatch({ type: 'GET_CORRESPONDENCE_TEMPLATE', payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: { message: error.response.data.error, headline: 'Failed to update correspondence template' } })
        dispatch({ type: 'SAVING_CORRESPONDENCE_TEMPLATE', saving: false })
      })
  }
}
