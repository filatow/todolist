import React, { useState } from 'react'
import './App.css'
import { FilterValuesType, TaskType, TodoList } from './TodoList'
import { v1 } from 'uuid'

type todoListsType = { id: string; title: string; filter: FilterValuesType }
type FilterMappingType = {
	active: () => Array<TaskType>
	completed: () => Array<TaskType>
	all: () => Array<TaskType>
}

function App() {
	// const [todoLists, setTodoLists] = useState<Array<todoListsType>>([
	// 	{ id: v1(), title: 'What to learn', filter: 'all' },
	// 	{ id: v1(), title: 'What to buy', filter: 'all' },
	// ])
	// const [allTasks, setAllTasks] = useState<Array<TaskType>>([
	// 	{ id: v1(), title: 'CSS', isDone: true },
	// 	{ id: v1(), title: 'HTML', isDone: true },
	// 	{ id: v1(), title: 'JS6+/TS', isDone: true },
	// 	{ id: v1(), title: 'React', isDone: false },
	// ])

	const todoListID1 = v1()
	const todoListID2 = v1()

	const [todoLists, setTodoLists] = useState<Array<todoListsType>>([
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

	const removeTask = (todoListID: string, taskId: string) => {
		setAllTasks({
			...allTasks,
			[todoListID]: allTasks[todoListID].filter((t) => t.id !== taskId),
		})
	}

	const addTask = (todoListID: string, title: string) => {
		const newTask: TaskType = {
			id: v1(),
			title: title,
			isDone: false,
		}
		setAllTasks({
			...allTasks,
			[todoListID]: [newTask, ...allTasks[todoListID]],
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

	const changeFilter = (
		todoListID: string,
		filterValue: FilterValuesType,
	) => {
		setTodoLists(
			todoLists.map((tl) => {
				return tl.id === todoListID ?
						{ ...tl, filter: filterValue }
					:	tl
			}),
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
			filterValue: FilterValuesType,
		): Array<TaskType> => {
			const filterMapping: FilterMappingType = {
				active: () => allTasks[todoListID].filter((t) => !t.isDone),
				completed: () => allTasks[todoListID].filter((t) => t.isDone),
				all: () => allTasks[todoListID],
			}
			return filterMapping[filterValue]()
		}
		const filteredTasks = getFilteredTasks(tl.id, tl.filter)

		return (
			<TodoList
				key={tl.id}
				todoListID={tl.id}
				title={tl.title}
				tasks={filteredTasks}
				addTask={addTask}
				removeTask={removeTask}
				changeTaskStatus={changeTaskStatus}
				filterValue={tl.filter}
				changeFilter={changeFilter}
				removeTodoList={removeTodoList}
			/>
		)
	})

	return <div className="App">{todoListsElements}</div>
}

export default App
