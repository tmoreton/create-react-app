import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import history from '../../history'
import { getChannelPartners } from '../../actions/channels/getChannelPartners'
import { updateChannelPartner } from '../../actions/channels/updateChannelPartner'

class UpdateChannelPartner extends Component {
  constructor() {
    super()
    this.defaultState = {
      channelPartnerCode: '',
      channelPartnerName: '',
    }
    this.state = this.defaultState
  }

  componentDidMount = async () => {
    this.props.getChannelPartners()
    const data = await this.props.history.location.state.edit 
    this.setState(data)
  }

  handleUpdate = async (e) => {
    e.preventDefault()
    const response = await this.props.updateChannelPartner(this.state)
    if (response.status === 200) {
      this.setState(this.defaultState)
      this.setState({ message: 'Channel partner successfully updated!' })
      setTimeout(() => history.push('/channelpartners'), 3000)
    }
  }

  cancelUpdate = () => {
    history.push('/channelpartners')
  }

  render() {
    return (
      <div className="container-fluid col-md-10 mx-auto">
        <form>
          <h4 className="text-center">Update Channel Partner</h4>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Partner Name</label>
              <input required className="form-control" value={this.state.channelPartnerName} onChange={e => this.setState({ channelPartnerName: e.target.value })} />
              <div className="invalid-feedback">Required</div>
            </div>
            <div className="col-md-6 mb-3">
              <label>Partner Code</label>
              <input className="form-control" disabled={true} value={this.state.channelPartnerCode} onChange={e => this.setState({ channelPartnerCode: e.target.value })} />
              <div className="invalid-feedback">Required</div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <button className="btn btn-secondary btn-md btn-block mt-4" type="button" onClick={this.cancelUpdate}>Cancel Partner Update</button>
            </div>
            <div className="col-md-8">
              <button className="btn btn-block btn-primary btn-md mt-4" onClick={this.handleUpdate}>Update Partner</button>
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
    channelPartners: state.channelPartners,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getChannelPartners, updateChannelPartner }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps) (UpdateChannelPartner)
