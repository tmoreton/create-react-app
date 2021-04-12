import axios from 'axios'

export function getCompRules(compRunScheduleCode){
  return function(dispatch){
    axios.get(`${process.env.REACT_APP_GARCON_API}/compensation/schedules/${compRunScheduleCode}/rules`)
      .then((response) => {
        dispatch({ type: 'COMP_RULES', payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: 'COMP_SHOW_ERROR', payload: 'An error occured getting getCompRules data.' })
        throw error
      })
  }
}
