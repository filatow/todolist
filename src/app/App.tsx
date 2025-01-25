import React, { useEffect, useState } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { ErrorSnackbar, Header } from 'common/components'
import { CircularProgress, CssBaseline } from '@mui/material'
import { getTheme } from 'common/theme/theme'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { selectTheme, setIsLoggedIn } from './appSlice'
import { Routing } from 'common/routing'
import { useAppDispatch } from 'common/hooks'
import s from './App.module.css'
import { useMeQuery } from '../features/auth/api/authApi'
import { ResultCode } from '../features/todolists/lib/enums/enums'

function App() {
	const dispatch = useAppDispatch()
	const themeMode = useAppSelector(selectTheme)

	const theme = getTheme(themeMode)
	const [isInitialized, setIsInitialized] = useState(false)
	const { data, isLoading } = useMeQuery()

	useEffect(() => {
		if (!isLoading) {
			setIsInitialized(true)
			if (data?.resultCode === ResultCode.Success) {
				dispatch(setIsLoggedIn({ isLoggedIn: true }))
			}
		}
	}, [isLoading, data, dispatch])

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
