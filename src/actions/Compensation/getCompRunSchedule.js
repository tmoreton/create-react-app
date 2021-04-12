import axios from 'axios'
import camelCaseKeysDeep from '../../utils/camelCaseKeysDeep'

export function getCompRunSchedule(compRunScheduleCode){
  return function(dispatch){
    axios.get(`${process.env.REACT_APP_GARCON_API}/compensation/schedules/${compRunScheduleCode}`)
      .then((response) => {
        const camelResponse = camelCaseKeysDeep(response.data)
        dispatch({ type: 'COMP_RUN_SCHEDULE', payload: camelResponse })
        dispatch(getCompRunSchedulePaymentRules(compRunScheduleCode))
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting getCompRunSchedule data.' })
        throw error
      })
  }
}

export function getCompRunSchedulePaymentRules(compRunScheduleCode){
  return function(dispatch){
    axios.get(`${process.env.REACT_APP_GARCON_API}/compensation/schedules/${compRunScheduleCode}/payment_rules`)
      .then((response) => {
        const camelResponse = camelCaseKeysDeep(response.data)
        dispatch({ type: 'COMP_RUN_SCHEDULE_PAYMENT_RULES', payload: camelResponse })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting getCompRunSchedule data.' })
        throw error
      })
  }
}
