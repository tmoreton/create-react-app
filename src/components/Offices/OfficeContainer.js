import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createOffice } from '../../actions/createOffice'
import getSourceOffices from '../../actions/schedules/getSourceOffices'

class OfficeContainer extends Component {
  constructor() {
    super()
    this.defaultState = {
      office_code: '',
      source_code: '',
    }
    this.state = this.defaultState
  }

  selectSourceCode = (source) => {
    this.props.getSourceOffices(source)
    this.setState({ source_code: source })
  }

  handleSignup = async (e) => {
    e.preventDefault()
    if (this.validated()){
      const response = await this.props.createOffice(this.state)
      if (response.status === 200){
        this.setState(this.defaultState)
        this.setState({ message: 'Office Successfully Created!' })
      }
    } else {
      this.setState({ validated: false, message: '' })
    }
  }

  validated = () => {
    if (!this.state.office_code) {
      return false
    } else if (!this.state.source_code) {
      return false
    }
    return true
  }

  render() {
    return (
      <form>
        <h4 className="text-center">Create New Office</h4>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Office Name</label>
            <input required className="form-control" value={this.state.office_code} onChange={e => this.setState({ office_code: e.target.value })} />
            <div className="invalid-feedback">Required</div>
          </div>
          <div className="col-md-6 mb-3">
            <label>Source Code</label>
            <select required className="custom-select w-100" value={this.state.source_code} onChange={e => this.selectSourceCode(e.target.value)}>
              <option value="" />
              {Object.keys(this.props.sources).map(key =>
                <option key={key} value={this.props.sources[key].source_code}>{this.props.sources[key].source_code}</option>
              )}
            </select>
            <div className="invalid-feedback">Required</div>
          </div>
        </div>
        <button className="btn btn-primary btn-md btn-block mt-4" onClick={this.handleSignup}>Create</button>
        <div className="valid-feedback d-block text-center mt-2">
          {this.state.message}
        </div>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return {
    sources: state.sources.all,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createOffice, getSourceOffices }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OfficeContainer)
