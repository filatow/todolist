import { v1 } from 'uuid'
import { TodoList } from '../App'
import {
	addTodoListAC,
	changeTodoListFilterAC,
	changeTodoListTitleAC,
	removeTodoListAC,
	todoListsReducer,
} from './todolists-reducer'
import { FilterValuesType } from '../TodoListUseRef'

let todolistId1: string
let todolistId2: string
let startState: Array<TodoList>

beforeEach(() => {
	todolistId1 = v1()
	todolistId2 = v1()

	startState = [
		{ id: todolistId1, title: 'What to learn', filter: 'all' },
		{ id: todolistId2, title: 'What to buy', filter: 'all' },
	]
})

test('correct todolist should be removed', () => {

	const endState = todoListsReducer(
		startState,
		removeTodoListAC({ todoListId: todolistId1 }),
	)

	expect(endState.length).toBe(1)
	expect(endState[0].id).toBe(todolistId2)
})


test('correct todolist should be added', () => {
	const newTodoListTitle = 'New TodoList'

	const endState = todoListsReducer(
		startState,
		addTodoListAC({ title: newTodoListTitle }),
	)

	expect(endState.length).toBe(3)
	expect(endState[2].title).toBe(newTodoListTitle)
	expect(endState[2].filter).toBe('all')
})


test('correct todolist should change its name', () => {
	const newTodoListTitle = 'New TodoList Title'

	const endState = todoListsReducer(
		startState,
		changeTodoListTitleAC(
			{ todoListId: todolistId2, title: newTodoListTitle },
		),
	)

	expect(endState[0].title).toBe('What to learn')
	expect(endState[1].title).toBe(newTodoListTitle)
})


test('correct filter of todolist should be changed', () => {
	const newFilter: FilterValuesType = 'completed'

	const action = changeTodoListFilterAC(
		{ todoListId: todolistId2, filterValue: newFilter }
	)

	const endState = todoListsReducer(startState, action)

	expect(endState[0].filter).toBe('all')
	expect(endState[1].filter).toBe('completed')
})
