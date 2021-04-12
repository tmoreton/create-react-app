import axios from 'axios'

export default function getCompBonusTypes() {
  return function(dispatch){
    axios.get(`${process.env.REACT_APP_GARCON_API}/compensation/comp_bonus_types`)
      .then((response) => {
        dispatch({ type: 'GET_COMP_BONUS_TYPES', payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: { message: error.response.data.error, headline: 'Failed to get comp bonus types' } })
      })
  }
}
