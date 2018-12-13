import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {getListAudit} from '../../actions/auditAction'


class ComponentToPrint extends Component {

  
 

  render() {
    const {audit}=this.props.auditlog
    console.log(audit)

    const auditID = audit.map((itm,idx)=>  {
      return <p key={idx}> 
      {itm.audit_id}
      </p>
    })

      const audittype = audit.map((itm,idx)=>  {
        return <p key={idx}> 
        {itm.audit_type}
        </p>
        })

        const username = audit.map((itm,idx)=>  {
          return <p key={idx}> 
          {itm.user_name}
          </p>
          })

          const updatedby = audit.map((itm,idx)=>  {
            return <p key={idx}> 
            {itm.updated_by}
            </p>
            })

   

        
    return (
      <Fragment>
        <section>

              <div className="card">
                <div className="card-header">
                  <h4>System Usage Report</h4>
                </div>
                <div className="card-body">

                {/* <button onClick={this.change}>Change State</button> */}

                  <div className="table-responsive">
                    <table  border="2" className="table table-striped">

                      <thead>
                        
           

                       <tr>
                          <th>Audit ID</th>
                          <th>Audit Type</th>
                          <th>Username</th>
                          <th>Updated By</th>
                      </tr>
                        
                      </thead>


                      <tbody> 
          

                      <tr>
                      <td>
                        <a> {auditID}</a> 
                        </td>
                        <td>
                        <a> {audittype}</a> 
                        </td>
                        <td>
                        <a> {username}</a> 
                        </td>
                        <td>
                        <a> {updatedby}</a> 
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


