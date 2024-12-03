import { createTheme } from '@mui/material/styles'
import { ThemeMode } from '../../app/app-reducer'

export function getTheme(themeMode: ThemeMode) {
	return createTheme({
		palette: {
			mode: themeMode === 'light' ? 'light' : 'dark',
			primary: {
				main: '#087EA4',
			},
		},
	})
}