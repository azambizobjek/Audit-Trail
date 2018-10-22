import {
    SET_PAGE_TITLE,
    SET_PAGING,
    SET_ISCONTAINER,
    CHANGE_ISMULTI,
    SHOW_FAB,
    SHOW_MULTIFAB,
    REC_ITEM_ACCESS_DEL,
    REC_ITEM_ACCESS_EDIT,
    REC_ITEM_ACCESS_ACL,
    SET_SEL_REC,
    SET_SEL_ALL,
    SET_CARD_VIEW} from './types'

import {biorisUrl} from '../config'

export const setPageTitle=(searchKey)=>{
   return {
       type:SET_PAGE_TITLE,
       payload:searchKey
   }
}
export const setPaging=(pagingConf)=>{

    return {
        type:SET_PAGING,
        payload:pagingConf
    }
 }
 export const setCardView=(cardStatus)=>{
    return {
        type:SET_CARD_VIEW,
        payload:cardStatus
    }
 }
 export const changeMultiSel=(multiStatus)=>dispatch=>{
    dispatch({
        type:CHANGE_ISMULTI,
        payload:multiStatus
    })
     if(!multiStatus){
        dispatch(setSelAll(false))
     }

 }
 export const showFab=(multiStatus)=>{
    return {
        type:SHOW_FAB,
        payload:multiStatus
    }
 }
 export const showMultiFab=(multiStatus)=>{
    return {
        type:SHOW_MULTIFAB,
        payload:multiStatus
    }
 }

 export const setIsContainer=(isContainer)=>{
    return {
        type:SET_ISCONTAINER,
        payload:isContainer
    }
 }
 export const setSelRec=(selRec)=>{
    return {
        type:SET_SEL_REC,
        payload:selRec
    }
 }
 export const setSelAll=(sellAllStats)=>{
    return {
        type:SET_SEL_ALL,
        payload:sellAllStats
    }
 }
 export const getRecItemAccess=(recordParam)=>dispatch=>{
    const queryUrl = `${biorisUrl}/record?param=${encodeURIComponent(JSON.stringify(recordParam))}`
    fetch(queryUrl)
    .then(res=>res.json())
    .then(res=>{
        if(res.code===200){
            const{results:[{can_delete,can_update,can_modify_access}]}=res
            dispatch({
                type:REC_ITEM_ACCESS_DEL,
                payload:can_delete
            })
            dispatch({
                type:REC_ITEM_ACCESS_EDIT,
                payload:can_update
            })
            dispatch({
                type:REC_ITEM_ACCESS_ACL,
                payload:can_modify_access
            })
        }

    })
 }