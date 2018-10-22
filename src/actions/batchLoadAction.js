import { LIST_BATCH,BATCH_UPLOAD } from './types'

import {biorisUrl} from '../config'

export const getBatchLoadList=(getListParam)=>dispatch=>{
    const url=`${biorisUrl}/batchLoad?param=${encodeURIComponent(JSON.stringify(getListParam))}`
   fetch(url)
   .then(res=>res.json())
   .then(res=>dispatch({
       type: LIST_BATCH,
       payload: res.results
    }))

}
// export const uploadBatchLoad=(uploadParam)=>dispatch=>{
//     const url=`${biorisUrl}/batchLoad?param=${encodeURIComponent(JSON.stringify(uploadParam))}`
//    fetch(url,{method:'POST'})
//    .then(res=>res.json())
//    .then(res=>dispatch({
//        type: BATCH_UPLOAD,
//        payload: res.results
//     }))

// }