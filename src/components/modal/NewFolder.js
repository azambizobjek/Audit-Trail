import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { toggleForm } from '../../actions/modalAction'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

class NewFolder extends Component {
    toggle=()=> {
        const{showForm}=this.props.modal
        this.props.toggleForm(!showForm)
      }

  render() {
    const{showForm}=this.props.modal

    return (
        <div>
        <Modal isOpen={showForm} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Create New Folder</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

NewFolder.propTypes={
    modal:PropTypes.object.isRequired,
    toggleForm:PropTypes.func.isRequired,
  }
const mapStateToProps = (state) => ({
  modal:state.modalConf
})
export default connect(mapStateToProps,{toggleForm})(NewFolder)


