import { TodoList } from './todolistsApi.types'
import { instance } from 'common/instance/instance'
import { BaseResponse } from 'common/types/types'

export const todolistsApi = {
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
