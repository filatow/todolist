import { tasksReducer, TasksState } from '../tasksSlice'
import { createTodoList, todoListsReducer } from '../todolistsSlice'
import { DomainTodoList } from '../../api/todolistsApi.types'

test('ids should be equals', () => {
	const startTasksState: TasksState = {}
	const startTodoListsState: DomainTodoList[] = []

	const action = createTodoList({
		todoList: {
			addedDate: '2024-12-15T23:47:43.1138498Z',
			id: 'd3e45f35-faf2-446e-b55c-d632f446a52e',
			order: -6,
			title: 'Todolist title'
		}
	})

	const endTasksState = tasksReducer(startTasksState, action)
	const endTodoListsState = todoListsReducer(startTodoListsState, action)

	const keys = Object.keys(endTasksState)
	const idFromTasks = keys[0]
	const idFromTodoLists = endTodoListsState[0].id

	expect(idFromTasks).toBe(action.payload.todoList.id)
	expect(idFromTodoLists).toBe(action.payload.todoList.id)
})
