import { FilterValuesType } from '../ui/TodoLists/TodoList/TodoList'
import { RequestStatus } from '../../../app/app-reducer'

export type TodoList = {
	id: string
	title: string
	addedDate: string
	order: number
}

export type DomainTodoList = TodoList & {
	filter: FilterValuesType
	entityStatus: RequestStatus
}