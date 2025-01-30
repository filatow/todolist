import { RequestStatus } from '../../../../app/appSlice'

export type FilterValue = 'all' | 'active' | 'completed'

export type ServerTodoList = {
	id: string
	title: string
	addedDate: string
	order: number
}

export type DomainTodoList = ServerTodoList & {
	filter: FilterValue
	entityStatus: RequestStatus
}