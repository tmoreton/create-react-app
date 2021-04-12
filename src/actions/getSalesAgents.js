import axios from 'axios'
import mapKeys from 'lodash/mapKeys'

export function getSalesAgents(sourceCode) {
  return function(dispatch) {
    axios.get(`${process.env.REACT_APP_GARCON_API}/users/sources/${sourceCode}/sales_agents`)
      .then((response) => {
        const salesAgents = mapKeys(response.data, salesAgent => {
          return salesAgent.sales_agent_id
        })
        dispatch({ type: 'GET_SALES_AGENTS', payload: salesAgents })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting sales agents.' })
        throw error
      })
  }
}
