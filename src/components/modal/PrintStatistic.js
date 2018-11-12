import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import ReactToPrint from "react-to-print";
import Tooltip from 'rc-tooltip'
import {getListAudit} from '../../actions/auditAction'
import Breadcrumb from '../layout/Breadrumb'
import ComponentPrintStat from './ComponentPrintStat';


class PrintReport extends Component {

     


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
                 <ComponentPrintStat ref={el => (this.componentRef = el)} />
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


