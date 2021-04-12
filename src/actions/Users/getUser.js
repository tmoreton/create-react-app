import axios from 'axios'

export function getUser(email) {
  return function(dispatch) {
    axios.get(`${process.env.REACT_APP_GARCON_API}/users?email=${email}`)
      .then((response) => {
        const payload = { loggedIn: true, email: response.data.email, sourceCode: response.data.source_code, userId: response.data.user_id, roles: response.data.roles, loading: false }
        dispatch({ type: 'GET_USER', payload })
      })
      .catch((error) => {
        throw error
      })
  }
}
