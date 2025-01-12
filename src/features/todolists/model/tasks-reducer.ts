import {AddTodoListAction, ClearTodoListsDataAction, RemoveTodoListAction} from './todolists-reducer'
import { AppThunk, FullAction } from '../../../app/store'
import { tasksApi } from '../api/tasksApi'
import { DomainTask, UpdateTaskDomainModel, UpdateTaskModel } from '../api/tasksApi.types'
import { Dispatch } from 'redux'
import { RequestStatus, setAppStatusAC } from '../../../app/app-reducer'
import { ResultCode } from '../lib/enums/enums'
import { handleServerAppError, handleServerNetworkError } from 'common/utils'

// Action creators
export const setTasksAC = (payload: { todolistId: string; tasks: DomainTask[] }) => {
	return {
		type: 'SET_TASKS',
		payload
	} as const
}

export const removeTaskAC = (payload: { todoListId: string; taskId: string }) => {
	return { type: 'REMOVE_TASK', payload } as const
}

export const createTaskAC = (payload: { task: DomainTask }) => {
	return { type: 'ADD_TASK', payload } as const
}

export const updateTaskAC = (payload: { updatedTask: DomainTask }) => {
	return { type: 'UPDATE_TASK', payload } as const
}

export const changeTaskEntityStatusAC = (payload: {
	todoListId: string
	id: string
	entityStatus: RequestStatus
}) => {
	return { type: 'CHANGE_TASK_ENTITY_STATUS', payload } as const
}

export const fetchTasksTC =
	(todoListId: string): AppThunk =>
	(dispatch: Dispatch<FullAction>) => {
		dispatch(setAppStatusAC('loading'))
		tasksApi
			.getTasks(todoListId)
			.then((res) => {
				dispatch(setAppStatusAC('succeeded'))

				const tasks = res.data.items
				dispatch(
					setTasksAC({
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
		dispatch(setAppStatusAC('loading'))
		dispatch(changeTaskEntityStatusAC({ todoListId, id, entityStatus: 'loading' }))

		tasksApi
			.removeTask(args)
			.then((res) => {
				if (res.data.resultCode === ResultCode.Success) {
					dispatch(setAppStatusAC('succeeded'))
					dispatch(removeTaskAC(args))
				} else {
					handleServerAppError(res.data, dispatch)
					dispatch(changeTaskEntityStatusAC({ todoListId, id, entityStatus: 'failed' }))
				}
			})
			.catch((error) => {
				handleServerNetworkError(error, dispatch)
				dispatch(changeTaskEntityStatusAC({ todoListId, id, entityStatus: 'failed' }))
			})
	}

export const createTaskTC =
	(args: { todoListId: string; title: string }): AppThunk =>
	(dispatch: Dispatch<FullAction>) => {
		dispatch(setAppStatusAC('loading'))

		tasksApi
			.createTask(args)
			.then((res) => {
				if (res.data.resultCode === ResultCode.Success) {
					dispatch(setAppStatusAC('succeeded'))
					const task = res.data.data.item
					dispatch(createTaskAC({ task: { ...task, entityStatus: 'idle' } }))
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
		dispatch(setAppStatusAC('loading'))
		tasksApi
			.updateTask({ updateTaskData, todoListId, taskId })
			.then((res) => {
				if (res.data.resultCode === ResultCode.Success) {
					dispatch(setAppStatusAC('succeeded'))

					const updatedTask = res.data.data.item
					dispatch(updateTaskAC({ updatedTask: { ...updatedTask, entityStatus: 'idle' } }))
				} else {
					handleServerAppError(res.data, dispatch)
				}
			})
			.catch((error) => {
				handleServerNetworkError(error, dispatch)
			})
	}

const initialState: TasksState = {}

export const tasksReducer = (state: TasksState = initialState, action: TasksAction): TasksState => {
	switch (action.type) {
		case 'SET_TASKS': {
			const stateCopy = { ...state }
			stateCopy[action.payload.todolistId] = action.payload.tasks
			return stateCopy
		}
		case 'REMOVE_TASK': {
			const stateCopy = { ...state }
			const { todoListId, taskId } = action.payload
			stateCopy[todoListId] = stateCopy[todoListId].filter((task) => task.id !== taskId)
			return stateCopy
		}
		case 'ADD_TASK': {
			const { todoListId } = action.payload.task
			const stateCopy = { ...state }
			const task = action.payload.task
			stateCopy[todoListId] = [task, ...stateCopy[todoListId]]
			return stateCopy
		}
		case 'UPDATE_TASK': {
			const { updatedTask } = action.payload
			const { todoListId, id } = updatedTask
			const stateCopy = { ...state }
			stateCopy[todoListId] = stateCopy[todoListId].map((task) =>
				task.id === id ? updatedTask : task
			)
			return stateCopy
		}
		case 'ADD_TODOLIST': {
			return { ...state, [action.payload.todoList.id]: [] }
		}
		case 'REMOVE_TODOLIST': {
			const { todoListId } = action.payload
			const stateCopy = { ...state }
			delete stateCopy[todoListId]
			return stateCopy
		}
		case 'CHANGE_TASK_ENTITY_STATUS': {
			const { todoListId, id, entityStatus } = action.payload
			const stateCopy = { ...state }
			stateCopy[todoListId] = stateCopy[todoListId].map((task) =>
				task.id === id ? { ...task, entityStatus } : task
			)
			return stateCopy
		}
		case 'CLEAR_DATA':
			return {}
		default:
			return state
	}
}

export type TasksState = {
	[key: string]: Array<DomainTask>
}

// Actions types
export type SetTaskAction = ReturnType<typeof setTasksAC>
export type RemoveTaskAction = ReturnType<typeof removeTaskAC>
export type AddTaskAction = ReturnType<typeof createTaskAC>
export type UpdateTaskAction = ReturnType<typeof updateTaskAC>
export type ChangeTaskEntityStatusAction = ReturnType<typeof changeTaskEntityStatusAC>

export type TasksAction =
	| SetTaskAction
	| RemoveTaskAction
	| AddTaskAction
	| UpdateTaskAction
	| AddTodoListAction
	| RemoveTodoListAction
	| ChangeTaskEntityStatusAction
	| ClearTodoListsDataAction
