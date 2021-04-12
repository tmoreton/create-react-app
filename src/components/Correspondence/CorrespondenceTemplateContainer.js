import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import qs from 'qs'
import moment from 'moment'
import CorrespondenceTemplateEditor from './CorrespondenceTemplateEditor'
import CorrespondenceTemplatePreview from './CorrespondenceTemplatePreview'
import CorrespondenceTemplateHistories from './CorrespondenceTemplateHistories'
import getEarlyCancellationFees from '../../actions/plans/getEarlyCancellationFees'
import getCorrespondenceTemplate from '../../actions/correspondence/getCorrespondenceTemplate'
import NavTabs from '../Shared/NavTabs'
import history from '../../history'
import '../../stylesheets/quill.snow.min.css'
import '../../stylesheets/quill-better-table.css'
import '../../stylesheets/correspondence-template.css'

const tabs = [
  {
    key: 'edit',
    label: 'Edit',
  },
  {
    key: 'preview',
    label: 'Preview',
  },
  {
    key: 'history',
    label: 'History',
  },
]

class CorrespondenceTemplateContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tab: 'edit',
      version: 'PUBLISHED',
    }
  }

  componentDidMount() {
    if (isEmpty(this.props.correspondenceTemplate)) {
      this.props.getCorrespondenceTemplate(this.props.match.params.correspondenceTemplateId)
    } else {
      this.initializeVersion()
    }
    if (isEmpty(this.props.earlyCancellationFees)) {
      this.props.getEarlyCancellationFees()
    }
    const tab = qs.parse(this.props.location.search.split('?')[1]).tab || 'edit'
    this.onChangeTab(tab)
  }

  componentDidUpdate = (prevProps) => {
    // On initial load, set current version depending if there are changes pending
    if (prevProps.correspondenceTemplate.updated_at !== this.props.correspondenceTemplate.updated_at) {
      this.initializeVersion()
    }
  }

  initializeVersion = () => {
    const version = this.hasPendingChanges() ? 'PENDING' : 'PUBLISHED'
    if (version !== this.state.version) {
      this.setState({ version })
    }
  }

  hasPendingChanges() {
    return !!this.props.correspondenceTemplate.pending_changes
  }

  onChangeTab = (tab) => {
    history.push({ search: '?tab=' + tab })
    this.setState({ tab })
  }

  onSetVersion = (version) => {
    this.setState({ version })
  }

  formatDate(dateString) {
    const date = moment(dateString)
    return `${date.format('M/D/YY')} ${date.format('h:mm a')}`
  }

  renderTab() {
    switch (this.state.tab) {
    case 'preview':
      return <CorrespondenceTemplatePreview version={this.state.version} />
    case 'history':
      return <CorrespondenceTemplateHistories />
    default:
      return <CorrespondenceTemplateEditor version={this.state.version} />
    }
  }

  renderLastUpdatedInfo() {
    if (this.hasPendingChanges()) {
      return <small>Last saved {this.formatDate(this.props.correspondenceTemplate.pending_changes_last_updated_at)} by {get(this.props.correspondenceTemplate, 'pending_changes_last_updated_by_user.email')}</small>
    } else {
      return <small>Last saved {this.formatDate(get(this.props.correspondenceTemplate, 'latest_history.created_at'))} by {get(this.props.correspondenceTemplate, 'latest_history.user.email')}</small>
    }
  }

  renderStatus() {
    if (this.hasPendingChanges()) {
      return <span className="badge badge-pill badge-warning float-right">PENDING CHANGES</span>
    } else {
      return <span className="badge badge-pill badge-success float-right">PUBLISHED</span>
    }
  }

  render() {
    if (isEmpty(this.props.correspondenceTemplate)) {
      return <div>Loading...</div>
    }

    return (<Fragment>
      <a className="btn btn-outline-dark btn-sm mb-1" href={'/correspondence_templates'}>Back</a>
      <br />
      <h3 className="mb-0">{this.props.correspondenceTemplate.description} {this.renderStatus()}</h3>
      <div className="float-right">
        {this.renderLastUpdatedInfo()}
      </div>
      <form className="form-inline mb-2">
        <div className="form-group float-left">
          <label>Version:&nbsp;</label>
          <select className="form-control form-control-sm" style={{ width: '160px' }} value={this.state.version} onChange={e => this.onSetVersion(e.target.value) }>
            <option value="PENDING">Pending (Editable)</option>
            <option value="PUBLISHED">Published (Read Only)</option>
          </select>
        </div>
      </form>
      <NavTabs currentTab={this.state.tab} tabs={tabs} onChangeTab={this.onChangeTab} />
      {this.renderTab()}
      <div className="editorContainer" style={{ display: this.state.tab === 'edit' ? 'block' : 'none' }}>
        <div id="editor" />
      </div>
    </Fragment>)
  }
}

function mapStateToProps({ planFeatures, correspondenceTemplates }) {
  return {
    earlyCancellationFees: planFeatures.earlyCancellationFees,
    correspondenceTemplate: correspondenceTemplates.currentCorrespondenceTemplate,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getEarlyCancellationFees, getCorrespondenceTemplate }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CorrespondenceTemplateContainer)
