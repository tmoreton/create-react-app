import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import getCorrespondenceTemplateHistories from '../../actions/correspondence/getCorrespondenceTemplateHistories'

class CorrespondenceTemplateHistories extends Component {
  componentDidMount() {
    this.props.getCorrespondenceTemplateHistories(this.props.correspondenceTemplate.correspondence_template_id)
  }

  formatDate(dateString) {
    const date = moment(dateString)
    return `${date.format('M/D/YY')} ${date.format('h:mm a')}`
  }

  render() {
    const historiesHtml = this.props.histories.map((history, index) => {
      const current = index === 0
      return (<a key={index} className="list-group-item" disabled={current} href={`${this.props.correspondenceTemplate.correspondence_template_id}/history/${history.correspondence_template_history_id}`}>
        <h5>
          <small className="float-left">{this.formatDate(history.created_at)}</small>
          <span className="badge badge-dark float-left ml-2 badge-pill">v{history.correspondence_template_history_id}</span>
          {current ? <span className="badge badge-info float-left ml-2 badge-pill">Current</span> : null }
          {history.reverted_to_history_id ? <span className="badge badge-warning float-left ml-2 badge-pill">Reverted from v{history.reverted_to_history_id}</span> : null}
          <span className="float-right">{history.user.email}</span>
        </h5>
      </a>)
    })

    return (<div className="list-group mt-3">
      {historiesHtml}
    </div>)
  }
}

function mapStateToProps({ correspondenceTemplates }) {
  return {
    correspondenceTemplate: correspondenceTemplates.currentCorrespondenceTemplate,
    histories: correspondenceTemplates.currentCorrespondenceTemplateHistories,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getCorrespondenceTemplateHistories }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CorrespondenceTemplateHistories)
