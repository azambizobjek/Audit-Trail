import React from 'react'

export default function DocTabHead({canDel,active,activeEditor}) {
    const sendActive=(e)=>{
        e.preventDefault()
        activeEditor(e.target.name)
    }
  return (
    <div className="row colWrap justify-content-center">
    <div className="col-2 colContainer">
        <div className={active==='updateDoc'?'tab activeTab mx-auto':'tab mx-auto'}>
        {/* <div className='tab activeTab mx-auto'> */}
            <img
                name="updateDoc"
                src={require('../../img/fab-update.svg')}

                className={active==='updateDoc'?'img-fluid desaturate':'img-fluid'}
                // className='img-fluid'
                onClick={sendActive}/>
        </div>
    </div>
    <div className="col-2 colContainer">
        <div className={active==='content'?'tab activeTab mx-auto':'tab mx-auto'}>
        {/* <div className='tab activeTab mx-auto'> */}
            <img
                name="content"
                src={require('../../img/fab-content.svg')}

                className={active==='content'?'img-fluid desaturate':'img-fluid'}
                // className='img-fluid'
                onClick={sendActive} />
        </div>
    </div>
    <div className="col-2 colContainer">
        <div className={active==='email'?'tab activeTab mx-auto':'tab mx-auto'}>
        {/* <div className='tab activeTab mx-auto'> */}
            <img
                name="email"
                src={require('../../img/fab-email.svg')}

                className={active==='email'?'img-fluid desaturate':'img-fluid'}
                // className='img-fluid'
                onClick={sendActive} />
        </div>
    </div>
    <div className={canDel?"col-2 colContainer":"col-2 colContainer hideLine"}>
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
    <div className={canDel?"col-2 colContainer":"d-none"}>
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
  )
}
