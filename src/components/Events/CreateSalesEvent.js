import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getSources } from '../../actions/getSources'
import { getOffices } from '../../actions/getOffices'
import Select from 'react-select'
import moment from 'moment'
import createSalesLocation from '../../actions/salesLocations/createSalesLocation'
import updateSalesLocation from '../../actions/salesLocations/updateSalesLocation'
import { getLocations } from '../../actions/getLocations'
import { getSalesLocation } from '../../actions/salesLocations/getSalesLocation'

class CreateSalesEvent extends Component {
  constructor() {
    super()
    this.defaultState = {
      sales_location_code: null,
      sources: [],
      offices: [],
      from_date: moment().format('YYYY-MM-DD'),
      to_date: '',
      workable_hours: 0,
      location_code: null,
    }
    this.state = this.defaultState
  }

  componentDidMount = async () => {
    if (this.props.history.location.state){
      const data = await this.props.getSalesLocation(this.props.history.location.state.edit.sales_location_code)
      this.setState(data)
    }
    this.props.getSources()
    this.props.getOffices()
    this.props.getLocations()
  }

  create = () => {
    if (this.state.sales_location_code){
      this.props.updateSalesLocation(this.state)
    } else {
      this.props.createSalesLocation(this.state)
    }
  }

  render() {
    return (
      <div className="col-md-12 mx-auto text-center">
        <form>
          <h2 className="text-center">{this.state.sales_location_code ? 'Update Sales Event' : 'Create Sales Event'}</h2>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label>Location</label>
              <select required className="custom-select w-100" value={this.state.location_code} onChange={e => this.setState({ location_code: e.target.value })}>
                <option value="" />
                {Object.keys(this.props.locations).map(key =>
                  <option key={key} value={this.props.locations[key].location_code}>{this.props.locations[key].location_name}</option>
                )}
              </select>
              <div className="invalid-feedback">Required</div>
            </div>
            <div className="col-md-4 mb-3">
              <label>Source Code</label>
              <Select
                multi
                options={this.props.sources.map(option => ({
                  source_code: option.source_code, label: option.source_code, value: option.source_code,
                }))}
                value={this.state.sources}
                onChange={e => this.setState({ sources: e })}
              />
              <div className="invalid-feedback">Required</div>
            </div>
            <div className="col-md-4 mb-3">
              <label>Office Code</label>
              <Select
                multi
                options={this.props.offices.map(option => ({
                  office_code: option.office_code, label: option.office_code, value: option.office_code,
                }))}
                value={this.state.offices}
                onChange={e => this.setState({ offices: e })}
              />
              <div className="invalid-feedback">Required</div>
            </div>
            <div className="col-md-4 mb-3">
              <label>Start Date</label>
              <input className="custom-select w-100" name="from_date" placeholder="Start Date" type="date" value={this.state.from_date} onChange={e => this.setState({ from_date: e.target.value })} />
              <div className="invalid-feedback">Required</div>
            </div>
            <div className="col-md-4 mb-3">
              <label>End Date</label>
              <input className="custom-select w-100" name="to_date" placeholder="Start Date" type="date" value={this.state.to_date} onChange={e => this.setState({ to_date: e.target.value })} />
              <div className="invalid-feedback">Required</div>
            </div>
            <div className="col-md-4 mb-3">
              <label>Workable Hours</label>
              <input className="form-control" name="hours" placeholder="workable_hours" type="number" value={this.state.workable_hours} onChange={e => this.setState({ workable_hours: e.target.value })} />
              <div className="invalid-feedback">Required</div>
            </div>
          </div>
          <button className="btn btn-primary rounded m-3" type="button" onClick={this.create}>{this.state.sales_location_code ? 'Update' : 'Create'}</button>
          <div className="valid-feedback d-block text-center mt-2">
            {this.state.message}
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    sources: state.locations.sources,
    allSources: state.sources.all,
    locations: state.locations.all,
    offices: state.offices,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getSources, getOffices, createSalesLocation, getLocations, updateSalesLocation, getSalesLocation }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateSalesEvent)
