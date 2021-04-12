import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import addInstallerTerritory from '../../actions/supplyChain/installationTerritories/addInstallerTerritory'
import SectionSelect from '../Shared/SectionSelect'
import SectionInput from '../Shared/SectionInput'
import history from '../../history'


class InstallationInstallerAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      vendorCode: null,
      coverageStart: null,
      coverageEnd: null,
    }
  }

  componentDidMount() {
    // If never loaded vendors, abort
    if (!this.props.vendors || this.props.vendors.length === 0) {
      this.redirectToTerritories()
    }
  }

  componentDidUpdate = (prevProps) => {
    const territoryIdx = this.installationTerritoryIdx()
    const prevInstallerCount = prevProps.territories[territoryIdx].installers.length
    const currInstallerCount = this.props.territories[territoryIdx].installers.length
    if (prevInstallerCount !== currInstallerCount) {
      this.redirectToTerritories()
    }
  }

  redirectToTerritories = () => {
    history.push('/installation_territories')
  }

  installationTerritoryId = () => {
    return parseInt(this.props.match.params.installationTerritoryId, 10)
  }

  installationTerritoryIdx = () => {
    return this.props.territories.findIndex(territory => {
      return territory.installation_territory_id === this.installationTerritoryId()
    })
  }

  addInstallerTerritory = () => {
    const params = { ...this.state, installationTerritoryId: this.installationTerritoryId() }
    this.props.addInstallerTerritory(params)
  }

  updateField = (value, fieldName) => {
    const state = { ...this.state }
    state[fieldName] = value
    this.setState(state)
  }

  render() {
    return (
      <div className="card mb-4">
        <div className="card-header">
          <strong>Add Vendor</strong>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-6">
              <SectionSelect
                label="Vendor"
                labelKey="label"
                options={this.props.vendors}
                value={this.state.vendorCode}
                valueKey="value"
                onChange={(event) => this.updateField(event.target.value, 'vendorCode') }
              />
              <SectionInput label="Coverage Start" required={false} type="date" value={this.state.coverageStart} onChange={(value) => this.updateField(value, 'coverageStart')} />
              <SectionInput label="Coverage End" required={false} type="date" value={this.state.coverageEnd} onChange={(value) => this.updateField(value, 'coverageEnd')} />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-6">
              <button className="btn btn-primary" onClick={this.redirectToTerritories}>Cancel</button>
            </div>
            <div className="col-6 d-flex justify-content-end">
              <button className="btn btn-primary" disabled={!this.state.vendorCode} onClick={this.addInstallerTerritory}>Add Vendor</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ installationTerritories }) {
  return {
    territories: installationTerritories.territories,
    vendors: installationTerritories.filterOptions.vendors,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addInstallerTerritory }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstallationInstallerAdd)
