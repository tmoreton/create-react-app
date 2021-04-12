import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { uploadTractList, getOrganizations, getListName, getOrganizationId, getTracts } from '../../../actions/territory'
import { changeModule } from '../../../actions/changeModule'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class ControlPanel extends Component {
  componentDidMount() {
    this.props.getOrganizations()
    this.props.changeModule('Territory')
  }

  render() {
    const loading = this.props.status === 'LOADING'
    return (
      <div className="control-panel">
        <h5>Create Tract Territory</h5>
        <div className="row pt-2 pb-3">
          <div className="col-md-12">
            <select defaultValue={''} style={{ width: '100%', height: 35 }} onChange={(event) => this.props.selectState(event.target.value)}>
              <option disabled value="">Pick State</option>
              <option value="pa">Pennsylvania</option>
              <option value="nj">New Jersey</option>
            </select>
          </div>
          <div className="col-md-12 pt-3">
            <select disabled={loading} style={{ width: '100%', height: 35 }} onChange={(event) => this.props.getOrganizationId(event.target.value)}>
              <option disabled hidden selected value="">Choose Organization</option>
              { this.props.organizations.map(value => <option key={value.id} value={value.id}>{value.data.name}</option>) }
            </select>
          </div>
          <div className="col-md-12 pt-3">
            <input
              className="form-control m-0"
              disabled={loading}
              placeholder="List Name"
              type="text"
              value={this.props.list_name}
              onChange={(event) => this.props.getListName(event.target.value)}
            />
          </div>
        </div>
        <p><FontAwesomeIcon icon="home" /> {this.props.count}</p>
        <button className={loading ? 'btn' : 'btn btn-primary'} disabled={loading} onClick={this.props.uploadTractList}>
          {loading ? 'Uploading List...' : 'Create List'}
        </button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    organizations: state.territory.organizations,
    status: state.territory.status,
    listId: state.territory.listId,
    listName: state.territory.listName,
    zipCodes: state.territory.zipCodes,
    organizationId: state.territory.organizationId,
    tracts: state.territory.tracts,
    count: state.territory.count,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeModule, uploadTractList, getOrganizations, getListName, getOrganizationId, getTracts }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel)
