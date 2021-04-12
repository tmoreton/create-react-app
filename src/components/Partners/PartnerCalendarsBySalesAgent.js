import React, { Component } from 'react'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import getSourceCalendarsBySalesAgent from '../../actions/schedules/getSourceCalendarsBySalesAgent'
import Calendar from '../Calendars/Calendar'

class PartnerCalendarsBySalesAgent extends Component {

  componentDidMount() {
    this.props.getSourceCalendarsBySalesAgent(this.props.sourceCode)
  }

  render() {

    if (this.props.loading) {
      return <div className="my-3">Loading...</div>
    } else if (!this.props.loading && isEmpty(this.props.calendars)) {
      return <div className="my-3">No shifts scheduled</div>
    }

    const calendars = Object.keys(this.props.calendars).map((id) => {
      const calendar = this.props.calendars[id]
      return (
        <Calendar
          key={id}
          collapsed
          calendar={calendar}
          handleLocationSelect={() => {}}
          handleShiftSelect={this.props.handleShiftSelect}
          partnerView={true}
          showPartner={true}
          sourceCode={this.props.sourceCode}
          title={`${calendar.sales_agent.first_name} ${calendar.sales_agent.last_name}`}
          view="salesAgent"
        />
      )
    })

    return (
      <div className="row">
        <div className="col-12">
          {calendars}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    calendars: state.salesAgentsCalendars.calendars,
    locations: state.locations.all,
    loading: state.salesAgentsCalendars.loading,
  }
}

const mapDispatchToProps = {
  getSourceCalendarsBySalesAgent,
}

export default connect(mapStateToProps, mapDispatchToProps)(PartnerCalendarsBySalesAgent)
