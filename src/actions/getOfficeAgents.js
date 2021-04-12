import axios from 'axios'

export function getOfficeAgents(manager_user_id) {
  return function(dispatch) {
    axios.get(`${process.env.REACT_APP_GARCON_API}/sales/office/agents?manager_user_id=${manager_user_id}`)
      .then((response) => {
        const array = []
        for (var i = 0; i < response.data.length; i++) {
          array.push(response.data[i].agent_id)
        }
        dispatch({ type: 'GET_AGENTS', payload: array })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting sales agents.' })
        throw error
      })
  }
}
