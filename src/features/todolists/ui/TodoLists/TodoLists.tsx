import React, { useEffect } from 'react'
import { TodoList } from './TodoList/TodoList'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { fetchTodoListsTC, selectTodoLists } from '../../model/todolistsSlice'
import { useAppDispatch } from 'common/hooks/useAppDispatch'

const TodoLists = () => {
	const dispatch = useAppDispatch()
	const todoLists = useAppSelector(selectTodoLists)

	useEffect(() => {
		dispatch(fetchTodoListsTC())
	}, [])

	return (
		<>
			{todoLists.map((todoList) => {
				return (
					<Grid item key={todoList.id}>
						<Paper elevation={2} style={{ padding: '15px' }}>
							<TodoList todoList={todoList} />
						</Paper>
					</Grid>
				)
			})}
		</>
	)
}

export default TodoLists
