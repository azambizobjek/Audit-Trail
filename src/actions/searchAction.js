 import {
    GET_BASIC_SEARCH,
    GET_ADV_SEARCH,
    SET_SEARCH_PARAM,
    SET_TOTAL_PAGE,
    SET_CURRENT_PAGE,
    GET_CONTAINER,
    SET_STARTPAGE} from './types'

import {biorisUrl} from '../config'
const url=`${biorisUrl}/recSearch?param=`

export const getBasicSearch=(queryParam)=>dispatch=>{
    const queryUrl = url+encodeURIComponent(JSON.stringify(queryParam))
    fetch(queryUrl,{method:'POST'})
    .then(res=>res.json())
    .then(res=>{
        const authRec = res.results.filter(rec=>(!rec.is_unauthorized))
        dispatch({
        type:GET_BASIC_SEARCH,
        payload:authRec
        })
        dispatch({
            type:SET_SEARCH_PARAM,
            payload:queryParam
        })
    })

}
export const getAdvSearch=(queryParam, {page,start,limit})=>dispatch=>{
    const bodyParam = `&page=${page}&start=${start}&limit=${limit}`
    const queryUrl = url+encodeURIComponent(JSON.stringify(queryParam))+bodyParam
    fetch(queryUrl,{method:'POST'})
    .then(res=>res.json())
    .then(res=>{
        const authRec = res.results.filter(rec=>(!rec.is_unauthorized))
        dispatch({
            type:GET_ADV_SEARCH,
            payload:authRec
        })
        dispatch({
            type:SET_TOTAL_PAGE,
            payload:res.count
        })
        dispatch({
            type:SET_SEARCH_PARAM,
            payload:queryParam
        })
        dispatch({
            type:SET_CURRENT_PAGE,
            payload:page
        })
        dispatch({
            type:SET_STARTPAGE,
            payload:start
        })
    })

}
export const getContainer=(queryParam)=>dispatch=>{
    const queryUrl = url+encodeURIComponent(JSON.stringify(queryParam))
    fetch(queryUrl,{method:'POST'})
    .then(res=>res.json())
    .then(res=>{
        dispatch({
        type:GET_CONTAINER,
        payload:res.results
        })
    })
}
