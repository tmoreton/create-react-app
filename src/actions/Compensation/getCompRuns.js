import axios from 'axios'

export function getCompRuns(compRunScheduleCode){
  return function(dispatch){
    axios.get(`${process.env.REACT_APP_GARCON_API}/compensation/runs?comp_run_schedule_code=${compRunScheduleCode}`)
      .then((response) => {
        dispatch({ type: 'COMP_RUNS', payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: 'COMP_SHOW_ERROR', payload: 'An error occured getting getCompRuns data.' })
        throw error
      })
  }
}
