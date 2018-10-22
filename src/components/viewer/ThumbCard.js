import React from 'react'

export default function ThumbCard({
    is_container,
    record_type_icon,
    haveParent,
    isSel,
    title,
    date_created,
    recId,
    markOnSel}) {

    const handleClick=(e)=>{
        markOnSel(recId)
    }
    const iconType = is_container ? 'container' : (record_type_icon==='document' ? (haveParent!=='' ? 'hasParent':record_type_icon) : record_type_icon),
          toggleBg=isSel?'bg-primary':'',
          bgLight=isSel?'bg-light':'',
          textColor = isSel?'text-light':'text-muted'
  return (
    <div className="col-6 col-md-4 col-lg-2 col-xl-2">
        <div className={`card ${toggleBg}`} onClick={handleClick}>
            <div className="text-center">
                <img src={require('../../img/'+iconType+'.svg')}  alt={iconType} className="img-card mt-4"/>
            </div>
            <div className="card-body">
                <hr className={`mt-0 ${bgLight}`}/>
                <p className={`card-title mb-1 font-weight-bold text-truncate ${textColor}`}>{decodeURIComponent(title)}</p>
                <p className="card-text text-truncate"><small className={textColor}>Created: {decodeURIComponent(date_created)}</small></p>
            </div>
        </div>
    </div>
  )
}
