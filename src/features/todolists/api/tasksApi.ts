import { DomainTask, GetTasksResponse, ServerTask, UpdateTaskModel } from './tasksApi.types'
import { BaseResponse } from 'common/types/types'
import { baseApi } from '../../../app/baseApi'

export const PAGE_SIZE = 4

export const tasksApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getTasks: builder.query<
			GetTasksResponse<DomainTask>,
			{ todoListId: string; args: { count?: number; page: number } }
		>({
			query: ({ todoListId, args }) => {
				return {
					url: `todo-lists/${todoListId}/tasks`,
					params: { count: PAGE_SIZE, ...args }
				}
			},
			transformResponse(data: GetTasksResponse) {
				return {
					...data,
					items: data.items.map((t) => ({ ...t, entityStatus: 'idle' }))
				}
			},
			providesTags: (_res, _error, { todoListId }) =>
				// res ?
				// 	[
				// 		...res.map(({ id }) => ({ type: 'Task', id }) as const),
				// 		{ type: 'Task', id: todolistId }
				// 	]
				// :	['Task']
				[{ type: 'Task', id: todoListId }]
		}),
		createTask: builder.mutation<
			BaseResponse<{ item: ServerTask }>,
			{ todoListId: string; title: string }
		>({
			query: ({ todoListId, title }) => ({
				method: 'POST',
				url: `todo-lists/${todoListId}/tasks`,
				body: { title }
			}),
			invalidatesTags: (_res, _error, { todoListId }) => [{ type: 'Task', id: todoListId }]
		}),
		removeTask: builder.mutation<BaseResponse, { todoListId: string; taskId: string }>({
			query: ({ todoListId, taskId }) => ({
				url: `todo-lists/${todoListId}/tasks/${taskId}`,
				method: 'DELETE'
			}),
			invalidatesTags: (_res, _err, { todoListId }) =>
				[{ type: 'Task', id: todoListId }]
		}),
		updateTask: builder.mutation<
			BaseResponse<{ item: ServerTask }>,
			{ updateTaskData: UpdateTaskModel; todoListId: string; taskId: string }
		>({
			query: ({ todoListId, taskId, updateTaskData }) => ({
				url: `todo-lists/${todoListId}/tasks/${taskId}`,
				method: 'PUT',
				body: updateTaskData
			}),
			onQueryStarted: async (
				{ todoListId, taskId, updateTaskData },
				{ dispatch, queryFulfilled, getState }
			) => {
				const cachedArgsForQuery = tasksApi.util.selectCachedArgsForQuery(getState(), 'getTasks')

				const patchResults: any[] = []

				cachedArgsForQuery.forEach(({ args }) => {
					patchResults.push(
						dispatch(
							tasksApi.util.updateQueryData(
								'getTasks',
								{
									todoListId,
									args: { page: args.page }
								},
								(state) => {
									const task = state.items.find((t) => t.id === taskId)
									if (task) {
										task.status = updateTaskData.status
									}
								}
							)
						)
					)
				})
				try {
					await queryFulfilled
				} catch {
					patchResults.forEach((patchResult) => {
						patchResult.undo()
					})
				}
			},
			invalidatesTags: (_res, _err, { todoListId }) =>
				[{ type: 'Task', id: todoListId }]
		})
	})
})

export const {
	useGetTasksQuery,
	useCreateTaskMutation,
	useRemoveTaskMutation,
	useUpdateTaskMutation
} = tasksApi
