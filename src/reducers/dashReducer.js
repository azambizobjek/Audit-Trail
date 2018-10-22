import {
    SUM_TODAY,
    SUM_YEAR,
    DASH_LOADER,
    FOLDER_SUM_TODAY,
    FOLDER_SUM_MONTH,
    NEW_BATCH_QUE,
    DOC_SUM_MONTH,
    FOLDER_SUM_YEAR,
    DOC_SUM_YEAR,
    DOCUMENT_SUM_TODAY} from '../actions/types'

import moment from 'moment'
const initialState={
    dashLoader:false,
    totalNew:0,
    totalYear:0,
    newFolderToday:0,
    newDocToday:0,
    newBatchToday:0,
    folSumMonth:0,
    docSumMonth:0,
    folSumYear:0,
    docSumYear:0,
    thisMonth:moment().format('MMMM'),
    thisYear:moment().format('YYYY')

}

export default function(state = initialState, action){
    switch(action.type){
        case SUM_TODAY:
        return {
            ...state,
            totalNew:action.payload
         }
         case SUM_YEAR:
         return {
             ...state,
             totalYear:action.payload
          }
        case DASH_LOADER:
        return {
            ...state,
            dashLoader:action.payload
         }
        case FOLDER_SUM_TODAY:
        return {
            ...state,
            newFolderToday:action.payload,
        }
        case DOCUMENT_SUM_TODAY:
        return {
            ...state,
            newDocToday:action.payload
        }
        case NEW_BATCH_QUE:
        return {
            ...state,
            newBatchToday:action.payload
        }
        case FOLDER_SUM_MONTH:
        return {
            ...state,
            folSumMonth:action.payload
        }
        case DOC_SUM_MONTH:
        return {
            ...state,
            docSumMonth:action.payload
        }
        case FOLDER_SUM_YEAR:
        return {
            ...state,
            folSumYear:action.payload
        }
        case DOC_SUM_YEAR:
        return {
            ...state,
            docSumYear:action.payload
        }
        default:
        return state
    }
}