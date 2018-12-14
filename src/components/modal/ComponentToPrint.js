import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {getListAudit} from '../../actions/auditAction'


class ComponentToPrint extends Component {




  render() {
    const {audit}=this.props.auditlog
    console.log(audit)

    const reportID = audit.map((itm,idx)=>  {
      return <p key={idx}> 
      {itm.record_id}
      </p>
    })

      const actionType = audit.map((itm,idx)=>  {
        return <p key={idx}> 
        {itm.action_type}
        </p>
        })

        const recordType = audit.map((itm,idx)=>  {
          return <p key={idx}> 
          {itm.record_type}
          </p>
          })

          const dateUpdate = audit.map((itm,idx)=>  {
            return <p key={idx}> 
            {itm.date_updated}
            </p>
            })

   

        
    return (
      <Fragment>
        <section>

              <div className="card">
                <div className="card-header">
                  <h4>List of Records Report</h4>
                </div>
                <div className="card-body">

                {/* <button onClick={this.change}>Change State</button> */}

                  <div className="table-responsive">
                    <table  border="2" className="table table-striped">

                      <thead>
                        
           

                       <tr>
                          <th>Record ID</th>
                          <th>Action Type</th>
                          <th>Record Type</th>
                          <th>Date Update</th>
                      </tr>
                        
                      </thead>


                      <tbody> 
          

                      <tr>
                      <td>
                        <a>{reportID}</a> 
                        </td>
                        <td>
                        <a> {actionType}</a> 
                        </td>
                        <td>
                        <a> {recordType}</a> 
                        </td>
                        <td>
                        <a> {dateUpdate}</a> 
                        </td>
                      </tr>
         
                      </tbody>
                      
                    </table>
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


