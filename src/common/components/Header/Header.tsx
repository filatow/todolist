import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { MenuButton } from 'common/components'
import LinearProgress from '@mui/material/LinearProgress'
import Switch from '@mui/material/Switch'
import { useTheme } from '@mui/material'
import { switchThemeAC } from '../../../app/app-reducer'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { selectAppStatus, selectTheme } from '../../../app/appSelectors'
import { selectIsLoggedIn } from '../../../features/auth/model/authSelectors'
import { logoutTC } from '../../../features/auth/model/auth-reducer'

export function Header() {
	const dispatch = useAppDispatch()
	const themeMode = useAppSelector(selectTheme)
	const theme = useTheme()
	const status = useAppSelector(selectAppStatus)
	const isLoggedIn = useAppSelector(selectIsLoggedIn)

	const switchMode = () => {
		dispatch(switchThemeAC(themeMode === 'light' ? 'dark' : 'light'))
	}

	const handleLogout = () => {
		dispatch(logoutTC())
	}

	return (
		<AppBar position="static" sx={{ mb: '30px' }}>
			<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<IconButton color="inherit">
					<MenuIcon />
				</IconButton>
				<div>
					{isLoggedIn && <MenuButton onClick={handleLogout}>Logout</MenuButton>}
					<MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
					<Switch color={'default'} onChange={switchMode} />
				</div>
			</Toolbar>
			{status === 'loading' && <LinearProgress />}
		</AppBar>
	)
}
