import React, { Component,Fragment } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Breadcrumb from '../layout/Breadrumb'
import { setActivePage} from '../../actions/layoutInitAction'
import { toggleAdv } from '../../actions/modalAction'
import {getListAudit} from '../../actions/auditAction'
import { Form, Card, CardImg, Button } from 'reactstrap'
import moment from 'moment'



class PrintPage extends Component {

    setActivePage=(e)=>{
        e.preventDefault()
        const pgName = e.target.getAttribute('data-pagename')
        this.props.setActivePage(pgName)

        if(pgName==='print'){
            this.props.toggleAdv(true)
          }
        else if(pgName==='printReport'){
            this.props.toggleAdv(true)
          }
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
               
                    </div>
                    </header>


                  
                  <div className="row">
                  
                  <div className="col-sm-3">
                  <Card body>
                  <p><CardImg top width="100%" src={require(`../../img/letter.svg`)}  alt="doc" className="img-card mt-2" /></p>
                  <Button  
                  data-pagename="printReport" 
                  onClick={this.setActivePage}
                  type="submit" color="primary" >List of Records Report
                  </Button>
                  </Card>
                  </div>
           
                  
                  <div className="col-sm-3 ">
                  <Card body>
                  <p><CardImg top width="100%" src={require(`../../img/graph.svg`)}  alt="Card image cap" className="img-card mt-2" /></p>
                  <Button  
                  data-pagename="printStat" 
                  onClick={this.setActivePage}
                  type="submit" color="primary" >Record Statistic Report
                  </Button>
                  </Card>
                  </div>
                  
                  <div className="col-sm-3 ">
                  <Card body>
                  <p><CardImg top width="100%" src={require(`../../img/system.svg`)}  alt="Card image cap" className="img-card mt-2" /></p>
                  <Button  
                  data-pagename="printUsage" 
                  onClick={this.setActivePage}
                  type="submit" color="primary" >System Usage Report
                  </Button>
                  </Card>
                  </div>
                  
                  </div>              
            </div>
        </section>
      </Fragment>
    )
  }
}
PrintPage.propTypes={
    auditlog: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
    setActivePage: PropTypes.func.isRequired,
    toggleAdv: PropTypes.func.isRequired,
    getListAudit:PropTypes.func.isRequired,
  
  }
  const mapStateToProps= state =>({
    session:state.session,
    auditlog:state.auditlog

  
  })
  export default connect(mapStateToProps, {setActivePage, toggleAdv, getListAudit  })(PrintPage)

  