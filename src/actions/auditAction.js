import { LIST_AUDIT } from './types'

import {biorisUrl} from '../config'

export const getListAudit=(searchParam)=>dispatch=>{
    const url=`${biorisUrl}/auditLog?param=${JSON.stringify(searchParam)}`
   fetch(url)
   .then(res=>res.json())
   .then(res=>{
       const{results}=res
       results.sort((a,b)=>{
            const keyA = new Date(a.date_updated)
            const keyB = new Date(b.date_updated)
            if(keyA < keyB) return -1
            if(keyA > keyB) return 1
            return 0
        })
       dispatch({
            type: LIST_AUDIT,
            payload: res.results
        })
   })

}
