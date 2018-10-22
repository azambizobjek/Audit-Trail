import { SET_BREADCRUMB, INSERT_NEW_BREADCRUMB } from '../actions/types'

export const setBread = (breadDetails) => dispatch=>{
    dispatch({
        type: SET_BREADCRUMB,
        payload: breadDetails
    })

}
export const setNewBread = (breadDetails) => dispatch=>{
    dispatch({
        type: INSERT_NEW_BREADCRUMB,
        payload: breadDetails
    })

}
