//put all of reducer inside this file

import {combineReducers} from 'redux'
import {LOG_OUT} from '../actions/types'
import authReducer from './authReducer'
import layoutInitReducer from './layoutInitReducer'
// import searchReducer from './searchReducer'
import dashReducer from './dashReducer'
import modalReducer from './modalReducer'
import stakehReducer from './stakehReducer'
// import logReducer from './logReducer'
// import batchLoadReducer from './batchLoadReducer'
// import recordReducer from './recordReducer'
import eventReducer from './eventReducer'
// import editorReducer from './editorReducer'
// import childRecReducer from './childRecReducer'
import breadcrumbReducer from './breadcrumbReducer'
import recReducer from './recReducer'
import auditReducer from './auditReducer'


const appReducer = combineReducers({
    session:authReducer,
    layout:layoutInitReducer,
    // search:searchReducer,
    dashConf:dashReducer,
    modalConf:modalReducer,
    stakeholder:stakehReducer,
    record:recReducer,
    
    actionTy:eventReducer,
    // batchErrLog:logReducer,
    // batchLoad:batchLoadReducer,
    // records:recordReducer,
    // editor:editorReducer,
    // childConf:childRecReducer,
    breadcrumb:breadcrumbReducer,
    auditlog:auditReducer
 })

export const rootReducer = ( state, action ) => {
   if ( action.type === LOG_OUT ) {
     state = undefined
   }
   return appReducer(state, action)
 }
