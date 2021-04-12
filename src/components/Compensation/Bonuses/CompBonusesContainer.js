import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { changeModule } from '../../../actions/changeModule'
import getCompRunScheduleBonusRules from '../../../actions/Compensation/Bonuses/getCompRunScheduleBonusRules'
import CompBonusesTable from './CompBonusesTable'
import NavTabs from '../../Shared/NavTabs'
import history from '../../../history'

const tabs = [
  {
    key: 'all',
    label: 'All',
  },
  {
    key: 'active',
    label: 'Active',
  },
]

class CompBonusesContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tab: 'active',
    }
  }

  componentDidMount() {
    this.props.changeModule('Bonuses')
    this.props.getCompRunScheduleBonusRules(true)
  }

  onChangeTab = (tab) => {
    this.setState({ tab })
    this.props.getCompRunScheduleBonusRules(tab === 'active')
  }

  onCreateBonus() {
    history.push('/compensation/bonuses/create')
  }

  onEditBonus(compRunScheduleBonusRule) {
    history.push(`/compensation/bonuses/${compRunScheduleBonusRule.comp_run_schedule_bonus_rule_id}`)
  }

  render() {
    if (this.props.loading) {
      return <div>Loading...</div>
    }

    return (
      <Fragment>
        <h1>Compensation Bonuses</h1>
        <div className="row">
          <div className="col-6">
            <NavTabs currentTab={this.state.tab} tabs={tabs} onChangeTab={this.onChangeTab} />
          </div>
          <div className="col-6 d-flex justify-content-end">
            <button className="btn btn-primary" onClick={this.onCreateBonus}><FontAwesomeIcon icon={faPlus} /> New Bonus</button>
          </div>
        </div>
        <br />
        <CompBonusesTable data={this.props.bonuses} onSelect={this.onEditBonus} />
      </Fragment>
    )
  }
}

function mapStateToProps({ compRunScheduleBonusRules }) {
  return {
    loading: compRunScheduleBonusRules.loading,
    bonuses: compRunScheduleBonusRules.bonuses,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeModule, getCompRunScheduleBonusRules }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompBonusesContainer)
