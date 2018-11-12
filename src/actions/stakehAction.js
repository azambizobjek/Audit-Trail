import { STAKEH_LIST } from './types'

import {biorisUrl} from '../config'

export const getStakehList=(stakehParam)=>dispatch=>{
    const url=`${biorisUrl}/stakeholder?param=${JSON.stringify(stakehParam)}`
   fetch(url)
   .then(res=>res.json())
   .then(res=>dispatch({type: STAKEH_LIST,
    payload: res.results}))

}


