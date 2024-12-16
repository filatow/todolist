import { DomainTask, UpdateTaskModel } from './tasksApi.types'
import { instance } from 'common/instance/instance'
import { BaseResponse } from 'common/types/types'

export const tasksApi = {
	getTasks(todolistId: string) {
		return instance.get(`todo-lists/${todolistId}/tasks`)
	},
	createTask(args: { todoListId: string; title: string }) {
		const { todoListId, title } = args
		return instance.post<BaseResponse<{ item: DomainTask }>>(
			`todo-lists/${todoListId}/tasks`,
			{ title },
			{
				params: { todoListId }
			}
		)
	},
	removeTask(args: { todoListId: string; taskId: string }) {
		const { todoListId, taskId } = args
		return instance.delete<BaseResponse>(`todo-lists/${todoListId}/tasks/${taskId}`, {
			params: { todoListId, taskId }
		})
	},
	updateTask(args: { updateTaskData: UpdateTaskModel, todoListId: string, taskId: string }) {
		const { updateTaskData, todoListId, taskId } = args
		return instance.put<BaseResponse<{ item: DomainTask }>>(
			`todo-lists/${todoListId}/tasks/${taskId}`,
			updateTaskData
		)
	}
}
