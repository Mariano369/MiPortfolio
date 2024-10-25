import produce from 'immer'
import { ToolsAction, ToolsActionTypes } from '../actions/toolsActions'
import { ApiStatus, IToolsItem } from '../models'

export const initialToolsState: IToolsState = {
  loadingStatus: ApiStatus.NOTLOADED,
  addingStatus: ApiStatus.NOTLOADED,
  searchingStatus: ApiStatus.NOTLOADED,
  searchString: '',
  tools: [],
  foundtools: [],
  totalDocs: 0,
  errMessage: '',
  errStatus: null,
  errField: null,
}

export default function toolsReducer(state: IToolsState = initialToolsState, action: ToolsAction) {
  return produce(state, (draft) => {
    switch (action.type) {
      case ToolsActionTypes.SEARCH_TOOLS:
        draft.searchString = action.searchOptions.searchString
        break
      case ToolsActionTypes.SEARCHING_TOOLS:
        draft.searchingStatus = ApiStatus.LOADING
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.NOTLOADED
        break

      case ToolsActionTypes.SEARCHING_TOOLS_FAILED:
        draft.searchingStatus = ApiStatus.FAILED
        break

      case ToolsActionTypes.FOUND_TOOLS:
        draft.searchingStatus = ApiStatus.LOADED
        action.keep ? draft.foundtools.push(...action.payload.tools.docs) : (draft.foundtools = action.payload.tools.docs)
        draft.totalDocs = action.payload.tools.totalDocs
        break

      case ToolsActionTypes.LOAD_TOOLS:
      case ToolsActionTypes.LOADING_TOOLS:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.NOTLOADED
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.foundtools = []
        break

      case ToolsActionTypes.LOADING_TOOLS_FAILED:
        draft.loadingStatus = ApiStatus.FAILED
        break

      case ToolsActionTypes.LOADED_TOOLS:
        draft.loadingStatus = ApiStatus.LOADED
        draft.tools = action.payload.tools.docs
        draft.totalDocs = action.payload.tools.totalDocs
        break

      case ToolsActionTypes.ADD_TOOLS:
      case ToolsActionTypes.ADDING_TOOLS:
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        draft.errMessage = ''
        draft.errStatus = null
        draft.errField = null
        break

      case ToolsActionTypes.ADDING_TOOLS_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break

      case ToolsActionTypes.ADDED_TOOLS:
        draft.addingStatus = ApiStatus.LOADED
        draft.errStatus = 200
        draft.tools.push(action.payload.tools.docs[0])
        if (draft.searchString) draft.foundtools.push(action.payload.tools.docs[0])
        break

      case ToolsActionTypes.REMOVE_TOOL:
        draft.tools.splice(
          draft.tools.findIndex((tool) => tool._id === action.payload._id),
          1
        )
        break

      case ToolsActionTypes.EDIT_TOOLS:
        draft.loadingStatus = ApiStatus.NOTLOADED
        draft.addingStatus = ApiStatus.LOADING
        draft.searchingStatus = ApiStatus.NOTLOADED
        break

      case ToolsActionTypes.EDITING_TOOLS:
        draft.loadingStatus = ApiStatus.LOADING
        draft.addingStatus = ApiStatus.LOADING
        break

      case ToolsActionTypes.EDITED_TOOLS:
        draft.addingStatus = ApiStatus.LOADED
        draft.tools[draft.tools.findIndex((tool) => tool._id === action.payload._id)] = action.payload
        draft.foundtools[draft.foundtools.findIndex((tool) => tool._id === action.payload._id)] = action.payload
        break

      case ToolsActionTypes.EDITING_TOOLS_FAILED:
        draft.addingStatus = ApiStatus.FAILED
        draft.errMessage = action.message
        draft.errStatus = action.status
        draft.errField = action.field
        break
    }
  })
}

export interface IToolsState {
  loadingStatus: ApiStatus
  addingStatus: ApiStatus
  searchingStatus: ApiStatus
  searchString: string
  tools: IToolsItem[]
  foundtools: IToolsItem[]
  totalDocs: number
  errMessage?: string
  errStatus?: number
  errField?: string
}
