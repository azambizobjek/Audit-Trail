import { RECORD_LIST } from '../actions/types'

const initialState = {
    recordList:[]
}

export default (state = initialState, action) => {
  switch (action.type) {

  case RECORD_LIST:
    return {
        ...state,
        recordList:action.payload
    }

  default:
    return state
  }
}
