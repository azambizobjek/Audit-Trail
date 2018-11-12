import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import ReactToPrint from "react-to-print";
import ComponentToPrint from '../modal/ComponentToPrint'
import Tooltip from 'rc-tooltip'
import {getListAudit} from '../../actions/auditAction'
import Breadcrumb from '../layout/Breadrumb'
import { Form } from 'reactstrap'
import moment from 'moment'

class PrintReport extends Component {

     
  formSubmit=(e)=>{
    e.preventDefault()
    const {user:{bio_access_id:bId}}=this.props.session
    const param = {
        action: "SEARCH_AUDIT_LOG",
        bio_access_id: bId,
        action_types:[],
        date_from: moment('2018-01-01').format('DD/MM/YYYY'),
        date_to: moment().format('DD/MM/YYYY'),
        stakeholder_id:null,
        record_id:null,
    }
    this.props.getListAudit(param)

}

  render() {

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
                     <h1 className="h3 display">Print Audit Report</h1>

                           <div className="d-flex align-items-center">
                           <Tooltip
                           placement="top"overlay={<div style={{ height: 20, width: '100%' }}>Search</div>}
                           arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                           >
                           <button className="btn btn-sm btn-primary" onClick={this.formSubmit} >
                           <i className="fa fa-folder"></i>
                           </button>
                           </Tooltip>


                  <Tooltip
                        placement="top" overlay={<div style={{ height: 20, width: '100%' }}>Print</div>}
                        arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                        >
                        <ReactToPrint
                        trigger={() =>  <button className="btn btn-sm btn-primary ml-2"  href="#">
                        <i className="fa fa-print"></i>
                        </button>}
                        content={() => this.componentRef}
                        />
                    </Tooltip> 



</div>
                 
                    
                </div>
                </header>

                 <div className="row">
                 <ComponentToPrint ref={el => (this.componentRef = el)} />
                </div>

                </div>
            </section>
    </Fragment>
    )
  }
}

PrintReport.propTypes={
    auditlog: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
    getListAudit:PropTypes.func.isRequired,
  
  
  }
  const mapStateToProps= state =>({
    auditlog:state.auditlog,
    session:state.session,
  
  })
  export default connect(mapStateToProps, {getListAudit})(PrintReport)


