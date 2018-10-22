import React, { Component } from 'react'
import Tooltip from 'rc-tooltip'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { changeMultiSel,setSelAll } from '../../actions/recordAction'

class MultiFab extends Component {

 setIsMulti=(e)=>{
    e.preventDefault()
    switch(e.target.name){
        case 'enableMulti':
            console.log('enableMulti')
            this.props.changeMultiSel(true)
        break
        case 'disableMulti':
            console.log('disable multi')
            this.props.changeMultiSel(false)
        break
        case 'selectAll':
        console.log('select all rec')
        this.props.setSelAll(true)
        break
        default:
            console.log(e.target.name,e.target.alt)
        break

    }
 }
  render() {
      const{isMultiSel}=this.props.records
      const{activePage}=this.props.layout
    return (
        <div className="fab">
        <span className={!isMultiSel?"fab-action-button":"d-none"}>
            <Tooltip
            placement="left"
            overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Enable multi select</div>}
            arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
            >
            <img name="enableMulti" src={require('../../img/fab-multi.svg')} alt='enableMulti' className='img-fluid' onClick={this.setIsMulti}/>
        </Tooltip>
        </span>
        <span className={isMultiSel?"fab-action-button":"d-none"}>
            <Tooltip
            placement="left"
            overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Disable multi select</div>}
            arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
            >
                <img name="disableMulti" src={require('../../img/fab-multi-cancel.svg')} alt='disableMulti' className='img-fluid' onClick={this.setIsMulti} />
            </Tooltip>
        </span>
        <ul className="fab-buttons">
            <li className={isMultiSel?(activePage==='document'?"fab-buttons-item":"d-none"):"d-none"}>
                <span className="fab-buttons-link">
                <Tooltip
                placement="left"
                overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Delete Document</div>}
                arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                >
                    <img name="delete" src={require('../../img/fab-trash.svg')} alt='delete' className='img-fluid' onClick={this.setIsMulti} />
               </Tooltip>
                </span>
            </li>
            <li className={isMultiSel?"fab-buttons-item":"d-none"}>
                <span className="fab-buttons-link">
                <Tooltip
                    placement="left"
                    overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>{activePage==='folder'?'Delete Folders':'Move Documents'}</div>}
                    arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                    >
                    {
                        activePage==='folder'? <img name="delete" src={require('../../img/fab-trash.svg')} alt='delete' className='img-fluid' onClick={this.setIsMulti}/>
                        :<img name="move" src={require('../../img/fab-move.svg')} alt='move' className='img-fluid' onClick={this.setIsMulti}/>}
                </Tooltip>
                </span>
            </li>

            <li className={isMultiSel?"fab-buttons-item":"d-none"}>
                <span className="fab-buttons-link">
                <Tooltip
                placement="left"
                overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Select All</div>}
                arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                >
                    <img name="selectAll" src={require('../../img/fab-multiAll.svg')} alt='selAll' className='img-fluid' onClick={this.setIsMulti} />
                </Tooltip>
                </span>
            </li>

        </ul>
    </div>
    )
  }
}

MultiFab.propTypes={
    layout: PropTypes.object.isRequired,
    records: PropTypes.object.isRequired,
    changeMultiSel:PropTypes.func.isRequired,
    setSelAll:PropTypes.func.isRequired
  }
const mapStateToProps = (state) => ({
    records:state.records,
    layout:state.layout
})

export default connect(mapStateToProps,{changeMultiSel,setSelAll})(MultiFab)