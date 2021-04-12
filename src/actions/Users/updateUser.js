import axios from 'axios'

export const getUserByID = (user_id) => {
  return async(dispatch) => {
    return axios.get(`${process.env.REACT_APP_GARCON_API}/users/${user_id}`)
      .then((response) => {
        dispatch({ type: 'GET_USER_BY_ID', payload: response.data })
        return response.data
      })
      .catch((error) => {
        throw error
      })
  }
}

export const updateUser = (input) => {
  return async(dispatch) => {
    try {
      const params = {
        email: input.email,
        source_code: input.source_code,
        first_name: input.first_name,
        last_name: input.last_name,
        is_active: input.is_active,
        slack_username: input.slack_username,
        roles: input.roles,
      }
      return await axios.put(`${process.env.REACT_APP_GARCON_API}/users/${input.user_id}`, params)
    } catch (error) {
      dispatch({ type: 'SHOW ERROR', payload: 'An error occured updating user.' })
      throw error
    }
  }
}
