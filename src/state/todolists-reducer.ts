import { FilterValueType, TodolistType } from '../App'
import { v1 } from 'uuid'

export type RemoveTodoListActionType = {
	type: 'REMOVE-TODOLIST'
	id: string
}

export type AddTodoListActionType = {
	type: 'ADD-TODOLIST'
	id: string
	title: string
}

export type ChangeTodoListTitleActionType = {
	type: 'CHANGE-TODOLIST-TITLE'
	id: string
	title: string
}

export type ChangeTodoListFilterActionType = {
	type: 'CHANGE-TODOLIST-FILTER'
	id: string
	filter: FilterValueType
}

export type ActionsType =
	| RemoveTodoListActionType
	| AddTodoListActionType
	| ChangeTodoListTitleActionType
	| ChangeTodoListFilterActionType

export const todoListsReducer = (
	state: Array<TodolistType>,
	action: ActionsType,
): Array<TodolistType> => {
	switch (action.type) {
		case 'REMOVE-TODOLIST':
			return state.filter((tl) => tl.id !== action.id)
		case 'ADD-TODOLIST':
			return [...state, { id: action.id, title: action.title, filter: 'all' }]
		case 'CHANGE-TODOLIST-TITLE':
			return state.map((tl) =>
				tl.id === action.id ? { ...tl, title: action.title } : tl,
			)
		case 'CHANGE-TODOLIST-FILTER':
			return state.map((tl) =>
				tl.id === action.id ? { ...tl, filter: action.filter } : tl,
			)
		default:
			throw new Error("I don't understand this action type")
	}
}

export const removeTodoListActionCreator = (
	todoListId: string,
): RemoveTodoListActionType => {
	return { type: 'REMOVE-TODOLIST', id: todoListId }
}

export const addTodoListActionCreator = (todoListTitle: string): AddTodoListActionType => {
	return {
		type: 'ADD-TODOLIST',
		id: v1(),
		title: todoListTitle
	}
}

export const changeTodoListTitleActionCreator = (
	todoListId: string,
	todoListTitle: string,
): ChangeTodoListTitleActionType => {
	return {
		type: 'CHANGE-TODOLIST-TITLE',
		id: todoListId,
		title: todoListTitle,
	}
}

export const changeTodoListFilterActionCreator = (
	todoListId: string,
	todoListFilter: FilterValueType,
): ChangeTodoListFilterActionType => {
	return {
		type: 'CHANGE-TODOLIST-FILTER',
		id: todoListId,
		filter: todoListFilter,
	}
}