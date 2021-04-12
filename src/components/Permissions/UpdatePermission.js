import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Select from 'react-select'
import { getSources } from '../../actions/getSources'
import { usStates } from '../../utils/usStates'
import getChannels from '../../actions/channels/getChannels'
import { getOffices } from '../../actions/getOffices'
import { updateSalesPermission } from '../../actions/permissions/updateSalesPermission'
import history from '../../history'
import { getVendorTPV } from '../../actions/getVendorTPV'

class UpdatePermission extends Component {
  constructor() {
    super()
    this.defaultState = {
      sales_permission_id: '',
      channel_codes: [],
      description: '',
      loa_required: false,
      office_codes: [],
      source_codes: [],
      state_codes: [],
      tpv_delay: false,
      partial_enrollment_enabled: false,
      vendor_tpv_type_ids: [],
      status: { value: true, label: 'Active' },
      active: true,
    }
    this.state = this.defaultState
  }

  componentDidMount = async () => {
    const data = await this.props.history.location.state.edit
    this.setState(data)
    this.setState({ status: { value: data.active, label: data.active ? 'Active' : 'Inactive' } })
    this.props.getSources()
    this.props.getChannels()
    this.props.getOffices()
    this.props.getVendorTPV()
  }

  handleUpdate = async (e) => {
    e.preventDefault()
    const response = await this.props.updateSalesPermission(this.state)
    if (response.status === 200) {
      this.setState(this.defaultState)
      this.setState({ message: 'Sales Permission successfully updated!' })
      history.push('/permissions')
    }
  }

  cancelUpdate = () => {
    history.push('/permissions')
  }

  render() {
    return (
      <div className="container-fluid">
        <form>
          <h4 className="text-center">Update Sales Permission</h4>
          <div className="row">
            <div className="col-md-8 mb-3">
              <label>Description</label>
              <input required className="form-control" value={this.state.description} onChange={e => this.setState({ description: e.target.value })} />
            </div>
            <div className="col-md-4 mb-3">
              <label>Status</label>
              <Select
                options={[
                  { value: true, label: 'Active' },
                  { value: false, label: 'Inactive' },
                ]}
                value={this.state.status}
                onChange={e => this.setState({ status: e, active: e.value })}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Source Code</label>
              <Select
                multi
                options={this.props.sources.map(source => ({
                  source_code: source.source_code, label: source.source_code, value: source.source_code,
                }))}
                value={this.state.source_codes}
                onChange={e => this.setState({ source_codes: e })}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label>Office Code</label>
              <Select
                multi
                options={this.props.offices.map(office => ({
                  office_code: office.office_code, label: office.office_code, value: office.office_code,
                }))}
                value={this.state.office_codes}
                onChange={e => this.setState({ office_codes: e })}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label>Channel Code</label>
              <Select
                multi
                options={this.props.channels.map(channel => ({
                  channel_code: channel.channel_code, label: channel.channel_code, value: channel.channel_code,
                }))}
                value={this.state.channel_codes}
                onChange={e => this.setState({ channel_codes: e })}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label>State</label>
              <Select
                multi
                options={usStates.map(state => ({
                  state_code: state.abbreviation, label: state.abbreviation, value: state.abbreviation,
                }))}
                value={this.state.state_codes}
                onChange={e => this.setState({ state_codes: e })}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label>Vendor TPV Type</label>
              <Select
                multi
                options={this.props.vendorTPV.map(tpv => ({
                  vendor_tpv_type_ids: tpv.vendor_tpv_type_id, label: tpv.vendor_type, value:tpv.vendor_tpv_type_id,
                }))}
                value={this.state.vendor_tpv_type_ids}
                onChange={e => this.setState({ vendor_tpv_type_ids: e })}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label>LOA Required?</label>
              <div className="form-check">
                <input checked={this.state.loa_required} className="form-check-input" label="Yes" type="checkbox" value={this.state.loa_required} onChange={(e) => this.setState({ loa_required: e.target.checked })} />
                <label className="form-check-label">Yes</label>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <label>TPV Delay?</label>
              <div className="form-check">
                <input checked={this.state.tpv_delay} className="form-check-input" label="Yes" type="checkbox" value={this.state.tpv_delay} onChange={(e) => this.setState({ tpv_delay: e.target.checked })} />
                <label className="form-check-label">Yes</label>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <label>Partial Enrollment Enabled</label>
              <div className="form-check">
                <input checked={this.state.partial_enrollment_enabled} className="form-check-input" label="Yes" type="checkbox" value={this.state.partial_enrollment_enabled} onChange={(e) => this.setState({ partial_enrollment_enabled: e.target.checked })} />
                <label className="form-check-label">Yes</label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <button className="btn btn-secondary btn-md btn-block mt-4" type="button" onClick={this.cancelUpdate}>Cancel Permission Update</button>
            </div>
            <div className="col-md-8">
              <button className="btn btn-primary btn-md btn-block mt-4" type="button" onClick={this.handleUpdate}>Update Sales Permission</button>
              <div className="valid-feedback d-block text-center mt-2">
                {this.state.message}
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    sources: state.sources.sources,
    offices: state.offices,
    channels: state.channels,
    vendorTPV: state.vendorTPV,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getSources, getChannels, getOffices, updateSalesPermission, getVendorTPV }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps) (UpdatePermission)
