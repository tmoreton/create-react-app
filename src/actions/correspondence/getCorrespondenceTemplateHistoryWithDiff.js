import axios from 'axios'

export default function getCorrespondenceTemplateHistoryWithDiff(correspondenceTemplateId, correspondenceTemplateHistoryId) {
  return function(dispatch){
    dispatch({ type: 'LOADING_CORRESPONDENCE_TEMPLATES', loading: true })
    const historyPromise = axios.get(`${process.env.REACT_APP_GARCON_API}/correspondence/correspondence_templates/${correspondenceTemplateId}/histories/${correspondenceTemplateHistoryId}`)
    const diffPromise = axios.get(`${process.env.REACT_APP_GARCON_API}/correspondence/correspondence_templates/${correspondenceTemplateId}/histories/${correspondenceTemplateHistoryId}/diff`)
    Promise.all([historyPromise, diffPromise])
      .then((response) => {
        dispatch({ type: 'GET_CORRESPONDENCE_TEMPLATE_HISTORY', history: response[0].data, diff: response[1].data })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: { message: error.response.data.error, headline: 'Failed to get correspondence template history' } })
      })
  }
}



