import { DomainTask, GetTasksResponse, ServerTask, UpdateTaskModel } from './tasksApi.types'
import { instance } from 'common/instance/instance'
import { BaseResponse } from 'common/types/types'
import { baseApi } from '../../../app/baseApi'

export const tasksApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getTasks: builder.query<DomainTask[], string>({
			query: (todolistId) => `todo-lists/${todolistId}/tasks`,
			transformResponse(data: GetTasksResponse) {
				const tasks = data?.items || []
				return tasks.map((t) => ({ ...t, entityStatus: 'idle' }))
			},
			providesTags: ['Task']
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
			invalidatesTags: ['Task']
		}),
		removeTask: builder.mutation<BaseResponse, { todoListId: string; taskId: string }>({
			query: ({ todoListId, taskId }) => ({
				url: `todo-lists/${todoListId}/tasks/${taskId}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Task']
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
			invalidatesTags: ['Task']
		})
	})
})

export const {
	useGetTasksQuery,
	useCreateTaskMutation,
	useRemoveTaskMutation,
	useUpdateTaskMutation
} = tasksApi

export const _tasksApi = {
	getTasks(todolistId: string) {
		return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
	},
	createTask(args: { todoListId: string; title: string }) {
		const { todoListId, title } = args
		return instance.post<BaseResponse<{ item: ServerTask }>>(`todo-lists/${todoListId}/tasks`, {
			title
		})
	},
	removeTask(args: { todoListId: string; taskId: string }) {
		const { todoListId, taskId } = args
		return instance.delete<BaseResponse>(`todo-lists/${todoListId}/tasks/${taskId}`)
	},
	updateTask(args: { updateTaskData: UpdateTaskModel; todoListId: string; taskId: string }) {
		const { updateTaskData, todoListId, taskId } = args
		return instance.put<BaseResponse<{ item: ServerTask }>>(
			`todo-lists/${todoListId}/tasks/${taskId}`,
			updateTaskData
		)
	}
}
