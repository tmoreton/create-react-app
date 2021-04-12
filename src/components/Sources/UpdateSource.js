import React, { Component } from 'react'
import history from '../../history'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateSource } from '../../actions/sources/updateSource'
import { getSource } from '../../actions/getSource'

class UpdateSource extends Component {
  constructor() {
    super()
    this.defaultState = {
      source_code: '',
      source_name: '',
      source_short_code: '',
    }
    this.state = this.defaultState
  }

  componentDidMount = async () => {
    const data = await this.props.history.location.state.edit
    console.log(data)
    this.setState(data)
  }

  handleUpdate = async (e) => {
    e.preventDefault()
    console.log(this.state)
    const response = await this.props.updateSource(this.state)
    if (response.status === 200){
      this.setState(this.defaultState)
      this.setState({ message: 'Source Successfully Updated!' })
      setTimeout(() => history.push('/sources'), 3000)
    }
  }

  cancelUpdate = () => {
    history.push('/sources')
  }

  render() {
    return (
      <div className="container-fluid col-md-10 mx-auto">
        <form>
          <h4 className="text-center">Update Source</h4>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Source Name</label>
              <input required className="form-control" value={this.state.source_name} onChange={e => this.setState({ source_name: e.target.value })} />
              <div className="invalid-feedback">Required</div>
            </div>
            <div className="col-md-6 mb-3">
              <label>Source Code</label>
              <input className="form-control" disabled={true} value={this.state.source_code} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <button className="btn btn-secondary btn-md btn-block mt-4" type="button" onClick={this.cancelUpdate}>Cancel Source Update</button>
            </div>
            <div className="col-md-8">
              <button className="btn btn-block btn-primary btn-md mt-4" onClick={this.handleUpdate}>Update Source</button>
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
    sources: state.sources.all,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getSource, updateSource }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps) (UpdateSource)
