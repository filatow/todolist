import { FilterValuesType } from '../ui/TodoLists/TodoList/TodoList'

export type TodoList = {
	id: string
	title: string
	addedDate: string
	order: number
}

export type DomainTodoList = TodoList & {
	filter: FilterValuesType
}