import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {getListAudit} from '../../actions/auditAction'
import {BarChart} from 'react-easy-chart';



class ComponentToPrint extends Component {


  render() {
    return (
      <Fragment>
        <section>

                     


        <div className="col-lg-12">
        {/* {/* <div className="card"> */}
        <div className="card-body">



                 <div className="card data-usage">
                <h2 className="display h4">Monthly Usage</h2>
                <div className="row d-flex align-items-center">
                  <div className="col-sm-6">
                    <div  className="d-flex align-items-center justify-content-center"> 
           
                
                     <img src={require(`../../img/bar.png`)} alt="Card image cap" className="img-card mt-2"/>
                    
                  
                    </div>
                  </div>
                  <div className="col-sm-6"><strong className="text-primary">75.00 Gb</strong><small>Current Plan</small><span>100 Gb Monthly</span></div>
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
              </div>

        {/* </div> */}
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


