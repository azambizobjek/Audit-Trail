// import React, { Component, Fragment } from 'react'
// import update from 'immutability-helper'
// import {connect} from 'react-redux'
// import PropTypes from 'prop-types'
// import Tooltip from 'rc-tooltip'
// import Pagination from 'rc-pagination/lib'
// import localeInfo from 'rc-pagination/lib/locale/en_US'

// import { toggleForm } from '../../actions/modalAction'
// // import { getAdvSearch } from '../../actions/searchAction'
// import { setActivePage } from '../../actions/layoutInitAction'
// // import { setActiveEditor} from '../../actions/editorAction'
// import {
//     setCardView,
//     changeMultiSel,
//     showFab,
//     showMultiFab,
//     setIsContainer,
//     setSelRec,
//     getRecItemAccess } from '../../actions/recordAction'

// import Breadcrumb from '../layout/Breadrumb'
// import ThumbCard from './ThumbCard'
// import DetailCard from './DetailCard'
// // import AdvSearch from '../modal/AdvSearch'
// // import NewFolder from '../modal/NewFolder'

// // import MultiFab from '../fab/MultiFab'
// // import FolderFab from '../fab/FolderFab'
// // import DocFab from '../fab/DocFab'

// class index extends Component {
// constructor(){
//     super()
//     this.state={
//         recList:[]
//     }

// }
// components={
//     document:DocFab,
//     folder:FolderFab
// }
// componentDidMount(){
//     const{parameter}=this.props.search
//     const{currentPage,start,pageLimit}=this.props.records

//     if(Object.keys(parameter).length!==0){
//         this.props.getAdvSearch(parameter,{page:currentPage,start:start,limit:pageLimit})
//     }
// }
// componentDidUpdate(prevProps,prevState){
//     if (prevProps.search.recordList !== this.props.search.recordList || prevProps.records.isMultiSel !== this.props.records.isMultiSel) {
//         const {recordList}=this.props.search
//         const rec = recordList.map(itm => ({ ...itm, isActive:false}))

//         // if(selRec!==null){
//         //
//         //         const{record_id:recId}=selRec
//         //         const selRecIdx = rec.findIndex(rcd => rcd.record_id === recId)
//         //         const preSelRec = update(rec,{[selRecIdx]: {isActive:{$set:true}}})
//         //         this.setState({recList: preSelRec})
//         //

//         // }else{
//             this.setState({recList: rec})
//         // }
//     }else if(prevProps.records.isSelAll===!this.props.records.isSelAll){
//         const{isSelAll}=this.props.records
//         if(isSelAll){
//             const{recList}=this.state
//             const rec = recList.map(itm => ({ ...itm, isActive:true}))
//             this.setState({recList: rec})
//         }
//     }
//     else if(prevState.recList !== this.state.recList){
//         const{isMultiSel}=this.props.records
//         const{recList}=this.state
//         if(isMultiSel){
//             const listSelRec=recList.filter(rec => rec.isActive === true).map(rec=>({
//                 record_id:rec.record_id,
//                 title:rec.title,
//                 record_type_title:rec.record_type_title.toLowerCase()}))
//             this.props.setSelRec(listSelRec)
//         }else{
//             const selRec=recList.find(rec => rec.isActive === true)
//             if(selRec!==undefined){
//                 const{user:{bio_access_id:bId}}=this.props.session
//                 const {record_id:recId,title,record_type_title,is_container} = selRec
//                 this.props.setSelRec({
//                     record_id:recId,
//                     title:title,
//                     record_type_title:record_type_title.toLowerCase()
//                 })
//                 this.props.setIsContainer(is_container)
//                 this.props.getRecItemAccess({action:'ITEM_ACCESS',record_id:recId,bio_access_id:bId})
//             }
//         }
//     }
// }
//   showForm=(e)=>{
//     this.props.toggleForm(true)
//   }
//   markOnSel=(recId)=>{
//     const{recList}=this.state
//     const{isMultiSel}=this.props.records
//     const selRecIdx = recList.findIndex(rec => rec.record_id === recId),
//           deSelRecIdx = recList.findIndex(rec => rec.isActive === true),
//           {isActive:selRecIsSel}=recList.find(rec=>rec.record_id===recId)

//     const newSelRec=selRecIsSel? update(recList,{[selRecIdx]: {isActive:{$set:false}}})
//             :isMultiSel?  update(recList,{[selRecIdx]: {isActive:{$set:true}}})
//             :deSelRecIdx===-1? update(recList,{[selRecIdx]: {isActive:{$set:true}}})
//             :update(recList,{
//             [selRecIdx]: {isActive:{$set:true}},
//             [deSelRecIdx]: {isActive:{$set:false}}
//             })


//         this.setState({recList: newSelRec})

//     if(!isMultiSel){
//         if(deSelRecIdx===selRecIdx){
//             this.props.setSelRec(null)
//             this.props.showMultiFab(true)
//             this.props.showFab(false)
//         }else{
//             this.props.showFab(true)
//             this.props.showMultiFab(false)
//         }
//     }
//   }
//   changeView=(e)=>{
//       const {cardView}=this.props.records
//         this.props.setCardView(!cardView)
//   }
//   nextPage=(e)=>{
//       const{parameter}=this.props.search
//       const{pageLimit}=this.props.records
//       const newStart = (e-1)*pageLimit
//       this.props.getAdvSearch(parameter,{page:e,start:newStart,limit:pageLimit})
//   }
//   editRec=(editor)=>{
//     this.props.showFab(false)
//     const{activePage}=this.props.layout

//     this.props.setActivePage(activePage==='folder'?'folEditor':'docEditor')
//     this.props.setActiveEditor(editor)
//     console.log(editor)

//   }
//   render() {

//       const{pageTitle,cardView,totalRecords,currentPage,pageLimit,
//             showFab,canDelete,canUpdate,isContainer}=this.props.records

//       const{activePage}=this.props.layout
//       const FabType = this.components[activePage]
//       const{recList}=this.state
//       const rec = recList.map(itm=>cardView?
//         <ThumbCard
//             key={itm.record_id}
//             title={itm.title}
//             haveParent={itm.parent_id}
//             isSel={itm.isActive}
//             recId={itm.record_id}
//             markOnSel={this.markOnSel}
//             is_container={itm.is_container}
//             record_type_icon={itm.record_type_icon.replace(/[0-9]/g, '')}
//             date_created={itm.date_created}
//         />:
//         <DetailCard
//             key={itm.record_id}
//             title={itm.title}
//             haveParent={itm.parent_id}
//             isSel={itm.isActive}
//             recId={itm.record_id}
//             markOnSel={this.markOnSel}
//             is_container={itm.is_container}
//             record_type_icon={itm.record_type_icon.replace(/[0-9]/g, '')}
//             date_created={itm.date_created}
//         />)
//     return (
//         <Fragment>
//         <div className="breadcrumb-holder">
//         <div className="container-fluid">
//         <Breadcrumb/>
//         </div>
//         </div>
//         <section className="forms">
//             <div className="container-fluid">
//                 <header>
//                     <div className="d-flex align-items-center justify-content-between">

//                         <h1 className="h3 display">{recList.length===0?"No result found for: ":"Showing result for: "}
//                         <strong>{pageTitle}</strong></h1>

//                         <div className="d-flex align-items-center">
//                             <Tooltip
//                                 placement="top"
//                                 overlay={<div style={{ height: 20, width: '100%' }}>Create new folder</div>}
//                                 arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
//                             >
//                             <button className="btn btn-sm btn-primary" onClick={this.showForm}>
//                             <i className="fa fa-folder"></i>
//                             </button>
//                             </Tooltip>

//                             <Tooltip
//                                 placement="top"
//                                 overlay={<div style={{ height: 20, width: '100%' }}>Toggle View</div>}
//                                 arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
//                             >
//                             <button className="btn btn-sm btn-primary ml-2" onClick={this.changeView}>
//                                 <i className={cardView?"fa fa-th-list":"fa fa-th"}aria-hidden="true"></i>


//                             </button>
//                             </Tooltip>

//                             <Tooltip
//                                 placement="top"
//                                 overlay={<div style={{ height: 20, width: '100%' }}>Sort by latest creation</div>}
//                                 arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
//                             >
//                              <button className="btn btn-sm btn-primary ml-2"  alt="Sort" onClick={this.sortItem}>
//                                 <i className="fa fa-sort-amount-asc" aria-hidden="true"></i>
//                                 {/* <i className={this.state.sortAsc?"fa fa-sort-amount-asc":"fa fa-sort-amount-desc"} aria-hidden="true"></i> */}

//                             </button>

//                             </Tooltip>
//                         </div>

//                     </div>

//                     {/* <span className={this.state.infoText?"text-info":"d-none"}><i className="fa fa-spinner fa-pulse fa-1x fa-fw"></i> Fetcing Results...</span> */}

//                 </header>
//                 <div className="row">
//                     {rec}
//                 </div>
//                 {
//                     showFab?<FabType canDelete={canDelete} canUpdate={canUpdate} isContainer={isContainer} editRec={this.editRec}/>:<MultiFab/>
//                 }
//                 {
//                     // showMultiFab?<MultiFab/>:''
//                 }

//                 <div className="d-flex justify-content-end mt-1 mb-1">

//                 <Pagination locale={localeInfo} onChange={this.nextPage} current={currentPage} pageSize={pageLimit} total={totalRecords} />
//                 </div>

//             </div>
//         </section>


//        {/* <MultiDocForm modalIsOpen={this.state.showMultiDocForm} closeModal={this.closeMultiDocForm} selectedRec={this.state.multiRec} isMove={this.state.isMove} regMultiDoc={this.addDocs}/>
//        <Alert stack={true} contentTemplate={Notification}/> */}
//        <AdvSearch/>
//        <NewFolder/>
//   </Fragment>
//     )
//   }
// }

// index.propTypes={
//     layout: PropTypes.object.isRequired,
//     search: PropTypes.object.isRequired,
//     session: PropTypes.object.isRequired,
//     records: PropTypes.object.isRequired,
//     setActivePage:PropTypes.func.isRequired,
//     toggleForm:PropTypes.func.isRequired,
//     setCardView:PropTypes.func.isRequired,
//     getAdvSearch:PropTypes.func.isRequired,
//     showFab:PropTypes.func.isRequired,
//     showMultiFab:PropTypes.func.isRequired,
//     getRecItemAccess:PropTypes.func.isRequired,
//     setIsContainer:PropTypes.func.isRequired,
//     setSelRec:PropTypes.func.isRequired,
//     setActiveEditor:PropTypes.func.isRequired,
//     changeMultiSel:PropTypes.func.isRequired
//   }
//   const mapStateToProps= state =>({
//     layout:state.layout,
//     session:state.session,
//     records:state.records,
//     search:state.search
//   })
//   export default connect(mapStateToProps,{
//       toggleForm,
//       setCardView,
//       getAdvSearch,
//       showFab,
//       showMultiFab,
//       getRecItemAccess,
//       setIsContainer,
//       setSelRec,
//       setActivePage,
//       setActiveEditor,
//       changeMultiSel})(index)