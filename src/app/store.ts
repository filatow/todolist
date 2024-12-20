import {
	applyMiddleware,
	combineReducers,
	legacy_createStore as createStore,
	UnknownAction
} from 'redux'
import { TasksAction, tasksReducer } from '../features/todolists/model/tasks-reducer'
import { TodoListsAction, todoListsReducer } from '../features/todolists/model/todolists-reducer'
import { AppAction, appReducer } from './app-reducer'
import { thunk, ThunkDispatch } from 'redux-thunk'

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
	tasks: tasksReducer,
	todoLists: todoListsReducer,
	app: appReducer
})
// непосредственно создаём store
export const store = createStore(rootReducer, {}, applyMiddleware(thunk))

// определить автоматически тип всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch
export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>

// типы экшенов для всего App
export type FullAction = AppAction | TodoListsAction | TasksAction

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
