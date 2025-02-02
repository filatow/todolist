
import { BaseResponse } from 'common/types/types'
import { baseApi } from '../../../app/baseApi'
import { DomainTodoList, ServerTodoList } from '../lib/types/types'

export const todoListsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getTodoLists: builder.query<DomainTodoList[], void>({
			query: () => 'todo-lists',
			transformResponse(todoLists: ServerTodoList[]): DomainTodoList[] {
				return todoLists.map((tl) => ({ ...tl, filter: 'all', entityStatus: 'idle' }))
			},
			providesTags: ['TodoList'],
		}),
		addTodoList: builder.mutation<BaseResponse<{ item: ServerTodoList }>, string>({
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
			onQueryStarted: async (id: string, { dispatch, queryFulfilled }) => {
				const patchResult = dispatch(
					todoListsApi.util.updateQueryData('getTodoLists', undefined, state => {
						const index = state.findIndex(tl => tl.id === id)
						if (index !== -1) {
							state.splice(index, 1)
						}
					})
				)
				try {
					await queryFulfilled
				} catch {
					patchResult.undo()
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