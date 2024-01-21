import React, { useState } from 'react'
import './App.css'
import { TaskType, TodoList } from './TodoList'
import { v1 } from 'uuid'
import { AddItemForm } from './AddItemForm'

export type FilterValueType = 'all' | 'completed' | 'active'

type TodolistType = {
	id: string
	title: string
	filter: FilterValueType
}

type TasksStateType = {
	[key: string]: Array<TaskType>
}

function App() {
	const [todoListId1, todoListId2] = [v1(), v1()]
	const [allTasks, setAllTasks] = useState<TasksStateType>({
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
	const [todoLists, setTodoLists] = useState<Array<TodolistType>>([
		{ id: todoListId1, title: 'What to learn', filter: 'active' },
		{ id: todoListId2, title: 'What to buy', filter: 'completed' },
	])

	const removeTask = (taskId: string, todoListId: string) => {
		allTasks[todoListId] = allTasks[todoListId].filter(
			(task) => task.id !== taskId,
		)
		setAllTasks({ ...allTasks })
	}

	const addTask = (todoListId: string, title: string) => {
		const newTask: TaskType = { id: v1(), title, isDone: false }
		allTasks[todoListId] = [newTask, ...allTasks[todoListId]]
		setAllTasks({ ...allTasks })
	}

	const changeTaskStatus = (
		todoListId: string,
		taskId: string,
		isDone: boolean,
	) => {
		allTasks[todoListId] = allTasks[todoListId].map((t) =>
			t.id === taskId ? { ...t, isDone } : t,
		)
		setAllTasks({ ...allTasks })
	}

	const changeTaskTitle = (
		todoListId: string,
		taskId: string,
		newTitle: string,
	) => {
		allTasks[todoListId] = allTasks[todoListId].map((t) =>
			t.id === taskId ? { ...t, title: newTitle } : t,
		)
		setAllTasks({ ...allTasks })
	}

	const changeFilter = (todolistId: string, value: FilterValueType) => {
		const updatedTotoLists = todoLists.map((tl) =>
			tl.id === todolistId ? { ...tl, filter: value } : tl,
		)
		setTodoLists(updatedTotoLists)
	}

	const addTodoList = (title: string) => {
		const newTodoList: TodolistType = {
			id: v1(),
			title,
			filter: 'all',
		}
		setTodoLists([newTodoList, ...todoLists])
		setAllTasks({
			...allTasks,
			[newTodoList.id]: [],
		})
	}

	const removeTodoList = (todoLIstId: string) => {
		setTodoLists(todoLists.filter((tl) => tl.id !== todoLIstId))
		delete allTasks[todoLIstId]
		setAllTasks({ ...allTasks })
	}

	const renameTodoList = (todoLIstId: string, newValue: string) => {
		setTodoLists(
			todoLists.map((tl) => {
				return tl.id === todoLIstId ?
					{...tl, title: newValue}
				:	tl
			}),
		)
	}

	return (
		<div className="App">
			<AddItemForm addItem={addTodoList} />
			{todoLists.map((tl) => {
				let tasksForTodolist = allTasks[tl.id]
				if (tl.filter === 'active') {
					tasksForTodolist = tasksForTodolist.filter((t) => !t.isDone)
				}
				if (tl.filter === 'completed') {
					tasksForTodolist = tasksForTodolist.filter((t) => t.isDone)
				}

				return (
					<TodoList
						key={tl.id}
						id={tl.id}
						title={tl.title}
						tasks={tasksForTodolist}
						removeTask={removeTask}
						filterValue={tl.filter}
						changeFilter={changeFilter}
						addTask={addTask}
						changeTaskStatus={changeTaskStatus}
						changeTaskTitle={changeTaskTitle}
						removeTodoList={removeTodoList}
						renameTotoList={renameTodoList}
					/>
				)
			})}
		</div>
	)
}

export default App
