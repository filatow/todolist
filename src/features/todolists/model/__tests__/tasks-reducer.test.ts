import {
	createTaskAC,
	removeTaskAC,
	tasksReducer,
	TasksState,
	updateTaskAC
} from '../tasks-reducer'
import { createTodoListAC, removeTodoListAC } from '../todolists-reducer'
import { TaskStatus } from '../../lib/enums/enums'

let startState: TasksState

beforeEach(() => {
	startState = {
		todolistId1: [
			{
				addedDate: '2024-12-15T18:49:24.503',
				deadline: null,
				description: null,
				id: 'fb8233e4-2cf7-4eaf-8f2a-56778f5847dd',
				order: -12,
				priority: 1,
				startDate: null,
				status: 0,
				title: 'task #1',
				todoListId: 'todolistId1',
				entityStatus: 'idle'
			},
			{
				addedDate: '2024-12-15T18:50:25.503',
				deadline: null,
				description: null,
				id: 'fb8233e4-2cf7-4eaf-8f2a-30491f5847dd',
				order: -12,
				priority: 1,
				startDate: null,
				status: 0,
				title: 'task #2',
				todoListId: 'todolistId1',
				entityStatus: 'idle'
			},
			{
				addedDate: '2024-12-15T20:49:24.503',
				deadline: null,
				description: null,
				id: 'fb8233e4-2cf7-4eaf-8f2a-23076f5847dd',
				order: -12,
				priority: 1,
				startDate: null,
				status: 0,
				title: 'task #3',
				todoListId: 'todolistId1',
				entityStatus: 'idle'
			}
		],
		todolistId2: [
			{
				addedDate: '2024-12-15T21:21:24.503',
				deadline: null,
				description: null,
				id: 'fb8233e4-2cf7-4eaf-8f2a-44992f5847dd',
				order: -12,
				priority: 1,
				startDate: null,
				status: 0,
				title: '001',
				todoListId: 'todolistId2',
				entityStatus: 'idle'
			},
			{
				addedDate: '2024-12-15T15:20:25.503',
				deadline: null,
				description: null,
				id: 'fb8233e4-2cf7-4eaf-8f2a-98741f5847dd',
				order: -12,
				priority: 1,
				startDate: null,
				status: 0,
				title: '002',
				todoListId: 'todolistId2',
				entityStatus: 'idle'
			},
			{
				addedDate: '2024-12-15T1:32:13.503',
				deadline: null,
				description: null,
				id: 'fb8233e4-2cf7-4eaf-8f2a-69247f5847dd',
				order: -12,
				priority: 1,
				startDate: null,
				status: 0,
				title: '003',
				todoListId: 'todolistId2',
				entityStatus: 'idle'
			}
		]
	}
})

test('correct task should be deleted from correct todoList', () => {
	const endState = tasksReducer(
		startState,
		removeTaskAC({
			todoListId: 'todolistId2',
			taskId: 'fb8233e4-2cf7-4eaf-8f2a-69247f5847dd'
		})
	)

	expect(endState).toEqual({
		todolistId1: [
			{
				addedDate: '2024-12-15T18:49:24.503',
				deadline: null,
				description: null,
				id: 'fb8233e4-2cf7-4eaf-8f2a-56778f5847dd',
				order: -12,
				priority: 1,
				startDate: null,
				status: 0,
				title: 'task #1',
				todoListId: 'todolistId1'
			},
			{
				addedDate: '2024-12-15T18:50:25.503',
				deadline: null,
				description: null,
				id: 'fb8233e4-2cf7-4eaf-8f2a-30491f5847dd',
				order: -12,
				priority: 1,
				startDate: null,
				status: 0,
				title: 'task #2',
				todoListId: 'todolistId1'
			},
			{
				addedDate: '2024-12-15T20:49:24.503',
				deadline: null,
				description: null,
				id: 'fb8233e4-2cf7-4eaf-8f2a-23076f5847dd',
				order: -12,
				priority: 1,
				startDate: null,
				status: 0,
				title: 'task #3',
				todoListId: 'todolistId1'
			}
		],
		todolistId2: [
			{
				addedDate: '2024-12-15T21:21:24.503',
				deadline: null,
				description: null,
				id: 'fb8233e4-2cf7-4eaf-8f2a-44992f5847dd',
				order: -12,
				priority: 1,
				startDate: null,
				status: 0,
				title: '001',
				todoListId: 'todolistId2'
			},
			{
				addedDate: '2024-12-15T15:20:25.503',
				deadline: null,
				description: null,
				id: 'fb8233e4-2cf7-4eaf-8f2a-98741f5847dd',
				order: -12,
				priority: 1,
				startDate: null,
				status: 0,
				title: '002',
				todoListId: 'todolistId2'
			}
		]
	})
})

test('correct task should be added to correct array', () => {
	const endState = tasksReducer(
		startState,
		createTaskAC({
			task: {
				addedDate: '2024-12-15T18:22:37.6611741Z',
				deadline: null,
				description: null,
				id: '83d2d965-90a2-457f-bc81-91848851cc9d',
				order: -4,
				priority: 1,
				startDate: null,
				status: 0,
				title: 'juice',
				todoListId: 'todolistId1',
				entityStatus: 'idle'
			}
		})
	)

	expect(endState['todolistId1'].length).toBe(4)
	expect(endState['todolistId2'].length).toBe(3)
	expect(endState['todolistId1'][0].id).toBeDefined()
	expect(endState['todolistId1'][0].title).toBe('juice')
	expect(endState['todolistId1'][0].status).toBe(TaskStatus.New)
	expect(endState['todolistId1'][0].id).toBe('83d2d965-90a2-457f-bc81-91848851cc9d')
})

test('status of specified task should be changed', () => {
	const endState = tasksReducer(
		startState,
		updateTaskAC({
			updatedTask: {
				addedDate: '2024-12-15T18:50:25.503',
				deadline: null,
				description: null,
				id: 'fb8233e4-2cf7-4eaf-8f2a-30491f5847dd',
				order: -12,
				priority: 1,
				startDate: null,
				status: 2,
				title: 'task #2',
				todoListId: 'todolistId1',
				entityStatus: 'idle'
			}
		})
	)

	expect(endState['todolistId2'][1].status).toBe(TaskStatus.New)
	expect(endState['todolistId1'][1].status).toBe(TaskStatus.Completed)
})

test('title of specified task should be changed', () => {
	const newTitle = 'juice'

	const endState = tasksReducer(
		startState,
		updateTaskAC({
			updatedTask: {
				addedDate: '2024-12-15T21:21:24.503',
				deadline: null,
				description: null,
				id: 'fb8233e4-2cf7-4eaf-8f2a-44992f5847dd',
				order: -12,
				priority: 1,
				startDate: null,
				status: 0,
				title: newTitle,
				todoListId: 'todolistId2',
				entityStatus: 'idle'
			}
		})
	)

	expect(endState['todolistId2'][0].title).toBe(newTitle)
	expect(endState['todolistId1'][0].title).not.toBe(newTitle)
})

test('new array should be added when new todolist is added', () => {
	const endState = tasksReducer(
		startState,
		createTodoListAC({
			todoList: {
				addedDate: '2024-12-15T23:47:43.1138498Z',
				id: 'd3e45f35-faf2-446e-b55c-d632f446a52e',
				order: -6,
				title: 'Brand new Todolist'
			}
		})
	)

	const keys = Object.keys(endState)
	const newKey = keys.find((k) => k !== 'todolistId1' && k !== 'todolistId2')
	if (!newKey) {
		throw Error('new key should be added')
	}

	expect(keys.length).toBe(3)
	expect(endState[newKey]).toEqual([])
})

test('todolist with the specified todoListId should be deleted', () => {
	const action = removeTodoListAC({ todoListId: 'todolistId2' })
	const endState = tasksReducer(startState, action)

	const keys = Object.keys(endState)
	expect(keys.length).toBe(1)
	expect(endState['todolistId2']).not.toBeDefined()
	// or
	expect(endState['todolistId2']).toBeUndefined()
})
