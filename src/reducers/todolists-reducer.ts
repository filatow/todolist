import { TodoList } from '../App'
import { FilterValues } from '../TodoList'
import { v1 } from 'uuid'


export const removeTodoListAC = (
	payload: { todoListId: string },
) => {
	return {
		type: 'REMOVE_TODOLIST',
		payload,
	} as const
}

export const addTodoListAC = (
	payload: { title: string },
) => {
	return {
		type: 'ADD_TODOLIST',
		payload: { ...payload, todoListId: v1() },
	} as const
}

export const changeTodoListTitleAC = (
	payload: {
		todoListId: string,
		title: string,
	},
) => {
	return {
		type: 'CHANGE_TODOLIST_TITLE',
		payload,
	} as const
}

export const changeTodoListFilterAC = (
	payload: {
		todoListId: string,
		filterValue: FilterValues,
	},
) => {
	return {
		type: 'CHANGE_TODOLIST_FILTER',
		payload,
	} as const
}


export const todoListsReducer = (
	todoLists: TodoList[],
	action: Action,
): TodoList[] => {
	switch (action.type) {
		case 'REMOVE_TODOLIST':
			return todoLists.filter((tl) => tl.id !== action.payload.todoListId)
		case 'ADD_TODOLIST':
			const newTodoList: TodoList = {
				id: action.payload.todoListId,
				title: action.payload.title,
				filter: 'all',
			}
			return [...todoLists, newTodoList]
		case 'CHANGE_TODOLIST_TITLE':
			return todoLists.map((tl) =>
				tl.id === action.payload.todoListId
					? { ...tl, title: action.payload.title }
					: tl,
			)
		case 'CHANGE_TODOLIST_FILTER':
			return todoLists.map((tl) => {
				return tl.id === action.payload.todoListId ?
					{ ...tl, filter: action.payload.filterValue }
					: tl
			})
		default:
			throw new Error('Unknown action.type')
	}
}


export type AddTodoListAction = ReturnType<typeof addTodoListAC>
export type ChangeTodoListTitleAction = ReturnType<typeof changeTodoListTitleAC>
export type ChangeTodoListFilterAction = ReturnType<typeof changeTodoListFilterAC>
export type RemoveTodoListAction = ReturnType<typeof removeTodoListAC>

type Action =
	| AddTodoListAction
	| RemoveTodoListAction
	| ChangeTodoListTitleAction
	| ChangeTodoListFilterAction
