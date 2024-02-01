import {
	AddTodoListAC,
	ChangeTodoListFilterAC,
	ChangeTodoListTitleAC,
	RemoveTodoListAC,
	todoListsReducer,
} from './todolists-reducer'
import { v1 } from 'uuid'
import { FilterValueType, TodolistType } from '../App'

test('correct todolist should be removed', () => {
	const todolistId1 = v1()
	const todolistId2 = v1()

	const startState: Array<TodolistType> = [
		{ id: todolistId1, title: 'What to learn', filter: 'all' },
		{ id: todolistId2, title: 'What to buy', filter: 'all' },
	]

	const endState = todoListsReducer(startState, RemoveTodoListAC(todolistId1))

	expect(endState.length).toBe(1)
	expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
	const todolistId1 = v1()
	const todolistId2 = v1()

	const newTodoListTitle = 'New TodoList'

	const startState: Array<TodolistType> = [
		{ id: todolistId1, title: 'What to learn', filter: 'all' },
		{ id: todolistId2, title: 'What to buy', filter: 'all' },
	]

	const endState = todoListsReducer(
		startState,
		AddTodoListAC(newTodoListTitle),
	)

	expect(endState.length).toBe(3)
	expect(endState[2].title).toBe(newTodoListTitle)
	expect(endState[2].filter).toBe('all')
})

test('correct todolist should change its name', () => {
	const todolistId1 = v1()
	const todolistId2 = v1()

	const changedTodoListTitle = 'Changed TodoList Title'

	const startState: Array<TodolistType> = [
		{ id: todolistId1, title: 'What to learn', filter: 'all' },
		{ id: todolistId2, title: 'What to buy', filter: 'all' },
	]
	const action = ChangeTodoListTitleAC(todolistId2, changedTodoListTitle)

	const endState = todoListsReducer(
		startState,
		action,
	)

	expect(endState[0].title).toBe('What to learn')
	expect(endState[1].title).toBe(changedTodoListTitle)
})

test('correct filter of todolist should be changed', () => {
	const todolistId1 = v1()
	const todolistId2 = v1()

	const newFilter: FilterValueType = 'completed'

	const startState: Array<TodolistType> = [
		{ id: todolistId1, title: 'What to learn', filter: 'all' },
		{ id: todolistId2, title: 'What to buy', filter: 'all' },
	]

	const action = ChangeTodoListFilterAC(todolistId2, newFilter)

	const endState = todoListsReducer(startState, action)

	expect(endState[0].filter).toBe('all')
	expect(endState[1].filter).toBe('completed')
})
