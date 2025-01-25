import React, { useEffect } from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { AddItemForm } from 'common/components'
import TodoLists from '../features/todolists/ui/TodoLists/TodoLists'
import { useAppSelector } from 'common/hooks'
import { useNavigate } from 'react-router'
import { Path } from 'common/routing/Routing'
import { useAddTodoListMutation } from '../features/todolists/api/todolistsApi'
import { selectIsLoggedIn } from './appSlice'

const Main = () => {
	const [addTodoList] = useAddTodoListMutation()
	const isLoggedIn = useAppSelector(selectIsLoggedIn)
	const navigate = useNavigate()

	const addTodoListCallback = (title: string) => {
		addTodoList(title)
	}

	useEffect(() => {
		if (isLoggedIn === false) {
			navigate(Path.Login)
		}
	}, [isLoggedIn, navigate])

	return (
		<Container fixed>
			<Grid container sx={{ p: '20px 15px' }}>
				<AddItemForm addItem={addTodoListCallback} />
			</Grid>
			<Grid container spacing={3}>
				<TodoLists />
			</Grid>
		</Container>
	)
}

export default Main
