import { LIST_BATCH_ERR } from './types'

import {biorisUrl} from '../config'

export const getListErrBatch=(searchParam)=>dispatch=>{
    const url=`${biorisUrl}/batchLog?param=${JSON.stringify(searchParam)}`
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
            type: LIST_BATCH_ERR,
            payload: res.results
        })
   })

}