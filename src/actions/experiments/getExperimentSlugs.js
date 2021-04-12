import axios from 'axios'

export default function getExperimentSlugs() {
  return function(dispatch) {
    dispatch({ type: 'GETTING_EXPERIMENT_SLUGS', payload: true })
    axios.get(`${process.env.REACT_APP_GARCON_API}/experiments/slugs`)
      .then((response) => {
        dispatch({ type: 'GET_EXPERIMENT_SLUGS', payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting experiment slugs.' })
        throw error
      })
  }
}
