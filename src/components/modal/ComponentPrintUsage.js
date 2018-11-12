import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {getListAudit} from '../../actions/auditAction'


class ComponentToPrint extends Component {


  render() {
    return (
      <Fragment>
        <section>

                 <div class="card data-usage">
                <h2 class="display h4">Monthly Usage</h2>
                <div class="row d-flex align-items-center">
                  <div class="col-sm-6">
                    <div  class="d-flex align-items-center justify-content-center">
                    <img src={require(`../../img/circle.png`)}/>
                    </div>
                  </div>
                  <div class="col-sm-6"><strong class="text-primary">75.00 Gb</strong><small>Current Plan</small><span>100 Gb Monthly</span></div>
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
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


