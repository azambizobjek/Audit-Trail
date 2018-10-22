import {
    SUM_TODAY,
    SUM_YEAR,
    FOLDER_SUM_TODAY,
    FOLDER_SUM_MONTH,
    NEW_BATCH_QUE,
    DOC_SUM_MONTH,
    FOLDER_SUM_YEAR,
    DOC_SUM_YEAR,
    DOCUMENT_SUM_TODAY,
    DASH_LOADER} from './types'

    import {biorisUrl} from '../config'

export const newFolderToday=(folderQue)=>dispatch=>{
    const url=`${biorisUrl}/recSearch?param=${folderQue}`
    fetch(url,{method:'POST'}).then(res=>res.json())
    .then(res=>{
        if(res.code===200){
            dispatch ({
                type:FOLDER_SUM_TODAY,
                payload:res.count
            })
        }
    })
}
export const newDocToday=(docQue)=>dispatch=>{
    const url=`${biorisUrl}/recSearch?param=${docQue}`
    fetch(url,{method:'POST'}).then(res=>res.json())
    .then(res=>{
        if(res.code===200){
            dispatch ({
                type:DOCUMENT_SUM_TODAY,
                payload:res.count
            })
        }
    })
 }
 export const newBatchToday=(batchQue)=>dispatch=>{
    const url=`${biorisUrl}/batchLoad?param=${batchQue}`
    fetch(url).then(res=>res.json())
    .then(res=>{
        if(res.code===200){
            dispatch ({
                type:NEW_BATCH_QUE,
                payload:res.count
            })
        }
    })
 }
 export const folSumMonth=(docQue)=>dispatch=>{
    const url=`${biorisUrl}/recSearch?param=${docQue}`
    fetch(url,{method:'POST'}).then(res=>res.json())
    .then(res=>{
        if(res.code===200){
            dispatch ({
                type:FOLDER_SUM_MONTH,
                payload:res.count
            })
        }
    })
 }
 export const docSumMonth=(batchQue)=>dispatch=>{
    const url=`${biorisUrl}/recSearch?param=${batchQue}`
    fetch(url,{method:'POST'}).then(res=>res.json())
    .then(res=>{
        if(res.code===200){
            dispatch ({
                type:DOC_SUM_MONTH,
                payload:res.count
            })
        }
    })
 }
 export const folSumYear=(docQue)=>dispatch=>{
    const url=`${biorisUrl}/recSearch?param=${docQue}`
    fetch(url,{method:'POST'}).then(res=>res.json())
    .then(res=>{
        if(res.code===200){
            dispatch ({
                type:FOLDER_SUM_YEAR,
                payload:res.count
            })
        }
    })
 }
 export const docSumYear=(batchQue)=>dispatch=>{
    const url=`${biorisUrl}/recSearch?param=${batchQue}`
    fetch(url,{method:'POST'}).then(res=>res.json())
    .then(res=>{
        if(res.code===200){
            dispatch ({
                type:DOC_SUM_YEAR,
                payload:res.count
            })
        }
    })
 }
 export const sumYear=(batchQue)=>dispatch=>{
    const url=`${biorisUrl}/recSearch?param=${batchQue}`
    fetch(url,{method:'POST'}).then(res=>res.json())
    .then(res=>{
        if(res.code===200){
            dispatch ({
                type:SUM_YEAR,
                payload:res.count
            })
        }
    })
 }
 export const sumToday=(batchQue)=>dispatch=>{
    const url=`${biorisUrl}/recSearch?param=${batchQue}`
    fetch(url,{method:'POST'}).then(res=>res.json())
    .then(res=>{
        if(res.code===200){
            dispatch ({
                type:SUM_TODAY,
                payload:res.count
            })
        }
    })
 }
export const loader=()=>{
    return {
        type:DASH_LOADER
    }
 }
export const fetchDashSum=(fSumMonth, dSumMonth, fSumYear, dSumYear, sYear)=>dispatch=>{
    dispatch(folSumMonth(fSumMonth))
    dispatch(docSumMonth(dSumMonth))
    dispatch(folSumYear(fSumYear))
    dispatch(docSumYear(dSumYear))
    dispatch(sumYear(sYear))
}
export const fetchDashToday=(sToday,fToday,dToday,bToday)=>dispatch=>{
    dispatch(sumToday(sToday))
    dispatch(newFolderToday(fToday))
    dispatch(newDocToday(dToday))
    dispatch(newBatchToday(bToday))
}