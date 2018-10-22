import React, { Component } from 'react'
import Iframe from 'react-iframe'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getContentDetail,getIframe,dlContent } from '../../actions/editorAction'


class TabContent extends Component {

  componentDidMount(){
    const{isChild}=this.props.child
    const recId=isChild?this.props.child.selRec.record_id:this.props.records.selRec.record_id

    const{user:{bio_access_id:bId}}=this.props.session
    const{ctnId}=this.props.editor
    if(ctnId===null){
      this.props.getContentDetail({action:"ITEM_DETAIL_BY_RECORD",record_id:recId,bio_access_id:bId})
    }


    console.log('profile found')
  }
  componentDidUpdate(prevProps){
    if(prevProps.editor.ctnId!==this.props.editor.ctnId){
      const{ctnId}=this.props.editor
      const{user:{bio_access_id:bId}}=this.props.session
      this.props.getIframe({action:"ITEM_VIEW",content_file_id:ctnId,bio_access_id:bId})
    }
  }
  downloadContent=()=>{
    const{ctnId}=this.props.editor
    const{user:{bio_access_id:bId}}=this.props.session
    const downloadParam ={
      action:"ITEM_DOWNLOAD",
      bio_access_id:bId,
      content_file_id:ctnId
    }//this download not working yet
    // this.props.dlContent(downloadParam)
  }
  render() {
      const{iframeSrc}=this.props.editor
    return (
        <>
        <h1 className="h3 display text-primary text-center">Digital content that attached in this document</h1>
          <div className="mt-3 mb-3">
          <Iframe
            url={decodeURIComponent(iframeSrc)}
            width="100%"
            height="100%"
            display="initial"
            position="relative"
            styles={{height: "55vh"}}
            allowFullScreen
          />
          </div>



        <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={this.downloadContent}>Download</button>
            <button type="button" className="btn btn-secondary"onClick={this.props.onClose}>Close</button>
        </div>
        </>
    )
  }
}
TabContent.propTypes={
  records: PropTypes.object.isRequired,
  editor: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
  getContentDetail:PropTypes.func.isRequired,
  dlContent:PropTypes.func.isRequired,
  getIframe:PropTypes.func.isRequired
}
const mapStateToProps = (state) => ({
  session:state.session,
  editor:state.editor,
  records:state.records,
  child:state.childConf
})


export default connect(mapStateToProps,{getContentDetail,getIframe,dlContent})(TabContent)
