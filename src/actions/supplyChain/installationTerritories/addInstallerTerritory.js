import axios from 'axios'
import snakeCaseKeysDeep from '../../../utils/snakeCaseKeysDeep'

export default function addInstallerTerritory(params) {
  return function(dispatch) {
    dispatch({ type: 'LOADING_INSTALLER_TERRITORIES', loading: true })

    axios.post(`${process.env.REACT_APP_GARCON_API}/scheduling/territories/${params.installationTerritoryId}/installers/${params.vendorCode}`, snakeCaseKeysDeep(params))
      .then(response => {
        dispatch({ type: 'UPDATE_INSTALLATION_TERRITORY', installationTerritory: response.data })
      })
      .catch(error => {
        dispatch({ type: 'LOADING_INSTALLER_TERRITORIES', loading: false })
        dispatch({ type: 'SHOW_ERROR', payload: { message: error.response.data.error, headline: 'Failed to add installer' } })
      })
  }
}
