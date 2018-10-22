import {SHOW_ADV,SHOW_LOADER,SET_LOADER_TEXT,SHOW_FORM,SHOW_ERR} from '../actions/types'

const initialState = {
    showAdv:false,
    showForm:false,
    showErr:false,
    showLoader:false,
    loaderText:null
}

export default (state = initialState, action) => {
  switch (action.type) {

  case SHOW_ADV:
    return {
        ...state,
        showAdv:action.payload
    }

  case SHOW_FORM:
    return {
        ...state,
        showForm:action.payload
    }

    case SHOW_ERR:
    return {
        ...state,
        showErr:action.payload
    }

    case SHOW_LOADER:
    return {
        ...state,
        showLoader:action.payload
    }

    case SET_LOADER_TEXT:
    return {
        ...state,
        loaderText:action.payload
    }
  default:
    return state
  }
}
