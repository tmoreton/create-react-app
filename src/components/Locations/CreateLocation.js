import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getLocationTypes, getSalesLocation } from '../../actions/salesLocations/getSalesLocation'
import getPartners from '../../actions/salesLocations/getPartners'
import { getSources } from '../../actions/getSources'
import updateLocation from '../../actions/salesLocations/updateLocation'

class CreateLocation extends Component {
  constructor() {
    super()
    this.defaultState = {
      sales_location_code: null,
      sales_location_type_code: null,
      channel_code: null,
      sourced_by_source_code: 'INSPIRE',
      location_active: true,
      location_name: '',
      location_desc: '',
      address: '',
      city: '',
      state_code: '',
      zip_code: '',
    }
    this.state = this.defaultState
  }

  componentDidMount = async () => {
    if (this.props.history.location.state){
      const data = await this.props.getSalesLocation(this.props.history.location.state.edit.sales_location_code)
      this.setState(data)
    }
    this.props.getLocationTypes()
    this.props.getPartners()
    this.props.getSources()
  }

  create = () => {
    this.props.updateLocation(this.state)
  }

  render() {
    return (
      <div className="col-md-12 mx-auto text-center">
        <form>
          <h2 className="text-center">{ this.state.sales_location_code ? 'Update Location' : 'Create Location' }</h2>
          <div className="row">
            <div className="col-md-3 mb-3">
              <label>Location Type</label>
              <select required className="custom-select w-100" value={this.state.sales_location_type_code} onChange={e => this.setState({ sales_location_type_code: e.target.value })}>
                <option value="" />
                {Object.keys(this.props.types).map(key =>
                  <option key={key} value={this.props.types[key].sales_location_type_code}>{this.props.types[key].sales_location_type_code}</option>
                )}
              </select>
            </div>
            <div className="col-md-3 mb-3">
              <label>Channel</label>
              <select required className="custom-select w-100" value={this.state.channel_code} onChange={e => this.setState({ channel_code: e.target.value })}>
                <option value="" />
                <option value="EVENT">EVENT</option>
                <option value="RETAIL">RETAIL</option>
              </select>
            </div>
            <div className="col-md-3 mb-3">
              <label>Partners</label>
              <select required className="custom-select w-100" value={this.state.channel_partner_code} onChange={e => this.setState({ channel_partner_code: e.target.value })}>
                <option value="" />
                {Object.keys(this.props.partners).map(key =>
                  <option key={key} value={this.props.partners[key].channel_partner_code}>{this.props.partners[key].channel_partner_code}</option>
                )}
              </select>
            </div>
            <div className="col-md-3 mb-3">
              <label>Relationship Sourced By</label>
              <select required className="custom-select w-100" value={this.state.sourced_by_source_code} onChange={e => this.setState({ sourced_by_source_code: e.target.value })}>
                <option value="" />
                {Object.keys(this.props.sources).map(key =>
                  <option key={key} value={this.props.sources[key].source_code}>{this.props.sources[key].source_code}</option>
                )}
              </select>
            </div>
            <div className="col-md-4 mb-3">
              <label>Name</label>
              <input className="form-control" name="location_name" placeholder="Location Name" type="text" value={this.state.location_name} onChange={e => this.setState({ location_name: e.target.value })} />
              <div className="invalid-feedback">Required</div>
            </div>
            <div className="col-md-6 mb-3">
              <label>Description</label>
              <input className="form-control" name="location_desc" placeholder="Location Description" type="text" value={this.state.location_desc} onChange={e => this.setState({ location_desc: e.target.value })} />
              <div className="invalid-feedback">Required</div>
            </div>
            <div className="col-md-2 mb-3">
              <label>Status</label>
              <select className="form-control" name="location_active" placeholder="Status" type="text" value={this.state.location_active} onChange={e => this.setState({ location_active: e.target.value })}>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
            <div className="col-md-5 mb-3">
              <label>Address</label>
              <input className="form-control" name="address" placeholder="Address" type="text" value={this.state.address} onChange={e => this.setState({ address: e.target.value })} />
              <div className="invalid-feedback">Required</div>
            </div>
            <div className="col-md-3 mb-3">
              <label>City</label>
              <input className="form-control" name="city" placeholder="City" type="text" value={this.state.city} onChange={e => this.setState({ city: e.target.value })} />
              <div className="invalid-feedback">Required</div>
            </div>
            <div className="col-md-2 mb-3">
              <label>State</label>
              <select className="form-control" name="state_code" placeholder="State" type="text" value={this.state.state_code} onChange={e => this.setState({ state_code: e.target.value })}>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
              <div className="invalid-feedback">Required</div>
            </div>
            <div className="col-md-2 mb-3">
              <label>Zip Code</label>
              <input className="form-control" name="zip_code" placeholder="Zip" type="text" value={this.state.zip_code} onChange={e => this.setState({ zip_code: e.target.value })} />
              <div className="invalid-feedback">Required</div>
            </div>
          </div>
          <button className="btn btn-primary rounded m-3" type="button" onClick={this.create}>{ this.state.sales_location_code ? 'Update' : 'Create' }</button>
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
    types: state.locations.types,
    partners: state.locations.partners,
    sources: state.sources.all,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateLocation, getLocationTypes, getPartners, getSalesLocation, getSources }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateLocation)
