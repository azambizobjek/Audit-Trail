import { LIST_AUDIT } from '../actions/types'
const initialState = {
    audit:[]
}

export default (state = initialState, action) => {
  switch (action.type) {

  case LIST_AUDIT:
    return {
        ...state,
        audit:action.payload
     }

  default:
    return state
  }
}
