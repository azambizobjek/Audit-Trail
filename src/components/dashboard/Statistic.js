import React from 'react'
import update from 'immutability-helper'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import ItemNew from './ItemNew'

import {fetchDashToday,fetchDashSum} from '../../actions/dashAction'
import {folderRecId,documentRecId} from '../../config'

class Statistic extends React.Component {

  componentDidMount(){
    const startOfMonth = moment().startOf('month').format('DD/MM/YYYY'),
          endOfMonth   = moment().endOf('month').format('DD/MM/YYYY'),
          startOfYear = moment().startOf('year').format('DD/MM/YYYY'),
          endOfYear   = moment().endOf('year').format('DD/MM/YYYY')

    const{user:{bio_access_id:bId}}=this.props.session
    const baseSearchParam={
      bio_access_id:bId,
      action:'ADVANCED_SEARCH_PAGING'
    }
    const batchLoadParam={
      bio_access_id:bId,
      action:'ITEM_LIST_BY_REC_TYPE',
      record_type_title:'Document'
    }
    const fToday = encodeURIComponent(JSON.stringify(
      update(baseSearchParam,{$merge:{
        ...baseSearchParam,
        query:`date_created:%22quostr%3B${moment().format('DD/MM/YYYY')}%22quostr%3B`,
        record_type_ids:[folderRecId]}})
    ))
    const dToday = encodeURIComponent(JSON.stringify(
      update(baseSearchParam,{$merge:{
        ...baseSearchParam,
        query:`date_created:%22quostr%3B${moment().format('DD/MM/YYYY')}%22quostr%3B`,
        record_type_ids:[documentRecId]}})
    ))
    const bToday = encodeURIComponent(JSON.stringify(batchLoadParam))

    const sToday = encodeURIComponent(JSON.stringify(
      update(baseSearchParam,{$merge:{
        ...baseSearchParam,
        query:`date_created:%22quostr%3B${moment().format('DD/MM/YYYY')}%22quostr%3B`,
        record_type_ids:[folderRecId,documentRecId]}})
    ))

    this.props.fetchDashToday(sToday,fToday,dToday,bToday,bToday)

    const folSumMonth = encodeURIComponent(JSON.stringify(
      update(baseSearchParam,{$merge:{
        ...baseSearchParam,
        query:`date_created:[%22quostr%3B${startOfMonth}%22quostr%3BTO%22quostr%3B${endOfMonth}%22quostr%3B]`,
        record_type_ids:[folderRecId]}})
    ))
    const docSumMonth = encodeURIComponent(JSON.stringify(
      update(baseSearchParam,{$merge:{
        ...baseSearchParam,
        query:`date_created:[%22quostr%3B${startOfMonth}%22quostr%3BTO%22quostr%3B${endOfMonth}%22quostr%3B]`,
        record_type_ids:[documentRecId]}})
    ))
    const folSumYear = encodeURIComponent(JSON.stringify(
      update(baseSearchParam,{$merge:{
        ...baseSearchParam,
        query:`date_created:[%22quostr%3B${startOfYear}%22quostr%3BTO%22quostr%3B${endOfYear}%22quostr%3B]`,
        record_type_ids:[folderRecId]}})
    ))
    const docSumYear = encodeURIComponent(JSON.stringify(
      update(baseSearchParam,{$merge:{
        ...baseSearchParam,
        query:`date_created:[%22quostr%3B${startOfYear}%22quostr%3BTO%22quostr%3B${endOfYear}%22quostr%3B]`,
        record_type_ids:[documentRecId]}})
    ))

    const sumYear = encodeURIComponent(JSON.stringify(
      update(baseSearchParam,{$merge:{
        ...baseSearchParam,
        query:`date_created:[%22quostr%3B${startOfYear}%22quostr%3BTO%22quostr%3B${endOfYear}%22quostr%3B]`,
        record_type_ids:[folderRecId,documentRecId]}})
    ))
    this.props.fetchDashSum(folSumMonth, docSumMonth, folSumYear, docSumYear, sumYear)



  }
  showTodayFol=(e)=>{
    e.preventDefault()
  }
  showTodayDoc=(e)=>{
    e.preventDefault()
  }
  showTodayBatch=(e)=>{
    e.preventDefault()
  }

  render() {
    const {totalNew,totalYear,newFolderToday,newDocToday,newBatchToday,docSumMonth,folSumMonth,folSumYear,docSumYear,thisMonth, thisYear}=this.props.dashConf
      return(
        <section className="statistics mb-5 mt-5">
        <div className="container-fluid">
          <div className="row d-flex">
          <div className="col-lg-4">
              <div className="card data-usage">
                <h2 className="display h4"><strong className="text-primary mb-1">{totalNew+newBatchToday}</strong>New Items</h2>
                {newFolderToday>0?<a href='/' onClick={this.showTodayFol}><ItemNew conf={newFolderToday} img='folder'/></a>:<ItemNew conf={newFolderToday} img='folder'/>}
                {newDocToday>0?<a href='/' onClick={this.showTodayDoc}><ItemNew conf={newDocToday} img='document'/></a>:<ItemNew conf={newDocToday} img='document'/>}
                {newBatchToday>0?<a href='/' onClick={this.showTodayBatch}><ItemNew conf={newBatchToday} img='pdf'/></a>:<ItemNew conf={newBatchToday} img='pdf'/>}
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card data-usage">
                <h2 className="display h4"><strong className="text-primary mb-1">{totalYear}</strong>Created Items</h2>
                <div className="row d-flex align-items-center">
                  <div className="col-sm-6">
                    <div className="text-center p-2">
                    <div className="icon"><img src={require('../../img/rec.svg')} alt="doc" className="img-dash"/></div>
                      <div className="p-2 pt-5">
                        <strong className="text-primary">{folSumMonth}</strong>
                        <small>Created in {thisMonth}</small>
                      </div>
                      <div className="p-2 pt-4">
                        <strong className="text-primary">{folSumYear}</strong>
                        <small>Created in {thisYear}</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                  <div className="text-center p-2">
                    <div className="icon"><img src={require('../../img/document.svg')} alt="doc" className="img-dash"/></div>
                      <div className="p-2 pt-5">
                        <strong className="text-primary">{docSumMonth}</strong>
                        <small>Created in {thisMonth}</small>
                      </div>
                      <div className="p-2 pt-4">
                        <strong className="text-primary">{docSumYear}</strong>
                        <small>Created in {thisYear}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      )
  }
}
Statistic.propTypes={
  session:PropTypes.object.isRequired,
  dashConf:PropTypes.object.isRequired,
  fetchDashToday:PropTypes.func.isRequired,
  fetchDashSum:PropTypes.func.isRequired
}
const mapStateToProps= state =>({
  session:state.session,
  dashConf:state.dashConf
})
export default connect(mapStateToProps, {fetchDashToday,fetchDashSum, })(Statistic)
