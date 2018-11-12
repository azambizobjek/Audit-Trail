import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setBread } from '../../actions/breadcrumbAction'
import update from 'immutability-helper'

class Breadrumb extends Component {
  componentDidMount(){
    const{breadList,newBread}=this.props.breadcrumb
    if(Object.keys(newBread).length>0){
      console.log('merger')
    }
    console.log(breadList)

  }
  componentDidUpdate(prevProps){
    if(prevProps.breadcrumb.newBread!==this.props.breadcrumb.newBread){
      console.log('update bread')
        const{breadList,newBread}=this.props.breadcrumb
        const newBreadList =
        // breadList < 1 ?
        update(breadList, {$push:[newBread]})
        // :update(breadList, {$splice:[[1, 3, newBread]]})
        console.log(newBreadList)
        // this.props.setBread(newBreadList)
    }
  }

  render() {
    return (
      <ul className="breadcrumb">
        <a className="breadcrumb-item" href='/'>Home</a>
        <li className="breadcrumb-item active">Upload</li>
      </ul>
    )
  }
}
Breadrumb.propTypes={
  breadcrumb: PropTypes.object.isRequired,
  // search: PropTypes.object.isRequired,
  // session: PropTypes.object.isRequired,
  setBread:PropTypes.func.isRequired,
  // setActivePage:PropTypes.func.isRequired,
  // setPageTitle:PropTypes.func.isRequired,
  // getAdvSearch:PropTypes.func.isRequired,
  // setBread:PropTypes.func.isRequired,
  // logout:PropTypes.func.isRequired
}
const mapStateToProps = (state) => ({
  breadcrumb:state.breadcrumb
})

export default connect(mapStateToProps, {setBread})(Breadrumb)

