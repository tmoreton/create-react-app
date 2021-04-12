import axios from 'axios'

export default function getCompAttributes(){
  return function(dispatch){
    axios.get(`${process.env.REACT_APP_GARCON_API}/compensation/attributes/`)
      .then((response) => {
        dispatch({ type: 'COMP_ATTRIBUTES', payload: response.data.attributes })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: { message: error.response.data.error, headline: 'Failed to get comp attributes' } })
      })
  }
}
