import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { Header } from 'common/components'
import { CssBaseline } from '@mui/material'
import { getTheme } from 'common/theme/theme'
import Main from './Main'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { selectTheme } from './appSelectors'

function App() {
	const themeMode = useAppSelector(selectTheme)

	const theme = getTheme(themeMode)

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Header />
			<Main />
		</ThemeProvider>
	)
}

export default App
