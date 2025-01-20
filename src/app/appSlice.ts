// Action creators
import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
	name: 'app',
	initialState: {
		themeMode: 'dark' as ThemeMode,
		status: 'idle' as RequestStatus,
		error: null as string | null
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
		})
	}),
	selectors: {
		selectTheme: (state) => state.themeMode,
		selectAppStatus: (state) => state.status,
		selectAppError: (state) => state.error
	}
})

export const appReducer = appSlice.reducer

export const { switchTheme, setAppStatus, setAppError } = appSlice.actions
// export type AppInitialState = ReturnType<typeof appSlice.getInitialState>

export const {selectTheme, selectAppStatus, selectAppError} = appSlice.selectors

// types
export type ThemeMode = 'dark' | 'light'
export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

export type SwitchThemeAction = ReturnType<typeof switchTheme>
export type SetAppStatusAction = ReturnType<typeof setAppStatus>
export type SetAppErrorAction = ReturnType<typeof setAppError>

export type AppAction = SwitchThemeAction | SetAppStatusAction | SetAppErrorAction