import type { FilterValuesType } from '../ui/TodoLists/TodoList/TodoList'
import { DomainTodoList, TodoList } from '../api/todolistsApi.types'
import { todolistsApi } from '../api/todolistsApi'
import { FullAction } from '../../../app/store'
import { Dispatch } from 'redux'

export const setTodoListsAC = (payload: { todoLists: TodoList[] }) => {
	return { type: 'SET_TODOLISTS', payload } as const
}

export const removeTodoListAC = (payload: { todoListId: string }) => {
	return {
		type: 'REMOVE_TODOLIST',
		payload
	} as const
}

export const createTodoListAC = (payload: { todoList: TodoList }) => {
	return {
		type: 'ADD_TODOLIST',
		payload
	} as const
}

export const updateTodoListAC = (payload: { todoListId: string; title: string }) => {
	return {
		type: 'CHANGE_TODOLIST_TITLE',
		payload
	} as const
}

export const changeTodoListFilterAC = (payload: {
	todoListId: string
	filterValue: FilterValuesType
}) => {
	return {
		type: 'CHANGE_TODOLIST_FILTER',
		payload
	} as const
}

export const fetchTodoListsTC = () => (dispatch: Dispatch<FullAction>) => {
	todolistsApi.getTodoLists()
		.then((res) => {
			dispatch(setTodoListsAC({ todoLists: res.data }))
		})
}

export const createTodoListTC = (args: { title: string }) => (dispatch: Dispatch<FullAction>) => {
	const { title } = args
	todolistsApi.createTodoList(title)
		.then((res) => {
			const todoList: TodoList = res.data.data.item
			dispatch(createTodoListAC({ todoList }))
		})
}

export const updateTodoListTC = (args: { todoListId: string, title: string }) =>
	(dispatch: Dispatch<FullAction>) => {
		const { todoListId, title } = args
		todolistsApi.updateTodoList({ todoListId, title })
			.then((_res) => {
				dispatch(updateTodoListAC({ todoListId, title }))
			})
	}

export const removeTodoListTC = (args: { todoListId: string }) =>
	(dispatch: Dispatch<FullAction>) => {
		const { todoListId } = args
		todolistsApi.removeTodolist(todoListId)
			.then((_res) => {
				dispatch(removeTodoListAC({ todoListId }))
			})
	}

const initialState: Array<DomainTodoList> = []
export const todoListsReducer = (
	state: Array<DomainTodoList> = initialState,
	action: FullAction
): DomainTodoList[] => {
	switch (action.type) {
		case 'SET_TODOLISTS': {
			return action.payload.todoLists.map(tl => ({ ...tl, filter: 'all' }))
		}
		case 'REMOVE_TODOLIST':
			return state.filter((tl) => tl.id !== action.payload.todoListId)
		case 'ADD_TODOLIST':
			const newTodoList: DomainTodoList = {
				...action.payload.todoList,
				filter: 'all'
			}
			return [newTodoList, ...state]
		case 'CHANGE_TODOLIST_TITLE':
			return state.map((tl) =>
				tl.id === action.payload.todoListId ? { ...tl, title: action.payload.title } : tl
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


export type SetTodoListsAction = ReturnType<typeof setTodoListsAC>
export type AddTodoListAction = ReturnType<typeof createTodoListAC>
export type ChangeTodoListTitleAction = ReturnType<typeof updateTodoListAC>
export type ChangeTodoListFilterAction = ReturnType<typeof changeTodoListFilterAC>
export type RemoveTodoListAction = ReturnType<typeof removeTodoListAC>

export type TodoListsAction =
	| SetTodoListsAction
	| AddTodoListAction
	| RemoveTodoListAction
	| ChangeTodoListTitleAction
	| ChangeTodoListFilterAction
