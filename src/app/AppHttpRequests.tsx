import Checkbox from '@mui/material/Checkbox'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { AddItemForm, EditableSpan } from 'common/components'
import axios from 'axios'
import { TodoList } from '../features/todolists/api/todolistsApi.types'
import {
	DomainTask,
	GetTasksResponse,
	UpdateTaskModel
} from '../features/todolists/api/tasksApi.types'
import { todolistsApi } from '../features/todolists/api/todolistsApi'
import { tasksApi } from '../features/todolists/api/tasksApi'
import { TaskStatus } from '../features/todolists/lib/enums/enums'

const BASE = 'https://social-network.samuraijs.com/api/1.1'
const AUTH_KEY = 'cd13ea51-66fe-4e3a-a845-db8c050e4e87'

type TasksState = {
	[key: string]: DomainTask[]
}

export const AppHttpRequests = () => {
	const [todolists, setTodolists] = useState<TodoList[]>([])
	const [tasks, setTasks] = useState<TasksState>({})

	useEffect(() => {
		todolistsApi.getTodoLists().then((res) => {
			const todoLists = res.data
			setTodolists(todoLists)
			todoLists.forEach((tl) => {
				axios
					.get<GetTasksResponse>(`${BASE}/todo-lists/${tl.id}/tasks`, {
						headers: {
							Authorization: `Bearer ${AUTH_KEY}`
						}
					})
					.then((res) => {
						setTasks((tasks) => ({
							...tasks,
							[tl.id]: res.data.items
						}))
					})
			})
		})
	}, [])

	const createTodolistHandler = (title: string) => {
		todolistsApi.createTodoList(title).then((res) => {
			setTodolists([res.data.data.item, ...todolists])
		})
	}

	const removeTodolistHandler = (todoListId: string) => {
		todolistsApi.removeTodolist(todoListId).then((res) => {
			if (res.status === 200) setTodolists(todolists.filter((tl) => tl.id !== todoListId))
		})
	}

	const updateTodolistHandler = (args: { todoListId: string; title: string }) => {
		const { todoListId, title } = args

		return todolistsApi.updateTodoList(args).then((res) => {
			if (res.status === 200)
				setTodolists(todolists.map((tl) => (tl.id === todoListId ? { ...tl, title } : tl)))
		})
	}

	const createTaskHandler = (args: { title: string; todoListId: string }) => {
		const { todoListId } = args
		tasksApi.createTask(args).then((res) => {
			const newTask = res.data.data.item
			setTasks((tasks) => ({
				...tasks,
				[todoListId]: [newTask, ...(tasks[todoListId] || [])]
			}))
		})
	}

	const removeTaskHandler = (args: { taskId: string; todoListId: string }) => {
		const { taskId, todoListId } = args
		tasksApi.removeTask(args).then((res) => {
			if (res.status === 200)
				setTasks((tasks) => ({
					...tasks,
					[todoListId]: tasks[todoListId].filter((t: DomainTask) => t.id !== taskId)
				}))
		})
	}

	const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: DomainTask) => {
		const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
		const updateTaskData: UpdateTaskModel = {
			title: task.title,
			status,
			deadline: task.deadline,
			description: task.description,
			priority: task.priority,
			startDate: task.startDate
		}
		tasksApi.updateTask({
			updateTaskData,
			todoListId: task.todoListId,
			taskId: task.id
		}).then((res) => {
			if (res.status === 200) {
				const updatedTask = res.data.data.item
				setTasks((tasks) => ({
					...tasks,
					[task.todoListId]: tasks[task.todoListId].map((t) => (t.id === task.id ? updatedTask : t))
				}))
			}
		})
	}

	const changeTaskTitleHandler = (title: string, task: DomainTask) => {
		const updateTaskData: UpdateTaskModel = {
			title,
			status: task.status,
			deadline: task.deadline,
			description: task.description,
			priority: task.priority,
			startDate: task.startDate
		}

		tasksApi.updateTask({
			updateTaskData,
			todoListId: task.todoListId,
			taskId: task.id
		}).then((res) => {
			if (res.status === 200) {
				const updatedTask = res.data.data.item
				setTasks((tasks) => ({
					...tasks,
					[task.todoListId]: tasks[task.todoListId].map((t) => (t.id === task.id ? updatedTask : t))
				}))
			}
		})
	}

	return (
		<div style={{ margin: '20px' }}>
			<AddItemForm addItem={createTodolistHandler} />

			{/* Todolists */}
			{todolists.map((tl) => {
				return (
					<div key={tl.id} style={todolist}>
						<div>
							<EditableSpan
								caption={tl.title}
								onChange={(title: string) => updateTodolistHandler({ todoListId: tl.id, title })}
							/>
							<button onClick={() => removeTodolistHandler(tl.id)}>x</button>
						</div>
						<AddItemForm addItem={(title) => createTaskHandler({ title, todoListId: tl.id })} />

						{/* Tasks */}
						{!!tasks[tl.id] &&
							tasks[tl.id].map((task: DomainTask) => {
								return (
									<div key={task.id}>
										<Checkbox
											checked={task.status === 2}
											onChange={(e) => changeTaskStatusHandler(e, task)}
										/>
										<EditableSpan
											caption={task.title}
											onChange={(title) => changeTaskTitleHandler(title, task)}
										/>
										<button
											onClick={() => removeTaskHandler({ todoListId: tl.id, taskId: task.id })}
										>
											x
										</button>
									</div>
								)
							})}
					</div>
				)
			})}
		</div>
	)
}

// Styles
const todolist: React.CSSProperties = {
	border: '1px solid black',
	margin: '20px 0',
	padding: '10px',
	width: '300px',
	display: 'flex',
	justifyContent: 'space-between',
	flexDirection: 'column'
}
