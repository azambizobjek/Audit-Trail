import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Breadcrumb from '../layout/Breadrumb'
import AuditSearch from '../modal/AuditSearch'
import 'react-datepicker/dist/react-datepicker.css'

import Tooltip from 'rc-tooltip'
import moment from 'moment'
// import {getListErrBatch} from '../../actions/logAction'
import {getListAudit} from '../../actions/auditAction'

import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component'


class index extends Component {

  constructor(){
    super()
    
    this.state={
        
        startdate : moment().startOf( 'months'),
        endate : moment().endOf('months'),
        lastevent : moment().subtract(10, 'days').calendar()
    }
}


  searchLogByToday =()=>{
    const {user:{bio_access_id:bId}}=this.props.session
    const param = {
        action: "SEARCH_AUDIT_LOG",
        bio_access_id: bId,
        action_types:[],
        date_from: moment().format('DD/MM/YYYY'),
        date_to: moment().format('DD/MM/YYYY'),
        stakeholder_id:null,
        record_id:null
    }
    this.props.getListAudit(param)
    console.log('Today Search')
    console.log(param)
  }

  
  searchLast20Events =()=>{
    const {lastevent}=this.state
    const {user:{bio_access_id:bId}}=this.props.session
    const param = {
        action: "SEARCH_AUDIT_LOG",
        bio_access_id: bId,
        action_types:[],
        date_from:moment(lastevent).format('DD/MM/YYYY'),
        date_to: moment().format('DD/MM/YYYY'),
        stakeholder_id:null,
        record_id:null
    }
    this.props.getListAudit(param)
    console.log('Last 20 Events')
    console.log(param)
  }

  searchLogThisMonth =()=>{
    const {startdate, endate}=this.state
    const {user:{bio_access_id:bId}}=this.props.session
    const param = {
        action: "SEARCH_AUDIT_LOG",
        bio_access_id: bId,
        action_types:[],
        date_from: moment(startdate).format('DD/MM/YYYY'),
        date_to:moment(endate).format('DD/MM/YYYY'),
        stakeholder_id:null,
        record_id:null
    }
    this.props.getListAudit(param)
    console.log('This Month')
    console.log(param)
  }

  searchLogAll =()=>{
    const {user:{bio_access_id:bId}}=this.props.session
    const param = {
        action: "SEARCH_AUDIT_LOG",
        bio_access_id: bId,
        action_types:[],
        date_from: moment('2018-01-01').format('DD/MM/YYYY'),
        date_to: moment().format('DD/MM/YYYY'),
        stakeholder_id:null,
        record_id:null
    }
    this.props.getListAudit(param)
    console.log('Today Search')
    console.log(param)
  }


  render() {
      const {audit}=this.props.auditlog

    return (
        <Fragment>
        <div className="breadcrumb-holder">
            <div className="container-fluid">
            <Breadcrumb/>
            </div>
        </div>


        <section>
            <div className="container-fluid">
                <header>
                <div className="d-flex align-items-center justify-content-between">

                    <h1 className="h3 display">Audit Log Search</h1>
                    <div className="d-flex align-items-center">

                    <Tooltip
                    placement="top"overlay={<div style={{ height: 20, width: '100%' }}>Search By Today</div>}
                    arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                    >
                    <button className="btn btn-sm btn-primary" onClick={this.searchLogByToday} >
                    <i className="fa fa-folder"></i>
                    </button>
                    </Tooltip>
                    
                    <Tooltip
                    placement="top"
                    overlay={<div style={{ height: 20, width: '100%' }}>Last 20 Events</div>}
                    arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                    >
                    <button className="btn btn-sm btn-primary ml-2" onClick={this.searchLast20Events} >
                    <i className="fa fa-th-list"></i>
                    </button>
                    </Tooltip>
                    
                    <Tooltip
                    placement="top"
                    overlay={<div style={{ height: 20, width: '100%' }}>Search This Month</div>}
                    arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                    >
                    <button className="btn btn-sm btn-primary ml-2" onClick={this.searchLogThisMonth} >
                    <i className="fa fa-th"></i>
                    </button>
                    </Tooltip>
                    
                    <Tooltip
                    placement="top"
                    overlay={<div style={{ height: 20, width: '100%' }}>Search All</div>}
                    arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                    >
                    <button className="btn btn-sm btn-primary ml-2" onClick={this.searchLogAll} >
                    <i className="fa fa-sort-amount-asc"></i>
                    </button>
                    </Tooltip>
                    
                    </div>
                    </div>
                    </header>

                
       
                <div className="row">
              
                <VerticalTimeline>{audit.map((itm,idx)=>
                <VerticalTimelineElement key={idx}
                className="vertical-timeline-element--work"
                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                icon={ <img src={require(`../../img/${itm.action_type}.svg`)} alt={itm.action_type}/> }
                >

            <h5 className="vertical-timeline-element-title">{itm.audit_type}</h5>

                <div className="d-flex mt-2">
                      <p className="userIcon"><img src={require(`../../img/clock.svg`)} alt='' className="img-fluid pr-1"/></p>
                      <p className="vertical-timeline-element-title">{new Date(itm.date_updated).toLocaleString("en-my")}</p>
                    </div>

                    {/* <div className="d-flex mt-2">
                      <small className="userIcon"><img src={require(`../../img/user.svg`)} alt='' className="img-fluid pr-1"/></small>
                      <small className="vertical-timeline-element-title">{decodeURIComponent(itm.details)}</small>
                    </div> */}

            <small>{decodeURIComponent(itm.details)}</small>

                </VerticalTimelineElement> 
                )}
                </VerticalTimeline>
                </div>
            </div>
        </section>
        
        <AuditSearch/>
    </Fragment>
    )
  }
}
index.propTypes={
    auditlog: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
    getListAudit:PropTypes.func.isRequired,


  }
  const mapStateToProps= state =>({
    auditlog:state.auditlog,
    session:state.session,

  })
export default connect(mapStateToProps, {getListAudit})(index)









