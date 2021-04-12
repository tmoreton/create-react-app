import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import getCompRunScheduleBonusRules from '../../../actions/Compensation/Bonuses/getCompRunScheduleBonusRules'
import updateCompRunScheduleBonusRule from '../../../actions/Compensation/Bonuses/updateCompRunScheduleBonusRule'
import deactivateCompRunScheduleBonusRule from '../../../actions/Compensation/Bonuses/deactivateCompRunScheduleBonusRule'
import history from '../../../history'
import CompBonusDetailsForm from './CompBonusDetailsForm'

class CompBonus extends Component {
  componentDidMount() {
    if (this.props.bonuses.length === 0) {
      this.props.getCompRunScheduleBonusRules(false)
    }
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.bonuses.length > 0) {
      const bonusIdx = this.compRunScheduleBonusRuleIdx()
      const wasDeactivated = prevProps.bonuses[bonusIdx].is_active
      const isDeactivated = this.compRunScheduleBonusRule().is_active
      if (wasDeactivated !== isDeactivated) {
        this.redirectToAllBonuses()
      }
    }
  }

  compRunScheduleBonusRuleIdx = () => {
    return this.props.bonuses.findIndex(bonus => {
      return bonus.comp_run_schedule_bonus_rule_id === this.compRunScheduleBonusRuleId()
    })
  }

  compRunScheduleBonusRule() {
    return this.props.bonuses.find(bonus => {
      return bonus.comp_run_schedule_bonus_rule_id === this.compRunScheduleBonusRuleId()
    })
  }

  compRunScheduleBonusRuleId() {
    return parseInt(this.props.match.params.compRunScheduleBonusRuleId, 10)
  }

  redirectToAllBonuses() {
    history.push('/compensation/bonuses')
  }

  isDeactivatable() {
    return this.compRunScheduleBonusRule().is_active
  }

  deactivateBonus = () => {
    this.props.deactivateCompRunScheduleBonusRule(this.compRunScheduleBonusRuleId())
  }

  render() {
    if (this.props.loading) {
      return <div>Loading...</div>
    }

    const compRunScheduleBonusRule = this.compRunScheduleBonusRule()

    if (!compRunScheduleBonusRule) {
      return <div>Loading...</div>
    }

    return (
      <Fragment>
        <h1>{compRunScheduleBonusRule.bonus_rule_desc}</h1>
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-6">
                <CompBonusDetailsForm compRunScheduleBonusRule={this.compRunScheduleBonusRule()} readOnly={true} />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-6">
                <button className="btn btn-primary" onClick={this.redirectToAllBonuses}>Go back</button>
              </div>
              <div className="col-6 d-flex justify-content-end">
                <button className="btn btn-danger" disabled={!this.isDeactivatable()} onClick={this.deactivateBonus}>Deactivate Bonus</button>
              </div>
            </div>
          </div>
        </div>
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
  return bindActionCreators({ updateCompRunScheduleBonusRule, getCompRunScheduleBonusRules, deactivateCompRunScheduleBonusRule }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompBonus)
