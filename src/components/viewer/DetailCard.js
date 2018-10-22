import React from 'react'

export default function DetailCard({
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
  textColor = isSel?'text-light':'text-muted'
  return (
    <div className="col-12">
        <div className={`card mb-3 ${toggleBg}`} onClick={handleClick}>
            <div className="p-2 d-flex justify-content-between align-items-center">
                <img src={require('../../img/'+iconType+'.svg')} alt={iconType} className="p-2 img-fluid img-scale" />
            <div className="mr-auto p-2">
                <p className={`card-title mb-1 font-weight-bold ${textColor}`}>{decodeURIComponent(title)}</p>
                <p className="card-text"><small className={textColor}>Created: {decodeURIComponent(date_created)}</small></p>
            </div>
            </div>
        </div>
        </div>
  )
}
