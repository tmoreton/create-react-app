import axios from 'axios'

export default function updateTerritory({ isActive, territoryName, installationTerritoryId, searchFilters }) {
  return function(dispatch) {
    dispatch({ type: 'LOADING_INSTALLER_TERRITORIES', loading: true })

    const body = {
      territory_name: territoryName,
      is_active: isActive,
    }

    axios.put(`${process.env.REACT_APP_GARCON_API}/scheduling/territories/${installationTerritoryId}`, body)
      .then(response => {
        dispatch({ type: 'UPDATE_INSTALLATION_TERRITORY', installationTerritory: response.data, filterActive: searchFilters.activeOnly })
      })
      .catch(error => {
        dispatch({ type: 'LOADING_INSTALLER_TERRITORIES', loading: false })
        dispatch({ type: 'SHOW_ERROR', payload: { message: error.response.data.error, headline: 'Failed to update territory' } })
      })
  }
}
