import axios from 'axios'

export default function addInstallationTerritory(params) {
  return function(dispatch) {
    dispatch({ type: 'LOADING_INSTALLER_TERRITORIES', loading: true })

    axios.post(`${process.env.REACT_APP_GARCON_API}/scheduling/territories/`, params)
      .then(response => {
        dispatch({ type: 'ADD_INSTALLATION_TERRITORY', installationTerritory: response.data })
      })
      .catch(error => {
        dispatch({ type: 'LOADING_INSTALLER_TERRITORIES', loading: false })
        dispatch({ type: 'SHOW_ERROR', payload: { message: error.response.data.error, headline: 'Failed to create territory' } })
      })
  }
}
