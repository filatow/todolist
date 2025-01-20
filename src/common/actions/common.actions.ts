import { createAction } from '@reduxjs/toolkit'
import { TasksState } from '../../features/todolists/model/tasksSlice'
import { DomainTodoList } from '../../features/todolists/api/todolistsApi.types'

export type ClearTasksAndTodoLists = {
	tasks: TasksState
	todoLists: DomainTodoList[]
}

export const clearTasksAndTodoLists = createAction<ClearTasksAndTodoLists>(
	'common/clear-tasks-and-todolists'
)