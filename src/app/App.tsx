import React from 'react'
import './App.css'
import { FilterValues, Task, TodoList as TL } from '../TodoList'
import { AddItemForm } from '../AddItemForm'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { AppHeader } from '../AppHeader'
import {
	addTodoListAC,
	changeTodoListFilterAC,
	changeTodoListTitleAC, removeTodoListAC,
} from '../reducers/todolists-reducer'
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from '../reducers/tasks-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store'

export type TodoList = {
	id: string;
	title: string;
	filter: FilterValues
}

export type TasksState = {
	[key: string]: Array<Task>
}

type FilterMapping = {
	active: () => Array<Task>
	completed: () => Array<Task>
	all: () => Array<Task>
}

function App() {
	const todoLists = useSelector<RootState, Array<TodoList>>(state => state.todoLists)
	const allTasks = useSelector<RootState, TasksState>(state => state.tasks)
	const dispatch = useDispatch()

	// task

	const addTask = (todoListId: string, title: string) => {
		dispatch(
			addTaskAC({ todoListId, title }),
		)
	}

	const changeTaskTitle = (
		todoListId: string,
		taskId: string,
		title: string,
	) => {
		dispatch(
			changeTaskTitleAC({ todoListId, taskId, title }),
		)
	}

	const changeTaskStatus = (
		todoListId: string,
		taskId: string,
		newIsDoneValue: boolean,
	) => {
		dispatch(
			changeTaskStatusAC({ todoListId, taskId, isDone: newIsDoneValue }),
		)
	}

	const removeTask = (todoListId: string, taskId: string) => {
		dispatch(
			removeTaskAC({todoListId, taskId})
		)
	}

	// todoList

	const addTodoList = (title: string) => {
		dispatch(addTodoListAC({ title }))
	}

	const changeTodoListTitle = (todoListId: string, title: string) => {
		dispatch(
			changeTodoListTitleAC({ todoListId, title }),
		)
	}

	const changeTodoListFilter = (todoListId: string, filterValue: FilterValues) => {
		dispatch(
			changeTodoListFilterAC({ todoListId, filterValue }),
		)
	}

	const removeTodoList = (todoListId: string) => {
		dispatch(removeTodoListAC({ todoListId }))
	}

	// generate jsx

	const todoListsElements = todoLists.map((tl) => {
		const getFilteredTasks = (
			todoListID: string,
			filterValue: FilterValues,
		): Array<Task> => {
			const filterMapping: FilterMapping = {
				active: () => allTasks[todoListID].filter((t) => !t.isDone),
				completed: () => allTasks[todoListID].filter((t) => t.isDone),
				all: () => allTasks[todoListID],
			}
			return filterMapping[filterValue]()
		}
		const filteredTasks = getFilteredTasks(tl.id, tl.filter)

		return (
			<Grid item key={tl.id}>
				<Paper elevation={2} style={{ padding: '15px' }}>
					<TL
						todoListId={tl.id}
						title={tl.title}
						tasks={filteredTasks}
						addTask={addTask}
						changeTaskTitle={changeTaskTitle}
						removeTask={removeTask}
						changeTaskStatus={changeTaskStatus}
						filterValue={tl.filter}
						changeFilter={changeTodoListFilter}
						changeTodoListTitle={changeTodoListTitle}
						removeTodoList={removeTodoList}
					/>
				</Paper>
			</Grid>
		)
	})

	return (
		<div className='App'>
			<AppHeader />
			<Container fixed>
				<Grid container sx={{ p: '20px 15px' }}>
					<AddItemForm addItem={addTodoList} />
				</Grid>
				<Grid container spacing={3}>
					{todoListsElements}
				</Grid>
			</Container>
		</div>
	)
}

export default App
