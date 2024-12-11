import { TaskPriority, TaskStatus } from '../lib/enums/enums'

export type GetTasksResponse = {
	error: string | null
	totalCount: number
	items: Task[]
}

export type Task = {
	addedDate: string
	deadline: string | null
	description: string | null
	id: string
	order: number
	priority: TaskPriority
	startDate: string | null
	status: TaskStatus
	title: string
	todoListId: string
}

export type UpdateTaskModel = {
	title: string
	description: string | null
	status: TaskStatus
	priority: TaskPriority
	startDate: string | null
	deadline: string | null
}
