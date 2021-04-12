import axios from 'axios'

export function searchAgent(search_string) {
  return function(dispatch) {
    axios.get(`${process.env.REACT_APP_GARCON_API}/sales/agent/search?query=${search_string}`)
      .then((response) => {
        dispatch({ type: 'GET_SALES_AGENTS', payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: 'An error occured getting sales agents.' })
        throw error
      })
  }
}
