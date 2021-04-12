import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeModule } from '../../actions/changeModule'
import ChannelPartnersContainer from './ChannelPartnersContainer'
import ChannelPartnersTable from './ChannelPartnersTable'

class ChannelPartners extends Component {

  componentDidMount() {
    this.props.changeModule('Channel Partners')
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="col-md-10 mx-auto">
          <ChannelPartnersContainer />
          <hr className="my-5" />
        </div>
        <div>
          <ChannelPartnersTable />
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeModule }, dispatch)
}

export default connect(null, mapDispatchToProps) (ChannelPartners)
