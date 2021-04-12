import axios from 'axios'

export default function deactivateCompRunScheduleBonusRule(compRunScheduleBonusRuleId) {
  return function(dispatch){
    axios.delete(`${process.env.REACT_APP_GARCON_API}/compensation/comp_run_schedule_bonus_rules/${compRunScheduleBonusRuleId}`)
      .then((response) => {
        dispatch({ type: 'UPDATE_COMP_RUN_SCHEDULE_BONUS_RULE', payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: { message: error.response.data.error, headline: 'Failed to deactivate comp bonus' } })
      })
  }
}
