import {
    ACTIVE_EDITOR,
    ACTIVE_HEADER,
    GET_REC_DETAILS,
    RESET_CONF,
    GET_CONTENT_FILE_ID,
    GET_IFRAME,
    IS_DELETE,
    GET_AUDIT_LOG } from '../actions/types'

const initialState = {
    tabHeader:'folder',
    activeEditor:null,
    auditLog:[],
    recDetails:[],
    ctnId:null,
    iframeSrc:null,
    isDelete:false
}

export default (state = initialState, action) => {
  switch (action.type) {

  case ACTIVE_HEADER:
    return {
        ...state,
        tabHeader:action.payload
    }
    case ACTIVE_EDITOR:
    return {
        ...state,
        activeEditor:action.payload
    }
    case GET_AUDIT_LOG:
    return {
        ...state,
        auditLog:action.payload
    }
    case GET_REC_DETAILS:
    return {
        ...state,
        recDetails:action.payload
    }
    case GET_CONTENT_FILE_ID:
    return {
        ...state,
        ctnId:action.payload
    }
    case GET_IFRAME:
    return {
        ...state,
        iframeSrc:action.payload
    }
    case IS_DELETE:
    return {
        ...state,
        isDelete:action.payload
    }
    case RESET_CONF:
    return initialState
  default:
    return state
  }
}
