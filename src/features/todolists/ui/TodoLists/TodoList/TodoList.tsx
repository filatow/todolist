import React from 'react'
import { AddItemForm } from 'common/components'
import TodoListTitle from './TodoListTitle/TodoListTitle'
import Tasks from './Tasks/Tasks'
import { createTaskTC } from '../../../model/tasks-reducer'
import FilterTasksButtons from './FilterTasksButtons/FilterTasksButtons'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { DomainTodoList } from '../../../api/todolistsApi.types'

export const TodoList = ({ todoList }: TodoListProps) => {
	const dispatch = useAppDispatch()

	const onAddTaskHandler = (taskTitle: string) => {
		dispatch(createTaskTC({ todoListId: todoList.id, title: taskTitle }))
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
