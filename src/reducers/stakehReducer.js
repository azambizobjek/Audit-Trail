import { STAKEH_LIST } from '../actions/types'

const initialState = {
    stakehList:[]
}

export default (state = initialState, action) => {
  switch (action.type) {

  case STAKEH_LIST:
    return {
        ...state,
        stakehList:action.payload
    }

  default:
    return state
  }
}
