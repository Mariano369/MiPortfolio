import { Action } from 'redux'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { IState } from '../reducers'
import toolsEpics from './toolsEpics'

export const rootEpic = combineEpics(toolsEpics)

export default createEpicMiddleware<Action, Action, IState>()
