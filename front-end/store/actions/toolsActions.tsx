import { IpaginatedTools, IToolsItem } from '../models'

export enum ToolsActionTypes {
  SEARCH_TOOLS = 'tools/search',
  SEARCHING_TOOLS = 'tools/searching',
  FOUND_TOOLS = 'tools/found',
  SEARCHING_TOOLS_FAILED = 'tools/searching_failed',

  LOAD_TOOLS = 'tools/load',
  LOADING_TOOLS = 'tools/loading',
  LOADED_TOOLS = 'tools/loaded',
  LOADING_TOOLS_FAILED = 'tools/loading_failed',

  ADD_TOOLS = 'tools/add',
  ADDING_TOOLS = 'tools/adding',
  ADDED_TOOLS = 'tools/added',
  ADDING_TOOLS_FAILED = 'tools/adding_failed',

  REMOVE_TOOL = 'tools/remove',
  REMOVING_TOOL = 'tools/removing',
  REMOVED_TOOL = 'tools/removed',
  REMOVING_TOOL_FAILED = 'tools/removing_failed',

  EDIT_TOOLS = 'tools/edit',
  EDITING_TOOLS = 'tools/editing',
  EDITED_TOOLS = 'tools/edited',
  EDITING_TOOLS_FAILED = 'tools/editing_failed',

  VIEW_TOOLS = 'tools/view',
  VIEWING_TOOLS = 'tools/viewing',
  VIEWED_TOOLS = 'tools/viewed',
  VIEWING_TOOLS_FAILED = 'tools/viewing_failed',
}

export function searchTools(searchOptions: TSearchOptions | string, keep?: boolean): ISearchToolsAction {
  return {
    type: ToolsActionTypes.SEARCH_TOOLS,
    searchOptions: typeof searchOptions === 'string' ? { searchString: searchOptions } : searchOptions,
    keep: keep,
  }
}

export function searchingTools(): ISearchingToolsAction {
  return {
    type: ToolsActionTypes.SEARCHING_TOOLS,
  }
}

export function foundTools(tools: IpaginatedTools, keep?: boolean): IFoundToolsAction {
  return {
    type: ToolsActionTypes.FOUND_TOOLS,
    keep: keep,
    payload: {
      tools,
    },
  }
}

export function searchingToolsFailed(): ISearchingToolsFailedAction {
  return {
    type: ToolsActionTypes.SEARCHING_TOOLS_FAILED,
  }
}

export function loadTools(loadOptions: TSearchOptions): ILoadToolsAction {
  return {
    type: ToolsActionTypes.LOAD_TOOLS,
    loadOptions: loadOptions,
  }
}

export function loadingTools(): ILoadingToolsAction {
  return {
    type: ToolsActionTypes.LOADING_TOOLS,
  }
}

export function loadedTools(tools: IpaginatedTools): ILoadedToolsAction {
  return {
    type: ToolsActionTypes.LOADED_TOOLS,
    payload: {
      tools,
    },
  }
}

export function loadingToolsFailed(): ILoadingToolsFailedAction {
  return {
    type: ToolsActionTypes.LOADING_TOOLS_FAILED,
  }
}

export function addTools(tool: IToolsItem): IAddToolsAction {
  return {
    type: ToolsActionTypes.ADD_TOOLS,
    payload: tool,
  }
}

export function addingTools(): IAddingToolsAction {
  return {
    type: ToolsActionTypes.ADDING_TOOLS,
  }
}

export function addedTools(tools: IpaginatedTools): IAddedToolsAction {
  return {
    type: ToolsActionTypes.ADDED_TOOLS,
    payload: {
      tools,
    },
  }
}

export function addingToolsFailed(errData: { data: { message: string; field?: string }; status: number }): IAddingToolsFailedAction {
  return {
    type: ToolsActionTypes.ADDING_TOOLS_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}

export function removeTool(tool: IToolsItem): IRemoveToolAction {
  return {
    type: ToolsActionTypes.REMOVE_TOOL,
    payload: tool,
  }
}

export function removingTool(): IRemovingToolAction {
  return {
    type: ToolsActionTypes.REMOVING_TOOL,
  }
}

export function removedTool(): IRemovedToolAction {
  return {
    type: ToolsActionTypes.REMOVED_TOOL,
  }
}

export function removingToolFailed(): IRemovingToolFailedAction {
  return {
    type: ToolsActionTypes.REMOVING_TOOL_FAILED,
  }
}

export function editTools(tool: IToolsItem): IEditToolsAction {
  return {
    type: ToolsActionTypes.EDIT_TOOLS,
    payload: tool,
  }
}

export function editingTools(): IEditingToolsAction {
  return {
    type: ToolsActionTypes.EDITING_TOOLS,
  }
}

export function editedTools(tools: IToolsItem): IEditedToolsAction {
  return {
    type: ToolsActionTypes.EDITED_TOOLS,
    payload: tools,
  }
}

export function editingToolsFailed(errData: { data: { message: string; field?: string }; status: number }): IEditingToolsFailedAction {
  return {
    type: ToolsActionTypes.EDITING_TOOLS_FAILED,
    message: errData.data.message,
    status: errData.status,
    field: errData.data.field,
  }
}
export function viewTools(tool: IToolsItem): IViewToolsAction {
  return {
    type: ToolsActionTypes.VIEW_TOOLS,
    payload: tool,
  }
}

export function viewingTools(): IViewingToolsAction {
  return {
    type: ToolsActionTypes.VIEWING_TOOLS,
  }
}

export function viewedTools(tools: IToolsItem): IViewedToolsAction {
  return {
    type: ToolsActionTypes.VIEWED_TOOLS,
    payload: tools,
  }
}

export function viewingToolsFailed(): IViewingToolsFailedAction {
  return {
    type: ToolsActionTypes.VIEWING_TOOLS_FAILED,
  }
}

type TSearchOptions = {
  searchString?: string
  searchField?: string
  page?: number
  limit?: number
  populate?: boolean
  sort?: {
    field: string
    method?: 'asc' | 'desc'
  }
  filters?: { field: string; value: string }[]
}

export interface ISearchToolsAction {
  type: ToolsActionTypes.SEARCH_TOOLS
  searchOptions: TSearchOptions
  keep?: boolean
}

export interface ISearchingToolsAction {
  type: ToolsActionTypes.SEARCHING_TOOLS
}

export interface IFoundToolsAction {
  type: ToolsActionTypes.FOUND_TOOLS
  keep?: boolean
  payload: {
    tools: IpaginatedTools
  }
}

export interface ISearchingToolsFailedAction {
  type: ToolsActionTypes.SEARCHING_TOOLS_FAILED
}

export interface ILoadToolsAction {
  type: ToolsActionTypes.LOAD_TOOLS
  loadOptions: TSearchOptions
}

export interface ILoadingToolsAction {
  type: ToolsActionTypes.LOADING_TOOLS
}

export interface ILoadedToolsAction {
  type: ToolsActionTypes.LOADED_TOOLS
  payload: {
    tools: IpaginatedTools
  }
}

export interface ILoadingToolsFailedAction {
  type: ToolsActionTypes.LOADING_TOOLS_FAILED
}

export interface IAddToolsAction {
  type: ToolsActionTypes.ADD_TOOLS
  payload: IToolsItem
}

export interface IAddingToolsAction {
  type: ToolsActionTypes.ADDING_TOOLS
}

export interface IAddedToolsAction {
  type: ToolsActionTypes.ADDED_TOOLS
  payload: {
    tools: IpaginatedTools
  }
}

export interface IAddingToolsFailedAction {
  type: ToolsActionTypes.ADDING_TOOLS_FAILED
  message: string
  status: number
  field?: string
}

export interface IRemoveToolAction {
  type: ToolsActionTypes.REMOVE_TOOL
  payload: IToolsItem
}

export interface IRemovingToolAction {
  type: ToolsActionTypes.REMOVING_TOOL
}

export interface IRemovedToolAction {
  type: ToolsActionTypes.REMOVED_TOOL
}

export interface IRemovingToolFailedAction {
  type: ToolsActionTypes.REMOVING_TOOL_FAILED
}

export interface IEditToolsAction {
  type: ToolsActionTypes.EDIT_TOOLS
  payload: IToolsItem
}

export interface IEditingToolsAction {
  type: ToolsActionTypes.EDITING_TOOLS
}

export interface IEditedToolsAction {
  type: ToolsActionTypes.EDITED_TOOLS
  payload: IToolsItem
}

export interface IEditingToolsFailedAction {
  type: ToolsActionTypes.EDITING_TOOLS_FAILED
  message: string
  status: number
  field?: string
}

export interface IViewToolsAction {
  type: ToolsActionTypes.VIEW_TOOLS
  payload: IToolsItem
}

export interface IViewingToolsAction {
  type: ToolsActionTypes.VIEWING_TOOLS
}

export interface IViewedToolsAction {
  type: ToolsActionTypes.VIEWED_TOOLS
  payload: IToolsItem
}

export interface IViewingToolsFailedAction {
  type: ToolsActionTypes.VIEWING_TOOLS_FAILED
}

export type ToolsAction =
  | ISearchToolsAction
  | ISearchingToolsAction
  | IFoundToolsAction
  | ISearchingToolsFailedAction
  | ILoadToolsAction
  | ILoadingToolsAction
  | ILoadedToolsAction
  | ILoadingToolsFailedAction
  | IAddToolsAction
  | IAddingToolsAction
  | IAddedToolsAction
  | IAddingToolsFailedAction
  | IRemoveToolAction
  | IRemovingToolAction
  | IRemovedToolAction
  | IRemovingToolFailedAction
  | IEditToolsAction
  | IEditingToolsAction
  | IEditedToolsAction
  | IEditingToolsFailedAction
  | IViewToolsAction
  | IViewingToolsAction
  | IViewedToolsAction
  | IViewingToolsFailedAction
