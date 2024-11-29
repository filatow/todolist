import React from 'react'
import { TaskType, TodoList } from './TodoList'
import { v1 } from 'uuid'
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
import {
	addTaskActionCreator,
	changeTaskStatusActionCreator,
	changeTaskTitleActionCreator,
	removeTaskActionCreator,
} from './state/tasks-reducer'
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './state/store';

export type FilterValueType = 'all' | 'completed' | 'active'

export type TodolistType = {
	id: string
	title: string
	filter: FilterValueType
}

export type TasksStateType = {
	[key: string]: Array<TaskType>
}

function AppWithRedux() {
	const dispatch = useDispatch()
	const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks)
	const todoLists = useSelector<AppRootState, Array<TodolistType>>(state => state.todoLists)

	const removeTask = (todoListId: string, taskId: string) => {
		const action = removeTaskActionCreator(todoListId, taskId)
		dispatch(action)
	}

	const addTask = (todoListId: string, title: string) => {
		const action = addTaskActionCreator(todoListId, v1(), title)
		dispatch(action)
	}

	const changeTaskStatus = (
		todoListId: string,
		taskId: string,
		isDone: boolean,
	) => {
		const action = changeTaskStatusActionCreator(todoListId, taskId, isDone)
		dispatch(action)
	}

	const changeTaskTitle = (
		todoListId: string,
		taskId: string,
		newTitle: string,
	) => {
		const action = changeTaskTitleActionCreator(
			todoListId,
			taskId,
			newTitle,
		)
		dispatch(action)
	}

	const addTodoList = (title: string) => {
		const action = addTodoListActionCreator(title)
		dispatch(action)
	}

	const changeTodoListFilter = (
		todolistId: string,
		value: FilterValueType,
	) => {
		const action = changeTodoListFilterActionCreator(todolistId, value)
		dispatch(action)
	}

	const removeTodoList = (todoLIstId: string) => {
		const action = removeTodoListActionCreator(todoLIstId)
		dispatch(action)
	}

	const renameTodoList = (todoLIstId: string, newValue: string) => {
		const action = changeTodoListTitleActionCreator(todoLIstId, newValue)
		dispatch(action)
	}

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
						let tasksForTodolist = tasks[tl.id]
						if (tl.filter === 'active') {
							tasksForTodolist = tasksForTodolist.filter(
								(t) => !t.isDone,
							)
						}
						if (tl.filter === 'completed') {
							tasksForTodolist = tasksForTodolist.filter(
								(t) => t.isDone,
							)
						}

						return (
							<Grid key={tl.id} item>
								<Paper style={{ padding: '10px' }}>
									<TodoList
										id={tl.id}
										title={tl.title}
										tasks={tasksForTodolist}
										removeTask={removeTask}
										filterValue={tl.filter}
										changeFilter={changeTodoListFilter}
										addTask={addTask}
										changeTaskStatus={changeTaskStatus}
										changeTaskTitle={changeTaskTitle}
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
