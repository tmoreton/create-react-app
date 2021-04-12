import axios from 'axios'
import snakeCaseKeysDeep from '../../utils/snakeCaseKeysDeep'
import camelCaseKeysDeep from '../../utils/camelCaseKeysDeep'

export function createCompRunSchedule(compRunSchedule, paymentRules){
  return function(dispatch){
    dispatch({ type: 'COMP_RUN_SCHEDULE_SAVING', payload: true })
    const payload = snakeCaseKeysDeep(compRunSchedule)
    axios.post(`${process.env.REACT_APP_GARCON_API}/compensation/schedules`, payload)
      .then((response) => {
        dispatch({ type: 'COMP_RUN_SCHEDULE_CREATED', payload: camelCaseKeysDeep(response.data) })
        dispatch(createCompRunSchedulePaymentRules(compRunSchedule.compRunScheduleCode, paymentRules))
      })
      .catch((error) => {
        dispatch({ type: 'COMP_SHOW_ERROR', payload: 'An error occured creating compRunSchedule.' })
        throw error
      })
  }
}

export function createCompRunSchedulePaymentRules(compRunScheduleCode, paymentRules){
  return function(dispatch){
    const payload = snakeCaseKeysDeep(paymentRules)
    axios.post(`${process.env.REACT_APP_GARCON_API}/compensation/schedules/${compRunScheduleCode}/comp_run_schedule_payment_rules`, payload)
      .then((response) => {
        dispatch({ type: 'COMP_RUN_SCHEDULE_PAYMENT_RULES_CREATED', payload: camelCaseKeysDeep(response.data) })
      })
      .catch((error) => {
        dispatch({ type: 'COMP_SHOW_ERROR', payload: 'An error occured creating compRunSchedulePaymentRules.' })
        throw error
      })
  }
}

