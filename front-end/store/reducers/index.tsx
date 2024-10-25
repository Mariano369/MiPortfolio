import { combineReducers } from 'redux'

import toolsReducer, { initialToolsState, IToolsState } from './toolsReducer'

export interface IState {
  tools: IToolsState
}

export const initialState: IState = {
  tools: initialToolsState,
}

export default combineReducers({
  tools: toolsReducer,
})
