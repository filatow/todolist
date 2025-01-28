import React from 'react'
import { AddItemForm } from 'common/components'
import TodoListTitle from './TodoListTitle/TodoListTitle'
import Tasks from './Tasks/Tasks'
import FilterTasksButtons from './FilterTasksButtons/FilterTasksButtons'
import { DomainTodoList } from '../../../api/todolistsApi.types'
import { useCreateTaskMutation } from '../../../api/tasksApi'

export const TodoList = ({ todoList }: TodoListProps) => {
	// const dispatch = useAppDispatch()
	const [createTask] = useCreateTaskMutation()

	const onAddTaskHandler = (taskTitle: string) => {
		// dispatch(createTaskTC({ todoListId: todoList.id, title: taskTitle }))
		createTask({ todoListId: todoList.id, title: taskTitle })
	}

	return (
		<div className="todoList">
			<TodoListTitle todoList={todoList} title={todoList.title} />
			<AddItemForm addItem={onAddTaskHandler} disabled={todoList.entityStatus === 'loading'} />
			<Tasks todoList={todoList} />
			<FilterTasksButtons todoList={todoList} />
		</div>
	)
}

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodoListProps = {
	todoList: DomainTodoList
}
