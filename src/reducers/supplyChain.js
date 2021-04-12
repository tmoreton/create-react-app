const initialState = {
  territories: [],
  loading: false,
  filterOptions: {
    vendors: [],
    markets: [],
    states: [],
  },
}
export function installationTerritories(state = initialState, action) {
  switch (action.type){
  case 'LOADING_INSTALLER_TERRITORIES':
    return { ...state, loading: action.loading }
  case 'GET_INSTALLER_TERRITORIES':
    return { ...state, territories: action.territories, loading: false }
  case 'GET_INSTALLER_TERRITORIES_FILTER_OPTIONS':
    return { ...state, filterOptions: action.filterOptions, loading: false }
  case 'UPDATE_INSTALLATION_TERRITORY':
    return { ...state, territories: updateInstallationTerritory(state.territories, action.installationTerritory, action.filterActive), loading: false }
  case 'REMOVE_INSTALLATION_TERRITORY':
    return { ...state, territories: removeInstallationTerritory(state.territories, action.installationTerritoryId), loading: false }
  case 'ADD_INSTALLATION_TERRITORY':
    return { ...state, territories: [...state.territories, action.installationTerritory], loading: false }
  default:
    return state
  }
}

function updateInstallationTerritory(territories, installationTerritory, filterActive) {
  if (!installationTerritory.is_active && filterActive) return removeInstallationTerritory(territories, installationTerritory.installation_territory_id)

  return territories.map(territory => {
    return territory.installation_territory_id === installationTerritory.installation_territory_id ? installationTerritory : territory
  })
}

function removeInstallationTerritory(territories, installationTerritoryId) {
  return territories.filter(territory => {
    return territory.installation_territory_id !== installationTerritoryId
  })
}
