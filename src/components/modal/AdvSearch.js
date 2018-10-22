import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Select, {components} from 'react-select'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

import { toggleAdv } from '../../actions/modalAction'
import { getStakehList } from '../../actions/stakehAction'
import { getAdvSearch } from '../../actions/searchAction'
import {setPageTitle} from '../../actions/recordAction'

import {folderRecId,documentRecId} from '../../config'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Form, FormGroup } from 'reactstrap'

const Option = (props) => {
    return (
      <div className="d-flex align-middle">
        <div className="boIcon ml-1 mr-1"><img src={require(`../../img/${props.data.stakehTypeName}.svg`)} alt="bizobjek" className="img-fluid" /></div>
        <components.Option {...props}/>
      </div>
    )
}

class AdvSearch extends Component {
    constructor () {
        super()
        this.state = {
          startDate: moment(),
          endDate: moment(),
          stakehVal:[],
          recTypeList:[
            {label:'Folder', value:folderRecId},
            {label:'Document', value:documentRecId}
          ],
          recTypeVal:[]
        }
      }
    componentDidMount(){
        const {user:{bio_access_id:bId}}=this.props.session
        const {stakehList}=this.props.stakeh
        if(stakehList.length === 0){this.props.getStakehList({bio_access_id:bId,action:'ITEM_LIST'})}

    }
    componentDidUpdate(prevProps){

        if (prevProps.stakeh.stakehList !== this.props.stakeh.stakehList) {
          console.log('update')
          const {stakehList}=this.props.stakeh
          const stakeholder = stakehList.map(itm => ({ value: itm.stakeholder_id, label: itm.full_name, stakehType:itm.stakeh_type, stakehTypeName:itm.stakeh_type_name.toLowerCase()}))
          this.setState({stakeh: stakeholder})

        }
      }
    handleChange = ({ startDate, endDate }) => {
        startDate = startDate || this.state.startDate
        endDate = endDate || this.state.endDate

        if (startDate.isAfter(endDate)) {
          endDate = startDate
        }
        this.setState({ startDate, endDate })
      }

    handleChangeStart = (startDate) => this.handleChange({ startDate })

    handleChangeEnd = (endDate) => this.handleChange({ endDate })

    handleSelectChangeStakeh = (value)=> {
        this.setState({ stakehVal:value})
    }
    handleSelectChangerecType=(value)=>{
        this.setState({ recTypeVal:value})
    }

    toggle=()=> {
        const{showAdv}=this.props.modal
        this.props.toggleAdv(!showAdv)
      }
    formSubmit=(e)=>{
    e.preventDefault()
    const{user:{bio_access_id:bId}}=this.props.session
    const{startDate,endDate,stakehVal,recTypeVal}=this.state
    const listofowner=stakehVal.length>0?stakehVal.map(stakeh=>`owner_id:%22quostr%3B${stakeh.value}%22quostr%3B`).reduce((a,b)=>`${a}||${b}`):''
    const recTypeList=recTypeVal.length>0?recTypeVal.map(rec=>rec.value):''

    const params={
        bio_access_id:bId,
        action:'ADVANCED_SEARCH_PAGING',
        query:`date_created:%22quostr%3B${moment(startDate).format('DD/MM/YYYY')}%22quostr%3BTO%22quostr%3B${moment(endDate).format('DD/MM/YYYY')}%22quostr%3B${listofowner!==''?'&&'+listofowner:''}`
    }
    if(recTypeList.length>0){params.record_type_ids=recTypeList}
    this.props.getAdvSearch(params,{page:1,start:0,limit:20})
    this.props.setPageTitle('Advance Search')
    this.props.toggleAdv(false)
    // console.log(params)

    }
  render() {
      const{showAdv}=this.props.modal
    return (
        <div>
       <Modal isOpen={showAdv} toggle={this.toggle} className={this.props.className}>
       <Form onSubmit={this.formSubmit}>
            <ModalHeader toggle={this.toggle}>Advance Search</ModalHeader>
            <ModalBody>
                    <FormGroup>
                        <label>Date Start</label>
                        <DatePicker
                            placeholder="Date Start"
                            selected={this.state.startDate}
                            selectsStart
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            onChange={this.handleChangeStart}
                            className="form-control"
                            dateFormat="DD/MM/YYYY"
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Date End</label>
                        <DatePicker
                            placeholder="Date End"
                            selected={this.state.endDate}
                            selectsEnd
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            onChange={this.handleChangeEnd}
                            className="form-control"
                            dateFormat="DD/MM/YYYY"
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>File Type</label>
                        <Select
                            name="recType"
                            placeholder="Select file type"
                            value={this.state.recTypeVal}
                            isMulti
                            onChange={this.handleSelectChangerecType}
                            options={this.state.recTypeList}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Files Owner</label>
                        <Select
                        name="stakeh"
                        placeholder="Select persons"
                        isMulti
                        loadingPlaceholder="Loading.."
                        value={this.state.stakehVal}
                        onChange={this.handleSelectChangeStakeh}
                        options={this.state.stakeh}
                        components={{ Option }}
                        />
                    </FormGroup>
            </ModalBody>
            <ModalFooter>
            <Button type="submit" color="primary">Search</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
        </Form>
       </Modal>
     </div>
    )
  }
}

AdvSearch.propTypes={
    modal:PropTypes.object.isRequired,
    session:PropTypes.object.isRequired,
    stakeh:PropTypes.object.isRequired,
    toggleAdv:PropTypes.func.isRequired,
    getStakehList:PropTypes.func.isRequired,
    getAdvSearch:PropTypes.func.isRequired,
    setPageTitle:PropTypes.func.isRequired
  }
const mapStateToProps = (state) => ({
  modal:state.modalConf,
  session:state.session,
  stakeh:state.stakeholder
})
export default connect(mapStateToProps,{toggleAdv,getStakehList,getAdvSearch,setPageTitle})(AdvSearch)
