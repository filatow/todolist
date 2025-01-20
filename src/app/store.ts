import { TasksAction, tasksReducer, tasksSlice } from '../features/todolists/model/tasksSlice'
import {
	TodoListsAction,
	todoListsSlice,
	todolistsSlice
} from '../features/todolists/model/todolistsSlice'
import { AppAction, appReducer, appSlice } from './appSlice'
import { ThunkAction } from 'redux-thunk'
import { AuthAction, authReducer, authSlice } from '../features/auth/model/authSlice'
import { configureStore } from '@reduxjs/toolkit'

// непосредственно создаём store
// export const store = createStore(rootReducer, {}, applyMiddleware(thunk))
export const store = configureStore({
	reducer: {
		[authSlice.name]: authReducer,
		[appSlice.name]: appReducer,
		[todoListsSlice.name]: todolistsSlice,
		[tasksSlice.name]: tasksReducer
	}
})

// определить автоматически тип всего объекта состояния
export type RootState = ReturnType<typeof store.getState>

// типы action для всего приложения
export type FullAction = AppAction | TodoListsAction | TasksAction | AuthAction

export type AppDispatch = typeof store.dispatch
// export type AppDispatch = ThunkDispatch<RootState, unknown, FullAction>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, FullAction>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
