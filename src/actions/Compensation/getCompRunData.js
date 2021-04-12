import axios from 'axios'

export function getCompRunData(compRunId){
  return function(dispatch){
    axios.get(`${process.env.REACT_APP_GARCON_API}/compensation/runs/run/${compRunId}/data`)
      .then((response) => {
        dispatch({ type: 'COMP_RUN_DATA', payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: 'COMP_SHOW_ERROR', payload: 'An error occured getting getCompRunData' })
        throw error
      })
  }
}
