// Action creators
import { FullAction } from './store'

export const switchThemeAC = (theme: ThemeMode) => {
	return { type: 'APP/SWITCH_THEME', payload: { theme } } as const
}

export const setAppStatusAC = (status: RequestStatus) => {
	return { type: 'APP/SET_STATUS', payload: { status } } as const
}

export const setAppErrorAC = (error: string | null) => {
	return { type: 'APP/SET_ERROR', payload: { error } } as const
}

const initialState = {
	themeMode: 'light' as ThemeMode,
	status: 'idle' as RequestStatus,
	// error: 'TEST ERROR MESSAGE' as string | null,
	error: null as string | null,
}

export const appReducer = (
	state: AppState = initialState, action: FullAction
): AppState => {
	switch (action.type) {
		case 'APP/SWITCH_THEME': {
			return { ...state, themeMode: action.payload.theme }
		}
		case 'APP/SET_STATUS': {
			return { ...state, status: action.payload.status }
		}
		case 'APP/SET_ERROR': {
			return { ...state, error: action.payload.error }
		}
		default:
			return state
	}
}

// Actions types

export type ThemeMode = 'dark' | 'light'
export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

export type AppState = typeof initialState

export type SwitchThemeAction = ReturnType<typeof switchThemeAC>
export type SetAppStatusAction = ReturnType<typeof setAppStatusAC>
export type SetAppErrorAction = ReturnType<typeof setAppErrorAC>

export type AppAction =
	| SwitchThemeAction
	| SetAppStatusAction
	| SetAppErrorAction
