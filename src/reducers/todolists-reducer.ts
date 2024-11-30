import type { TodoList } from '../app/App'
import type { FilterValues } from '../TodoList'
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


export const todoListID1 = v1()
export const todoListID2 = v1()
const initialState: Array<TodoList> = []
// [
// 	{ id: todoListID1, title: 'What to learn', filter: 'all' },
// 	{ id: todoListID2, title: 'What to buy', filter: 'all' },
// ]

export const todoListsReducer = (
	state: Array<TodoList> = initialState,
	action: Action,
): TodoList[] => {
	switch (action.type) {
		case 'REMOVE_TODOLIST':
			return state.filter((tl) => tl.id !== action.payload.todoListId)
		case 'ADD_TODOLIST':
			const newTodoList: TodoList = {
				id: action.payload.todoListId,
				title: action.payload.title,
				filter: 'all',
			}
			return [...state, newTodoList]
		case 'CHANGE_TODOLIST_TITLE':
			return state.map((tl) =>
				tl.id === action.payload.todoListId
					? { ...tl, title: action.payload.title }
					: tl,
			)
		case 'CHANGE_TODOLIST_FILTER':
			return state.map((tl) => {
				return tl.id === action.payload.todoListId ?
					{ ...tl, filter: action.payload.filterValue }
					: tl
			})
		default:
			return state
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
