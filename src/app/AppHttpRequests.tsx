import Checkbox from '@mui/material/Checkbox'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { AddItemForm } from '../common/components/AddItemForm/AddItemForm'
import { EditableSpan } from '../common/components/EditableSpan/EditableSpan'
import axios from 'axios'

const BASE = 'https://social-network.samuraijs.com/api/1.1'
const AUTH_KEY = 'cd13ea51-66fe-4e3a-a845-db8c050e4e87'
const API_KEY = 'a87e568a-055f-4c29-bfd3-0041f9a8b29d'

type TasksState = {
	[key: string]: Task[]
}

export const AppHttpRequests = () => {
	const [todolists, setTodolists] = useState<TodoList[]>([])
	const [tasks, setTasks] = useState<TasksState>({})

	useEffect(() => {
		axios.get<TodoList[]>(`${BASE}/todo-lists`, {
			headers: {
				Authorization: `Bearer ${AUTH_KEY}`,
			},
		}).then((res) => {
			const todoLists = res.data
			setTodolists(todoLists)
			todoLists.forEach(tl => {
				axios.get<TasksResponse>(`${BASE}/todo-lists/${tl.id}/tasks`, {
					headers: {
						Authorization: `Bearer ${AUTH_KEY}`,
					},
				}).then(res => {
					setTasks((tasks) => ({
							...tasks,
							[tl.id]: res.data.items,
						}),
					)
				})
			})
		})
	}, [])

	const createTodolistHandler = (title: string) => {
		axios.post<Response<{ item: TodoList }>>(`${BASE}/todo-lists`, { title }, {
			headers: {
				Authorization: `Bearer ${AUTH_KEY}`,
				'API-KEY': API_KEY,
			},
		}).then((res) => {
			setTodolists(
				[res.data.data.item, ...todolists],
			)
		})
	}

	const removeTodolistHandler = (todoListId: string) => {
		axios.delete<Response>(`${BASE}/todo-lists/${todoListId}`, {
			headers: {
				Authorization: `Bearer ${AUTH_KEY}`,
				'API-KEY': API_KEY,
			},
		}).then((res) => {
			if (res.status === 200) setTodolists(
				todolists.filter(tl => tl.id !== todoListId),
			)
		})
	}

	const updateTodolistHandler = (todoListId: string, title: string) => {
		axios.put<Response>(`${BASE}/todo-lists/${todoListId}`, { title }, {
			headers: {
				Authorization: `Bearer ${AUTH_KEY}`,
				'API-KEY': API_KEY,
			},
		}).then((res) => {
			if (res.status === 200) setTodolists(
				todolists.map(
					tl => tl.id === todoListId ? { ...tl, title } : tl,
				),
			)
		})
	}

	const createTaskHandler = (title: string, todolistId: string) => {
		axios.post<Response<{ item: Task }>>(`${BASE}/todo-lists/${todolistId}/tasks`,
			{ title },
			{
				headers: {
					Authorization: `Bearer ${AUTH_KEY}`,
					'API-KEY': API_KEY,
				},
				params: {
					todolistId,
				},
			}).then((res) => {
			const newTask = res.data.data.item
			setTasks(tasks => ({
				...tasks,
				[todolistId]: [newTask, ...tasks[todolistId]],
			}))
		})
	}

	const removeTaskHandler = (taskId: string, todolistId: string) => {
		axios.delete<Response>(
			`${BASE}/todo-lists/${todolistId}/tasks/${taskId}`,
			{
				headers: {
					Authorization: `Bearer ${AUTH_KEY}`,
					'API-KEY': API_KEY,
				},
				params: {
					todolistId,
					taskId,
				},
			}).then((res) => {
			if (res.status === 200) setTasks(tasks => ({
				...tasks,
				[todolistId]: tasks[todolistId].filter((t: Task) => t.id !== taskId),
			}))
		})
	}

	const changeTaskStatusHandler = (
		e: ChangeEvent<HTMLInputElement>,
		task: Task,
	) => {
		const statusUpdateData: UpdateTaskModel = {
			title: task.title,
			status: e.currentTarget.checked ? 2 : 0,
			deadline: task.deadline,
			description: task.description,
			priority: task.priority,
			startDate: task.startDate,
		}
		axios.put<Response<{ item: Task }>>(
			`${BASE}/todo-lists/${task.todoListId}/tasks/${task.id}`,
			statusUpdateData,
			{
				headers: {
					Authorization: `Bearer ${AUTH_KEY}`,
					'API-KEY': API_KEY,
				},
			})
			.then((res) => {
				if (res.status === 200) {
					const updatedTask = res.data.data.item
					setTasks(tasks => ({
						...tasks,
						[task.todoListId]: tasks[task.todoListId].map(
							t => t.id === task.id ? updatedTask : t,
						),
					}))
				}
			})
	}

	const changeTaskTitleHandler = (title: string, task: Task) => {
		const titleUpdateData: UpdateTaskModel = {
			title,
			status: task.status,
			deadline: task.deadline,
			description: task.description,
			priority: task.priority,
			startDate: task.startDate,
		}
		axios.put<Response<{ item: Task }>>(
			`${BASE}/todo-lists/${task.todoListId}/tasks/${task.id}`,
			titleUpdateData,
			{
				headers: {
					Authorization: `Bearer ${AUTH_KEY}`,
					'API-KEY': API_KEY,
				},
			})
			.then((res) => {
				if (res.status === 200) {
					const updatedTask = res.data.data.item
					setTasks(tasks => ({
						...tasks,
						[task.todoListId]: tasks[task.todoListId].map(
							t => t.id === task.id ? updatedTask : t,
						),
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
								onChange={(title: string) => updateTodolistHandler(tl.id, title)}
							/>
							<button onClick={() => removeTodolistHandler(tl.id)}>x</button>
						</div>
						<AddItemForm addItem={title => createTaskHandler(title, tl.id)} />

						{/* Tasks */}
						{!!tasks[tl.id] &&
							tasks[tl.id].map((task: Task) => {
								return (
									<div key={task.id}>
										<Checkbox
											checked={task.status === 2}
											onChange={e => changeTaskStatusHandler(e, task)}
										/>
										<EditableSpan
											caption={task.title}
											onChange={(title) => changeTaskTitleHandler(title, task)}
										/>
										<button onClick={() => removeTaskHandler(task.id, tl.id)}>x</button>
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
	flexDirection: 'column',
}

type Response<DataType = {}> = {
	resultCode: number
	messages: string[]
	fieldsErrors: string[]
	data: DataType
}

type TodoList = {
	id: string
	title: string
	addedDate: string
	order: number
}

type TasksResponse = {
	items: Task[]
	totalCount: number
	error: string | null
}

type Task = {
	addedDate: string
	deadline: string | null
	description: string | null
	id: string
	order: number
	priority: number
	startDate: string | null
	status: number
	title: string
	todoListId: string
}

type UpdateTaskModel = {
	title: string
	description: string | null
	status: number
	priority: number
	startDate: string | null
	deadline: string | null
}