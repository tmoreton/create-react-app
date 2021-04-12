import axios from 'axios'

export default function getExperiment(experimentId) {
  return function(dispatch) {
    axios.get(`${process.env.REACT_APP_GARCON_API}/experiments/${experimentId}`)
      .then((response) => {
        dispatch({ type: 'GET_EXPERIMENT', payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting experiment.' })
        throw error
      })
  }
}
