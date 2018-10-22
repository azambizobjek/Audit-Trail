import React, { Component, Fragment } from 'react'

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {setNavToggle,setPageClass, setSideNavClass} from '../actions/layoutInitAction'

import {Footer, SideNav, TopNav} from '../components/layout'
import Dashpage from './dashboard/DashPage'
import Viewer from './viewer'
import BatchUpload from './batchUpload'
import Log from './auditLog'
import Editor from './editor'
import FolEditor from './editor/FolEditor'
import DocEditor from './editor/DocEditor'

class Home extends Component {
    components={
        'dashboard':Dashpage,
        'folder':Viewer,
        'document':Viewer,
        'adv-search':Viewer,
        'basic-search':Viewer,
        'batch-upload':BatchUpload,
        'log':Log,
        'folEditor':FolEditor,
        'docEditor':DocEditor
        // 'editor':Editor
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions)
        const{user:{stakeholder_id}}=this.props.session
        if(localStorage.getItem(stakeholder_id)===null){
            localStorage.setItem(stakeholder_id,JSON.stringify({editRec:[],searchKey:[]}))
          }
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions)
    }
    updateDimensions=()=>{
        const windowWidth=window.innerWidth
        const pageClass = windowWidth > 1194 ? 'page active' : 'page active-sm'
        const navClass =  windowWidth > 1194 ? 'side-navbar shrink' : 'side-navbar show-sm'

        this.props.setNavToggle(false, pageClass, navClass)
    }

  render() {
      const {pageClass,activePage}=this.props.layout
      const Activepage=this.components[activePage]
    return (
        <Fragment>
            <SideNav/>
            <div className={pageClass}>
                <TopNav/>
                <Activepage/>
            {/* <Switch>
                <Route path ="/helper/:type/:navObj/:itmObj" component={MainHelper} />
                <Route path ="/details/:type/:tab/:sub/:navObj/:itmObj" component={Wizard} />
                <Route path ="/log" component={Log} />
                <Route path ="/upload" component={UploaderMain} />
                <Route path ="/search/:page" component={RecExplorerMain} />
                <Route path ="/" component={DashPage} />
            </Switch> */}

            <Footer/>
        </div>
    </Fragment>
    )
  }
}
Home.propTypes={
    layout:PropTypes.object.isRequired,
    setNavToggle:PropTypes.func.isRequired,
    setPageClass:PropTypes.func.isRequired,
    setSideNavClass:PropTypes.func.isRequired,
  }
  const mapStateToProps= state =>({
    layout:state.layout,
    session:state.session
  })
  export default connect(mapStateToProps, {setPageClass,setSideNavClass,setNavToggle})(Home)