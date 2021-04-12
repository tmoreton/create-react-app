import axios from 'axios'

export default function saveExperiment() {
  return function(dispatch, getState) {
    const experiment = getState().experiment.info
    dispatch({ type: 'SAVING_EXPERIMENT', payload: true })
    axios.post(`${process.env.REACT_APP_GARCON_API}/experiments/${experiment.experiment_id}`, experiment)
      .then((response) => {
        dispatch({ type: 'GET_EXPERIMENT', payload: response.data })
        dispatch({ type: 'SAVING_EXPERIMENT', payload: false })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: { message: error.response.data.error } })
        dispatch({ type: 'SAVING_EXPERIMENT', payload: false })
        throw error
      })
  }
}
