import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeModule } from '../../actions/changeModule'
import AgentContainer from './AgentContainer'
import SearchContainer from './SearchContainer'

class Agents extends Component {

  componentDidMount() {
    this.props.changeModule('Agents')
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="col-md-10 mx-auto">
          <AgentContainer />
          <hr className="my-5" />
          <SearchContainer />
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeModule }, dispatch)
}

export default connect(null, mapDispatchToProps)(Agents)
