import axios from 'axios'

export function getCompRun(compRunId){
  return function(dispatch){
    axios.get(`${process.env.REACT_APP_GARCON_API}/compensation/runs/run/${compRunId}`)
      .then((response) => {
        dispatch({ type: 'COMP_RUN', payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: 'COMP_SHOW_ERROR', payload: 'An error occured getting getCompRun data.' })
        throw error
      })
  }
}
