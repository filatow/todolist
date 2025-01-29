import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { MenuButton } from 'common/components'
import LinearProgress from '@mui/material/LinearProgress'
import Switch from '@mui/material/Switch'
import { useTheme } from '@mui/material'
import {
	selectAppStatus,
	selectIsLoggedIn,
	selectTheme,
	setAppStatus,
	setIsLoggedIn,
	switchTheme
} from '../../../app/appSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useLogoutMutation } from '../../../features/auth/api/authApi'
import { ResultCode } from '../../../features/todolists/lib/enums/enums'
// import { clearTasksAndTodoLists } from 'common/actions/common.actions'
import { baseApi } from '../../../app/baseApi'

export function Header() {
	const dispatch = useAppDispatch()
	const [logout] = useLogoutMutation()
	const theme = useTheme()

	const themeMode = useAppSelector(selectTheme)
	const status = useAppSelector(selectAppStatus)
	const isLoggedIn = useAppSelector(selectIsLoggedIn)

	const switchMode = () => {
		dispatch(switchTheme({ theme: themeMode === 'light' ? 'dark' : 'light' }))
	}

	const logoutHandler = () => {
		logout()
			.then((res) => {
				if (res.data?.resultCode === ResultCode.Success) {
					dispatch(setAppStatus({ status: 'succeeded' }))
					dispatch(setIsLoggedIn({ isLoggedIn: false }))
					localStorage.removeItem('sn-token')
				}
			})
			.then(() => {
				dispatch(baseApi.util.resetApiState())
			})
	}

	return (
		<AppBar position="static" sx={{ mb: '30px' }}>
			<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<IconButton color="inherit">
					<MenuIcon />
				</IconButton>
				<div>
					{isLoggedIn && <MenuButton onClick={logoutHandler}>Logout</MenuButton>}
					<MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
					<Switch color={'default'} onChange={switchMode} />
				</div>
			</Toolbar>
			{status === 'loading' && <LinearProgress />}
		</AppBar>
	)
}
