import {
    CHILD_LIMIT_PAGE,
    CHILD_START_PAGE,
    CHILD_CURRENT_PAGE,
    SET_CHILD_PARAM,
    CHILD_TOTAL_REC,
    CHILD_ITEM_ACCESS_DEL,
    CHILD_ITEM_ACCESS_EDIT,
    CHILD_ITEM_ACCESS_ACL,
    CHILD_SEL_REC,
    SHOW_CHILD_FAB,
    ACTIVATE_CHILD,
    GET_CHILD,} from '../actions/types'
    import {biorisUrl} from '../config'
    const url=`${biorisUrl}/recSearch?param=`

    export const getChild=(queryParam,{page,start,limit})=>dispatch=>{
        const bodyParam = `&page=${page}&start=${start}&limit=${limit}`
        const queryUrl = url+encodeURIComponent(JSON.stringify(queryParam))+bodyParam
        fetch(queryUrl,{method:'POST'})
        .then(res=>res.json())
        .then(res=>{
            dispatch({
                type:GET_CHILD,
                payload:res.results
            })
            dispatch({
                type:CHILD_TOTAL_REC,
                payload:res.count
            })
            dispatch({
                type:SET_CHILD_PARAM,
                payload:queryParam
            })
            dispatch({
                type:CHILD_CURRENT_PAGE,
                payload:page
            })
            dispatch({
                type:CHILD_START_PAGE,
                payload:start
            })
            dispatch({
                type:CHILD_LIMIT_PAGE,
                payload:limit
            })
        })
    }
    export const getChildItemAccess=(recordParam)=>dispatch=>{
        const queryUrl = `${biorisUrl}/record?param=${encodeURIComponent(JSON.stringify(recordParam))}`
        fetch(queryUrl)
        .then(res=>res.json())
        .then(res=>{
            if(res.code===200){
                const{results:[{can_delete,can_update,can_modify_access}]}=res
                dispatch({
                    type:CHILD_ITEM_ACCESS_DEL,
                    payload:can_delete
                })
                dispatch({
                    type:CHILD_ITEM_ACCESS_EDIT,
                    payload:can_update
                })
                dispatch({
                    type:CHILD_ITEM_ACCESS_ACL,
                    payload:can_modify_access
                })
            }

        })
     }
     export const setSelRec=(selRec)=>{
        return {
            type:CHILD_SEL_REC,
            payload:selRec
        }
     }
     export const showChildFab=(selRec)=>{
        return {
            type:SHOW_CHILD_FAB,
            payload:selRec
        }
     }
     export const setChild=(childStat)=>{
        return {
            type:ACTIVATE_CHILD,
            payload:childStat
        }
     }
