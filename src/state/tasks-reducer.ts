import { TasksStateType } from '../App'
import { TaskType } from '../TodoList'
import {AddTodoListActionType, RemoveTodoListActionType} from './todolists-reducer';

export type AddTaskActionType = {
	type: 'ADD-TASK'
	todoListId: string
	newTaskId: string
	title: string
}

export type RemoveTaskActionType = {
	type: 'REMOVE-TASK'
	todoListId: string
	taskId: string
}

export type ChangeTaskStatusActionType = {
	type: 'CHANGE-TASK-STATUS'
	todoListId: string
	taskId: string
	isDone: boolean
}

export type ChangeTaskTitleActionType = {
	type: 'CHANGE-TASK-TITLE'
	todoListId: string
	taskId: string
	title: string
}

export type ActionsType =
	| RemoveTaskActionType
	| AddTaskActionType
	| ChangeTaskStatusActionType
	| ChangeTaskTitleActionType
	| AddTodoListActionType
	| RemoveTodoListActionType



export const tasksReducer = (
	state: TasksStateType,
	action: ActionsType,
): TasksStateType => {
	switch (action.type) {
		case 'REMOVE-TASK': {
			const stateCopy = { ...state }
			stateCopy[action.todoListId] = stateCopy[action.todoListId].filter(
				(task) => task.id !== action.taskId,
			)
			return stateCopy
		}
		case 'ADD-TASK': {
			const stateCopy = { ...state }
			const newTask: TaskType = {
				id: action.newTaskId,
				title: action.title,
				isDone: false,
			}
			stateCopy[action.todoListId] = [newTask, ...stateCopy[action.todoListId]]
			return stateCopy
		}
		case 'CHANGE-TASK-STATUS': {
			const stateCopy = { ...state }
			stateCopy[action.todoListId] = stateCopy[action.todoListId].map((t) =>
				t.id === action.taskId ? { ...t, isDone: action.isDone } : t,
			)
			return stateCopy
		}
		case 'CHANGE-TASK-TITLE': {
			const stateCopy = { ...state }
			stateCopy[action.todoListId] = stateCopy[action.todoListId].map((t) =>
				t.id === action.taskId ? { ...t, title: action.title } : t,
			)
			return stateCopy
		}
		case 'ADD-TODOLIST': {
			const stateCopy = { ...state }
			stateCopy[action.id] = []
			return stateCopy
		}
		case 'REMOVE-TODOLIST':
			const stateCopy = { ...state }
			delete stateCopy[action.id]
			return stateCopy
		default:
			throw new Error("I don't understand this action type")
	}
}

export const removeTaskActionCreator = (
	todoListId: string,
	taskId: string,
): RemoveTaskActionType => {
	return {
		type: 'REMOVE-TASK',
		todoListId,
		taskId,
	}
}

export const addTaskActionCreator = (
	todoListId: string,
	newTaskId: string,
	title: string,
): AddTaskActionType => {
	return {
		type: 'ADD-TASK',
		todoListId,
		newTaskId,
		title,
	}
}

export const changeTaskStatusActionCreator = (
	todoListId: string,
	taskId: string,
	isDone: boolean,
): ChangeTaskStatusActionType => {
	return {
		type: 'CHANGE-TASK-STATUS',
		todoListId,
		taskId,
		isDone,
	}
}

export const changeTaskTitleActionCreator = (
	todoListId: string,
	taskId: string,
	title: string,
): ChangeTaskTitleActionType => {
	return {
		type: 'CHANGE-TASK-TITLE',
		todoListId,
		taskId,
		title,
	}
}
