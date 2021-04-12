import axios from 'axios'

export function getSource(sourceCode) {
  return function(dispatch) {
    axios.get(`${process.env.REACT_APP_GARCON_API}/users/sources/${sourceCode}`)
      .then((response) => {
        dispatch({ type: 'GET_SOURCE', payload: response.data })
      })
      .catch((error) => {
        throw error
      })
  }
}
