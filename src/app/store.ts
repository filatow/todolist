import { TasksAction, tasksReducer, tasksSlice } from '../features/todolists/model/tasksSlice'
import {
	TodoListsAction,
	todoListsSlice,
	todoListsReducer
} from '../features/todolists/model/todolistsSlice'
import { AppAction, appReducer, appSlice } from './appSlice'
import { ThunkAction } from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'
import { todoListsApi } from '../features/todolists/api/todolistsApi'
import { setupListeners } from '@reduxjs/toolkit/query'
import { baseApi } from './baseApi'

// непосредственно создаём store
export const store = configureStore({
	reducer: {
		[appSlice.name]: appReducer,
		[todoListsSlice.name]: todoListsReducer,
		[tasksSlice.name]: tasksReducer,
		[baseApi.reducerPath]: todoListsApi.reducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todoListsApi.middleware)
})

setupListeners(store.dispatch)

// определить автоматически тип всего объекта состояния
export type RootState = ReturnType<typeof store.getState>

// типы action для всего приложения
export type FullAction = AppAction | TodoListsAction | TasksAction

export type AppDispatch = typeof store.dispatch
// export type AppDispatch = ThunkDispatch<RootState, unknown, FullAction>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, FullAction>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
