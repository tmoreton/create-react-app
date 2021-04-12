import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getSalesAgentCalendar } from '../../actions/getSalesAgentCalendar'
import PartnerCalendarsBySalesAgent from '../Partners/PartnerCalendarsBySalesAgent'

class SalesAgentCalendar extends Component {

  componentDidMount() {
    const salesAgentId = this.props.match.params.salesAgentId
    this.props.getSalesAgentCalendar(salesAgentId)
  }

  render() {
    return <PartnerCalendarsBySalesAgent />
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getSalesAgentCalendar }, dispatch)
}

export default connect(null, mapDispatchToProps)(SalesAgentCalendar)
