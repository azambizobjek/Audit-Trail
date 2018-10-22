import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOG_OUT,
    AUTH_LOADING
   } from './types'

import {biorisUrl} from '../config'

export const login = (authData) => dispatch =>{
   dispatch(isAuth())
   const url=`${biorisUrl}/auth/login?param=${JSON.stringify(authData)}`
   fetch(url)
   .then(res=>res.json())
   .then(res=>{
       res.code===200?dispatch({type:LOGIN_SUCCESS,payload:res.results}):dispatch({type:LOGIN_FAIL})
       }
   )
}

export const isAuth=()=>{
   return {
       type:AUTH_LOADING
   }
}

export const logout=(authParam)=>dispatch=>{
    const url=`${biorisUrl}/auth/logout?param=${JSON.stringify(authParam)}`
   fetch(url)
   .then(res=>res.json())
   .then(res=>dispatch({type:LOG_OUT}))

}