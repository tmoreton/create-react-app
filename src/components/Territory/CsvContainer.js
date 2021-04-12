import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { uploadCsvList, getListName, getZipCodes, getRevenueClassCode } from '../../actions/territory'
import { changeModule } from '../../actions/changeModule'

class ZipCodeContainer extends Component {

  componentDidMount() {
    this.props.changeModule('Territory')
  }

  render() {
    const loading = this.props.status === 'LOADING'
    return (
      <div className="container-fluid">
        <h5>Create CSV Territory</h5>
        <div className="row pb-3">
          <div className="col-md-3">
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
          <div className="col-md-6 mb-3">
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
          <div className="col-md-3">
            <label>Type</label>
            <select style={{ width: '100%', height: 35 }} onChange={(event) => this.props.getRevenueClassCode(event.target.value)}>
              <option selected value="RESI">Residential</option>
              <option value="SMALL-COM">Commercial</option>
            </select>
          </div>
        </div>
        <button className={loading ? 'btn' : 'btn btn-primary'} disabled={loading} onClick={this.props.uploadCsvList}>
          {loading ? 'Uploading List...' : 'Create CSV Download'}
        </button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    status: state.territory.status,
    listName: state.territory.listName,
    zipCodes: state.territory.zipCodes,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeModule, uploadCsvList, getListName, getZipCodes, getRevenueClassCode }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ZipCodeContainer)
