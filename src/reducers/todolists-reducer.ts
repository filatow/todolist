import { TodoList } from '../App'
import { FilterValues } from '../TodoList'


export type AddTodoListAction = {
	type: 'ADD-TODOLIST',
	payload: {
		todoListID: string
		title: string
	}
}

export type ChangeTodoListTitleAction = {
	type: 'CHANGE-TODOLIST-TITLE',
	payload: {
		todoListID: string,
		title: string
	}
}

export type ChangeTodoListFilterAction = {
	type: 'CHANGE-TODOLIST-FILTER',
	payload: {
		todoListID: string,
		filterValue: FilterValues
	}
}

export type RemoveTodoListAction = {
	type: 'REMOVE-TODOLIST',
	payload: {
		todoListID: string
	}
}

type Action =
	| AddTodoListAction
	| RemoveTodoListAction
	| ChangeTodoListTitleAction
	| ChangeTodoListFilterAction

export const todoListsReducer = (
	todoLists: TodoList[],
	action: Action,
): TodoList[] => {
	switch (action.type) {
		case 'REMOVE-TODOLIST':
			return todoLists.filter((tl) => tl.id !== action.payload.todoListID);
		case 'ADD-TODOLIST':
			const newTodoList: TodoList = {
				id: action.payload.todoListID,
				title: action.payload.title,
				filter: 'all',
			}
			return [...todoLists, newTodoList]
		case 'CHANGE-TODOLIST-TITLE':
			return todoLists.map((tl) =>
				tl.id === action.payload.todoListID
					? { ...tl, title: action.payload.title }
					: tl,
			)
		case 'CHANGE-TODOLIST-FILTER':
			return todoLists.map((tl) => {
				return tl.id === action.payload.todoListID ?
					{ ...tl, filter: action.payload.filterValue }
					: tl
			})
		default:
			throw new Error('Unknown action.type')
	}
}


export const RemoveTodoListAC = (
	todoListID: string,
): RemoveTodoListAction => {
	return {
		type: 'REMOVE-TODOLIST',
		payload: {
			todoListID,
		},
	}
}

export const AddTodoListAC = (
	todoListID: string,
	title: string,
): AddTodoListAction => {
	return {
		type: 'ADD-TODOLIST',
		payload: {
			todoListID,
			title,
		},
	}
}

export const ChangeTodoListTitleAC = (
	todoListID: string,
	title: string,
): ChangeTodoListTitleAction => {
	return {
		type: 'CHANGE-TODOLIST-TITLE',
		payload: {
			todoListID,
			title,
		},
	}
}

export const ChangeTodoListFilterAC = (
	todoListID: string,
	filterValue: FilterValues
): ChangeTodoListFilterAction => {
	return {
		type: 'CHANGE-TODOLIST-FILTER',
		payload: {
			todoListID,
			filterValue
		}
	}
}
