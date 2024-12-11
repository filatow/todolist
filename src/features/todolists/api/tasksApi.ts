import { Task, UpdateTaskModel } from './tasksApi.types'
import { instance } from 'common/instance/instance'
import { BaseResponse } from 'common/types/types'

export const tasksApi = {
	createTask(args: { todolistId: string; title: string }) {
		const { todolistId, title } = args
		return instance.post<BaseResponse<{ item: Task }>>(
			`todo-lists/${todolistId}/tasks`,
			{ title },
			{
				params: { todolistId }
			}
		)
	},
	removeTask(args: { todolistId: string; taskId: string }) {
		const { todolistId, taskId } = args
		return instance.delete<BaseResponse>(`todo-lists/${todolistId}/tasks/${taskId}`, {
			params: { todolistId, taskId }
		})
	},
	updateTask(updateTaskData: UpdateTaskModel, task: Task) {
		return instance.put<BaseResponse<{ item: Task }>>(
			`todo-lists/${task.todoListId}/tasks/${task.id}`,
			updateTaskData
		)
	}
}
