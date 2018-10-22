import {SHOW_ADV,SHOW_FORM,SHOW_LOADER,SET_LOADER_TEXT,SHOW_ERR} from './types'

export const toggleAdv = (modalState) => ({
  type: SHOW_ADV,
  payload: modalState
})

export const toggleForm = (modalState) => ({
  type: SHOW_FORM,
  payload: modalState
})

export const toggleErr = (modalstate) => ({
  type: SHOW_ERR,
  payload: modalstate
})
export const toggleLoader = (modalState) => ({
  type: SHOW_LOADER,
  payload: modalState
})
export const setLoaderText = (modalState) => ({
  type: SET_LOADER_TEXT,
  payload: modalState
})
