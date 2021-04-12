import axios from 'axios'

export default function getCompRunScheduleBonusRules(activeOnly) {
  return function(dispatch){
    dispatch({ type: 'LOADING_COMP_RUN_SCHEDULE_BONUS_RULES', loading: true })

    axios.get(`${process.env.REACT_APP_GARCON_API}/compensation/comp_run_schedule_bonus_rules`, { params: { active_only: activeOnly } })
      .then((response) => {
        dispatch({ type: 'GET_COMP_RUN_SCHEDULE_BONUS_RULES', payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: 'LOADING_COMP_RUN_SCHEDULE_BONUS_RULES', loading: false })
        dispatch({ type: 'SHOW_ERROR', payload: { message: error.response.data.error, headline: 'Failed to get comp bonuses' } })
      })
  }
}
