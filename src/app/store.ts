import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import { TasksAction, tasksReducer } from '../features/todolists/model/tasks-reducer'
import { TodoListsAction, todoListsReducer } from '../features/todolists/model/todolists-reducer'
import { AppAction, appReducer } from './app-reducer'
import { thunk, ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AuthAction, authReducer } from '../features/auth/model/auth-reducer'

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
	tasks: tasksReducer,
	todoLists: todoListsReducer,
	app: appReducer,
	auth: authReducer
})
// непосредственно создаём store
export const store = createStore(rootReducer, {}, applyMiddleware(thunk))

// определить автоматически тип всего объекта состояния
export type RootState = ReturnType<typeof store.getState>

// типы action для всего приложения
export type FullAction = AppAction | TodoListsAction | TasksAction | AuthAction

// export type AppDispatch = typeof store.dispatch
export type AppDispatch = ThunkDispatch<RootState, unknown, FullAction>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, FullAction>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
