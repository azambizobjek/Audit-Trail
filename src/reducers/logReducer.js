import { LIST_BATCH_ERR } from '../actions/types'
const initialState = {
    log:[]
}

export default (state = initialState, action) => {
  switch (action.type) {

  case LIST_BATCH_ERR:
    return {
        ...state,
        log:action.payload
     }

  default:
    return state
  }
}
