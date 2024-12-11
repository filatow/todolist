import React from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { AddItemForm } from 'common/components'
import { addTodoListAC } from '../features/todolists/model/todolists-reducer'
import TodoLists from '../features/todolists/ui/TodoLists/TodoLists'
import { useAppDispatch } from 'common/hooks/useAppDispatch'

const Main = () => {
	const dispatch = useAppDispatch()

	const addTodoList = (title: string) => {
		dispatch(addTodoListAC({ title }))
	}

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
