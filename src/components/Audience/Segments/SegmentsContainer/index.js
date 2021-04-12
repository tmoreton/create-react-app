import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SEGMENTS } from '../../../../utils/roles'
import history from '../../../../history'
import getSegments from '../../../../actions/segments/getSegments'
import { changeModule } from '../../../../actions/changeModule'
import SegmentsContainerTabs from './SegmentsContainerTabs'
import ActiveSegments from './Tabs/ActiveSegments'

class SegmentsContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      tab: props.tab,
      showCreateSegment: false,
    }
  }

  componentDidMount() {
    this.props.changeModule('Segments')
    this.props.getSegments()
  }

  writeAccess() {
    return this.props.roles.some(role => SEGMENTS.WRITE.includes(role.name))
  }

  onChangeTab = (tab) => {
    history.push(`/segments/${tab}`)
    this.setState({ tab })
  }

  renderTab() {
    switch (this.state.tab) {
    case 'active':
      return <ActiveSegments segments={this.props.segments} writeAccess={this.writeAccess()} />
    default:
      return null
    }
  }

  render() {
    if (this.props.loading) return null
    return (
      <div className="container-fluid">
        <h4 className="my-3">Segments</h4>
        <SegmentsContainerTabs tab={this.state.tab} onChangeTab={this.onChangeTab} />
        {this.renderTab()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    segments: state.segments.info,
    roles: state.user.roles,
    loading: state.user.loading,
  }
}

const mapDispatchToProps = {
  changeModule,
  getSegments,
}

export default connect(mapStateToProps, mapDispatchToProps)(SegmentsContainer)
