import axios from 'axios'

export default function createExperiment(experiment) {
  return function(dispatch) {
    delete experiment.experiment_id
    dispatch({ type: 'SAVING_EXPERIMENT', payload: true })
    axios.post(`${process.env.REACT_APP_GARCON_API}/experiments`, experiment)
      .then((response) => {
        dispatch({ type: 'GET_EXPERIMENT', payload: response.data })
        dispatch({ type: 'SAVING_EXPERIMENT', payload: false })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: { message: error.response.data.error } })
        throw error
      })
  }
}
