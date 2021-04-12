import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createSource } from '../../actions/sources/createSource'

class SourcesContainer extends Component {
  constructor() {
    super()
    this.defaultState = {
      source_code: '',
      source_name: '',
    }
    this.state = this.defaultState
  }

  handleSignup = async (e) => {
    e.preventDefault()
    const response = await this.props.createSource(this.state)
    if (response.status === 200){
      this.setState(this.defaultState)
      this.setState({ message: 'Source Successfully Created!' })
      setTimeout(() => window.location.reload(), 3000)
    }
  }

  render() {
    return (
      <div className="col-md-10 mx-auto">
        <form>
          <h4 className="text-center">Create New Source Code</h4>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Source Name</label>
              <input required className="form-control" value={this.state.source_name} onChange={e => this.setState({ source_name: e.target.value })} />
              <div className="invalid-feedback">Required</div>
            </div>
            <div className="col-md-6 mb-3">
              <label>Source Code</label>
              <input required className="form-control" value={this.state.source_code} onChange={e => this.setState({ source_code: e.target.value })} />
              <div className="invalid-feedback">Required</div>
            </div>
          </div>
          <div className="text-center">
            <button className="btn btn-block btn-primary btn-md mt-4" onClick={this.handleSignup}>Create</button>
          </div>
          <div className="valid-feedback d-block text-center mt-2">
            {this.state.message}
          </div>
        </form>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createSource }, dispatch)
}

export default connect(null, mapDispatchToProps) (SourcesContainer)
