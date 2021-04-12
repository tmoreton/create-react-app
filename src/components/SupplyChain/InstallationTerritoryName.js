import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import updateTerritory from '../../actions/supplyChain/installationTerritories/updateTerritory'

class InstallationTerritoryName extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      territoryName: this.props.installationTerritory.territory_name,
    }
  }

  toggleEditing = () => {
    this.setState({ editing: !this.state.editing })
  }

  updateTerritoryName = () => {
    const payload = {
      isActive: this.props.installationTerritory.is_active,
      installationTerritoryId: this.props.installationTerritory.installation_territory_id,
      territoryName: this.state.territoryName,
      searchFilters: { activeOnly: false },
    }
    this.props.updateTerritory(payload)
  }

  render() {
    if (this.state.editing) {
      return (
        <Fragment>
          <input className="form-control" type="text" value={this.state.territoryName} onChange={(event) => this.setState({ territoryName: event.target.value })} />
          <button className="btn btn-sm btn-warning" type="button" onClick={this.toggleEditing}>Cancel</button>
          <button className="btn btn-sm btn-primary" type="button" onClick={this.updateTerritoryName}>Update</button>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <i>{this.state.territoryName}</i>&nbsp;&nbsp;
          <FontAwesomeIcon icon={faEdit} onClick={this.toggleEditing} />
        </Fragment>
      )
    }
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateTerritory }, dispatch)
}

export default connect(
  null,
  mapDispatchToProps
)(InstallationTerritoryName)
