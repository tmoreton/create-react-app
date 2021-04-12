import axios from 'axios'

export function getRoles() {
  return function(dispatch) {
    axios.get(`${process.env.REACT_APP_GARCON_API}/users/roles`)
      .then((response) => {
        dispatch({ type: 'GET_ROLES', payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured gettng roles.' })
        throw error
      })
  }
}

export const createUser = (input) => {
  return async(dispatch) => {
    try {
      const params = {
        email: input.email,
        external_id: input.email,
        source_code: input.source_code.value,
        first_name: input.first_name,
        last_name: input.last_name,
        slack_username: input.slack_username,
        is_active: input.is_active.value,
        roles: input.roles,
      }
      return await axios.post(`${process.env.REACT_APP_GARCON_API}/users`, params)
    } catch (error) {
      dispatch({ type: 'SHOW ERROR', payload: 'An error occured creating user.' })
      throw error
    }
  }
}

