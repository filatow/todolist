import { DomainTodoList, TodoList } from './todolistsApi.types'
import { instance } from 'common/instance/instance'
import { BaseResponse } from 'common/types/types'
import { baseApi } from '../../../app/baseApi'

export const todoListsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getTodoLists: builder.query<DomainTodoList[], void>({
			query: () => 'todo-lists',
			transformResponse(todoLists: TodoList[]): DomainTodoList[] {
				return todoLists.map((tl) => ({ ...tl, filter: 'all', entityStatus: 'idle' }))
			},
			providesTags: ['TodoList']
		}),
		addTodoList: builder.mutation<BaseResponse<{ item: TodoList }>, string>({
			query: (title) => {
				return {
					url: 'todo-lists',
					method: 'POST',
					body: { title }
				}
			},
			invalidatesTags: ['TodoList']
		}),
		removeTodoList: builder.mutation<BaseResponse, string>({
			query: (id) => {
				return {
					url: `todo-lists/${id}`,
					method: 'DELETE'
				}
			},
			invalidatesTags: ['TodoList']
		}),
		updateTodoListTitle: builder.mutation<BaseResponse, { id: string; title: string }>({
			query: ({ id, title }) => {
				return {
					url: `todo-lists/${id}`,
					method: 'PUT',
					body: { title }
				}
			},
			invalidatesTags: ['TodoList']
		})
	})
})

export const {
	useGetTodoListsQuery,
	useAddTodoListMutation,
	useRemoveTodoListMutation,
	useUpdateTodoListTitleMutation
} = todoListsApi

export const _todolistsApi = {
	getTodoLists() {
		return instance.get<TodoList[]>(`todo-lists`)
	},
	createTodoList(title: string) {
		return instance.post<BaseResponse<{ item: TodoList }>>(`todo-lists`, { title })
	},
	removeTodolist(todoListId: string) {
		return instance.delete<BaseResponse>(`todo-lists/${todoListId}`)
	},
	updateTodoList(args: { todoListId: string; title: string }) {
		const { todoListId, title } = args
		return instance.put<BaseResponse<{ item: TodoList }>>(`todo-lists/${todoListId}`, { title })
	}
}
