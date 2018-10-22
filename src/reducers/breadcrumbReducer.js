import { SET_BREADCRUMB,INSERT_NEW_BREADCRUMB } from '../actions/types'

const initialState = {
    breadList:[
        {id:'home', label:'Home', activePage:'dashboard', cls:'breadcrumb-item'}
    ],
    newBread:{}
}

export default (state = initialState, action) => {
  switch (action.type) {

  case INSERT_NEW_BREADCRUMB:
    return {
        ...state,
        newBread:action.payload
    }
    case SET_BREADCRUMB:
    return {
        ...state,
        breadList:action.payload
    }
  default:
    return state
  }
}
