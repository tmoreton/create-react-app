import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeModule } from '../../actions/changeModule'
import { getSources } from '../../actions/getSources'
import PartnersIndex from './PartnersIndex'

class PartnersContainer extends Component {

  componentDidMount() {
    this.props.changeModule('Retail & Event Partners')
    this.props.getSources()
  }

  render() {
    return (
      <div className="container-fluid">
        <h4 className="my-2">
          Retail & Event Partners
        </h4>
        <PartnersIndex />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getSources, changeModule }, dispatch)
}

export default connect(null, mapDispatchToProps)(PartnersContainer)
