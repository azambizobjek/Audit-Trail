import { RECORD_LIST } from './types'

import {biorisUrl} from '../config'

export const getRecordList=(recordParam)=>dispatch=>{
    const url=`${biorisUrl}/record?param=${JSON.stringify(recordParam)}`
   fetch(url)
   .then(res=>res.json())
   .then(res=>dispatch({type: RECORD_LIST,
    payload: res.results}))

}