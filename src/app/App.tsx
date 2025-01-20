import React, { useEffect } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { ErrorSnackbar, Header } from 'common/components'
import { CircularProgress, CssBaseline } from '@mui/material'
import { getTheme } from 'common/theme/theme'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { selectTheme } from './appSlice'
import { Routing } from 'common/routing'
import { useAppDispatch } from 'common/hooks'
import { initializeAppTC, selectIsInitialized } from '../features/auth/model/authSlice'
import s from './App.module.css'

function App() {
	const dispatch = useAppDispatch()
	const themeMode = useAppSelector(selectTheme)
	const isInitialized = useAppSelector(selectIsInitialized)

	const theme = getTheme(themeMode)

	useEffect(() => {
		dispatch(initializeAppTC())
	}, [])

	if (!isInitialized) {
		return (
			<div className={s.circularProgressContainer}>
				<CircularProgress size={150} thickness={3} />
			</div>
		)
	}

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Header />
			<Routing />
			<ErrorSnackbar />
		</ThemeProvider>
	)
}

export default App
