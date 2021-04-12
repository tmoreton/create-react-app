import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { uploadZipList, getOrganizations, getListName, getZipCodes, getOrganizationId, getRevenueClassCode, getCampaignId } from '../../actions/territory'
import { changeModule } from '../../actions/changeModule'

class ZipCodeContainer extends Component {

  componentDidMount() {
    this.props.getOrganizations()
    this.props.changeModule('Territory')
  }

  render() {
    const loading = this.props.status === 'LOADING'
    return (
      <div className="container-fluid">
        <h5>Create Zip Code Territory</h5>
        <div className="row pt-3 pb-3">
          <div className="col-md-4">
            <label>Organization</label>
            <select disabled={loading} style={{ width: '100%', height: 35 }} onChange={(event) => this.props.getOrganizationId(event.target.value)}>
              <option disabled hidden selected value="">Choose Organization</option>
              { this.props.organizations.map(value => <option key={value.id} value={value.id}>{value.data.name}</option>) }
            </select>
          </div>
          <div className="col-md-4">
            <label>Campaign</label>
            <select disabled={loading} style={{ width: '100%', height: 35 }} onChange={(event) => this.props.getCampaignId(event.target.value)}>
              <option disabled hidden selected value="">Choose Campaign</option>
              { this.props.campaigns.map(value => <option key={value.id} value={value.id}>{value.data.name}</option>) }
            </select>
          </div>
          <div className="col-md-4">
            <label>List Name</label>
            <input
              className="form-control"
              disabled={loading}
              placeholder="Name Here"
              type="text"
              value={this.props.list_name}
              onChange={(event) => this.props.getListName(event.target.value)}
            />
          </div>
        </div>
        <div className="row pb-3">
          <div className="col-md-8 mb-3">
            <label>Zip Codes</label>
            <input
              className="form-control"
              disabled={loading}
              placeholder="Seperated by Commas"
              type="text"
              value={this.props.zipCodes}
              onChange={(event) => this.props.getZipCodes(event.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label>Type</label>
            <select style={{ width: '100%', height: 35 }} onChange={(event) => this.props.getRevenueClassCode(event.target.value)}>
              <option selected value="RESI">Residential</option>
              <option value="SMALL-COM">Commercial</option>
            </select>
          </div>
        </div>
        <button className={loading ? 'btn' : 'btn btn-primary'} disabled={loading} onClick={this.props.uploadZipList}>
          {loading ? 'Uploading List...' : 'Create List'}
        </button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    organizations: state.territory.organizations,
    status: state.territory.status,
    listId: state.territory.listId,
    listName: state.territory.listName,
    zipCodes: state.territory.zipCodes,
    organizationId: state.territory.organizationId,
    campaigns: state.territory.campaigns,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeModule, uploadZipList, getOrganizations, getListName, getZipCodes, getOrganizationId, getRevenueClassCode, getCampaignId }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ZipCodeContainer)
