import { ACTION_TYPES } from '../actions/types'

const initialState = {
    actionTypes:[]
}

export default (state = initialState, action) => {
  switch (action.type) {

  case ACTION_TYPES:
    return {
        ...state,
        actionTypes:action.payload
    }

  default:
    return state
  }
}
