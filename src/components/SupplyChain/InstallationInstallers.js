import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons'
import removeInstallerTerritory from '../../actions/supplyChain/installationTerritories/removeInstallerTerritory'
import history from '../../history'

class InstallationInstallers extends Component {
  addInstaller = () => {
    history.push(`/installation_territories/${this.props.installationTerritory.installation_territory_id}/installers/add`)
  }

  formatDate = (date) => {
    return date ? moment(date).format('MM/DD/YYYY') : ''
  }

  installerCoverage = (installer) => {
    const start = this.formatDate(installer.coverage_start)
    const end = this.formatDate(installer.coverage_end)
    if (installer.coverage_start && !installer.coverage_end) return `(Starting ${start})`
    if (installer.coverage_end && !installer.coverage_start) return `(Until ${end})`
    if (installer.coverage_start && installer.coverage_end) return `(${start} - ${end})`
    return ''
  }

  renderInstallersList() {
    return this.props.installationTerritory.installers.map(installer => {
      const coverageRange = this.installerCoverage(installer)
      const coverage = coverageRange ? <div>{coverageRange}</div> : ''

      return (
        <div key={installer.installer_territory_id} style={installerStyle}>
          <div className="float-right" style={removeInstallerBtnStyle} onClick={() => this.props.removeInstallerTerritory(installer)}>
            &nbsp;<FontAwesomeIcon icon={faTimes} />
          </div>
          <b>{installer.vendor.vendor_name}</b>
          {coverage}
        </div>
      )
    })
  }

  render() {
    return (
      <Fragment>
        {this.renderInstallersList()}
        <button className="btn btn-primary btn-sm" onClick={this.addInstaller}><FontAwesomeIcon icon={faPlus} /></button>
      </Fragment>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeInstallerTerritory }, dispatch)
}

const installerStyle = {
  display: 'inline-block',
  background: '#777',
  color: '#fff',
  padding: '5px',
  borderRadius: '5px',
  margin: '3px',
  fontSize: '85%',
}

const removeInstallerBtnStyle = {
  background: '#777',
  color: '#fff',
}

export default connect(
  null,
  mapDispatchToProps
)(InstallationInstallers)
