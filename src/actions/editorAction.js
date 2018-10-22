import {
    ACTIVE_EDITOR,
    ACTIVE_HEADER,
    GET_REC_DETAILS,
    SAVE_RECORD,
    SHOW_LOADER,
    ACTIVE_PAGE,
    GET_CONTENT_FILE_ID,
    GET_IFRAME,
    IS_DELETE,
    GET_AUDIT_LOG} from './types'

import {biorisUrl} from '../config'
import update from 'immutability-helper'

export const setActiveEditor = (activeEditor) => ({
  type: ACTIVE_EDITOR,
  payload: activeEditor
})

export const setActiveHeader = (activeHeader) => ({
    type: ACTIVE_HEADER,
    payload: activeHeader
})
export const getContentDetail = (contentParam) =>dispatch=> {
    const url=`${biorisUrl}/content?param=${encodeURIComponent(JSON.stringify(contentParam))}`
    fetch(url)
    .then(res=>res.json())
    .then(res=>{
        dispatch({
        type:GET_CONTENT_FILE_ID,
        payload:res.results[0].content_file[0].content_file_id
        })
    })
}
export const getIframe = (contentParam) =>dispatch=>{
    const url=`${biorisUrl}/content?param=${encodeURIComponent(JSON.stringify(contentParam))}`
    fetch(url,{method:'POST'})
    .then(res=>res.json())
    .then(res=>dispatch({
        type:GET_IFRAME,
        payload:res.content_url
    }))
}
export const getAuditLog = (auditLogParam) =>dispatch=>{
    const url=`${biorisUrl}/auditLog?param=${encodeURIComponent(JSON.stringify(auditLogParam))}&sort=ASC`
    fetch(url)
    .then(res=>res.json())
    .then(res=>dispatch({
        type:GET_AUDIT_LOG,
        payload:res.results
    }))
}
export const getRecDetails = (detailsParam) =>dispatch=>{
    const url=`${biorisUrl}/record?param=${encodeURIComponent(JSON.stringify(detailsParam))}&sort=ASC`
    fetch(url)
    .then(res=>res.json())
    .then(res=>{
        dispatch({
        type:GET_REC_DETAILS,
        payload:res.results
        })
    })
}
export const saveRecord = (detailsParam, activePage) =>dispatch=>{
    const url=`${biorisUrl}/record/update?param=${encodeURIComponent(JSON.stringify(detailsParam))}`
    fetch(url,{method:'POST'})
    .then(res=>res.json())
    .then(res=>{
        dispatch({
            type:SAVE_RECORD,
            payload:res.results
        })
        dispatch({
            type:SHOW_LOADER,
            payload:false
        })
        dispatch({
            type:ACTIVE_PAGE,
            payload:activePage
        })
    })
}
export const deleteRec = (delParam) => dispatch=>{
    const url=`${biorisUrl}/record?param=${encodeURIComponent(JSON.stringify(delParam))}&sort=ASC`
    fetch(url,{method:'DELETE'})
    .then(res=>res.json())
    .then(res=>{
        console.log(res)
        const isDeleted = res.failed_list.length>0?false:true

        dispatch({
        type:IS_DELETE,
        payload:isDeleted
        })
    })
}
export const dlContent = (contentParam) =>dispatch=>{
    const url=`${biorisUrl}/content/download?param=${encodeURIComponent(JSON.stringify(contentParam))}`
    fetch(url,{method:'POST'})
    .then(res=>res.json())
    .then(res=>{
        console.log(res)
        // dispatch({
        //     type:GET_IFRAME,
        //     payload:res.content_url
        // })
    }

    )
}
export const setLSactivity = (stakehId,recId,obj) =>dispatch=>{
    const history = JSON.parse(localStorage[stakehId])
    const {editRec} = history
    if(editRec.length<10){
        if(editRec.find(k=> k.recId===recId)===undefined){
            // const obj = {
            //     recId:this.props.recId,
            //     date:today.toLocaleDateString('en-my'),
            //     time:today.toLocaleTimeString('en-my'),
            //     icon:this.props.iconType,
            //     rectype:this.props.recType,
            //     title:this.props.recTitle
            // }
            const newKey=update(history, {editRec:{$unshift:[obj]}})
            localStorage[stakehId]=JSON.stringify(newKey)
        }
    }else{
        if(editRec.find(k=> k.recId===recId)===undefined){
            // const obj = {
            //     recId:this.props.recId,
            //     date:today.toLocaleDateString('en-my'),
            //     time:today.toLocaleTimeString('en-my'),
            //     icon:this.props.iconType,
            //     rectype:this.props.recType,
            //     title:this.props.recTitle
            // }
            editRec.splice(0,0,obj)
            editRec.splice(10,1)

            const newKey=update(history, {editRec:{$set:editRec}})
            localStorage[stakehId]=JSON.stringify(newKey)
        }
    }
}
