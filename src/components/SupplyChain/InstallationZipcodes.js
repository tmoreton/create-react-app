import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import uniq from 'lodash/uniq'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faClipboard } from '@fortawesome/free-solid-svg-icons'
import addTerritoryZipcode from '../../actions/supplyChain/installationTerritories/addTerritoryZipcode'
import removeTerritoryZipcode from '../../actions/supplyChain/installationTerritories/removeTerritoryZipcode'
import copyToClipboard from '../../utils/copyToClipboard'

class InstallationZipcodes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      changingZip: '',
      ignoreOverlappingZips: false,
      hideZips: true,
    }
  }

  componentDidUpdate = (prevProps) => {
    const prevZipCount = this.zipCount(prevProps.installationTerritory.zipcodes_by_market)
    const currZipCount = this.zipCount(this.props.installationTerritory.zipcodes_by_market)
    if (prevZipCount !== currZipCount) {
      this.setState({ editing: false, changingZip: '' })
    }
  }

  zipCount = (zipcodesByMarket) => {
    return zipcodesByMarket.reduce((count, market) => {
      return count += market.zipcodes.length
    }, 0)
  }

  toggleEditing = () => {
    const editing = !this.state.editing
    this.setState({ editing })
  }

  removeZip = () => {
    if (!this.state.changingZip) return

    this.props.removeTerritoryZipcode(this.props.installationTerritory.installation_territory_id, this.state.changingZip)
  }

  addZip = () => {
    if (!this.state.changingZip) return

    this.props.addTerritoryZipcode(this.props.installationTerritory.installation_territory_id, this.state.changingZip, this.state.ignoreOverlappingZips)
  }

  copyZipsToClipboard = () => {
    const zipsArray = this.props.installationTerritory.zipcodes_by_market.reduce((list, market) => {
      return [...list, ...market.zipcodes]
    }, [])

    const textToCopy = uniq(zipsArray).join(',')

    copyToClipboard(textToCopy)
  }

  toggleHideZips = () => {
    this.setState({ hideZips: !this.state.hideZips })
  }

  renderEditView = () => {
    if (!this.state.editing) return <button className="btn btn-primary btn-sm" onClick={this.toggleEditing}><FontAwesomeIcon icon={faEdit} /> Edit</button>

    return (
      <Fragment>
        <input className="form-control" placeholder="Zipcode to add or remove" type="text" value={this.state.changingZip} onChange={(event) => this.setState({ changingZip: event.target.value })} />
        <div className="form-check">
          <input checked={this.state.ignoreOverlappingZips} className="form-check-input" id="forceAddZip" type="checkbox" onChange={(event) => this.setState({ ignoreOverlappingZips: event.target.checked })} />
          <label className="form-check-label" htmlFor="forceAddZip">Ignore overlapping territories <small>(only applicable for adding new zips)</small></label>
        </div>
        <button className="btn btn-warning btn-sm" style={zipButtonStyle} onClick={this.toggleEditing}>Cancel</button>
        <button className="btn btn-dark btn-sm" disabled={!this.state.changingZip} style={zipButtonStyle} onClick={this.removeZip}>Remove</button>
        <button className="btn btn-primary btn-sm" disabled={!this.state.changingZip} onClick={this.addZip}>Add</button>
      </Fragment>
    )
  }

  render() {
    const list = this.props.installationTerritory.zipcodes_by_market.map((grouping, idx) => {
      const isLastRecord = idx === this.props.installationTerritory.zipcodes_by_market.length - 1
      const line = isLastRecord ? null : <hr />
      const zipcodes = grouping.zipcodes.map(zipcode => {
        return <div key={zipcode} style={zipStyle}>{zipcode}</div>
      })

      const zipView = this.state.hideZips ? (
        <Fragment>
          <b>{grouping.market_code}</b>: {zipcodes.length}
        </Fragment>
      ) : (
        <Fragment>
          <b>{grouping.market_code}</b>
          <div>
            {zipcodes}
            {line}
          </div>
        </Fragment>
      )

      return <div key={grouping.market_code}>{zipView}</div>
    })

    return (
      <Fragment>
        <button className="btn btn-light btn-sm" type="button" onClick={this.copyZipsToClipboard}><FontAwesomeIcon icon={faClipboard} /> Copy Zipcodes</button>
        <button className="btn btn-light btn-sm" type="button" onClick={this.toggleHideZips}>{this.state.hideZips ? 'Show Zips' : 'Hide Zips'}</button>
        {list}
        {this.renderEditView()}
      </Fragment>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addTerritoryZipcode, removeTerritoryZipcode }, dispatch)
}

export default connect(
  null,
  mapDispatchToProps
)(InstallationZipcodes)

const zipStyle = {
  display: 'inline-block',
  background: '#777',
  color: '#fff',
  padding: '5px',
  borderRadius: '5px',
  margin: '3px',
  fontSize: '85%',
}

const zipButtonStyle = {
  marginRight: '10px',
}
