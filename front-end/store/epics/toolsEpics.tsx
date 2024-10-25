import axios from 'axios'
import { combineEpics, Epic } from 'redux-observable'
import { catchError, filter, map, mergeMap, startWith, switchMap } from 'rxjs/operators'
import {
  addedTools,
  addingTools,
  addingToolsFailed,
  editedTools,
  editingTools,
  editingToolsFailed,
  foundTools,
  loadedTools,
  loadingTools,
  loadingToolsFailed,
  removedTool,
  removingTool,
  removingToolFailed,
  searchingTools,
  searchingToolsFailed,
  ToolsAction,
  ToolsActionTypes,
} from '../actions/toolsActions'
import buildFormData from './buildFormData'

import { from, of } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { IState } from '../reducers'

const searchToolsEpic: Epic<ToolsAction, ToolsAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(ToolsActionTypes.SEARCH_TOOLS)),
    mergeMap((action) => {
      if (typeof action.searchOptions === 'string') {
        action.searchOptions = {
          searchString: action.searchOptions,
          page: 1,
          searchField: '_id',
        }
      }
      let url = `https://miportfolio.backend.aptugo.app/api/tools/search/`
      return from(axios.get(url, { params: action.searchOptions })).pipe(
        map((response) => foundTools(response.data, action.keep)),
        startWith(searchingTools()),
        catchError(() => of(searchingToolsFailed()))
      )
    })
  )

const loadToolsEpic: Epic<ToolsAction, ToolsAction, IState> = (action$, state$) => {
  let responses = []
  return action$.pipe(
    filter(isOfType(ToolsActionTypes.LOAD_TOOLS)),
    switchMap((action) => {
      let url = `https://miportfolio.backend.aptugo.app/api/tools/`
      return from(axios.get(url, { params: action.loadOptions })).pipe(
        map((response) => loadedTools(response.data)),
        startWith(loadingTools()),
        catchError(() => of(loadingToolsFailed()))
      )
    })
  )
}

const addToolsEpic: Epic<ToolsAction, ToolsAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(ToolsActionTypes.ADD_TOOLS)),

    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.post(`https://miportfolio.backend.aptugo.app/api/tools/`, data, config)).pipe(
        map((response) => addedTools(response.data)),
        startWith(addingTools()),
        catchError((err) => of(addingToolsFailed(err.response)))
      )
    })
  )

const removeToolsEpic: Epic<ToolsAction, ToolsAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(ToolsActionTypes.REMOVE_TOOL)),
    mergeMap((action) =>
      from(axios.delete(`https://miportfolio.backend.aptugo.app/api/tools/${action.payload._id}`)).pipe(
        map((response) => removedTool()),
        startWith(removingTool()),
        catchError(() => of(removingToolFailed()))
      )
    )
  )

const editToolsEpic: Epic<ToolsAction, ToolsAction, IState> = (action$, state$) =>
  action$.pipe(
    filter(isOfType(ToolsActionTypes.EDIT_TOOLS)),
    mergeMap((action) => {
      const data = new FormData()
      buildFormData(data, action.payload)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }

      return from(axios.put(`https://miportfolio.backend.aptugo.app/api/tools/${action.payload._id}`, data, config)).pipe(
        map((response) => editedTools(response.data)),
        startWith(editingTools()),
        catchError((err) => of(editingToolsFailed(err.response)))
      )
    })
  )

export default combineEpics(searchToolsEpic, loadToolsEpic, addToolsEpic, removeToolsEpic, editToolsEpic)
