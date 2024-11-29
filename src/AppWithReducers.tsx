import React, { useReducer } from 'react'
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
	todoListsReducer,
} from './state/todolists-reducer'
import {
	addTaskActionCreator,
	changeTaskStatusActionCreator,
	changeTaskTitleActionCreator,
	removeTaskActionCreator,
	tasksReducer,
} from './state/tasks-reducer'

export type FilterValueType = 'all' | 'completed' | 'active'

export type TodolistType = {
	id: string
	title: string
	filter: FilterValueType
}

export type TasksStateType = {
	[key: string]: Array<TaskType>
}

function AppWithReducers() {
	const [todoListId1, todoListId2] = [v1(), v1()]
	const [allTasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
		[todoListId1]: [
			{ id: v1(), title: 'CSS', isDone: true },
			{ id: v1(), title: 'HTML', isDone: true },
			{ id: v1(), title: 'JS6+/TS', isDone: true },
			{ id: v1(), title: 'React', isDone: false },
			{ id: v1(), title: 'GraphQL', isDone: false },
		],
		[todoListId2]: [
			{ id: v1(), title: 'Book', isDone: false },
			{ id: v1(), title: 'Milk', isDone: true },
		],
	})
	const [todoLists, dispatchToTodoListsReducer] = useReducer(
		todoListsReducer,
		[
			{ id: todoListId1, title: 'What to learn', filter: 'active' },
			{ id: todoListId2, title: 'What to buy', filter: 'completed' },
		],
	)

	const removeTask = (todoListId: string, taskId: string) => {
		const action = removeTaskActionCreator(todoListId, taskId)
		dispatchToTasksReducer(action)
	}

	const addTask = (todoListId: string, title: string) => {
		const action = addTaskActionCreator(todoListId, v1(), title)
		dispatchToTasksReducer(action)
	}

	const changeTaskStatus = (
		todoListId: string,
		taskId: string,
		isDone: boolean,
	) => {
		const action = changeTaskStatusActionCreator(todoListId, taskId, isDone)
		dispatchToTasksReducer(action)
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
		dispatchToTasksReducer(action)
	}

	const addTodoList = (title: string) => {
		const action = addTodoListActionCreator(title)
		dispatchToTodoListsReducer(action)
		dispatchToTasksReducer(action)
	}

	const changeTodoListFilter = (
		todolistId: string,
		value: FilterValueType,
	) => {
		const action = changeTodoListFilterActionCreator(todolistId, value)
		dispatchToTodoListsReducer(action)
	}

	const removeTodoList = (todoLIstId: string) => {
		const action = removeTodoListActionCreator(todoLIstId)
		dispatchToTodoListsReducer(action)
		dispatchToTasksReducer(action)
	}

	const renameTodoList = (todoLIstId: string, newValue: string) => {
		const action = changeTodoListTitleActionCreator(todoLIstId, newValue)
		dispatchToTodoListsReducer(action)
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
						let tasksForTodolist = allTasks[tl.id]
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

export default AppWithReducers
