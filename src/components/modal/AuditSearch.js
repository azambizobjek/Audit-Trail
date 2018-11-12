import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

import { connect } from 'react-redux'
import { toggleErr } from '../../actions/modalAction'
import { getStakehList } from '../../actions/stakehAction'
import { getRecordList } from '../../actions/recAction'
import { getActionTypes } from '../../actions/eventAction'
import {getListAudit} from '../../actions/auditAction'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Form, FormGroup  } from 'reactstrap'


class AuditSearch extends Component {
    constructor(){
        super()
        this.state={
            startDate: moment(),
            endDate: moment(),
            stakehVal:null,
            recordVal:null,
            actionVal:[]


        }
    }
    componentDidMount(){
        const {user:{bio_access_id:bId}}=this.props.session
        const {stakehList}=this.props.stakeh
        if(stakehList.length === 0){this.props.getStakehList({bio_access_id:bId,action:'ITEM_LIST'})}
        
        const {recordList}=this.props.record
        if(recordList.length === 0){this.props.getRecordList({bio_access_id:bId,action:'ITEM_LIST'})}

        const {actionTypes}=this.props.actionTy
        if(actionTypes.length === 0){this.props.getActionTypes({bio_access_id:bId,action:'ACTION_TYPES'})}
    }
    componentDidUpdate(prevProps){

        if (prevProps.stakeh.stakehList !== this.props.stakeh.stakehList) {
            console.log('update')
            const {stakehList}=this.props.stakeh
            const stakeholder = stakehList.map(itm => ({ value: itm.stakeholder_id, label: itm.full_name, stakehType:itm.stakeh_type, stakehTypeName:itm.stakeh_type_name.toLowerCase()}))
            this.setState({stakeh: stakeholder})
  
          }

        if (prevProps.record.recordList !== this.props.record.recordList) {
            console.log('update')
            const {recordList}=this.props.record
            const record = recordList.map(itm => ({ value: itm.record_id, label: itm.title, recordNo:itm.record_no, recordType: itm.record_type}))
            this.setState({record: record})
  
          }

          if (prevProps.actionTy.actionTypes !== this.props.actionTy.actionTypes) {
            console.log('update')

            const {actionTypes}=this.props.actionTy
            const actionTy = actionTypes.map(itm => ({ value: itm.id, label:itm.name}))
            this.setState({actionTy: actionTy})
  
          }

    }
    toggle=()=> {
        const{showErr}=this.props.modal
        this.props.toggleErr(!showErr)
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


    handleSelectChangeStakeh = (value)=> this.setState({ stakehVal:value})

    handleSelectChangeRecord = (value)=> this.setState({ recordVal:value})

    handleSelectChangeAction = (value)=> this.setState({ actionVal:value})



    formSubmit=(e)=>{
        e.preventDefault()
        const {actionVal, startDate, endDate, stakehVal, recordVal}=this.state
        const selAction=actionVal.map((itm )=> itm.value)
        const {user:{bio_access_id:bId}}=this.props.session
        const param = {
            action: "SEARCH_AUDIT_LOG",
            bio_access_id: bId,
            action_types:selAction,
            date_from: moment(startDate).format('DD/MM/YYYY'),
            date_to: moment(endDate).format('DD/MM/YYYY'),
            stakeholder_id:stakehVal===null?null:stakehVal.value,
            record_id:recordVal===null?null:recordVal.value,
        }
        this.props.getListAudit(param)
        this.props.toggleErr(false)

    }

  render() {
    const{showErr}=this.props.modal
    

    return (
      <div>
        <Modal isOpen={showErr} toggle={this.toggle} className={this.props.className}>
            <Form onSubmit={this.formSubmit}
            >
            <ModalHeader toggle={this.toggle}>Audit Log Search</ModalHeader>
            <ModalBody>

                <FormGroup>
                    <label>Event Types</label>
                    <Select
                    name="actionTy"
                    placeholder="Select types"
                    loadingPlaceholder="Loading.."
                    value={this.state.actionVal}
                    onChange={this.handleSelectChangeAction}
                    options={this.state.actionTy}
                    isClearable={true}
                    isMulti
                    />
                </FormGroup>




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
                    <label>Stakeholder</label>
                    <Select
                    name="stakeh"
                    placeholder="Select stakeholder"
                    loadingPlaceholder="Loading.."
                    value={this.state.stakehVal}
                    onChange={this.handleSelectChangeStakeh}
                    options={this.state.stakeh}
                    isClearable={true}
                    />
                </FormGroup>

                  <FormGroup>
                    <label>Record No.</label>
                    <Select
                    name="record"
                    placeholder="Select record no."
                    loadingPlaceholder="Loading.."
                    value={this.state.recordVal}
                    onChange={this.handleSelectChangeRecord}
                    options={this.state.record}
                    isClearable={true}
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
AuditSearch.propTypes={
    modal:PropTypes.object.isRequired,
    toggleErr:PropTypes.func.isRequired,
    getStakehList:PropTypes.func.isRequired,
    getListAudit:PropTypes.func.isRequired,
    getRecordList : PropTypes.func.isRequired,
    getActionTypes : PropTypes.func.isRequired

  }
const mapStateToProps = (state) => ({
  modal:state.modalConf,
  session:state.session,
  stakeh:state.stakeholder,
  record:state.record,
  actionTy:state.actionTy

})
export default connect(mapStateToProps,
    {toggleErr,
    getStakehList,
    getRecordList,
    getActionTypes,
    getListAudit})
    (AuditSearch)


