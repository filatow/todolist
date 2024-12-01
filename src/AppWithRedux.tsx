import React, { useCallback } from 'react'
// import { TaskType, TodoList } from './TodoList'
import { AddItemForm } from './AddItemForm'
import {
	AppBar,
	Button,
	Container,
	Grid,
	IconButton,
	Paper,
	Toolbar,
	Typography,
} from '@mui/material'
import { Menu } from '@mui/icons-material'
import {
	addTodoListActionCreator,
	changeTodoListFilterActionCreator,
	changeTodoListTitleActionCreator,
	removeTodoListActionCreator,
} from './state/todolists-reducer'
// import {
// 	addTaskActionCreator,
// 	changeTaskStatusActionCreator,
// 	changeTaskTitleActionCreator,
// 	removeTaskActionCreator,
// } from './state/tasks-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootState } from './state/store'
import { TodoListWithRedux } from './TodoListWithRedux'

export type FilterValueType = 'all' | 'completed' | 'active'

export type TodolistType = {
	id: string
	title: string
	filter: FilterValueType
}

// export type TasksStateType = {
// 	[key: string]: Array<TaskType>
// }

function AppWithRedux() {
	console.log('AppWithRedux')
	const dispatch = useDispatch()
	const todoLists = useSelector<AppRootState, Array<TodolistType>>(
		(state) => state.todoLists,
	)
	// const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)

	const addTodoList = useCallback(
		(title: string) => {
			const action = addTodoListActionCreator(title)
			dispatch(action)
		},
		[dispatch],
	)

	const changeTodoListFilter = useCallback(
		(todolistId: string, value: FilterValueType) => {
			const action = changeTodoListFilterActionCreator(todolistId, value)
			dispatch(action)
		},
		[dispatch],
	)

	const removeTodoList = useCallback(
		(todoLIstId: string) => {
			const action = removeTodoListActionCreator(todoLIstId)
			dispatch(action)
		},
		[dispatch],
	)

	const renameTodoList = useCallback(
		(todoLIstId: string, newValue: string) => {
			const action = changeTodoListTitleActionCreator(
				todoLIstId,
				newValue,
			)
			dispatch(action)
		},
		[dispatch],
	)

	return (
		<div className="App">
			<AppBar position="static">
				<Toolbar>
					<IconButton size="large" edge="start" color="inherit">
						<Menu />
					</IconButton>
					<Typography variant="h6">News</Typography>
					<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>
			<Container fixed>
				<Grid
					container
					style={{
						marginTop: '30px',
						marginBottom: '15px',
					}}
				>
					<AddItemForm addItem={addTodoList} />
				</Grid>
				<Grid container spacing={3}>
					{todoLists.map((tl) => {
						return (
							<Grid key={tl.id} item>
								<Paper style={{ padding: '10px' }}>
									<TodoListWithRedux
										id={tl.id}
										title={tl.title}
										filterValue={tl.filter}
										changeFilter={changeTodoListFilter}
										removeTodoList={removeTodoList}
										renameTotoList={renameTodoList}
									/>
								</Paper>
							</Grid>
						)
					})}
				</Grid>
			</Container>
		</div>
	)
}

export default AppWithRedux
