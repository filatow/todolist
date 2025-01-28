import { FilterValuesType } from '../ui/TodoLists/TodoList/TodoList'
import { RequestStatus } from '../../../app/appSlice'

export type ServerTodoList = {
	id: string
	title: string
	addedDate: string
	order: number
}

export type DomainTodoList = ServerTodoList & {
	filter: FilterValuesType
	entityStatus: RequestStatus
}