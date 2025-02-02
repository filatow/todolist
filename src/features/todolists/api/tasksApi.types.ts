import { TaskPriority, TaskStatus } from '../lib/enums/enums'
import { RequestStatus } from '../../../app/appSlice'

export type GetTasksResponse <Item = ServerTask> = {
	error: string | null
	items: Item[]
	totalCount: number
}

export type ServerTask = {
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

export type DomainTask = ServerTask & {
	entityStatus: RequestStatus
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