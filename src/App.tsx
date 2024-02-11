import React, { useState } from 'react'
import './App.css'
import { FilterValues, Task, TodoList as TL } from './TodoList'
import { v1 } from 'uuid'
import { AddItemForm } from './AddItemForm'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { AppHeader } from './AppHeader'

type TodoList = { id: string; title: string; filter: FilterValues }
type FilterMapping = {
	active: () => Array<Task>
	completed: () => Array<Task>
	all: () => Array<Task>
}

function App() {
	const todoListID1 = v1()
	const todoListID2 = v1()

	const [todoLists, setTodoLists] = useState<Array<TodoList>>([
		{ id: todoListID1, title: 'What to learn', filter: 'all' },
		{ id: todoListID2, title: 'What to buy', filter: 'all' },
	])

	const [allTasks, setAllTasks] = useState({
		[todoListID1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'ReactJS', isDone: false },
			{ id: v1(), title: 'Rest API', isDone: false },
			{ id: v1(), title: 'GraphQL', isDone: false },
		],
		[todoListID2]: [
			{ id: v1(), title: 'HTML&CSS2', isDone: true },
			{ id: v1(), title: 'JS2', isDone: true },
			{ id: v1(), title: 'ReactJS2', isDone: false },
			{ id: v1(), title: 'Rest API2', isDone: false },
			{ id: v1(), title: 'GraphQL2', isDone: false },
		],
	})

	const addTask = (todoListID: string, title: string) => {
		const newTask: Task = {
			id: v1(),
			title: title,
			isDone: false,
		}
		setAllTasks({
			...allTasks,
			[todoListID]: [newTask, ...allTasks[todoListID]],
		})
	}

	const changeTaskTitle = (
		todoListID: string,
		taskId: string,
		title: string,
	) => {
		setAllTasks({
			...allTasks,
			[todoListID]: allTasks[todoListID].map((task) =>
				task.id !== taskId ? task : { ...task, title },
			),
		})
	}

	const changeTaskStatus = (
		todoListID: string,
		taskId: string,
		newIsDoneValue: boolean,
	) => {
		setAllTasks({
			...allTasks,
			[todoListID]: allTasks[todoListID].map((t) =>
				t.id === taskId ? { ...t, isDone: newIsDoneValue } : t,
			),
		})
	}

	const removeTask = (todoListID: string, taskId: string) => {
		setAllTasks({
			...allTasks,
			[todoListID]: allTasks[todoListID].filter((t) => t.id !== taskId),
		})
	}

	const changeFilter = (todoListID: string, filterValue: FilterValues) => {
		setTodoLists(
			todoLists.map((tl) => {
				return tl.id === todoListID ?
						{ ...tl, filter: filterValue }
					:	tl
			}),
		)
	}

	const addTodoList = (title: string) => {
		const newTodoListID = v1()
		const newTodoList: TodoList = {
			id: newTodoListID,
			title,
			filter: 'all',
		}
		setTodoLists([...todoLists, newTodoList])
		setAllTasks({
			...allTasks,
			[newTodoListID]: [],
		})
	}

	const changeTodoListTitle = (todoListID: string, title: string) => {
		setTodoLists(
			todoLists.map((tl) =>
				tl.id === todoListID ? { ...tl, title } : tl,
			),
		)
	}

	const removeTodoList = (todoListID: string) => {
		setTodoLists(todoLists.filter((tl) => tl.id !== todoListID))
		delete allTasks[todoListID]
		setAllTasks({ ...allTasks })
	}

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
						todoListID={tl.id}
						title={tl.title}
						tasks={filteredTasks}
						addTask={addTask}
						changeTaskTitle={changeTaskTitle}
						removeTask={removeTask}
						changeTaskStatus={changeTaskStatus}
						filterValue={tl.filter}
						changeFilter={changeFilter}
						changeTodoListTitle={changeTodoListTitle}
						removeTodoList={removeTodoList}
					/>
				</Paper>
			</Grid>
		)
	})

	return (
		<div className="App">
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
