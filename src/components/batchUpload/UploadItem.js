import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {biorisUrl} from '../../config'
import { getBatchLoadList } from '../../actions/batchLoadAction'
import { toggleLoader,setLoaderText } from '../../actions/modalAction'
import Loader from '../modal/Loader'
class UploadItem extends Component {
    constructor(){
        super()
        this.state={
            folderItem:[]
        }
    }
    componentDidMount(){
        this.setState({count:this.props.count},this.requestUploadList())
    }
    requestUploadList(){
        const{user:{bio_access_id:bId}}=this.props.session
        const childParam={
            bio_access_id:bId,
            action:'ITEM_LIST_BY_REC_TYPE',
            record_type_title:this.props.name,

        }
        const url=`${biorisUrl}/batchLoad?param=${encodeURIComponent(JSON.stringify(childParam))}`
        fetch(url).then(res=>res.json())
        .then(data=>this.setState({
            count:data.count,
            folderItem:data.results
        }))
    }
    componentWillReceiveProps(){
        this.requestUploadList()
    }
    refresh=()=>{
        this.requestUploadList()
    }
    upload=()=>{

        this.props.toggleLoader(true)
        this.props.setLoaderText('Uploading...')

        const{user:{bio_access_id:bId}}=this.props.session
        const uploadParam={
            bio_access_id:bId,
            action:'EXECUTE_BATCH_LOAD'
        }
        const url=`${biorisUrl}/batchLoad?param=${encodeURIComponent(JSON.stringify(uploadParam))}`
        fetch(url, {method:'POST'}).then(res=>res.json())
        .then(data=>{
            //add popup msg
            this.setState({
                folderItem:[]})
                this.props.toggleLoader(false)
            this.props.getBatchLoadList({action:"ITEM_LIST",bio_access_id:bId})
        })
    }
  render() {
    const docs=this.state.folderItem.map((doc,idx)=>(
        <li className="list-group-item text-truncate" key={idx}>
        <img src={require('../../img/pdf.svg')} alt="doc" className="doc-scale mr-2"/>
            <small>
                <samp className="font-weight-light">{decodeURIComponent(doc.name)}</samp>
            </small>
        </li>
      ))
    return (
        <div className="col-md-4">
        <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
            <div className="mr-auto p-2">
                <h5 className="card-title mb-1">{this.props.name}</h5>
                <p className="card-text text-xsmall text-muted">{this.state.count===0?"No":this.state.count} files waiting to be upload</p>
            </div>

            <div className="p-2">
                <button className="btn btn-xs btn-info ml-1" onClick={this.refresh} data-toggle="tooltip" data-placement="bottom" title="Reload documents">
                    <i className="fa fa-refresh"></i>
                </button>
            </div>
        </div>
        <img src={require('../../img/doc1.jpg')} alt="" className={this.state.count===0?"card-img-top img-fluid":"d-none"}/>
        <div className={this.state.count===0?"d-none":"card card-inverse text-white mb-0"} onClick={this.upload}>
            <img src={require('../../img/doc1.jpg')} alt="" className="card-img-top img-fluid"/>
        <div className="card-img-overlay card-img-overlay-opacity d-flex justify-content-center align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="img-fluid w-75" viewBox="0 0 100 100" aria-labelledby="title">
            <title id="title">Upload Documents</title>
            <path fill="#FFF" d="M50.001 7.5l-26 24.398h16.5V57.5h19V31.898h16.5l-26-24.398zm46.697 57.711L80.78 54.5h-9.816l17.002 13.043H70.243c-.508 0-.969.258-1.197.664L64.96 79.383H35.038l-4.086-11.176c-.227-.406-.689-.664-1.197-.664H12.032L29.036 54.5h-9.818L3.302 65.211C.933 66.626-.483 69.887.152 72.457l2.807 15.369c.636 2.57 3.452 4.674 6.257 4.674h81.568c2.805 0 5.621-2.104 6.258-4.674l2.805-15.369c.638-2.57-.78-5.831-3.149-7.246z"/>
            </svg>
        </div>
        </div>
            <ul className="list-group list-group-flush">
                {docs}
            </ul>
        </div>
        <Loader/>
        </div>
    )
  }
}
UploadItem.propTypes={
    session: PropTypes.object.isRequired,
    batchLoad:PropTypes.object.isRequired,
    getBatchLoadList:PropTypes.func.isRequired,
    toggleLoader:PropTypes.func.isRequired,
    setLoaderText:PropTypes.func.isRequired
  }
  const mapStateToProps= state =>({
    session:state.session,
    batchLoad:state.batchLoad
  })
export default connect(mapStateToProps,{getBatchLoadList,toggleLoader,setLoaderText})(UploadItem)