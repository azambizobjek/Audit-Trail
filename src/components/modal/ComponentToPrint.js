import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {getListAudit} from '../../actions/auditAction'


class ComponentToPrint extends Component {

  
  // {elements.map((value, index) => {
  //   return <li key={index}>{value}</li>
  // })}

  render() {
    const {audit}=this.props.auditlog

    const reportID = audit.map((itm,idx)=>  {
      return <a key={idx}> 
      {itm.record_id}
      </a>
    })

      const actionType = audit.map((itm,idx)=>  {
        return <a key={idx}> 
        {itm.action_type}
        </a>
        })

        
    return (
      <Fragment>
        <section>

            <div className="col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h4>List of Records Report</h4>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table border="1" className="table table-striped">

                      <thead>
                        
                        {/* <tr >
                          <th>#</th>
                          <th>Record ID</th>
                          <th>Action Type</th>
                          <th>Record Type</th>
                          <th>Date Update</th>
                        </tr> */}

                        <tr>
                          <th>#</th>
                          <th>Record ID</th>
                          <th>Action Type</th>
                          <th>Record Type</th>
                          <th>Date Update</th>
                        </tr>
                        
                      </thead>


                      <tbody> 
                      {/* <th scope="row">1</th>
                      <tr>{audit.map((itm,idx)=>
                      <td key={idx}>
                      <a>{itm.action_type}</a>
                      </td> 
                      )}
                      </tr> */} 
                      

                      <tr>
                      <th scope="row">1</th>
                      
                      <td> 
                      <a> {reportID}</a> 
                      </td>

                      <td> 
                      <a> {actionType}</a> 
                      </td>


                       </tr>             
                      </tbody>
                      
                    </table>
                  </div>
                </div>
              </div>
            </div>

        </section>
  

        
      </Fragment>
    )
  }
}

ComponentToPrint.propTypes={
  auditlog: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
  getListAudit:PropTypes.func.isRequired,


}
const mapStateToProps= state =>({
  auditlog:state.auditlog,
  session:state.session,

})
export default connect(mapStateToProps, {getListAudit})(ComponentToPrint)


