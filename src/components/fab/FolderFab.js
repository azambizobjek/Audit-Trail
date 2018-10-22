import React from 'react'
import Tooltip from 'rc-tooltip'
    const FolderFab =({canDelete,canUpdate,isContainer,editRec})=>{
    const sendActive=(e)=>{
        e.preventDefault()
        editRec(e.target.name)
    }
   return (
    <div className="fab">
    {canUpdate?
    <span className="fab-action-button">
        <Tooltip
            placement="left"
            overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Update Folder</div>}
            arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
        >
            <img name="updateFol" src={require('../../img/fab-update.svg')} alt='update' className='img-fluid' onClick={sendActive}/>
        </Tooltip>
    </span>
    :
    <span className="fab-action-button">
        <Tooltip
            placement="left"
            overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Update Folder</div>}
            arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
        >
            <img name="updateFol" src={require('../../img/fab-content.svg')} alt='update' className='img-fluid' onClick={sendActive}/>
        </Tooltip>
    </span>
    }
    <ul className="fab-buttons">
        <li className={canDelete?"fab-buttons-item":"d-none"}>
            <span className="fab-buttons-link">
                <Tooltip
                placement="left"
                overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Delete Folder</div>}
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
        <li className={isContainer?"fab-buttons-item":"d-none"}>
            <span className="fab-buttons-link">
                <Tooltip
                placement="left"
                overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>View Child</div>}
                arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                >
                    <img name="child" src={require('../../img/fab-child.svg')} alt='child' className='img-fluid' onClick={sendActive} />
                </Tooltip>
            </span>
        </li>
    </ul>
</div>
)}
export default FolderFab

