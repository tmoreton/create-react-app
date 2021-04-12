import axios from 'axios'
import snakeCaseKeysDeep from '../../../utils/snakeCaseKeysDeep'

export default function getInstallerTerritories(params) {
  return function(dispatch) {
    dispatch({ type: 'LOADING_INSTALLER_TERRITORIES', loading: true })

    axios.get(`${process.env.REACT_APP_GARCON_API}/scheduling/territories`, { params: snakeCaseKeysDeep(params) })
      .then(response => {
        dispatch({ type: 'GET_INSTALLER_TERRITORIES', territories: response.data })
      })
      .catch(error => {
        dispatch({ type: 'LOADING_INSTALLER_TERRITORIES', loading: false })
        dispatch({ type: 'SHOW_ERROR', payload: { message: error.response.data.error, headline: 'Failed to get installer territories' } })
      })
  }
}
