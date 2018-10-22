import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Select from 'react-select'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

import { connect } from 'react-redux'
import { toggleErr } from '../../actions/modalAction'
import { getStakehList } from '../../actions/stakehAction'
import { getListErrBatch } from '../../actions/logAction'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Form, FormGroup  } from 'reactstrap'

class ErrLog extends Component {
    constructor(){
        super()
        this.state={
            startDate: moment(),
            endDate: moment(),
            stakehVal:null
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

    formSubmit=(e)=>{
        e.preventDefault()
        const {startDate, endDate, stakehVal}=this.state
        const {user:{bio_access_id:bId}}=this.props.session
        const param = {
            action: "SEARCH_BATCHLOAD_LOG",
            bio_access_id: bId,
            record_type_title: "document",
            date_from: moment(startDate).format('DD/MM/YYYY'),
            date_to: moment(endDate).format('DD/MM/YYYY'),
            stakeholder_id:stakehVal===null?null:stakehVal.value
        }
        this.props.getListErrBatch(param)
        this.props.toggleErr(false)

    }

  render() {
    const{showErr}=this.props.modal
    return (
      <div>
        <Modal isOpen={showErr} toggle={this.toggle} className={this.props.className}>
            <Form onSubmit={this.formSubmit}>
            <ModalHeader toggle={this.toggle}>Search Error Log</ModalHeader>
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
                    <label>Files Owner</label>
                    <Select
                    name="stakeh"
                    placeholder="Select persons"
                    loadingPlaceholder="Loading.."
                    value={this.state.stakehVal}
                    onChange={this.handleSelectChangeStakeh}
                    options={this.state.stakeh}
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
ErrLog.propTypes={
    modal:PropTypes.object.isRequired,
    toggleErr:PropTypes.func.isRequired,
    getStakehList:PropTypes.func.isRequired,
    getListErrBatch:PropTypes.func.isRequired
  }
const mapStateToProps = (state) => ({
  modal:state.modalConf,
  session:state.session,
  stakeh:state.stakeholder
})
export default connect(mapStateToProps,{toggleErr,getStakehList,getListErrBatch})(ErrLog)


