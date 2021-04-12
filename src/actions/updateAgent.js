import axios from 'axios'
import { searchAgent } from './searchAgent'

export function updateAgent(agent_id, key, value) {
  return async(dispatch) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_GARCON_API}/sales/agent/${agent_id}`, { [key]: value })
      if (response){
        dispatch(searchAgent(agent_id))
      }
    } catch (error) {
      dispatch({ type: 'SHOW ERROR', payload: 'An error occured updating sales agent.' })
      throw error
    }
  }
}
