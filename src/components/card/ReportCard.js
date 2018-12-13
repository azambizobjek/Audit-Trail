import React, { Component,Fragment } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { setActivePage} from '../../actions/layoutInitAction'
import { toggleAdv } from '../../actions/modalAction'
import posed from 'react-pose';
import { Form, Card, CardImg, Button } from 'reactstrap'


 function ReportCard() {


  setActivePage=(e)=>{
    e.preventDefault()
    const pgName = e.target.getAttribute('data-pagename')
    this.props.setActivePage(pgName)

   if(pgName==='printReport'){
        this.props.toggleAdv(true)
      }
      else if(pgName==='printStat'){
        this.props.toggleAdv(true)
      }
      else if(pgName==='printUsage'){
        this.props.toggleAdv(true)
      }
}


    const PoseCmp = posed.div({
      hoverable: true,
      pressable: true,
      init: {
        scale: 1,
        boxShadow: '0px 0px 0px rgb(0, 0, 0)'
      },
      hover: {
        scale: 1.2,
        boxShadow: '0px 5px 10px rgb(0, 0, 0)'
      },
      press: {
        scale: 1.1,
        boxShadow: '0px 2px 5px rgb(0, 0, 0)'
      }
    });

    return (

    <div className="col-6 col-md-4 col-lg-2 col-xl-2">
    <PoseCmp>
    <Card  data-pagename="printUsage" onClick={this.setActivePage}>
    <div className="text-center">
    <img data-pagename="printReport" top width="100%" src={require(`../../img/letter.svg`)}  alt="doc" className="img-card mt-2"/>
    </div>
    <div className="card-body">
        <hr/>
        <p data-pagename="printReport" className={`card-title mb-1 font-weight-bold text-truncate `} className="text-center">List of Records Report</p>
    </div>
    </Card>
    </PoseCmp>
</div>
     
    )
  }

ReportCard.propTypes={
    setActivePage: PropTypes.func.isRequired,
    toggleAdv: PropTypes.func.isRequired,
  
  }
  
  export default connect({setActivePage, toggleAdv })(ReportCard)

  