import React from 'react'
import { TodoList } from './TodoList/TodoList'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { selectTodoLists } from '../../model/todoListsSelectors'

const TodoLists = () => {
	const todoLists = useAppSelector(selectTodoLists)

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
