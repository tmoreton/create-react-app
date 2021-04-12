import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Rodal from 'rodal'
import { closeErrorModal } from '../actions/closeErrorModal'

class ErrorModal extends Component {

  constructor(props) {
    super(props)
    this.closeModal = this.closeModal.bind(this)
  }

  closeModal() {
    this.props.closeErrorModal()
  }

  render() {
    return (
      <Rodal
        height={350}
        visible={true}
        width={500}
        onClose={this.closeModal}
      >
        <div className="text-center d-flex h-100 align-items-center">
          <div className="w-100">
            <h4>{this.props.error.headline || 'Oops!'}</h4>
            <p>{this.props.error.message}</p>
          </div>
        </div>
      </Rodal>
    )
  }
}

function mapStateToProps(state) {
  return {
    error: state.error,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ closeErrorModal }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorModal)
