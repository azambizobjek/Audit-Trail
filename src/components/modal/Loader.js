import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Modal, ModalBody } from 'reactstrap'
import { toggleLoader,setLoaderText } from '../../actions/modalAction'

class Loader extends Component {
  render() {
      const{showLoader,loaderText}=this.props.modal
    return (
        <Modal isOpen={showLoader} toggle={this.toggle}>
          <div role="document" className="modal-dialog">

          <ModalBody>
            <div className="card-body d-flex justify-content-center pt-5 pb-5">
              <div className="sk-folding-cube">
                <div className="sk-cube1 sk-cube"></div>
                <div className="sk-cube2 sk-cube"></div>
                <div className="sk-cube4 sk-cube"></div>
                <div className="sk-cube3 sk-cube"></div>
              </div>
          </div>
          <p className="text-center">{loaderText}</p>
          </ModalBody>

        </div>
      </Modal>
    )
  }
}
Loader.propTypes={
    modal:PropTypes.object.isRequired,
    toggleLoader:PropTypes.func.isRequired,
    setLoaderText:PropTypes.func.isRequired
  }
const mapStateToProps = (state) => ({
  modal:state.modalConf
})
export default connect(mapStateToProps,{toggleLoader,setLoaderText})(Loader)