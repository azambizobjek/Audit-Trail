import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { getBatchLoadList } from '../../actions/batchLoadAction'
import Breadcrumb from '../layout/Breadrumb'
import UploadItem from './UploadItem'
class index extends Component {
    componentDidMount(){
        const{user:{bio_access_id:bId}}=this.props.session
        this.props.getBatchLoadList({action:"ITEM_LIST",bio_access_id:bId})

    }
  render() {
      const{queList}=this.props.batchLoad
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
                    <h1 className="h3 display">Documents Upload</h1>
                </header>
                <div className="row">
                    {queList.map((item,idx)=>
                        <UploadItem
                            key={idx}
                            name={decodeURIComponent(item.name)}
                            count={item.record_count}
                        />
                    )}
                </div>
            </div>
        </section>
    </Fragment>
    )
  }
}
index.propTypes={
    session: PropTypes.object.isRequired,
    batchLoad: PropTypes.object.isRequired,
    getBatchLoadList:PropTypes.func.isRequired,

  }
  const mapStateToProps= state =>({
    session:state.session,
    batchLoad:state.batchLoad
  })
export default connect(mapStateToProps,{getBatchLoadList})(index)