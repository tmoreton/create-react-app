import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeModule } from '../../actions/changeModule'
import SourcesContainer from './SourcesContainer'
import SourcesTable from './SourcesTable'

class Sources extends Component {
    
  componentDidMount() {
    this.props.changeModule('Sources')
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="col-md-11 mx-auto">
          <SourcesContainer />
          <hr className="my-5" />
          <SourcesTable />
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeModule }, dispatch)
}

export default connect(null, mapDispatchToProps)(Sources)
