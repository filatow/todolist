// Action creators
import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit'
import { todoListsApi } from '../features/todolists/api/todolistsApi'
import { tasksApi } from '../features/todolists/api/tasksApi'

export const appSlice = createSlice({
	name: 'app',
	initialState: {
		themeMode: 'dark' as ThemeMode,
		status: 'idle' as RequestStatus,
		error: null as string | null,
		isLoggedIn: false
	},
	reducers: (create) => ({
		switchTheme: create.reducer<{ theme: ThemeMode }>((state, action) => {
			state.themeMode = action.payload.theme
		}),
		setAppStatus: create.reducer<{ status: RequestStatus }>((state, action) => {
			state.status = action.payload.status
		}),
		setAppError: create.reducer<{ error: string | null }>((state, action) => {
			state.error = action.payload.error
		}),
		setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
			state.isLoggedIn = action.payload.isLoggedIn
		})
	}),
	extraReducers: (builder) => {
		builder
			.addMatcher(isPending, (state, action) => {
				if (
					todoListsApi.endpoints.getTodoLists.matchPending(action) ||
					tasksApi.endpoints.getTasks.matchPending(action)
				) {
					return
				}
				state.status = 'loading'
			})
			.addMatcher(isFulfilled, (state) => {
				state.status = 'succeeded'
			})
			.addMatcher(isRejected, (state) => {
				state.status = 'failed'
			})
	},
	selectors: {
		selectTheme: (state) => state.themeMode,
		selectAppStatus: (state) => state.status,
		selectAppError: (state) => state.error,
		selectIsLoggedIn: (state) => state.isLoggedIn
	}
})

export const appReducer = appSlice.reducer

export const { switchTheme, setAppStatus, setAppError, setIsLoggedIn } = appSlice.actions

export const { selectTheme, selectAppStatus, selectAppError, selectIsLoggedIn } = appSlice.selectors

// types
export type ThemeMode = 'dark' | 'light'
export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'
