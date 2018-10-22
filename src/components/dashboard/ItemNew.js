import React from 'react'

const ItemNew = ({conf,img}) => (
<div className="d-flex align-items-center justify-content-around p-2">
<div className="img-dash"><img src={require(`../../img/${img}.svg`)} alt="doc" className="img-fluid"/></div>
<div className="text-center p-2">
    <strong className="text-primary">{conf}</strong>
    <small>{img==='pdf'?'Queued upload':'Created today'}</small>
</div>
</div>
) 
export default ItemNew