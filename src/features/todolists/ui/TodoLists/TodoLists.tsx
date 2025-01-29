import React from 'react'
import { TodoList } from './TodoList'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { useGetTodoListsQuery } from '../../api/todolistsApi'
import { TodolistSkeleton } from '../skeletons/TodolistSkeleton'

const TodoLists = () => {
	const { data: todoLists, isLoading } = useGetTodoListsQuery()

	if (isLoading)
		return (
			<div style={{ display: 'flex', justifyContent: 'space-between', gap: '32px' }}>
				{Array(3)
					.fill(null)
					.map((_, id) => (
						<TodolistSkeleton key={id} />
					))}
			</div>
		)

	return (
		<>
			{todoLists?.map((todoList) => {
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
