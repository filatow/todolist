import { appReducer, appSlice } from './appSlice'
import { configureStore } from '@reduxjs/toolkit'
import { todoListsApi } from '../features/todolists/api/todolistsApi'
import { setupListeners } from '@reduxjs/toolkit/query'
import { baseApi } from './baseApi'

// непосредственно создаём store
export const store = configureStore({
	reducer: {
		[appSlice.name]: appReducer,
		[baseApi.reducerPath]: todoListsApi.reducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todoListsApi.middleware)
})

setupListeners(store.dispatch)

// определить автоматически тип всего объекта состояния
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
