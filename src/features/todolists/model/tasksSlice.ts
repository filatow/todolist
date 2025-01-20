import {
	AddTodoListAction,
	createTodoList,
	removeTodoList,
	RemoveTodoListAction
} from './todolistsSlice'
import { AppThunk, FullAction } from '../../../app/store'
import { tasksApi } from '../api/tasksApi'
import { DomainTask, UpdateTaskDomainModel, UpdateTaskModel } from '../api/tasksApi.types'
import { Dispatch } from 'redux'
import { RequestStatus, setAppStatus } from '../../../app/appSlice'
import { ResultCode } from '../lib/enums/enums'
import { handleServerAppError, handleServerNetworkError } from 'common/utils'
import { createSlice } from '@reduxjs/toolkit'
import { clearTasksAndTodoLists } from 'common/actions/common.actions'

export const tasksSlice = createSlice({
	name: 'tasks',
	initialState: {} as TasksState,
	reducers: (create) => ({
		setTasks: create.reducer<{ todolistId: string; tasks: DomainTask[] }>((state, action) => {
			state[action.payload.todolistId] = action.payload.tasks
		}),
		removeTask: create.reducer<{ todoListId: string; taskId: string }>((state, action) => {
			const tasks = state[action.payload.todoListId] as DomainTask[]
			const index = tasks.findIndex((task) => task.id === action.payload.taskId)
			if (index !== -1) {
				tasks.splice(index, 1)
			}
		}),
		createTask: create.reducer<{ task: DomainTask }>((state, action) => {
			const tasks = state[action.payload.task.todoListId]
			tasks.unshift(action.payload.task)
		}),
		updateTask: create.reducer<{ updatedTask: DomainTask }>((state, action) => {
			const tasks = state[action.payload.updatedTask.todoListId]
			const index = tasks.findIndex((task) => task.id === action.payload.updatedTask.id)
			if (index !== -1) {
				tasks[index] = { ...tasks[index], ...action.payload.updatedTask }
			}
		}),
		changeTaskEntityStatus: create.reducer<{
			todoListId: string
			id: string
			entityStatus: RequestStatus
		}>((state, action) => {
			const tasks = state[action.payload.todoListId]
			const index = tasks.findIndex((task) => task.id === action.payload.id)
			if (index !== -1) {
				tasks[index].entityStatus = action.payload.entityStatus
			}
		})
	}),
	extraReducers: (builder) => {
		builder
			.addCase(createTodoList, (state, action) => {
				state[action.payload.todoList.id] = []
			})
			.addCase(removeTodoList, (state, action) => {
				delete state[action.payload.id]
			})
			.addCase(clearTasksAndTodoLists, (_state, action) => {
				return action.payload.tasks
			})
	},
	selectors: {
		selectTasks: (state) => state
	}
})

export const tasksReducer = tasksSlice.reducer
export const { setTasks, createTask, removeTask, updateTask, changeTaskEntityStatus } =
	tasksSlice.actions
export const { selectTasks } = tasksSlice.selectors

export const fetchTasksTC =
	(todoListId: string): AppThunk =>
	(dispatch: Dispatch<FullAction>) => {
		dispatch(setAppStatus({ status: 'loading' }))
		tasksApi
			.getTasks(todoListId)
			.then((res) => {
				dispatch(setAppStatus({ status: 'succeeded' }))

				const tasks = res.data.items
				dispatch(
					setTasks({
						todolistId: todoListId,
						tasks: tasks.map((t) => ({ ...t, entityStatus: 'idle' }))
					})
				)
			})
			.catch((error) => {
				handleServerNetworkError(error, dispatch)
			})
	}

export const removeTaskTC =
	(args: { taskId: string; todoListId: string }): AppThunk =>
	(dispatch: Dispatch<FullAction>) => {
		const { todoListId, taskId: id } = args
		dispatch(setAppStatus({ status: 'loading' }))
		dispatch(changeTaskEntityStatus({ todoListId, id, entityStatus: 'loading' }))

		tasksApi
			.removeTask(args)
			.then((res) => {
				if (res.data.resultCode === ResultCode.Success) {
					dispatch(setAppStatus({ status: 'succeeded' }))
					dispatch(removeTask(args))
				} else {
					handleServerAppError(res.data, dispatch)
					dispatch(changeTaskEntityStatus({ todoListId, id, entityStatus: 'failed' }))
				}
			})
			.catch((error) => {
				handleServerNetworkError(error, dispatch)
				dispatch(changeTaskEntityStatus({ todoListId, id, entityStatus: 'failed' }))
			})
	}

export const createTaskTC =
	(args: { todoListId: string; title: string }): AppThunk =>
	(dispatch: Dispatch<FullAction>) => {
		dispatch(setAppStatus({ status: 'loading' }))

		tasksApi
			.createTask(args)
			.then((res) => {
				if (res.data.resultCode === ResultCode.Success) {
					dispatch(setAppStatus({ status: 'succeeded' }))
					const task = res.data.data.item
					dispatch(createTask({ task: { ...task, entityStatus: 'idle' } }))
				} else {
					handleServerAppError(res.data, dispatch)
				}
			})
			.catch((error) => {
				handleServerNetworkError(error, dispatch)
			})
	}

export const updateTaskTC =
	(args: { task: DomainTask; domainModel: UpdateTaskDomainModel }): AppThunk =>
	(dispatch: Dispatch<FullAction>) => {
		const { task, domainModel } = args
		const {
			todoListId,
			id: taskId,
			title,
			status,
			deadline,
			description,
			priority,
			startDate
		} = task

		const updateTaskData: UpdateTaskModel = Object.assign(
			{ title, status, deadline, description, priority, startDate },
			domainModel
		)
		dispatch(setAppStatus({ status: 'loading' }))
		tasksApi
			.updateTask({ updateTaskData, todoListId, taskId })
			.then((res) => {
				if (res.data.resultCode === ResultCode.Success) {
					dispatch(setAppStatus({ status: 'succeeded' }))

					const updatedTask = res.data.data.item
					dispatch(updateTask({ updatedTask: { ...updatedTask, entityStatus: 'idle' } }))
				} else {
					handleServerAppError(res.data, dispatch)
				}
			})
			.catch((error) => {
				handleServerNetworkError(error, dispatch)
			})
	}

export type TasksState = {
	[key: string]: Array<DomainTask>
}

// Actions types
export type SetTaskAction = ReturnType<typeof setTasks>
export type RemoveTaskAction = ReturnType<typeof removeTask>
export type AddTaskAction = ReturnType<typeof createTask>
export type UpdateTaskAction = ReturnType<typeof updateTask>
export type ChangeTaskEntityStatusAction = ReturnType<typeof changeTaskEntityStatus>

export type TasksAction =
	| SetTaskAction
	| RemoveTaskAction
	| AddTaskAction
	| UpdateTaskAction
	| AddTodoListAction
	| RemoveTodoListAction
	| ChangeTaskEntityStatusAction
