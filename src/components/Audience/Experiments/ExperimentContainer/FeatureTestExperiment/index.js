import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Variation from './Variation'

class FeatureTestExperiment extends Component {

  control() {
    return this.props.experiment.control
  }

  variation() {
    return this.props.experiment.variations[0]
  }

  updateControl = (key, value) => {
    const variation = this.control()
    variation[key] = value
    this.props.onUpdateExperiment('control', variation)
  }

  updateVariation = (key, value) => {
    const variation = this.variation()
    variation[key] = value
    this.props.onUpdateExperiment('variations', [variation])
  }

  render() {
    return (
      <div className="card">
        <div className="card-header">
          <strong>Feature Test</strong>
        </div>
        <div className="card-body">
          <Variation
            control
            distributeEvenly={this.props.distributeEvenly}
            variation={this.control()}
            writeAccess={this.props.writeAccess}
            onUpdateVariation={this.updateControl}
          />
          <hr />
          <Variation
            distributeEvenly={this.props.distributeEvenly}
            variation={this.variation()}
            writeAccess={this.props.writeAccess}
            onUpdateVariation={this.updateVariation}
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    segments: state.segments,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FeatureTestExperiment)
