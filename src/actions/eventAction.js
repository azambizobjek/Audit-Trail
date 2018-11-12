import { ACTION_TYPES } from './types'

import {biorisUrl} from '../config'

export const getActionTypes=(actionParam)=>dispatch=>{
    const url=`${biorisUrl}/auditLog?param=${JSON.stringify(actionParam)}`
   fetch(url)
   .then(res=>res.json())
   .then(res=>dispatch({type: ACTION_TYPES,
    payload: res.results}))

}