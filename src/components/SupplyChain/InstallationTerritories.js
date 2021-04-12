import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import orderBy from 'lodash/orderBy'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { changeModule } from '../../actions/changeModule'
import getInstallerTerritories from '../../actions/supplyChain/installationTerritories/getInstallerTerritories'
import getFilterOptions from '../../actions/supplyChain/installationTerritories/getFilterOptions'
import updateTerritory from '../../actions/supplyChain/installationTerritories/updateTerritory'
import deleteTerritory from '../../actions/supplyChain/installationTerritories/deleteTerritory'
import Loading from '../Shared/Loading'
import SectionSelect from '../Shared/SectionSelect'
import SectionInput from '../Shared/SectionInput'
import InstallationZipcodes from './InstallationZipcodes'
import InstallationInstallers from './InstallationInstallers'
import InstallationTerritoryName from './InstallationTerritoryName'
import history from '../../history'

class InstallationTerritories extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searched: false,
      searchFilters: {
        marketCodes: [],
        stateCodes: [],
        vendorCodes: [],
        zipCodes: [],
        activeOnly: true,
      },
    }
  }

  componentDidMount() {
    this.props.changeModule('Installation Territories')
    this.props.getFilterOptions()
  }

  getInstallerTerritories = () => {
    this.setState({ searched: true })
    const filters = {}

    Object.keys(this.state.searchFilters).forEach(field => {
      if (typeof this.state.searchFilters[field] === 'object') {
        filters[field] = this.state.searchFilters[field].map(option => option.value)
      } else {
        filters[field] = this.state.searchFilters[field]
      }
    })

    this.props.getInstallerTerritories(filters)
  }

  updateFilter = (value, fieldName) => {
    const state = { ...this.state }
    state.searchFilters[fieldName] = value
    this.setState(state)
  }

  updateTerritoryActive = (isActive, territory) => {
    const payload = {
      isActive,
      installationTerritoryId: territory.installation_territory_id,
      territoryName: territory.territory_name,
      searchFilters: this.state.searchFilters,
    }
    this.props.updateTerritory(payload)
  }

  addTerritory = () => {
    history.push('/installation_territories/add')
  }

  renderRows = () => {
    const orderedTerritories = orderBy(this.props.territories, ['is_active', 'territory_name'], ['desc', 'asc'])
    return orderedTerritories.map(territory => {
      return (
        <Fragment key={territory.territory_name}>
          <hr />
          <div className="row">
            <div className="col-1">
              <input
                checked={territory.is_active}
                type="checkbox"
                onChange={(event) => this.updateTerritoryActive(event.target.checked, territory)}
              />
            </div>
            <div className="col-2">
              <InstallationInstallers installationTerritory={territory} />
            </div>
            <div className="col-3">
              <InstallationTerritoryName installationTerritory={territory} />
            </div>
            <div className="col-5">
              <InstallationZipcodes installationTerritory={territory} />
            </div>
            <div className="col-1">
              <button className="btn btn-sm btn-danger" onClick={() => this.props.deleteTerritory(territory.installation_territory_id)}><FontAwesomeIcon icon={faTrash} /> Delete</button>
            </div>
          </div>
        </Fragment>
      )
    })
  }

  renderTable = () => {
    return (
      <Fragment>
        <div className="row">
          <div className="col-1"><b>Active?</b></div>
          <div className="col-2"><b>Vendors</b></div>
          <div className="col-3"><b>Territory</b></div>
          <div className="col-5"><b>Zipcodes</b></div>
          <div className="col-1">&nbsp;</div>
        </div>
        {this.renderRows()}
      </Fragment>
    )
  }

  render() {
    if (this.props.loading) return <Loading />
    const searchResultsCount = this.state.searched ? (
      <div className="col-12 d-flex justify-content-end">
        <small>{this.props.territories.length} results</small>
      </div>
    ) : null

    return (
      <div className="container-fluid">
        <div className="row">
          <h4 className="my-3">Installation Territories</h4>
        </div>
        <button className="btn btn-primary" onClick={this.addTerritory}><FontAwesomeIcon icon={faPlus} /> Create Territory</button>
        <br /><br />
        <div className="card mb-4">
          <div className="card-header">
            <strong>Filters</strong>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-6">
                <SectionSelect
                  multi
                  label="Markets"
                  labelKey="label"
                  options={this.props.filterOptions.markets}
                  value={this.state.searchFilters.marketCodes}
                  valueKey="value"
                  onChange={(value) => this.updateFilter(value, 'marketCodes') }
                />
                <SectionSelect
                  multi
                  label="Vendors"
                  labelKey="label"
                  options={this.props.filterOptions.vendors}
                  value={this.state.searchFilters.vendorCodes}
                  valueKey="value"
                  onChange={(value) => this.updateFilter(value, 'vendorCodes')}
                />
              </div>
              <div className="col-6">
                <SectionSelect
                  multi
                  label="States"
                  labelKey="label"
                  options={this.props.filterOptions.states}
                  value={this.state.searchFilters.stateCodes} valueKey="value"
                  onChange={(value) => this.updateFilter(value, 'stateCodes')}
                />
                <SectionSelect
                  multi
                  allowCreate={true}
                  label="Zips"
                  labelKey="label"
                  options={[]}
                  value={this.state.searchFilters.zipCodes}
                  valueKey="value"
                  onChange={(value) => this.updateFilter(value, 'zipCodes')}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <SectionInput
                  label="Active Only?"
                  type="checkbox"
                  value={this.state.searchFilters.activeOnly}
                  onChange={(event) => this.updateFilter(event.target.checked, 'activeOnly') }
                />
              </div>
              <div className="col-6 d-flex justify-content-end">
                <button className="btn btn-primary" onClick={this.getInstallerTerritories}>Search</button>
              </div>
              {searchResultsCount}
            </div>
          </div>
        </div>

        <div className="card mb-4">
          <div className="card-body">
            {this.renderTable()}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ installationTerritories }) {
  return {
    loading: installationTerritories.loading,
    territories: installationTerritories.territories,
    filterOptions: installationTerritories.filterOptions,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeModule, getInstallerTerritories, getFilterOptions, updateTerritory, deleteTerritory }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstallationTerritories)
