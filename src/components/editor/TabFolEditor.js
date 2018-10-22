import React, { Component,Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Select, { components } from 'react-select'
import update from 'immutability-helper'
import Loader from '../modal/Loader'
import { toggleLoader,setLoaderText } from '../../actions/modalAction'
import { saveRecord,getRecDetails } from '../../actions/editorAction'
import { aclSkeleton,folderSkeleton } from '../../model'


const Option = (props) => {
    return (
      <div className="d-flex align-middle">
        <div className="boIcon ml-1 mr-1"><img src={require(`../../img/${props.data.stakehTypeName}.svg`)} alt="bizobjek" className="img-fluid" /></div>
        <components.Option {...props}/>
      </div>
    )
}

export class TabFolEditor extends Component {
    constructor(){
        super()
        this.state={
          isChange:false,
          title:null,
          docsVal:[],
          aclView:[],
          aclMod:[],
          aclRem:[],
          aclAcl:[],

        }
    }

    componentDidMount(){
      const{recDetails}=this.props.editor
      const{selRec:{record_id:recId}}=this.props.records
      if(recDetails.length===0||recDetails[0].record_id!==recId){
        const{selRec:{record_id:recId}}=this.props.records
        const{user:{bio_access_id:bId}}=this.props.session
        this.props.getRecDetails({
            bio_access_id:bId,
            action:'ITEM_DETAIL',
            record_id:recId
        })
      }
      const {stakehList}=this.props.stakeh
      const stakeholder = stakehList.map(itm => ({
        value: itm.stakeholder_id,
        label: itm.full_name,
        stakehType:itm.stakeh_type,
        stakehTypeName:itm.stakeh_type_name.toLowerCase()
      }))
      this.setState({stakeh: stakeholder})

    }
    componentDidUpdate(prevProps){

        if (prevProps.editor.recDetails !== this.props.editor.recDetails) {
          const{recDetails:[{acl_entries,title}]}=this.props.editor
          if(acl_entries!==undefined){this.generateAcl(acl_entries)}
            this.setState({title:title})
        }
      }

    generateAcl(aclEnt){
        const permissions = ['view', 'update', 'remove', 'modify_access']
        const  {view, update, remove, modify_access} = aclEnt.reduce((a, v) => {
          permissions.forEach(p => {
            a[p] = a[p] || []
            if (v[p]) a[p].push({label: v.stakeholder_name, value: v.stakeholder_id, stakehType:v.stakeholder_type_id})
          })
          return a
        }, {})

        this.setState({
          aclView:view,
          aclMod:update,
          aclRem:remove,
          aclAcl:modify_access})
     }
    isChangeState(){
        if(!this.state.isChange){
          this.setState({isChange:true})
        }
      }
    handleInputChange = (event)=>{
        this.isChangeState()
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name
        this.setState({
            [name]: value
        })
      }
     selView = (val)=> {
        this.isChangeState()
        this.setState({aclView:val})
      }
      selMod = (val)=> {
        this.setState({ aclMod:val })
        this.isChangeState()
      }
      selRemove = (val)=> {
        this.setState({ aclRem:val })
        this.isChangeState()
      }
      selModAcl = (val)=> {
        this.setState({ aclAcl:val })
        this.isChangeState()
      }
      aclEntriesBuilder(aclObj,aclEntries,aclType){
         return new Promise((resolve,reject)=>{

          let entries = aclEntries
          for(const obj of aclObj){
            const aclIdx=aclEntries.findIndex(acl=>acl.stakeholder_id===obj.value)
            if(aclIdx!==-1){
              switch(aclType){
                case 'update':
                  entries = update(entries, {[aclIdx]: {update: {$set:true}}})
                break
                case 'remove':
                  entries = update(entries, {[aclIdx]: {remove: {$set:true}}})
                break
                case 'modify_access':
                entries = update(entries, {[aclIdx]: {modify_access: {$set:true}}})
                break
              }
            }else{
              const newAclObj={...aclSkeleton}
              newAclObj.stakeholder_id=obj.value
              newAclObj.stakeholder_name=obj.label
              newAclObj.stakeholder_type_id=obj.stakehType
              newAclObj[aclType]=true
              entries = update(entries,{$push:[newAclObj]})
            }
          }
          resolve(entries)
         })
       }
       formSubmit=(e)=>{
        e.preventDefault()
        const {title,aclMod,aclRem,aclAcl,aclView} = this.state
        const {recDetails:[{record_id:recId, record_no:recNo}]}=this.props.editor
        const {user:{bio_access_id:bId}}=this.props.session
        const {record_metadata:recMeta} = folderSkeleton


        const sectionIdx=recMeta.findIndex(meta=>meta.section_id==='sect-cff9c88c09a146538cb19681137eb0bd'),
          csRecNoIdx = recMeta[sectionIdx].section_field.findIndex(sf => sf.custom_field_id === 'record_no'),
          csTitleIdx = recMeta[sectionIdx].section_field.findIndex(sf => sf.custom_field_id === 'title')

        const recUpdate =update(folderSkeleton,{
          record_id:{$set:recId},
          record_no:{$set:recNo},
          title:{$set:encodeURIComponent(title)},
          bio_access_id:{$set:bId},
          record_metadata:{
              [sectionIdx]:{
                  section_field:{
                      [csRecNoIdx]:{value:{$set:recNo}},
                      [csTitleIdx]:{value:{$set:encodeURIComponent(title)}}
                  }
          }
          }
        })

        const newAcl = aclView.map(prop=>{
          const newAclObj={...aclSkeleton}
          newAclObj.stakeholder_id=prop.value
          newAclObj.stakeholder_name=prop.label
          newAclObj.stakeholder_type_id=prop.stakehType
          newAclObj.view=true
          return newAclObj
        })

        this.aclEntriesBuilder(aclMod,newAcl,'update')
        .then(res=> {return this.aclEntriesBuilder(aclRem,res,'remove')})
        .then(res=> {return this.aclEntriesBuilder(aclAcl,res,'modify_access')})
        .then(res=>{
          const recAddAcl = update(recUpdate,{
              acl_entries:{$set:res.length===0?null:res}
            })

          this.props.saveRecord(recAddAcl,'folder')
          this.props.toggleLoader(true)
          this.props.setLoaderText('Update Folder...')
          //set active page, and rerender the search
          // this.props.set
        })
    }
  render() {
      const{selRec:{record_type_title},canACL,canUpdate}=this.props.records
      const{recDetails}=this.props.editor
      const dateCreated = recDetails.length!==0?recDetails[0].date_created:''
      const{title}=this.state
    return (
        <Fragment>
        <h1 className="h3 display text-primary text-center">Folder information and accessibility</h1>
        <form className="mt-3" onSubmit={this.formSubmit}>
            <div className="row justify-content-center">
            <div className="col-xl-3 col-lg-4 col-md-4">
            <div className="text-center">
            <img src={require(`../../img/${record_type_title}.svg`)} alt='folder'className=" img-dash" />
            <p className="card-text mt-2"><small className="text-muted">Created: {dateCreated} </small></p>
            </div>

            </div>
            <div className="col-xl-9 col-lg-8 col-md-8 col-sm-2">
                <div className="form-group">
                <label>Title</label>
                <input name='title'
                type="text"
                placeholder="Title"
                className="form-control"
                value={decodeURIComponent(title)}
                onChange={this.handleInputChange}
                />
                </div>
            </div>
            <div className={canACL?"col-lg-6 col-md-6 col-sm-2":"d-none"}>
            <div className="form-group">
                <label>View</label>
                <Select
                name="view"
                placeholder="Select persons"
                isMulti
                value={this.state.aclView}
                onChange={this.selView}
                options={this.state.stakeh}
                components={{ Option }}
                />
            </div>
            <div className="form-group">
                <label>Modify</label>
                <Select
                name="mod"
                placeholder="Select persons"
                isMulti
                value={this.state.aclMod}
                onChange={this.selMod}
                options={this.state.stakeh}
                components={{ Option }}
                />
            </div>
            </div>
            <div className={canACL?"col-lg-6 col-md-6 col-sm-2":"d-none"}>
            <div className="form-group">
                <label>Remove</label>
                <Select
                name="remove"
                placeholder="Select persons"
                isMulti
                value={this.state.aclRem}
                onChange={this.selRemove}
                options={this.state.stakeh}
                components={{ Option }}
                />
            </div>
            <div className="form-group">
                <label>Modify Access</label>
                <Select
                name="mod_acl"
                placeholder="Select persons"
                isMulti
                value={this.state.aclAcl}
                onChange={this.selModAcl}
                options={this.state.stakeh}
                components={{ Option }}
                />
            </div>
            </div>
            </div>
            <div className="modal-footer">
            <button type="submit" className={canUpdate?"btn btn-primary":"d-none"} disabled={!this.state.isChange}>Save</button>
            <button type="button" className="btn btn-secondary" onClick={this.handleClick}>Close</button>
        </div>
        </form>
        <Loader/>
      </Fragment>
    )
  }
}
TabFolEditor.propTypes={
    records: PropTypes.object.isRequired,
    editor: PropTypes.object.isRequired,
    stakeh: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
    saveRecord:PropTypes.func.isRequired,
    toggleLoader:PropTypes.func.isRequired,
    setLoaderText:PropTypes.func.isRequired,
    getRecDetails:PropTypes.func.isRequired

  }

const mapStateToProps = (state) => ({
    session:state.session,
    stakeh:state.stakeholder,
    editor:state.editor,
    records:state.records
})



export default connect(mapStateToProps,{saveRecord,toggleLoader,setLoaderText,getRecDetails})(TabFolEditor)
