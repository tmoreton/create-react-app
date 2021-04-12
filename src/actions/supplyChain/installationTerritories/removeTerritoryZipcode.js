import axios from 'axios'

export default function removeTerritoryZipcode(installationTerritoryId, zip) {
  return function(dispatch) {
    dispatch({ type: 'LOADING_INSTALLER_TERRITORIES', loading: true })

    axios.delete(`${process.env.REACT_APP_GARCON_API}/scheduling/territories/${installationTerritoryId}/zipcodes/${zip}`)
      .then(response => {
        dispatch({ type: 'UPDATE_INSTALLATION_TERRITORY', installationTerritory: response.data })
      })
      .catch(error => {
        dispatch({ type: 'LOADING_INSTALLER_TERRITORIES', loading: false })
        dispatch({ type: 'SHOW_ERROR', payload: { message: error.response.data.error, headline: `Failed to remove zip: ${zip}` } })
      })
  }
}
