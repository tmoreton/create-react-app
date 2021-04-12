import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createChannelPartner } from '../../actions/channels/createChannelPartner'


class ChannelPartnersContainer extends Component {
  constructor() {
    super()
    this.defaultState = {
      channelPartnerCode: '',
      channelPartnerName: '',
    }
    this.state = this.defaultState
  }

  handleSignup = async (e) => {
    e.preventDefault()
    const response = await this.props.createChannelPartner(this.state)
    if (response.status === 200) {
      this.setState(this.defaultState)
      this.setState({ message: 'Channel Partner Successfully Created!' })
      setTimeout(() => window.location.reload(), 3000)
    }
  }

  render() {
    return (
      <div className="col-md-10 mx-auto">
        <form>
          <h4 className="text-center">Create New Channel Partner</h4>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Partner Name</label>
              <input required className="form-control" value={this.state.channelPartnerName} onChange={e => this.setState({ channelPartnerName: e.target.value })} />
              <div className="invalid-feedback">Required</div>
            </div>
            <div className="col-md-6 mb-3">
              <label>Partner Code</label>
              <input required className="form-control" value={this.state.channelPartnerCode} onChange={e => this.setState({ channelPartnerCode: e.target.value })} />
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
  return bindActionCreators({ createChannelPartner }, dispatch)
}

export default connect(null, mapDispatchToProps) (ChannelPartnersContainer)
