import React from 'react'
import Tooltip from 'rc-tooltip'


    // const DocFab =({canDelete,canUpdate,isContainer})=>{
    const DocFab =({canDelete, editRec})=>{
    const sendActive=(e)=>{
        e.preventDefault()
        editRec(e.target.name)
    }
   return (
    <div className="fab">
    <span className="fab-action-button">
    <Tooltip
                placement="left"
                overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Update Document</div>}
                arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
            >
        <img name="updateDoc" src={require('../../img/fab-update.svg')} alt='updateDoc' className='img-fluid' onClick={sendActive}/>
    </Tooltip>
    </span>
    <ul className="fab-buttons">
        <li className={canDelete?"fab-buttons-item":"d-none"}>
            <span className="fab-buttons-link">
            <Tooltip
                placement="left"
                overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Delete Document</div>}
                arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
            >
                <img name="delete" src={require('../../img/fab-trash.svg')} alt='delete' className='img-fluid' onClick={sendActive} />
           </Tooltip>
            </span>
        </li>

        <li className="fab-buttons-item">
            <span className="fab-buttons-link">
            <Tooltip
                placement="left"
                overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>View History</div>}
                arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
            >
                <img name="history" src={require('../../img/fab-history.svg')} alt='history' className='img-fluid' onClick={sendActive} />
            </Tooltip>
            </span>
        </li>

        <li className="fab-buttons-item">
            <span className="fab-buttons-link">
            <Tooltip
                placement="left"
                overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Send Email</div>}
                arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
            >
                <img name="email" src={require('../../img/fab-email.svg')} alt='email' className='img-fluid' onClick={sendActive} />
            </Tooltip>
            </span>
        </li>

        <li className="fab-buttons-item">
            <span className="fab-buttons-link">
            <Tooltip
                placement="left"
                overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>View Content</div>}
                arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
            >
                <img name="content" src={require('../../img/fab-content.svg')} alt='content' className='img-fluid' onClick={sendActive} />
            </Tooltip>
            </span>
        </li>
    </ul>
</div>
)}
export default DocFab

