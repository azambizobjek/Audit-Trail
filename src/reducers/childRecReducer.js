import {
    CHILD_LIMIT_PAGE,
    CHILD_START_PAGE,
    CHILD_CURRENT_PAGE,
    SET_CHILD_PARAM,
    CHILD_TOTAL_REC,
    CHILD_ITEM_ACCESS_DEL,
    CHILD_ITEM_ACCESS_EDIT,
    CHILD_ITEM_ACCESS_ACL,
    CHILD_SEL_REC,
    SHOW_CHILD_FAB,
    ACTIVATE_CHILD,
    RESET_CONF,
    GET_CHILD,} from '../actions/types'

const initialState = {
    isChild:false,
    parameter:{},
    childList:[],
    start:0,
    page:1,
    limit:6,
    totalRec:0,
    canDelete:true,
    canUpdate:true,
    canACL:true,
    showFab:false,
    selRec:{}
}

export default (state = initialState, action) => {
  switch (action.type) {
  case SET_CHILD_PARAM:
    return {
        ...state,
        parameter:action.payload
    }
  case CHILD_TOTAL_REC:
    return {
        ...state,
        totalRec:action.payload
    }
    case CHILD_CURRENT_PAGE:
    return {
        ...state,
        page:action.payload
    }
    case CHILD_START_PAGE:
    return {
        ...state,
        start:action.payload
    }
    case CHILD_LIMIT_PAGE:
    return {
        ...state,
        limit:action.payload
    }
    case GET_CHILD:
    return {
        ...state,
        childList:action.payload
    }
    case CHILD_ITEM_ACCESS_DEL:
    return {
        ...state,
        canDelete:action.payload
    }
    case CHILD_ITEM_ACCESS_EDIT:
    return {
        ...state,
        canUpdate:action.payload
    }
    case CHILD_ITEM_ACCESS_ACL:
    return {
        ...state,
        canACL:action.payload
    }
    case CHILD_SEL_REC:
    return {
        ...state,
        selRec:action.payload
    }
    case SHOW_CHILD_FAB:
    return {
        ...state,
        showFab:action.payload
    }
    case ACTIVATE_CHILD:
    return{
        ...state,
        isChild:action.payload
    }
    case RESET_CONF:
    return initialState

  default:
    return state
  }
}
