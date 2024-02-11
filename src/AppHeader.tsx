import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import React from 'react'

export function AppHeader() {
	return (
		<AppBar position="static">
			<Toolbar>
				<IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" sx={{ flexGrow: 1 }}>
					TodoList
				</Typography>
				<Button color="inherit">Login</Button>
			</Toolbar>
		</AppBar>
	)
}
