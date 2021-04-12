import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import set from 'lodash/set'
import cloneDeep from 'lodash/cloneDeep'
import getCompRunScheduleBonusRules from '../../../actions/Compensation/Bonuses/getCompRunScheduleBonusRules'
import createCompRunScheduleBonusRule from '../../../actions/Compensation/Bonuses/createCompRunScheduleBonusRule'
import history from '../../../history'
import CompBonusDetailsForm from './CompBonusDetailsForm'

class CompBonusCreate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bonus: {
        comp_run_schedule_code: null,
        bonus_type_code: null,
        bonus_rule_desc: null,
        bonus_rule_start_dt: null,
        bonus_rule_end_dt: null,
        bonus_rules: { params: {} },
      },
    }
  }

  componentDidMount() {
    if (this.props.bonuses.length === 0) {
      this.props.getCompRunScheduleBonusRules(false)
    }
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.bonuses.length > 0) {
      const prevBonusCount = prevProps.bonuses.length
      const currentBonusCount = this.props.bonuses.length
      if (prevBonusCount !== currentBonusCount) {
        this.redirectToAllBonuses()
      }
    }
  }

  onUpdateField = (value, field,) => {
    const bonus = cloneDeep(this.state.bonus)
    set(bonus, field, value)
    this.setState({ bonus })
  }

  redirectToAllBonuses() {
    history.push('/compensation/bonuses')
  }

  createBonus = () => {
    this.props.createCompRunScheduleBonusRule(this.state.bonus)
  }

  render() {
    if (this.props.loading) {
      return <div>Loading...</div>
    }

    return (
      <Fragment>
        <h1>New Bonus</h1>
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-6">
                <CompBonusDetailsForm compRunScheduleBonusRule={this.state.bonus} readOnly={false} onUpdateField={this.onUpdateField} />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-6">
                <button className="btn btn-primary" onClick={this.redirectToAllBonuses}>Go back</button>
              </div>
              <div className="col-6 d-flex justify-content-end">
                <button className="btn btn-primary" onClick={this.createBonus}>Create Bonus</button>
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
  return bindActionCreators({ getCompRunScheduleBonusRules, createCompRunScheduleBonusRule }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompBonusCreate)
