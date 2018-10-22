import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteRec } from '../../actions/editorAction'
class TabDelete extends Component {

  deleteRec=()=>{
    const{isChild}=this.props.child
    const recId=isChild?this.props.child.selRec.record_id:this.props.records.selRec.record_id

    const{user:{bio_access_id:bId}}=this.props.session
    // const {recId}=this.props
    const delParam={
      bio_access_id:bId,
      record_ids:[recId]
    }
    this.props.deleteRec(delParam)
  }
  componentDidUpdate(prevProps){
    if(prevProps.editor.isDelete!==this.props.editor.isDelete){
      const{isDelete}=this.props.editor
      if(isDelete){
        this.props.onClose()
      }
    }
  }

  render() {
    const {title,recType}=this.props
    return (
      <>
         <h1 className="h3 display text-danger text-center">Delete {recType} ({title})</h1>
      <div className="row justify-content-center mt-3 mb-5">
        <div className="col-4">
          <div className="text-center">
          <img src={require('../../img/warn-del.svg')} alt='folder'className=" img-dash img-warning" />
          </div>

        </div>
        <div className="col-8">
            <p className="h3 display mt-4">Warning: this cannot be undone.</p>
            <p className="mt-4">Once you delete this folder, there is no getting back.</p>
            <p>Make sure you want to do this.</p>
            <p className="text-danger">{}</p>
        </div>
      </div>
    <div className="modal-footer">
      <button name="delete" type="submit"  className="btn btn-danger" onClick={this.deleteRec}>Delete</button>
      <button name="cancel" type="button" className="btn btn-secondary"onClick={this.props.onClose}>Cancel</button>
    </div>
    </>
    )
  }
}

TabDelete.FolEditor={
  editor: PropTypes.object.isRequired,
  // search: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
  // records: PropTypes.object.isRequired,
  deleteRec:PropTypes.func.isRequired,
  // getAuditLog:PropTypes.func.isRequired,
  // getRecDetails:PropTypes.func.isRequired
}
const mapStateToProps = (state) => ({
  session:state.session,
  editor:state.editor
})



export default connect(mapStateToProps,{deleteRec})(TabDelete)


