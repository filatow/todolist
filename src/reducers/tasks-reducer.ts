import { TasksState } from '../App'
import { Task } from '../TodoList'
import { v1 } from 'uuid'
import { AddTodoListAction, RemoveTodoListAction } from './todolists-reducer'

export const tasksReducer = (state: TasksState, action: ActionsType): TasksState => {
	switch (action.type) {
		case 'REMOVE_TASK': {
			const stateCopy = { ...state }
			const { todolistId, taskId } = action.payload
			stateCopy[todolistId] = stateCopy[todolistId].filter((task) => task.id !== taskId)
			return stateCopy
		}
		case 'ADD_TASK': {
			const { todolistId, taskId, title } = action.payload
			const stateCopy = { ...state }
			const newTask: Task = {
				id: taskId,
				title,
				isDone: false,
			}
			stateCopy[todolistId] = [newTask, ...stateCopy[todolistId]]
			return stateCopy
		}
		case 'CHANGE_TASK_STATUS': {
			const { todolistId, taskId, isDone } = action.payload
			const stateCopy = { ...state }
			stateCopy[todolistId] = stateCopy[todolistId].map(
				task => task.id === taskId ? { ...task, isDone } : task,
			)
			return stateCopy
		}
		case 'CHANGE_TASK_TITLE': {
			const { todolistId, taskId, title } = action.payload
			const stateCopy = { ...state }
			stateCopy[todolistId] = stateCopy[todolistId].map(
				task => task.id === taskId ? { ...task, title } : task,
			)
			return stateCopy
		}
		case 'ADD_TODOLIST': {
			return {...state, [action.payload.todoListId]: []}
		}
		case 'REMOVE_TODOLIST': {
			const { todoListId } = action.payload
			const stateCopy = { ...state }
			delete stateCopy[todoListId]
			return stateCopy
		}
		default:
			throw new Error('I don\'t understand this type')
	}
}

// Action creators
export const removeTaskAC = (
	payload: { todolistId: string, taskId: string },
) => {
	return { type: 'REMOVE_TASK', payload } as const
}

export const addTaskAC = (
	payload: { todolistId: string, title: string },
) => {
	return { type: 'ADD_TASK', payload: { ...payload, taskId: v1() } } as const
}

export const changeTaskStatusAC = (
	payload: { todolistId: string, taskId: string, isDone: boolean },
) => {
	return { type: 'CHANGE_TASK_STATUS', payload } as const
}

export const changeTaskTitleAC = (
	payload: { todolistId: string, taskId: string, title: string },
) => {
	return { type: 'CHANGE_TASK_TITLE', payload } as const
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