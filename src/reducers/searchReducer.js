import {
    GET_BASIC_SEARCH,
    SET_SEARCH_PARAM,
    GET_CONTAINER,
    RESET_CONF,
    GET_ADV_SEARCH} from '../actions/types'

const initialState = {
    parameter:{},
    recordList:[],
    containerList:[]
}

export default (state = initialState, action) => {
  switch (action.type) {

  case GET_BASIC_SEARCH:
    return {
        ...state,
        recordList:action.payload
    }
  case GET_ADV_SEARCH:
    return {
        ...state,
        recordList:action.payload
    }
  case SET_SEARCH_PARAM:
    return {
        ...state,
        parameter:action.payload
    }
  case GET_CONTAINER:
    return {
        ...state,
        containerList:action.payload
    }
    case RESET_CONF:
    return initialState
  default:
    return state
  }
}
