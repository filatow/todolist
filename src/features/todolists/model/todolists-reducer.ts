import type { FilterValuesType } from '../ui/TodoLists/TodoList/TodoList'
import { DomainTodoList, TodoList } from '../api/todolistsApi.types'
import { todolistsApi } from '../api/todolistsApi'
import {AppDispatch, AppThunk, FullAction} from '../../../app/store'
import { Dispatch } from 'redux'
import { RequestStatus, setAppStatusAC } from '../../../app/app-reducer'
import { handleServerAppError, handleServerNetworkError } from 'common/utils'
import { ResultCode } from '../lib/enums/enums'
import { fetchTasksTC } from './tasks-reducer'

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

export const changeTodoListEntityStatusAC = (payload: {
	id: string
	entityStatus: RequestStatus
}) => {
	return { type: 'CHANGE_TODOLIST_ENTITY_STATUS', payload } as const
}

export const clearTodoListsDataAC = () => ({
	type: 'CLEAR_DATA'
} as const)

export const fetchTodoListsTC = (): AppThunk => (dispatch: AppDispatch) => {
	dispatch(setAppStatusAC('loading'))
	todolistsApi
		.getTodoLists()
		.then((res) => {
			dispatch(setAppStatusAC('succeeded'))
			dispatch(setTodoListsAC({ todoLists: res.data }))
			return res.data
		})
		.then((todoLists) => {
			todoLists.forEach((tl) => {
				dispatch(fetchTasksTC(tl.id))
			})
		})
		.catch((error) => {
			handleServerNetworkError(error, dispatch)
		})
}

export const createTodoListTC =
	(args: { title: string }): AppThunk =>
	(dispatch: Dispatch<FullAction>) => {
		dispatch(setAppStatusAC('loading'))

		const { title } = args
		todolistsApi
			.createTodoList(title)
			.then((res) => {
				if (res.data.resultCode === ResultCode.Success) {
					dispatch(setAppStatusAC('succeeded'))
					const todoList: TodoList = res.data.data.item
					dispatch(createTodoListAC({ todoList }))
				} else {
					handleServerAppError(res.data, dispatch)
				}
			})
			.catch((error) => {
				handleServerNetworkError(error, dispatch)
			})
	}

export const updateTodoListTC =
	(args: { todoListId: string; title: string }): AppThunk =>
	(dispatch: Dispatch<FullAction>) => {
		dispatch(setAppStatusAC('loading'))

		const { todoListId, title } = args
		todolistsApi
			.updateTodoList({ todoListId, title })
			.then((res) => {
				if (res.data.resultCode === ResultCode.Success) {
					dispatch(setAppStatusAC('succeeded'))

					dispatch(updateTodoListAC({ todoListId, title }))
				} else {
					handleServerAppError(res.data, dispatch)
				}
			})
			.catch((error) => {
				handleServerNetworkError(error, dispatch)
			})
	}

export const removeTodoListTC =
	(args: { todoListId: string }): AppThunk =>
	(dispatch: Dispatch<FullAction>) => {
		const { todoListId } = args
		dispatch(setAppStatusAC('loading'))
		dispatch(changeTodoListEntityStatusAC({ id: todoListId, entityStatus: 'loading' }))

		todolistsApi
			.removeTodolist(todoListId)
			.then((res) => {
				if (res.data.resultCode === ResultCode.Success) {
					dispatch(setAppStatusAC('succeeded'))
					dispatch(removeTodoListAC({ todoListId }))
				} else {
					handleServerAppError(res.data, dispatch)
					dispatch(changeTodoListEntityStatusAC({ id: todoListId, entityStatus: 'failed' }))
				}
			})
			.catch((error) => {
				handleServerNetworkError(error, dispatch)
				dispatch(changeTodoListEntityStatusAC({ id: todoListId, entityStatus: 'failed' }))
			})
	}

const initialState: Array<DomainTodoList> = []
export const todoListsReducer = (
	state: Array<DomainTodoList> = initialState,
	action: TodoListsAction
): DomainTodoList[] => {
	switch (action.type) {
		case 'SET_TODOLISTS': {
			return action.payload.todoLists.map((tl) => ({ ...tl, filter: 'all', entityStatus: 'idle' }))
		}
		case 'REMOVE_TODOLIST':
			return state.filter((tl) => tl.id !== action.payload.todoListId)
		case 'ADD_TODOLIST':
			const newTodoList: DomainTodoList = {
				...action.payload.todoList,
				filter: 'all',
				entityStatus: 'idle'
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
					:	tl
			})
		case 'CHANGE_TODOLIST_ENTITY_STATUS':
			return state.map((tl) => {
				const { id, entityStatus } = action.payload
				return { ...tl, entityStatus: tl.id === id ? entityStatus : 'idle' }
			})
		case 'CLEAR_DATA':
			return []
		default:
			return state
	}
}

export type SetTodoListsAction = ReturnType<typeof setTodoListsAC>
export type AddTodoListAction = ReturnType<typeof createTodoListAC>
export type ChangeTodoListTitleAction = ReturnType<typeof updateTodoListAC>
export type ChangeTodoListFilterAction = ReturnType<typeof changeTodoListFilterAC>
export type RemoveTodoListAction = ReturnType<typeof removeTodoListAC>
export type ChangeTodoListEntityStatusAction = ReturnType<typeof changeTodoListEntityStatusAC>
export type ClearTodoListsDataAction = ReturnType<typeof clearTodoListsDataAC>

export type TodoListsAction =
	| SetTodoListsAction
	| AddTodoListAction
	| RemoveTodoListAction
	| ChangeTodoListTitleAction
	| ChangeTodoListFilterAction
	| ChangeTodoListEntityStatusAction
	| ClearTodoListsDataAction
