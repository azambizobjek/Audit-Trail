import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Breadcrumb from '../layout/Breadrumb'
import FolTabHead from './FolTabHead'
import TabHistory from './TabHistory'
import TabDelete from './TabDelete'
import TabFolEditor from './TabFolEditor'
import TabChild from './TabChild'

import { setActiveEditor,getAuditLog,getRecDetails,setLSactivity } from '../../actions/editorAction'

class FolEditor extends Component {
    components={
        'updateFol':TabFolEditor,
        'child':TabChild,
        'history':TabHistory,
        'delete':TabDelete
    }
    componentDidMount(){
        const{activeEditor}=this.props.editor
        if(activeEditor==='history'){
            this.getAuditLog()
        }else if(activeEditor==='updateFol'){
            this.getRecDetails()
        }
        this.setHistoryLS()
    }
    setHistoryLS(){
        const{user:{stakeholder_id}}=this.props.session
        const{selRec:{record_id,title,record_type_title},isContainer}=this.props.records
        const today = new Date()
        const obj = {
            recId:record_id,
            date:today.toLocaleDateString('en-my'),
            time:today.toLocaleTimeString('en-my'),
            icon:isContainer ? 'container' : record_type_title,
            title:title
        }
        this.props.setLSactivity(stakeholder_id,record_id,obj)
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
    getRecDetails(){
        const{user:{bio_access_id:bId}}=this.props.session
        const{selRec:{record_id:recId}}=this.props.records
        this.props.getRecDetails({
            bio_access_id:bId,
            action:'ITEM_DETAIL',
            record_id:recId
        })
    }
    close(){
        console.log('reset editor store')
    }
  render() {
    const{isContainer,canDelete,canUpdate,selRec:{title,record_type_title,record_id}}=this.props.records
    const{activeEditor}=this.props.editor
    const TabPanel = this.components[activeEditor]
    return (
        <>
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
                                <FolTabHead
                                    activeEditor={this.activeEditor}
                                    active={activeEditor}
                                    isContainer={isContainer}
                                    canDel={canDelete}
                                    canUpdate={canUpdate}
                                />
                            </div>
                            <div className="card-body">
                                <TabPanel
                                    title={title}
                                    recId={record_id}
                                    recType={record_type_title}
                                    onClose={this.close}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    </>
    )
  }
}
FolEditor.FolEditor={
    child: PropTypes.object.isRequired,
    search: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
    records: PropTypes.object.isRequired,
    setActiveEditor:PropTypes.func.isRequired,
    getAuditLog:PropTypes.func.isRequired,
    setLSactivity:PropTypes.func.isRequired,
    getRecDetails:PropTypes.func.isRequired
  }
const mapStateToProps = (state) => ({
    session:state.session,
    records:state.records,
    search:state.search,
    editor:state.editor,
    child:state.childConf
})


export default connect(mapStateToProps,{
    setActiveEditor,
    getAuditLog,
    getRecDetails,
    setLSactivity
    })(FolEditor)