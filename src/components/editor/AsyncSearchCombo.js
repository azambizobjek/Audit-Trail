import React, { Component } from 'react'
import AsyncSelect from 'react-select/lib/Async'
import { components } from 'react-select'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getContainer } from '../../actions/searchAction'
import { folderRecId } from '../../config'




const ValueContainer = ({ children, ...props }) => {
  return (
      <components.ValueContainer className="text-truncate" {...props}>
        {children}
      </components.ValueContainer>
  )
}


class AsyncSearchCombo extends Component {
  state = { inputValue: '',containerList:[] }
componentDidUpdate(prevProps){
    if(prevProps.search.containerList!==this.props.search.containerList){
        const{containerList}=this.props.search

        const newList = containerList.map(rec=>({value:rec.record_id, label:decodeURIComponent(rec.title)}))
        this.setState({containerList:newList})
    }
}
 filterColors = (inputValue) =>
{

    const{user:{bio_access_id:bId,stakeholder_id:sId}}=this.props.session
    const params={
        bio_access_id:bId,
        action:'ADVANCED_SEARCH_PAGING',
        query:`title:%22quostr%3B${inputValue}*%22quostr%3B&&owner_id:%22quostr%3B${sId}%22quostr%3B`,
        record_type_ids:[folderRecId]
    }
  this.props.getContainer(params)
  return this.state.containerList


}
  handleInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, '');
    this.setState({ inputValue });
    return inputValue;
  }

  promiseOptions = (inputValue) =>{
     if(inputValue.length>3){
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.filterColors(inputValue))
      }, 1000);
    })
  }
  }



  handleSelectChangeDocs = val => {
    this.props.changeVal(val);
  }
  render() {
    return (
      <AsyncSelect
        cacheOptions
        defaultOptions
        value={this.props.val}
        loadOptions={this.promiseOptions}
        onChange={this.handleSelectChangeDocs}
        components={{ValueContainer}}
      />

    )
  }
}

AsyncSearchCombo.propTypes={
    session: PropTypes.object.isRequired,
    getContainer:PropTypes.func.isRequired
  }
const mapStateToProps = (state) => ({
    session:state.session,
    search:state.search

})


export default connect(mapStateToProps,{getContainer})(AsyncSearchCombo)
