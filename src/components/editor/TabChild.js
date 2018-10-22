import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Pagination from 'rc-pagination/lib'
import localeInfo from 'rc-pagination/lib/locale/en_US'
import update from 'immutability-helper'
import DocFab from '../fab/DocFab'
import ThumbCard from '../viewer/ThumbCard'
import {
    getChild,
    getChildItemAccess,
    setSelRec,
    showChildFab,
    setChild
} from '../../actions/childRecAction'
// import {setSelRec} from '../../actions/recordAction'
import { setActivePage } from '../../actions/layoutInitAction'
import { setActiveEditor,setActiveHeader} from '../../actions/editorAction'
export class TabChild extends Component {
    constructor(){
        super()
        this.state={
            inputValid:null,
            isSearchable:false,
            childList:[]
        }
    }
    componentDidMount(){
        const{start,page,limit}=this.props.child
        const{selRec:{record_id:recId}}=this.props.records
        const{user:{bio_access_id:bId}}=this.props.session
        const params={
            bio_access_id:bId,
            action:'ADVANCED_SEARCH_PAGING',
            query:`parent_id:%22quostr%3B${recId}%22quostr%3B`
        }
        this.props.getChild(params,{
            page:page,
            start:start,
            limit:limit
        })

    }
    componentDidUpdate(prevProps,prevState){
        if(prevProps.child.childList!==this.props.child.childList){
            const {childList}=this.props.child
            const rec = childList.map(itm => ({ ...itm, isActive:false}))
            this.setState({childList:rec})
        }else if(prevState.childList !== this.state.childList){
            const{childList}=this.state
            const selRec=childList.find(rec => rec.isActive === true)
            if(selRec!==undefined){
                const{user:{bio_access_id:bId}}=this.props.session
                const {record_id:recId,title,record_type_title} = selRec
                this.props.setSelRec({
                    record_id:recId,
                    title:title,
                    record_type_title:record_type_title.toLowerCase()
                })
                this.props.getChildItemAccess({action:'ITEM_ACCESS',record_id:recId,bio_access_id:bId})
            }
        }
    }
    searchValidity=(e)=>{
        if(e.target.value.length>3){
            this.setState({inputValid:true,isSearchable:true})
        }else{
            this.setState({inputValid:false,isSearchable:false})
        }

    }
    close=()=>{

    }
    filterRec=(e)=>{
        e.preventDefault()
        const searchTxt=e.target.searchTxt
        // const newQuery=`parent_id:%22quostr%3B${this.state.childId}%22quostr%3B&&title:%22quostr%3B${encodeURIComponent(e.target.searchTxt.value)}*%22quostr%3B`

        // const param =EndpointRequest.paramBuilder(
        //     {query:`parent_id:%22quostr%3B${this.state.childId}%22quostr%3B&&title:%22quostr%3B${encodeURIComponent(e.target.searchTxt.value)}*%22quostr%3B`},
        //     'adv',`&page=1&limit=6&start=0`)
        // this.requestChildRec(param)
    }
    nextPage=(e)=>{
            const{parameter,limit}=this.props.child
            const newStart = (e-1)*limit
            this.props.getChild(parameter,{page:e,start:newStart,limit:limit})

    }
    markOnSel=(recId)=>{
        const{childList}=this.state
        const deSelRecIdx = childList.findIndex(rec => rec.isActive === true)
        const selRecIdx = childList.findIndex(rec=> rec.record_id === recId)
        const newSelRec = deSelRecIdx===-1? update(childList,{[selRecIdx]: {isActive:{$set:true}}})
            :deSelRecIdx===selRecIdx?
            update(childList,{
                [selRecIdx]: {isActive:{$set:false}}
            }):
            update(childList,{
                [deSelRecIdx]: {isActive:{$set:false}},
                [selRecIdx]: {isActive:{$set:true}}
            })
        if(deSelRecIdx===selRecIdx){
            this.props.showChildFab(false)
            this.props.setSelRec(null)

        }else{this.props.showChildFab(true)
        }
        this.setState({childList: newSelRec})
    }
    editRec=(editor)=>{
        this.props.setChild(true)
        this.props.showChildFab(false)
        this.props.setActivePage('docEditor')
        this.props.setActiveEditor(editor)
    }
  render() {
      const{limit,page,totalRec,canDelete,canUpdate,showFab}=this.props.child
      const{childList}=this.state
      const childRec=childList.map(itm=>
        <ThumbCard
        key={itm.record_id}
        title={itm.title}
        haveParent={itm.parent_id}
        isSel={itm.isActive}
        recId={itm.record_id}
        markOnSel={this.markOnSel}
        record_type_icon={itm.record_type_icon.replace(/[0-9]/g, '')}
        date_created={itm.date_created}
    />)
    return (
        <>
        <h1 className="h3 display text-primary text-center">Document that attached to this folder</h1>
        <form className="input-group mt-3 mb-5" onSubmit={this.filterRec}>

            <input type="text" className={this.state.inputValid===null?"form-control":this.state.inputValid?"form-control is-valid":"form-control is-invalid"} name="searchTxt" aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="Search..." onChange={this.searchValidity} onBlur={this.resetField}/>
            <div className="input-group-append">
            <button type="submit" className="input-group-text" disabled={!this.state.isSearchable}><i className="fa fa-search" aria-hidden="true"></i></button>
            </div>
        </form>
        <div className="row bg-light pt-4 mr-2 ml-2">
            {childRec}
        </div>
        {showFab?<DocFab canDelete={canDelete} canUpdate={canUpdate} editRec={this.editRec}/>:''}

        <div className="d-flex justify-content-end mt-3">
            <Pagination locale={localeInfo} onChange={this.nextPage} current={page} pageSize={limit} total={totalRec} />
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={this.close}>Close</button>
        </div>

      </>
    )
  }
}
TabChild.propTypes={
    child: PropTypes.object.isRequired,
    records: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
    getChild: PropTypes.func.isRequired,
    getChildItemAccess:PropTypes.func.isRequired,
    setSelRec:PropTypes.func.isRequired,
    setActiveHeader:PropTypes.func.isRequired,
    setActiveEditor:PropTypes.func.isRequired,
    setActivePage:PropTypes.func.isRequired,
    setChild:PropTypes.func.isRequired,
    showChildFab:PropTypes.func.isRequired
  }
const mapStateToProps = (state) => ({

    records:state.records,
    session:state.session,
    child:state.childConf

})


export default connect(mapStateToProps,{
    getChild,
    getChildItemAccess,
    setSelRec,
    setActiveHeader,
    setActivePage,
    setChild,
    setActiveEditor,
    showChildFab})(TabChild)
