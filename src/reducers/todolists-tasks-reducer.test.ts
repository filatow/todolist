import { TasksState, TodoList } from '../app/App'
import { addTodoListAC, todoListsReducer } from './todolists-reducer'
import { tasksReducer } from './tasks-reducer'

test('ids should be equals', () => {
	const startTasksState: TasksState = {}
	const startTodoListsState: TodoList[] = []

	const action = addTodoListAC({title: 'new todolist'})

	const endTasksState = tasksReducer(startTasksState, action)
	const endTodoListsState = todoListsReducer(startTodoListsState, action)

	const keys = Object.keys(endTasksState)
	const idFromTasks = keys[0]
	const idFromTodoLists = endTodoListsState[0].id

	expect(idFromTasks).toBe(action.payload.todoListId)
	expect(idFromTodoLists).toBe(action.payload.todoListId)
})