// Action creators
import { FullAction } from './store'

export const switchThemeAC = (theme: ThemeMode) => {
	return { type: 'SWITCH_THEME', payload: { theme } } as const
}

const initialState = {
	themeMode: 'light' as ThemeMode
}

export const appReducer = (state: AppState = initialState, action: FullAction): AppState => {
	switch (action.type) {
		case 'SWITCH_THEME': {
			return { ...state, themeMode: action.payload.theme }
		}
		default:
			return state
	}
}

// Actions types

export type ThemeMode = 'dark' | 'light'

export type AppState = typeof initialState

export type SwitchThemeAction = ReturnType<typeof switchThemeAC>

export type AppAction = SwitchThemeAction
