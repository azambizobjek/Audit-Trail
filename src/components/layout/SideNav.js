import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {folderRecId,documentRecId} from '../../config'
import { setActivePage,resetConf } from '../../actions/layoutInitAction'
import { toggleAdv,toggleErr } from '../../actions/modalAction'
import { setPageTitle,changeMultiSel,setSelRec } from '../../actions/recordAction'
import { getAdvSearch } from '../../actions/searchAction'
import { setActiveHeader } from '../../actions/editorAction'


class SideNav extends React.Component {
  constructor(){
    super();
    this.state = {
      folderToggle: false,
      documentToggle: false,
      uploadToggle:false
    };

  }
  toggleClass=(e)=> {
    e.preventDefault()
    switch(e.target.name){
      case 'folder':
        const folderState = this.state.folderToggle
        this.setState({ folderToggle: !folderState, auditToggle:false})
      break
      case 'audit':
        const auditState = this.state.auditToggle
        this.setState({ auditToggle: !auditState, documentToggle:false})
      break
      case 'doc':
        const docState = this.state.documentToggle
        this.setState({ documentToggle: !docState, folderToggle: false, uploadToggle: false})
      break
      case 'upload':
        const upState = this.state.uploadToggle
        this.setState({ uploadToggle: !upState, folderToggle: false })
      break
    }
  }
  setActivePage=(e)=>{
      e.preventDefault()
      const{user:{bio_access_id:bId,stakeholder_id:sId}}=this.props.session
      const pgName = e.target.getAttribute('data-pagename')
      this.props.setActivePage(pgName)
      if(pgName==='adv-search'){
        this.props.toggleAdv(true)
      }
      else if(pgName==='log'){
        this.props.toggleErr(true)
      }  
      else if(pgName==='print'){
          this.props.toggleErr(true)
        }
     
 
   
  }

  render() {
      const {navBarClass}=this.props.layout
      const {user:{stakeholder_name:stakehName,roles:[{title}]}}=this.props.session
    return (
    <nav className={navBarClass}>

      <div className="side-navbar-wrapper">

        <div className="sidenav-header d-flex align-items-center justify-content-center">

          <div className="sidenav-header-inner text-center">

            <img src={require('../../img/user.svg')} alt="user" className="img-fluid "/>
            <h2 className="h5">{stakehName}</h2>
            <span>{title}</span>
          </div>
          <div className="sidenav-header-logo">
          <a className="brand-small text-center" href='/' onClick={this.setActivePage} data-pagename="dashboard">
            <img src={require('../../img/user.svg')} alt="user" className="img-fluid " data-pagename="dashboard" />
          </a>
          </div>
        </div>
        <div className="main-menu">
          <h5 className="sidenav-heading">Main</h5>
          <ul id="side-main-menu" className="side-menu list-unstyled">
            



            <li>
              <a href="/" aria-expanded={this.state.documentToggle} data-toggle="collapse" name="doc" className={this.state.documentToggle ? '' : 'collapsed'} onClick={this.toggleClass} >
              <div className="userIcon"><img src={require(`../../img/fill.svg`)} alt="doc" className="img-fluid p-1"/></div>Audit Log </a>
              <ul id="chartsDropdown" className={this.state.documentToggle ? 'collapse list-unstyled show' : 'collapse list-unstyled'}>

             
              
                <li>
                    <a href="/" data-pagename="log" onClick={this.setActivePage}>
                    <div className="userIcon" data-pagename="log">
                    <img src={require(`../../img/search99.svg`)} alt="doc"  data-pagename="log"/>
                    </div>Search
                    </a>
                </li>
                <li>
                    <a href="/" data-pagename="print" onClick={this.setActivePage}>
                    <div className="userIcon" data-pagename="print">
                    <img src={require(`../../img/print.svg`)} alt="doc"  data-pagename="print"/>
                    </div>Print Report
                    </a>
                </li>

        

                
                
              </ul>

            </li>
          </ul>
        </div>
      </div>


    </nav>


    );
  }
}

SideNav.propTypes={
    session: PropTypes.object.isRequired,
    layout: PropTypes.object.isRequired,
    setActivePage: PropTypes.func.isRequired,
    toggleAdv: PropTypes.func.isRequired,
    toggleErr: PropTypes.func.isRequired,
    setPageTitle: PropTypes.func.isRequired,
    getAdvSearch: PropTypes.func.isRequired,
    setActiveHeader: PropTypes.func.isRequired,
    setSelRec: PropTypes.func.isRequired,
    resetConf: PropTypes.func.isRequired,
    changeMultiSel: PropTypes.func.isRequired
  }
  const mapStateToProps= state =>({
    session:state.session,
    layout:state.layout,
  })
  export default connect(mapStateToProps,{
    setActivePage,
    toggleAdv,
    toggleErr,
    setPageTitle,
    changeMultiSel,
    setActiveHeader,
    setSelRec,
    resetConf,
    getAdvSearch})(SideNav)
