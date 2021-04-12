import axios from 'axios'

export default function (){
  return function(dispatch){
    axios.get(`${process.env.REACT_APP_GARCON_API}/compensation/comp_attribute_values/`)
      .then((response) => {
        dispatch({ type: 'COMP_ATTRIBUTE_VALUES', payload: response.data })
      })
      .catch((error) => {
        dispatch({ type: 'SHOW_ERROR', payload: { message: error.response.data.error, headline: 'Failed to get comp attributes' } })
      })
  }
}
