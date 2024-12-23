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
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { selectAppStatus, selectTheme } from '../../../app/appSelectors'

export function Header() {
	const dispatch = useAppDispatch()
	const themeMode = useAppSelector(selectTheme)
	const theme = useTheme()
	const status = useAppSelector(selectAppStatus)

	const switchMode = () => {
		dispatch(switchThemeAC(themeMode === 'light' ? 'dark' : 'light'))
	}

	return (
		<AppBar position="static" sx={{ mb: '30px' }}>
			<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<IconButton color="inherit">
					<MenuIcon />
				</IconButton>
				<div>
					<MenuButton>Login</MenuButton>
					<MenuButton>Logout</MenuButton>
					<MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
					<Switch color={'default'} onChange={switchMode} />
				</div>
			</Toolbar>
			{status === 'loading' && <LinearProgress />}
		</AppBar>
	)
}
