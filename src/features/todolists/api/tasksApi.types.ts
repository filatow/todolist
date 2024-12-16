import { TaskPriority, TaskStatus } from '../lib/enums/enums'

export type GetTasksResponse = {
	error: string | null
	totalCount: number
	items: DomainTask[]
}

export type DomainTask = {
	title: string
	description: string | null
	status: TaskStatus
	priority: TaskPriority
	startDate: string | null
	deadline: string | null
	addedDate: string
	id: string
	order: number
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

export type UpdateTaskDomainModel = {
	title?: string
	description?: string | null
	status?: TaskStatus
	priority?: TaskPriority
	startDate?: string | null
	deadline?: string | null
}