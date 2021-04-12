import axios from 'axios'

export function getCompRunSchedules(){
  return function(dispatch){
    axios.get(`${process.env.REACT_APP_GARCON_API}/compensation/schedules`)
      .then((response) => {
        dispatch({ type: 'COMP_RUN_SCHEDULES', payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: 'COMP_SHOW_ERROR', payload: 'An error occured getting getCompRunSchedules data.' })
        throw error
      })
  }
}
