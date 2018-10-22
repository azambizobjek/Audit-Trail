import { LIST_BATCH,BATCH_UPLOAD } from '../actions/types'

const initialState = {
    queList:[],
    response:null
}

export default (state = initialState, action) => {
  switch (action.type) {

  case LIST_BATCH:
    return {
        ...state,
        queList:action.payload
    }
    // case LIST_BATCH:
    // return {
    //     ...state,
    //     response:action.payload
    // }
  default:
    return state
  }
}
