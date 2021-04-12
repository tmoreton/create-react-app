import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { changeModule } from '../actions/changeModule'

class ChooseChannel extends Component {

  componentDidMount() {
    this.props.changeModule('Schedules')
  }

  render() {
    return (
      <div className="container my-5">
        <div className="row">
          <div className="col-3 border border-dark rounded text-center p-3 h-100">
            <Link to={'/schedules/channels/retail'}>
              <FontAwesomeIcon className="text-muted feather h-100" icon="store" size="2x" />
              <h5 className="my-2">Retail</h5>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeModule }, dispatch)
}

export default connect(null, mapDispatchToProps)(ChooseChannel)
