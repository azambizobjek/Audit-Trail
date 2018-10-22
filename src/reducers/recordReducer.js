import {
    SET_PAGE_TITLE,
    SET_PAGING,
    SET_CARD_VIEW,
    SET_CURRENT_PAGE,
    SET_STARTPAGE,
    SET_ISCONTAINER,
    CHANGE_ISMULTI,
    SHOW_FAB,
    SHOW_MULTIFAB,
    REC_ITEM_ACCESS_DEL,
    REC_ITEM_ACCESS_EDIT,
    REC_ITEM_ACCESS_ACL,
    SET_SEL_REC,
    SET_SEL_ALL,
    RESET_CONF,
    SET_TOTAL_PAGE} from '../actions/types'


const initialState={
    pageTitle:null,
    cardView:true,
    currentPage:1,
    start:0,
    pageLimit:20,
    totalRecords:0,
    showMultiFab:true,
    showFab:false,
    canDelete:true,
    canUpdate:true,
    canACL:true,
    isContainer:false,
    isMultiSel:false,
    selRec:null,
    isSelAll:false

}

export default function(state = initialState, action){
    switch(action.type){
        case RESET_CONF:
        return initialState
        case SET_PAGE_TITLE:
        return {
            ...state,
            pageTitle:action.payload,
        }
        case SET_PAGING:
        return {
            ...state,
            toggleSideNav:action.payload
        }
        case SET_CARD_VIEW:
        return {
            ...state,
            cardView:action.payload
        }
        case SET_TOTAL_PAGE:
        return {
            ...state,
            totalRecords:action.payload
        }
        case SET_STARTPAGE:
        return {
            ...state,
            start:action.payload
        }
        case SET_CURRENT_PAGE:
        return {
            ...state,
            currentPage:action.payload
        }
        case CHANGE_ISMULTI:
        return {
            ...state,
            isMultiSel:action.payload
        }
        case SHOW_FAB:
        return {
            ...state,
            showFab:action.payload
        }
        case SHOW_MULTIFAB:
        return {
            ...state,
            showMultiFab:action.payload
        }
        case SET_SEL_ALL:
        return {
            ...state,
            isSelAll:action.payload
        }
        case SET_ISCONTAINER:
        return {
            ...state,
            isContainer:action.payload
        }
        case REC_ITEM_ACCESS_DEL:
        return {
            ...state,
            canDelete:action.payload
        }
        case REC_ITEM_ACCESS_EDIT:
        return {
            ...state,
            canUpdate:action.payload
        }
        case REC_ITEM_ACCESS_ACL:
        return {
            ...state,
            canACL:action.payload
        }
        case SET_SEL_REC:
        return {
            ...state,
            selRec:action.payload
        }
        default:
        return state
    }
}