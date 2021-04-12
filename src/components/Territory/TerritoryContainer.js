import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getOrganizations } from '../../actions/territory'
import { changeModule } from '../../actions/changeModule'
import ZipCodeContainer from './ZipCodeContainer'
import CsvContainer from './CsvContainer'

class TerritoryContainer extends Component {

  componentDidMount() {
    this.props.getOrganizations()
    this.props.changeModule('Territory')
  }

  render() {
    return (
      <div className="container-fluid">
        <ZipCodeContainer />
        <hr />
        <CsvContainer />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeModule, getOrganizations }, dispatch)
}

export default connect(null, mapDispatchToProps)(TerritoryContainer)
