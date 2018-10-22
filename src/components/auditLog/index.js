import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import Breadcrumb from '../layout/Breadrumb'
import ErrLog from '../modal/ErrLog'

import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component'


class index extends Component {
  render() {
      const {log}=this.props.errLog
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
                    <h1 className="h3 display">Error Log</h1>
                </header>
                <div className="row">
                <VerticalTimeline>
                     {log.map((itm,idx)=>
                     <VerticalTimelineElement key={idx}
                      className="vertical-timeline-element--work"
                      iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                      icon={ <img src={require(`../../img/warn.svg`)} alt=''/> }
                    >
                    <h5 className="vertical-timeline-element-title wordWrap">{decodeURIComponent(itm.record_title)}</h5>

                    <div className="d-flex mt-2">
                      <div className="userIcon"><img src={require(`../../img/clock.svg`)} alt='' className="img-fluid pr-1"/></div>
                      <div className="vertical-timeline-element-title">{new Date(itm.date_updated).toLocaleString("en-my")}</div>
                    </div>
                    <div className="d-flex mt-1 mb-1">
                    <div className="userIcon"><img src={require(`../../img/user.svg`)} alt='' className="img-fluid pr-1"/></div>
                    <div>{itm.stakeholder_name}</div>
                    </div>
                    <small className="wordWrap">{decodeURIComponent(itm.details)}</small>
                  </VerticalTimelineElement>)}
                </VerticalTimeline>

                </div>
            </div>
        </section>
        <ErrLog/>
    </Fragment>
    )
  }
}
index.propTypes={
    errLog: PropTypes.object.isRequired
  }
  const mapStateToProps= state =>({
    errLog:state.batchErrLog
  })
export default connect(mapStateToProps)(index)