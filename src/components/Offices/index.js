import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeModule } from '../../actions/changeModule'
import OfficeContainer from './OfficeContainer'
import OfficeTable from './OfficeTable'
import { getSources } from '../../actions/getSources'

class Offices extends Component {

  componentDidMount() {
    this.props.changeModule('Offices')
    this.props.getSources()
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="col-md-7 mx-auto">
          <OfficeContainer />
          <hr className="my-5" />
        </div>
        <div>
          <OfficeTable />
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeModule, getSources }, dispatch)
}

export default connect(null, mapDispatchToProps)(Offices)
