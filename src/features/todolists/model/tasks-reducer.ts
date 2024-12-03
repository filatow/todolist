import { Task } from '../ui/TodoLists/TodoList/TodoList'
import { v1 } from 'uuid'
import { AddTodoListAction, RemoveTodoListAction } from './todolists-reducer'

// Action creators
export const removeTaskAC = (
	payload: { todoListId: string, taskId: string },
) => {
	return { type: 'REMOVE_TASK', payload } as const
}

export const addTaskAC = (
	payload: { todoListId: string, title: string },
) => {
	return { type: 'ADD_TASK', payload: { ...payload, taskId: v1() } } as const
}

export const changeTaskStatusAC = (
	payload: { todoListId: string, taskId: string, isDone: boolean },
) => {
	return { type: 'CHANGE_TASK_STATUS', payload } as const
}

export const changeTaskTitleAC = (
	payload: { todoListId: string, taskId: string, title: string },
) => {
	return { type: 'CHANGE_TASK_TITLE', payload } as const
}


const initialState: TasksState = {}

export const tasksReducer = (state: TasksState = initialState, action: ActionsType): TasksState => {
	switch (action.type) {
		case 'REMOVE_TASK': {
			const stateCopy = { ...state }
			const { todoListId, taskId } = action.payload
			stateCopy[todoListId] = stateCopy[todoListId].filter((task) => task.id !== taskId)
			return stateCopy
		}
		case 'ADD_TASK': {
			const { todoListId, taskId, title } = action.payload
			const stateCopy = { ...state }
			const newTask: Task = {
				id: taskId,
				title,
				isDone: false,
			}
			stateCopy[todoListId] = [newTask, ...stateCopy[todoListId]]
			return stateCopy
		}
		case 'CHANGE_TASK_STATUS': {
			const { todoListId, taskId, isDone } = action.payload
			const stateCopy = { ...state }
			stateCopy[todoListId] = stateCopy[todoListId].map(
				task => task.id === taskId ? { ...task, isDone } : task,
			)
			return stateCopy
		}
		case 'CHANGE_TASK_TITLE': {
			const { todoListId, taskId, title } = action.payload
			const stateCopy = { ...state }
			stateCopy[todoListId] = stateCopy[todoListId].map(
				task => task.id === taskId ? { ...task, title } : task,
			)
			return stateCopy
		}
		case 'ADD_TODOLIST': {
			return { ...state, [action.payload.todoListId]: [] }
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
	[key: string]: Array<Task>
}

// Actions types
export type RemoveTaskAction = ReturnType<typeof removeTaskAC>
export type AddTaskAction = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleAction = ReturnType<typeof changeTaskTitleAC>

type ActionsType =
	| RemoveTaskAction
	| AddTaskAction
	| ChangeTaskStatusAction
	| ChangeTaskTitleAction
	| AddTodoListAction
	| RemoveTodoListAction