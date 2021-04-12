import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import Quill from 'quill'
import quillBetterTable from 'quill-better-table'
import '../../stylesheets/correspondence-template.css'
import history from '../../history'
import getCorrespondenceTemplateHistoryWithDiff from '../../actions/correspondence/getCorrespondenceTemplateHistoryWithDiff'
import revertToCorrespondenceTemplate from '../../actions/correspondence/revertToCorrespondenceTemplate'

const quillConfig = {
  theme: 'snow',
  readOnly: true,
  modules: {
    toolbar: false,
    table: false,
    'better-table': {
      operationMenu: {
        color: {
          colors: ['green', 'red', 'yellow', 'blue', 'white'],
          text: 'Background Colors:',
        },
      },
    },
    keyboard: {
      bindings: quillBetterTable.keyboardBindings,
    },
  },
}

class CorrespondenceTemplateHistory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showDiff: false,
    }
  }

  componentDidMount() {
    this.props.getCorrespondenceTemplateHistoryWithDiff(this.props.match.params.correspondenceTemplateId, this.props.match.params.correspondenceTemplateHistoryId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.history.correspondence_template_history_id !== this.props.history.correspondence_template_history_id) {
      const quillInstance = new Quill('#history', quillConfig)
      // Only "dangerous" because of XSS which should not be a concern for this secured internal tool
      // https://quilljs.com/docs/modules/clipboard/#dangerouslypastehtml
      quillInstance.clipboard.dangerouslyPasteHTML(this.props.history.liquid_html)
    } else if (prevProps.correspondenceTemplate.updated_at !== this.props.correspondenceTemplate.updated_at) {
      // If version reverted, redirect to edit view
      history.push('/correspondence_templates/' + this.props.history.correspondence_template_id)
    }
  }

  formatDate(dateString) {
    const date = moment(dateString)
    return `${date.format('M/D/YY')} ${date.format('h:mm a')}`
  }

  toggleView = () => {
    this.setState({ showDiff: !this.state.showDiff })
  }

  revertToCorrespondenceTemplate = (publish) => {
    this.props.revertToCorrespondenceTemplate(this.props.history.correspondence_template_id, this.props.history.correspondence_template_history_id, publish)
  }

  publishHistory = () => {
    this.revertToCorrespondenceTemplate(true)
  }

  copyHistoryToPending = () => {
    this.revertToCorrespondenceTemplate(false)
  }

  render() {
    if (this.props.loading) {
      return <div>Loading...</div>
    }

    return (<Fragment>
      <a className="btn btn-outline-dark btn-sm mb-3" href={`/correspondence_templates/${this.props.match.params.correspondenceTemplateId}?tab=history`}>Back</a>
      <button className="btn btn-danger float-right" onClick={this.publishHistory}>Publish this version</button>
      <button className="btn btn-warning float-right mr-3" onClick={this.copyHistoryToPending}>Copy this version to pending document</button>
      <h4>
        <span className="badge badge-dark float-left mr-2 badge-pill">v{this.props.history.correspondence_template_history_id}</span>
        {this.formatDate(this.props.history.created_at)}
        <button className="btn btn-outline-secondary btn-sm ml-1" onClick={this.toggleView}>Toggle View</button>
        <span className="float-right">{this.props.history.user.email}</span>
      </h4>
      <div className="alert alert-danger"><h5>WARNING: Publishing this version will delete any pending changes. Copying this version will replace any pending changes.</h5></div>
      <div style={{ display: this.state.showDiff ? 'none' : 'block' }}>
        <div id="history" />
      </div>
      <div dangerouslySetInnerHTML={{ __html: this.props.diff.diff_html || 'No difference' }} style={{ display: this.state.showDiff ? 'block' : 'none' }} />
    </Fragment>)
  }
}



function mapStateToProps({ correspondenceTemplates }) {
  return {
    loading: correspondenceTemplates.loading,
    history: correspondenceTemplates.currentCorrespondenceTemplateHistory,
    diff: correspondenceTemplates.currentCorrespondenceTemplateHistoryDiff,
    correspondenceTemplate: correspondenceTemplates.currentCorrespondenceTemplate,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getCorrespondenceTemplateHistoryWithDiff, revertToCorrespondenceTemplate }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CorrespondenceTemplateHistory)
