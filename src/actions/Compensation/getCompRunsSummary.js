import axios from 'axios'

export function getCompRunsSummary(){
  return function(dispatch){
    axios.get(`${process.env.REACT_APP_GARCON_API}/compensation/runs/summary`)
      .then((response) => {
        dispatch({ type: 'COMP_RUNS_SUMMARY', payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: 'COMP_SHOW_ERROR', payload: 'An error occured getting getCompRunsSummary data.' })
        throw error
      })
  }
}
