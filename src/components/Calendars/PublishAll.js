import React, { Component } from 'react'
import { connect } from 'react-redux'

class PublishAll extends Component {

  render() {
    return (
      <a className="text-primary" onClick={() => this.props.handlePublishCalendars(this.props.filteredCalendars)}>
        <u>Publish All</u>
      </a>
    )
  }
}

function mapStateToProps(state) {
  return {
    filteredCalendars: state.locationsCalendars.filteredCalendars,
    weeks: state.weeksFilter,
  }
}

export default connect(mapStateToProps)(PublishAll)
