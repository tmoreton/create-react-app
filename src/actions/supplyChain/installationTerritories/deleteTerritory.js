import axios from 'axios'

export default function deleteTerritory(installationTerritoryId) {
  return function(dispatch) {
    dispatch({ type: 'LOADING_INSTALLER_TERRITORIES', loading: true })

    axios.delete(`${process.env.REACT_APP_GARCON_API}/scheduling/territories/${installationTerritoryId}`)
      .then(() => {
        dispatch({ type: 'REMOVE_INSTALLATION_TERRITORY', installationTerritoryId })
      })
      .catch(error => {
        dispatch({ type: 'LOADING_INSTALLER_TERRITORIES', loading: false })
        dispatch({ type: 'SHOW_ERROR', payload: { message: error.response.data.error, headline: 'Failed to remove territory' } })
      })
  }
}
