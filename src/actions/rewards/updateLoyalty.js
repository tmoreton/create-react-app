import axios from 'axios'
import history from '../../history'

export default function updateLoyaltyProgram(loyaltyProgramObj) {
  return function (dispatch) {
    axios.put(`${process.env.REACT_APP_GARCON_API}/loyalty_programs/${loyaltyProgramObj.loyalty_program_code}`, loyaltyProgramObj)
      .then(() => {
        history.push('/rewards')
      })
      .catch(() => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured updating loyalty program' })
      })
  }
}
