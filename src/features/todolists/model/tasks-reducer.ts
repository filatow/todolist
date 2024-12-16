import { AddTodoListAction, RemoveTodoListAction } from './todolists-reducer'
import { AppThunk, FullAction } from '../../../app/store'
import { tasksApi } from '../api/tasksApi'
import { DomainTask, UpdateTaskDomainModel, UpdateTaskModel } from '../api/tasksApi.types'
import { Dispatch } from 'redux'

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

export const fetchTasksTC = (todoListId: string): AppThunk =>
	(dispatch: Dispatch<FullAction>) => {
		tasksApi.getTasks(todoListId)
			.then(res => {
				const tasks = res.data.items
				dispatch(setTasksAC({ todolistId: todoListId, tasks }))
			})
	}

export const removeTaskTC =
	(args: { taskId: string; todoListId: string }): AppThunk =>
		(dispatch: Dispatch<FullAction>) => {
			tasksApi.removeTask(args)
				.then(_res => {
					dispatch(removeTaskAC(args))
				})
		}

export const createTaskTC =
	(args: { todoListId: string, title: string }): AppThunk =>
		(dispatch: Dispatch<FullAction>) => {
			tasksApi.createTask(args)
				.then(res => {
					const task = res.data.data.item
					dispatch(createTaskAC({ task }))
				})
		}

export const updateTaskTC =
	(args: { task: DomainTask, domainModel: UpdateTaskDomainModel }): AppThunk =>
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
			tasksApi.updateTask({ updateTaskData, todoListId, taskId })
				.then(res => {
					const updatedTask = res.data.data.item
					dispatch(updateTaskAC({ updatedTask }))
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
			stateCopy[todoListId] = stateCopy[todoListId].map(
				(task) => task.id === id ? updatedTask : task
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

export type TasksAction =
	| SetTaskAction
	| RemoveTaskAction
	| AddTaskAction
	| UpdateTaskAction
	| AddTodoListAction
	| RemoveTodoListAction
