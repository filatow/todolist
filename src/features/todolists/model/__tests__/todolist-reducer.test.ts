import { v1 } from 'uuid'
import {
	changeTodoListFilter,
	createTodoList,
	removeTodoList,
	todoListsReducer,
	updateTodoListTitle
} from '../todolistsSlice'
import { FilterValuesType } from '../../ui/TodoLists/TodoList/TodoList'
import { DomainTodoList } from '../../api/todolistsApi.types'

let todolistId1: string
let todolistId2: string
let startState: Array<DomainTodoList>

beforeEach(() => {
	todolistId1 = v1()
	todolistId2 = v1()

	startState = [
		{
			id: todolistId1,
			title: 'What to learn',
			filter: 'all',
			entityStatus: 'idle',
			order: 10,
			addedDate: ''
		},
		{
			id: todolistId2,
			title: 'What to buy',
			filter: 'all',
			entityStatus: 'idle',
			order: 10,
			addedDate: ''
		}
	]
})

test('correct todolist should be removed', () => {
	const endState = todoListsReducer(startState, removeTodoList({ todoListId: todolistId1 }))

	expect(endState.length).toBe(1)
	expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
	const newTodoListTitle = 'New TodoList'

	const endState = todoListsReducer(
		startState,
		createTodoList({
			todoList: {
				addedDate: '2024-12-15T23:47:43.1138498Z',
				id: 'd3e45f35-faf2-446e-b55c-d632f446a52e',
				order: -6,
				title: newTodoListTitle
			}
		})
	)

	expect(endState.length).toBe(3)
	expect(endState[0].title).toBe(newTodoListTitle)
	expect(endState[0].filter).toBe('all')
})

test('correct todolist should change its name', () => {
	const newTodoListTitle = 'New TodoList Title'

	const endState = todoListsReducer(
		startState,
		updateTodoListTitle({ todoListId: todolistId2, title: newTodoListTitle })
	)

	expect(endState[0].title).toBe('What to learn')
	expect(endState[1].title).toBe(newTodoListTitle)
})

test('correct filter of todolist should be changed', () => {
	const newFilter: FilterValuesType = 'completed'

	const action = changeTodoListFilter({ todoListId: todolistId2, filterValue: newFilter })

	const endState = todoListsReducer(startState, action)

	expect(endState[0].filter).toBe('all')
	expect(endState[1].filter).toBe('completed')
})
