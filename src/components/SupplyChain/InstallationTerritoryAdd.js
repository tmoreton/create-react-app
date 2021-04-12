import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import axios from 'axios'
import uniq from 'lodash/uniq'
import addInstallationTerritory from '../../actions/supplyChain/installationTerritories/addInstallationTerritory'
import SectionSelect from '../Shared/SectionSelect'
import SectionInput from '../Shared/SectionInput'
import history from '../../history'


class InstallationTerritoryAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      territoryName:'',
      vendorCode: null,
      coverageStart: null,
      coverageEnd: null,
      zipCodes: '',
      markets: [],
      ignoreOverlappingZips: false,
      zipError: '',
      gettingZips: false,
      submitting: false,
    }
  }

  componentDidMount() {
    // If never loaded vendors, abort
    if (!this.props.vendors || this.props.vendors.length === 0) {
      this.redirectToTerritories()
    }
  }

  componentDidUpdate = (prevProps) => {
    const prevTerritoryCount = prevProps.territories.length
    const territoryCount = this.props.territories.length
    if (prevTerritoryCount !== territoryCount) {
      this.redirectToTerritories()
    } else if (this.props.error && this.state.submitting) {
      this.setState({ submitting: false })
    }
  }

  redirectToTerritories = () => {
    history.push('/installation_territories')
  }

  addInstallationTerritory = () => {
    this.setState({ submitting: true })
    const zipCodes = this.zipCodesToArray()
    const params = {
      zipcodes: zipCodes,
      vendor_code: this.state.vendorCode,
      territory_name: this.state.territoryName,
      coverage_start: this.state.coverageStart,
      coverage_end: this.state.coverageEnd,
      ignore_overlapping_zips: this.state.ignoreOverlappingZips,
    }
    this.props.addInstallationTerritory(params)
  }

  zipCodesToArray = () => {
    if (!this.state.zipCodes) return []

    return this.state.zipCodes.replace(/ /g,'').split(',')
  }

  updateField = (value, fieldName) => {
    const state = { ...this.state }
    state[fieldName] = value
    this.setState(state)
  }

  getZipCodesForMarkets = () => {
    this.setState({ gettingZips: true })
    const marketCodes = this.state.markets.map(market => market.value)
    axios.get(`${process.env.REACT_APP_GARCON_API}/offers/market_geos/`, { params: { market_codes: marketCodes } })
      .then(response => {
        const zipCodes = uniq([...this.zipCodesToArray(), ...response.data.map(marketGeo => marketGeo.zip_code)]).join(', ')
        this.setState({ zipCodes, gettingZips: false })
      })
      .catch(error => {
        this.setState({ zipError: error.response.data.error, gettingZips: false })
      })
  }

  render() {
    return (
      <div className="card mb-4">
        <div className="card-header">
          <strong>Add Territory</strong>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-8">
              <div className="row">
                <div className="offset-4 col">
                  <small>Format: State Code_City Code_Vendor Code_# Created</small>
                </div>
              </div>
              <SectionInput label="Territory Name" placeholder="ex. AA_BBB_CCC_001" type="text" value={this.state.territoryName} onChange={(event) => this.updateField(event.target.value, 'territoryName')} />
              <SectionSelect
                label="Vendor"
                labelKey="label"
                options={this.props.vendors}
                required={false}
                value={this.state.vendorCode}
                valueKey="value"
                onChange={(event) => this.updateField(event.target.value, 'vendorCode') }
              />
              <SectionInput label="Coverage Start" required={false} type="date" value={this.state.coverageStart} onChange={(value) => this.updateField(value, 'coverageStart')} />
              <SectionInput label="Coverage End" required={false} type="date" value={this.state.coverageEnd} onChange={(value) => this.updateField(value, 'coverageEnd')} />
              <SectionSelect
                multi
                labelKey="label"
                options={this.props.markets}
                value={this.state.markets}
                valueKey="value"
                onChange={(value) => this.updateField(value, 'markets') }
              >{this.state.zipError}</SectionSelect>
              <div className="row">
                <div className="offset-4 col">
                  <button className="btn btn-sm btn-info" disabled={this.state.markets.length === 0 || this.state.gettingZips} onClick={this.getZipCodesForMarkets}>Autofill zipcodes</button>
                  {this.state.gettingZips ? 'Loading...' : ''}
                  <br /><br />
                </div>
              </div>
              <SectionInput label="Zipcodes" placeholder="Ex. 11111, 12345, 54321, ..." required={false} rows={10} type="textarea" value={this.state.zipCodes} onChange={(event) => this.updateField(event.target.value, 'zipCodes')} />
              <SectionInput label="Ignore overlapping territories" type="checkbox" value={this.state.ignoreOverlappingZips} onChange={(event) => this.updateField(event.target.checked, 'ignoreOverlappingZips')} />
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-6">
              <button className="btn btn-primary" disabled={this.state.submitting} onClick={this.redirectToTerritories}>Cancel</button>
            </div>
            <div className="col-6 d-flex justify-content-end">
              <button className="btn btn-primary" disabled={!this.state.territoryName || this.state.submitting} onClick={this.addInstallationTerritory}>Add Territory</button>
              {this.state.submitting ? 'Submitting...' : ''}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ installationTerritories, error }) {
  return {
    territories: installationTerritories.territories,
    vendors: installationTerritories.filterOptions.vendors,
    markets: installationTerritories.filterOptions.markets,
    error: error.show,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addInstallationTerritory }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstallationTerritoryAdd)
