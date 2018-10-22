import React, { Component } from 'react'
import Select, { components } from 'react-select'
import update from 'immutability-helper'
import AsyncSearchCombo from './AsyncSearchCombo'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getRecDetails,saveRecord } from '../../actions/editorAction'
import { toggleLoader,setLoaderText } from '../../actions/modalAction'
import { aclSkeleton,documentSkeleton,emailSkeleton } from '../../model'
import Loader from '../modal/Loader'

const Option = (props) => {
    return (
      <div className="d-flex align-middle">
        <div className="boIcon ml-1 mr-1"><img src={require(`../../img/${props.data.stakehTypeName}.svg`)} alt="bizobjek" className="img-fluid" /></div>
        <components.Option {...props}/>
      </div>
    )
}

export class TabDocEditor extends Component {
    constructor(){
        super()
        this.state={
          isChange:false,
          docsVal:[],
          aclView:[],
          aclMod:[],
          aclRem:[],
          aclAcl:[],
          notes:'',
          toVal: [],
          ccVal:[],
          bccVal:[],
          containerVal:null,
          title:null,

        }
    }
    dataBinder(){
      const{recDetails:[{acl_entries,title,record_metadata:recMeta,parent_id,parent_title}]}=this.props.editor
      if(acl_entries!==undefined){this.generateAcl(acl_entries)}
            const {section_field:sectionField} = recMeta.find(secField=>secField.section_id==='sect-a32f4499b07c490bb5600b45d877e1c0')

            const {value:notes} = sectionField.find(cusField=>cusField.custom_field_id==='notes')
            this.setState({
              title:title,
              containerVal:{ value:parent_id, label:parent_title},
              toVal: this.setEmailPerson(sectionField,'cfld-1c2ebc804af041b29f081861d0105a9b'),
              ccVal:this.setEmailPerson(sectionField,'cfld-764b2d1ee4024609933626b41f84bafa'),
              bccVal: this.setEmailPerson(sectionField,'cfld-785c5c7ddf6f49ce89774ca8513db43d'),
              notes:decodeURIComponent(notes)
          })
    }
    componentDidMount(){
      const{recDetails}=this.props.editor
      const{user:{bio_access_id:bId}}=this.props.session
      const{isChild}=this.props.child
      const recId=isChild?this.props.child.selRec.record_id:this.props.records.selRec.record_id

        if(recDetails.length===0){
          this.props.getRecDetails({
              bio_access_id:bId,
              action:'ITEM_DETAIL',
              record_id:recId
        })
        }else{
          // console.log(recDetails[0].record_id!==recId)
          // if(recDetails[0].record_id!==recId){

          // }
          this.dataBinder()
        }

      const {stakehList}=this.props.stakeh
      const stakeholder = stakehList.map(itm => ({
        value: itm.stakeholder_id,
        label: itm.full_name,
        stakehType:itm.stakeh_type,
        stakehTypeName:itm.stakeh_type_name.toLowerCase()}))
      this.setState({stakeh: stakeholder})
    }
    componentDidUpdate(prevProps){

        if (prevProps.editor.recDetails !== this.props.editor.recDetails) {

          // const{isChild}=this.props.child
          // const recId=isChild?this.props.child.selRec.record_id:this.props.records.selRec.record_id
          // console.log(this.props.editor.recDetails[0].record_id!==recId)
          this.dataBinder()
          //   const{recDetails:[{acl_entries,title,record_metadata:recMeta,parent_id,parent_title}]}=this.props.editor
          //   if(acl_entries!==undefined){this.generateAcl(acl_entries)}
          //   const {section_field:sectionField} = recMeta.find(secField=>secField.section_id==='sect-a32f4499b07c490bb5600b45d877e1c0')

          //   const {value:notes} = sectionField.find(cusField=>cusField.custom_field_id==='notes')
          //   this.setState({
          //     title:title,
          //     containerVal:{ value:parent_id, label:parent_title},
          //     toVal: this.setEmailPerson(sectionField,'cfld-1c2ebc804af041b29f081861d0105a9b'),
          //     ccVal:this.setEmailPerson(sectionField,'cfld-764b2d1ee4024609933626b41f84bafa'),
          //     bccVal: this.setEmailPerson(sectionField,'cfld-785c5c7ddf6f49ce89774ca8513db43d'),
          //     notes:decodeURIComponent(notes)
          // })
          }

      }
      setEmailPerson(secObj,cfId){
        const {display} = secObj.find(cusField=>cusField.custom_field_id===cfId)
      return display.map(stakeh=>({value: stakeh.stakeholder_id, label: stakeh.full_name}))
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
    handleSelectChangeTo = (value) => {
      this.isChangeState()
      this.setState({ toVal:value })
    }
    handleSelectChangeCc = (value) => {
      this.isChangeState()
      this.setState({ ccVal:value })
    }
    handleSelectChangeBcc = (value) => {
      this.isChangeState()
      this.setState({ bccVal:value })
    }
    handleSelectChangeDocs = (value)=> {
      console.log(value)
      this.isChangeState()
      this.setState({ docsVal:value })
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
    handleSelectChangeFol = (value) => {
      this.setState({ containerVal:value })
      this.isChangeState()
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
    timeStamp=()=>{
        const today = new Date(),
              day = { weekday: "long", year: "numeric", month: "short",day: "numeric" }
        const{user:{stakeholder_name}}=this.props.session
          const userStamp=`${today.toLocaleTimeString("en-my",day)} ${stakeholder_name} : `
          const notes=this.state.notes
          this.setState({notes:notes===''?userStamp:notes+'\n'+userStamp})
          this.isChangeState()
      }
      formSubmit = (e) =>{
        e.preventDefault()
        const {title,containerVal:{value:parentId},
          aclMod,aclRem,aclAcl,aclView,toVal, ccVal, bccVal, notes}=this.state
          const {recDetails:[{record_id:recId, record_no:recNo}],activeEditor}=this.props.editor
          const {user:{bio_access_id:bId}}=this.props.session

          const payload =(activeEditor==='email')?emailSkeleton:documentSkeleton,
                notify = (activeEditor==='email')?'Y':null,
                attach = (activeEditor==='email')?['Attach']:null,
                emailTo = (activeEditor==='email')?toVal.map(stakeh=>stakeh.value):null,
                emailCc = (activeEditor==='email')?ccVal.map(stakeh=>stakeh.value):null,
                emailBcc = (activeEditor==='email')?bccVal.map(stakeh=>stakeh.value):null,
                emailNotes = (activeEditor==='email')?notes:null

          const {record_metadata:recMeta} = payload

          const generalSecIdx=recMeta.findIndex(meta=>meta.section_id==='sect-5d549030476b44d882227c0dbf8922d1'),
                csRecNoIdx = recMeta[generalSecIdx].section_field.findIndex(sf => sf.custom_field_id === 'record_no'),
                csTitleIdx = recMeta[generalSecIdx].section_field.findIndex(sf => sf.custom_field_id === 'title'),
                csParIdIdx = recMeta[generalSecIdx].section_field.findIndex(sf => sf.custom_field_id === 'parent_id')


          const recUpdate = update(payload,{
            record_id:{$set:recId},
            parent_id:{$set:parentId},
            record_no:{$set:recNo},
            title:{$set:encodeURIComponent(title)},
            bio_access_id:{$set:bId},
            record_metadata:{
                [generalSecIdx]:{
                    section_field:{
                        [csRecNoIdx]:{value:{$set:recNo}},
                        [csTitleIdx]:{value:{$set:encodeURIComponent(title)}},
                        [csParIdIdx]:{value:{$set:parentId}}
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
            console.log(activeEditor)
            if(activeEditor==='email'){
            const emailSecIdx=recMeta.findIndex(meta=>meta.section_id==='sect-a32f4499b07c490bb5600b45d877e1c0'),
              emailToIdx = recMeta[emailSecIdx].section_field.findIndex(sf => sf.custom_field_id === 'cfld-1c2ebc804af041b29f081861d0105a9b'),
              emailCcIdx = recMeta[emailSecIdx].section_field.findIndex(sf => sf.custom_field_id === 'cfld-764b2d1ee4024609933626b41f84bafa'),
              emailBccIdx = recMeta[emailSecIdx].section_field.findIndex(sf => sf.custom_field_id === 'cfld-785c5c7ddf6f49ce89774ca8513db43d'),
              emailNotifyIdx = recMeta[emailSecIdx].section_field.findIndex(sf => sf.custom_field_id === 'cfld-aee9f2093fe24fe6a231135e8157ecde'),
              emailAttachIdx = recMeta[emailSecIdx].section_field.findIndex(sf => sf.custom_field_id === 'cfld-c8b7853f3144444086ba902a552ee886'),
              emailnoteIdx = recMeta[emailSecIdx].section_field.findIndex(sf => sf.custom_field_id === 'notes')

            const emailRec= update(recUpdate,{
              acl_entries:{$set:res.length===0?null:res},
              record_metadata:{
                [emailSecIdx]:{
                  section_field:{
                    [emailToIdx]:{value:{$set:emailTo}},
                    [emailCcIdx]:{value:{$set:emailCc}},
                    [emailBccIdx]:{value:{$set:emailBcc}},
                    [emailNotifyIdx]:{value:{$set:notify}},
                    [emailAttachIdx]:{value:{$set:attach}},
                    [emailnoteIdx]:{value:{$set:emailNotes}}
                  }
                }
              }
            })
            // console.log(emailRec)
            this.props.saveRecord(emailRec,'document')
            this.props.toggleLoader(true)
            this.props.setLoaderText('Sending Email...')
            console.log('Sending Email')

          }else{
            const recAddAcl = update(recUpdate,{
              acl_entries:{$set:res.length===0?null:res}
            })

            this.props.saveRecord(recAddAcl,'document')
            this.props.toggleLoader(true)
            this.props.setLoaderText('Update Document...')
            // this.updateRecord(recAddAcl, 'Saving Document')
            console.log('Saving Document')
          }
          })

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
  render() {
    const{recDetails,activeEditor}=this.props.editor
    const{isChild}=this.props.child
    const activeRec = isChild?this.props.child:this.props.records
    const{selRec:{record_type_title},canACL,canUpdate}=activeRec
    const dateCreated = recDetails.length!==0?recDetails[0].date_created:''
    const{title}=this.state
    return (
        <>
        <h1 className="h3 display text-primary text-center">Document information and accessibility</h1>
        <form className="mt-3" onSubmit={this.formSubmit}>
            <div className="row justify-content-center mb-5">
            <div className="col-xl-3 col-lg-4 col-md-4">
            <div className="text-center">
            <img src={require(`../../img/${record_type_title}.svg`)} alt='document'className=" img-dash" />
            <p className="card-text mt-2"><small className="text-muted">Created: {dateCreated}</small></p>
            </div>

            </div>
            <div className="col-xl-9 col-lg-8 col-md-8 col-sm-2">
                <div className={activeEditor==='updateDoc'?"form-group":"d-none"}>
                <label>Title</label>
                <input
                name='title'
                type="text"
                placeholder="Title"
                className="form-control"
                value={decodeURIComponent(title)}
                onChange={this.handleInputChange}
                />
                </div>
                <div className={activeEditor==='updateDoc'?"form-group":"d-none"}>
                <label>Folder</label>
                <AsyncSearchCombo
                  changeVal ={this.handleSelectChangeFol}
                  val={this.state.containerVal}
                  />
                </div>

                <div className={activeEditor==='email'?"form-group":"d-none"}>
                <label>To</label>
                <Select
                isMulti
                name="toVal"
                placeholder="Select Email's Recipients"
                value={this.state.toVal}
                onChange={this.handleSelectChangeTo}
                options={this.state.stakeh}
                components={{ Option }}
                />
                </div>
                <div className={activeEditor==='email'?"form-group":"d-none"}>
                <label>Cc</label>
                <Select
                name="ccVal"
                placeholder="Select Email's CC Recipients"
                isMulti
                value={this.state.ccVal}
                onChange={this.handleSelectChangeCc}
                options={this.state.stakeh}
                components={{ Option }}
                />
                </div>
                <div className={activeEditor==='email'?"form-group":"d-none"}>
                <label>Bcc</label>
                <Select
                name="bccVal"
                placeholder="Select Email's BCC Recipients"
                isMulti
                value={this.state.bccVal}
                onChange={this.handleSelectChangeBcc}
                options={this.state.stakeh}
                components={{ Option }}
                />
                </div>

            </div>
            <div className={activeEditor==='updateDoc'?canACL?"col-lg-6 col-md-6 col-sm-2":"d-none":"d-none"}>
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
            <div className={activeEditor==='updateDoc'?canACL?"col-lg-6 col-md-6 col-sm-2":"d-none":"d-none"}>
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

            <div className="col-lg-12 col-md-12 col-sm-2">
            <div className={activeEditor==='email'?"form-group":"d-none"}>
                <label>Notes</label>
                <button type="button" className="btn btn-xs btn-primary ml-2" onClick={this.timeStamp} >
                  <i className="fa fa-history" aria-hidden="true"></i>
                </button>
                <textarea className="form-control form-control-sm" name="notes" rows="3" onChange={this.handleInputChange} value={this.state.notes} ></textarea>
              </div>
            </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className={canUpdate?"btn btn-primary":"d-none"} disabled={!this.state.isChange}>Save</button>
              <button type="button" className="btn btn-secondary" onClick={this.props.onClose}>Close</button>
            </div>
        </form>
        <Loader/>
      </>
    )
  }
}
TabDocEditor.propTypes={
    records: PropTypes.object.isRequired,
    layout: PropTypes.object.isRequired,
    editor: PropTypes.object.isRequired,
    stakeh: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
    getRecDetails:PropTypes.func.isRequired,
    saveRecord:PropTypes.func.isRequired,
    toggleLoader:PropTypes.func.isRequired,
    setLoaderText:PropTypes.func.isRequired,
    // setLoaderText:PropTypes.func.isRequired
  }
const mapStateToProps = (state) => ({
    layout:state.layout,
    session:state.session,
    stakeh:state.stakeholder,
    editor:state.editor,
    records:state.records,
    child:state.childConf
})


export default connect(mapStateToProps,{
  getRecDetails,
  saveRecord,
  toggleLoader,
  setLoaderText})(TabDocEditor)
