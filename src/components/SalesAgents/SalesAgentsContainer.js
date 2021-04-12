import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeModule } from '../../actions/changeModule'
import SalesAgentsIndex from './SalesAgentsIndex'

class SalesAgentsContainer extends Component {

  componentDidMount() {
    this.props.changeModule('Sales Agents')
  }

  render() {
    return (
      <div className="container-fluid">
        <h4 className="my-2">
          Sales Agents
        </h4>
        <SalesAgentsIndex sourceCode={this.props.match.params.sourceCode} />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeModule }, dispatch)
}

export default connect(null, mapDispatchToProps)(SalesAgentsContainer)
