import type { FilterValuesType } from '../ui/TodoLists/TodoList/TodoList'
import { DomainTodoList, TodoList } from '../api/todolistsApi.types'
import { _todolistsApi } from '../api/todolistsApi'
import { AppThunk, FullAction } from '../../../app/store'
import { Dispatch } from 'redux'
import { RequestStatus, setAppStatus } from '../../../app/appSlice'
import { handleServerAppError, handleServerNetworkError } from 'common/utils'
import { ResultCode } from '../lib/enums/enums'
import { createSlice } from '@reduxjs/toolkit'
import { clearTasksAndTodoLists } from 'common/actions/common.actions'

export const todoListsSlice = createSlice({
	name: 'todoLists',
	initialState: [] as DomainTodoList[],
	reducers: (create) => ({
		setTodoLists: create.reducer<{ todoLists: TodoList[] }>((_state, action) => {
			return action.payload.todoLists.map((tl) => ({ ...tl, filter: 'all', entityStatus: 'idle' }))
		}),
		createTodoList: create.reducer<{ todoList: TodoList }>((state, action) => {
			const newTodoList: DomainTodoList = {
				...action.payload.todoList,
				filter: 'all',
				entityStatus: 'idle'
			}
			state.unshift(newTodoList)
		}),
		removeTodoList: create.reducer<{ id: string }>((state, action) => {
			const index = state.findIndex((tl) => tl.id === action.payload.id)
			state.splice(index, 1)
		}),
		updateTodoListTitle: create.reducer<{ todoListId: string; title: string }>((state, action) => {
			const todoList = state.find((tl) => tl.id === action.payload.todoListId)
			if (todoList) {
				todoList.title = action.payload.title
			}
		}),
		changeTodoListFilter: create.reducer<{
			todoListId: string
			filterValue: FilterValuesType
		}>((state, action) => {
			const todoList = state.find((tl) => tl.id === action.payload.todoListId)
			if (todoList) {
				todoList.filter = action.payload.filterValue
			}
		}),
		changeTodoListEntityStatus: create.reducer<{
			id: string
			entityStatus: RequestStatus
		}>((state, action) => {
			const todoList = state.find((tl) => tl.id === action.payload.id)
			if (todoList) {
				todoList.entityStatus = action.payload.entityStatus
			}
		}),
		clearTodoLists: create.reducer<undefined>((_state, _action) => {
			return []
		})
	}),
	extraReducers: (builder) => {
		builder.addCase(clearTasksAndTodoLists, (_state, action) => {
			return action.payload.todoLists
		})
	},
	selectors: {
		selectTodoLists: (state) => state
	}
})

export const todoListsReducer = todoListsSlice.reducer

export const {
	setTodoLists,
	createTodoList,
	removeTodoList,
	updateTodoListTitle,
	changeTodoListFilter,
	changeTodoListEntityStatus,
	clearTodoLists
} = todoListsSlice.actions

export const { selectTodoLists } = todoListsSlice.selectors

export const fetchTodoListsTC = (): AppThunk => (dispatch: Dispatch<FullAction>) => {
	dispatch(setAppStatus({ status: 'loading' }))
	_todolistsApi
		.getTodoLists()
		.then((res) => {
			dispatch(setAppStatus({ status: 'succeeded' }))
			dispatch(setTodoLists({ todoLists: res.data }))
		})
		.catch((error) => {
			handleServerNetworkError(error, dispatch)
		})
}

export const createTodoListTC =
	(args: { title: string }): AppThunk =>
	(dispatch: Dispatch<FullAction>) => {
		dispatch(setAppStatus({ status: 'loading' }))

		const { title } = args
		_todolistsApi
			.createTodoList(title)
			.then((res) => {
				if (res.data.resultCode === ResultCode.Success) {
					dispatch(setAppStatus({ status: 'succeeded' }))
					const todoList: TodoList = res.data.data.item
					dispatch(createTodoList({ todoList }))
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
		dispatch(setAppStatus({ status: 'loading' }))

		const { todoListId, title } = args
		_todolistsApi
			.updateTodoList({ todoListId, title })
			.then((res) => {
				if (res.data.resultCode === ResultCode.Success) {
					dispatch(setAppStatus({ status: 'succeeded' }))

					dispatch(updateTodoListTitle({ todoListId, title }))
				} else {
					handleServerAppError(res.data, dispatch)
				}
			})
			.catch((error) => {
				handleServerNetworkError(error, dispatch)
			})
	}

export const removeTodoListTC =
	(args: { id: string }): AppThunk =>
	(dispatch: Dispatch<FullAction>) => {
		const { id } = args
		dispatch(setAppStatus({ status: 'loading' }))
		dispatch(changeTodoListEntityStatus({ id, entityStatus: 'loading' }))

		_todolistsApi
			.removeTodolist(id)
			.then((res) => {
				if (res.data.resultCode === ResultCode.Success) {
					dispatch(setAppStatus({ status: 'succeeded' }))
					dispatch(removeTodoList({ id }))
				} else {
					handleServerAppError(res.data, dispatch)
					dispatch(changeTodoListEntityStatus({ id, entityStatus: 'failed' }))
				}
			})
			.catch((error) => {
				handleServerNetworkError(error, dispatch)
				dispatch(changeTodoListEntityStatus({ id, entityStatus: 'failed' }))
			})
	}

export type SetTodoListsAction = ReturnType<typeof setTodoLists>
export type AddTodoListAction = ReturnType<typeof createTodoList>
export type RemoveTodoListAction = ReturnType<typeof removeTodoList>
export type ChangeTodoListTitleAction = ReturnType<typeof updateTodoListTitle>
export type ChangeTodoListFilterAction = ReturnType<typeof changeTodoListFilter>
export type ChangeTodoListEntityStatusAction = ReturnType<typeof changeTodoListEntityStatus>
export type ClearTodoListsAction = ReturnType<typeof clearTodoLists>

export type TodoListsAction =
	| SetTodoListsAction
	| AddTodoListAction
	| RemoveTodoListAction
	| ChangeTodoListTitleAction
	| ChangeTodoListFilterAction
	| ChangeTodoListEntityStatusAction
	| ClearTodoListsAction
