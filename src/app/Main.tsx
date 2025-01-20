import React, { useEffect } from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { AddItemForm } from 'common/components'
import { createTodoListTC } from '../features/todolists/model/todolistsSlice'
import TodoLists from '../features/todolists/ui/TodoLists/TodoLists'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks'
import { selectIsLoggedIn } from '../features/auth/model/authSlice'
import { useNavigate } from 'react-router'
import { Path } from 'common/routing/Routing'

const Main = () => {
	const dispatch = useAppDispatch()
	const isLoggedIn = useAppSelector(selectIsLoggedIn)
	const navigate = useNavigate()

	const addTodoList = (title: string) => {
		dispatch(createTodoListTC({ title }))
	}

	useEffect(() => {
		if (isLoggedIn === false) {
			navigate(Path.Login)
		}
	}, [isLoggedIn, navigate])

	return (
		<Container fixed>
			<Grid container sx={{ p: '20px 15px' }}>
				<AddItemForm addItem={addTodoList} />
			</Grid>
			<Grid container spacing={3}>
				<TodoLists />
			</Grid>
		</Container>
	)
}

export default Main
