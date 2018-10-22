import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import update from 'immutability-helper'
import Breadcrumb from '../layout/Breadrumb'
import DocTabHead from './DocTabHead'
import FolTabHead from './FolTabHead'
import TabHistory from './TabHistory'
import TabDelete from './TabDelete'
import TabFolEditor from './TabFolEditor'
import TabChild from './TabChild'
import TabDocEditor from './TabDocEditor'
import TabContent from './TabContent'
import { setActiveEditor,getAuditLog,getRecDetails } from '../../actions/editorAction'

// import { getChild } from '../../actions/searchAction'

export class index extends Component {

components={
    'folder':FolTabHead,
    'document':DocTabHead,
    'updateFol':TabFolEditor,
    'child':TabChild,
    'updateDoc':TabDocEditor,
    'email':TabDocEditor,
    'history':TabHistory,
    'delete':TabDelete,
    'content':TabContent
}
getAuditLog(){
    const{user:{bio_access_id:bId}}=this.props.session
    const{selRec:{record_id:recId}}=this.props.records
    const params={
        bio_access_id:bId,
        action: "SEARCH_AUDIT_LOG",
        action_types: [],
        audit_types: [],
        record_id: recId,
        record_type_id: "",
        stakeholder_id: "",
        date_from: "",
        date_to: ""
        }
    this.props.getAuditLog(params)
}
getRecDetails(){
    const{user:{bio_access_id:bId}}=this.props.session
    const{selRec:{record_id:recId}}=this.props.records
    this.props.getRecDetails({
        bio_access_id:bId,
        action:'ITEM_DETAIL',
        record_id:recId
    })
}

componentDidMount(){
    const{activeEditor}=this.props.editor
    if(activeEditor==='history'){
        this.getAuditLog()
    }else if(activeEditor==='updateFol'||activeEditor==='updateDoc'||activeEditor==='email'){

        this.getRecDetails()
    }


}

activeEditor=(editor)=>{
    const{auditLog}=this.props.editor
    this.props.setActiveEditor(editor)
    switch(editor){
        case 'history':
            if(auditLog.length===0){
                this.getAuditLog()
            }
        break
    }
}

  render() {
    //   const{isChild}=this.props.child
    //   const activeRec=isChild?this.props.child:this.props.records
    //   const{canDelete,canUpdate,selRec:{title,record_type_title,record_id}}=activeRec
      const{isContainer,canDelete,canUpdate,selRec:{title,record_type_title,record_id}}=this.props.records
      const{tabHeader, activeEditor}=this.props.editor
      const HeaderType=this.components[tabHeader]
      const TabPanel = this.components[activeEditor]
    //   console.log(activeRec)
    return (
        <Fragment>
        <div className="breadcrumb-holder">
        <div className="container-fluid">
        <Breadcrumb/>
        </div>
        </div>

        <section className="forms">
            <div className="container-fluid">
                <header>
                    <h1 className="h3 display">{decodeURIComponent(title)}</h1>
                </header>
                <div className=" row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header ">
                                <HeaderType
                                    activeEditor={this.activeEditor}
                                    active={activeEditor}
                                    // sub={this.state.pageSub}
                                    isContainer={isContainer}
                                    canDel={canDelete}
                                    canUpdate={canUpdate}
                                />
                            </div>
                            <div className="card-body">
                                <TabPanel
                                    // sub={this.state.pageSub}
                                    title={title}
                                    recId={record_id}
                                    recType={record_type_title}
                                    // iconType={this.state.iconType}
                                    // recordDetails={this.state.recordDetails}
                                    // reqDetails={this.requestRecDetails}
                                    // openLink={this.openLink}
                                    // closePage={this.closePage}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    </Fragment>
    )
  }
}
index.propTypes={
    child: PropTypes.object.isRequired,
    search: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
    records: PropTypes.object.isRequired,
    setActiveEditor:PropTypes.func.isRequired,
    getAuditLog:PropTypes.func.isRequired,
    getRecDetails:PropTypes.func.isRequired,
    // getChild:PropTypes.func.isRequired,
    // showMultiFab:PropTypes.func.isRequired,
    // getRecItemAccess:PropTypes.func.isRequired,
    // setIsContainer:PropTypes.func.isRequired,
    // setSelRec:PropTypes.func.isRequired,
    // changeMultiSel:PropTypes.func.isRequired
  }
const mapStateToProps = (state) => ({
    session:state.session,
    records:state.records,
    search:state.search,
    editor:state.editor,
    child:state.childConf
})


export default connect(mapStateToProps,{
    setActiveEditor,getAuditLog,getRecDetails,
    // getChild
})(index)
