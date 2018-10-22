import React from 'react'


// const FolderTabHeader =({getActive, active, recordDetails:{access},iconType})=>{
    const FolderTabHeader =({canDel,canUpdate,activeEditor,active,isContainer})=>{
    // const canDelete = access===null||!access.can_delete?false:true
    const sendActive=(e)=>{
        e.preventDefault()
        activeEditor(e.target.name)
    }
   return (
<div className="row colWrap justify-content-center">
    {/* <div className={iconType?"col-3 colContainer":"col-3 colContainer hideLine"}> */}
    {/* <div className="col-3 colContainer hideLine"> */}
    <div className="col-3 colContainer">

        <div className={active==='updateFol'?'tab activeTab mx-auto':'tab mx-auto'}>
        {/* <div className='tab activeTab mx-auto'> */}
            <img
                name="updateFol"
                src={canUpdate?require('../../img/fab-update.svg'):require('../../img/fab-content.svg')}
                // className='img-fluid'
                className={active==='updateFol'?'img-fluid desaturate':'img-fluid'}
                onClick={sendActive}/>
        </div>
    </div>
    <div className={isContainer?"col-3 colContainer":"d-none"}>
        <div className={active==='child'?'tab activeTab mx-auto':'tab mx-auto'}>
        {/* <div className='tab activeTab mx-auto'> */}

            <img
                name="child"
                src={require('../../img/fab-child.svg')}
                className={active==='child'?'img-fluid desaturate':'img-fluid'}
                // className='img-fluid'
                onClick={sendActive} />
        </div>
    </div>
    <div className={canDel?"col-3 colContainer":"col-3 colContainer hideLine"}>
        <div className={active==='history'?'tab activeTab mx-auto':'tab mx-auto'}>
        {/* <div className='tab activeTab mx-auto'> */}

            <img
                name="history"
                src={require('../../img/fab-history.svg')}
                className={active==='history'?'img-fluid desaturate':'img-fluid'}
                // className='img-fluid'
                onClick={sendActive} />
        </div>
    </div>
    <div className={canDel?"col-3 colContainer":"d-none"}>
        <div className={active==='delete'?'tab activeTab mx-auto':'tab mx-auto'}>
        {/* <div className='tab activeTab mx-auto'> */}

            <img
                name="delete"
                src={require('../../img/fab-trash.svg')}
                className={active==='delete'?'img-fluid desaturate':'img-fluid'}
                // className='img-fluid'
                onClick={sendActive} />
        </div>
    </div>
</div>
)}
export default FolderTabHeader

