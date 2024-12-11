import React from 'react'
import { AddItemForm } from 'common/components'
import TodoListTitle from './TodoListTitle/TodoListTitle'
import Tasks from './Tasks/Tasks'
import { addTaskAC } from '../../../model/tasks-reducer'
import { TodoList as TodoListType } from '../../../model/todolists-reducer'
import FilterTasksButtons from './FilterTasksButtons/FilterTasksButtons'
import { useAppDispatch } from 'common/hooks/useAppDispatch'

export const TodoList = ({ todoList }: TodoListProps) => {
	console.log('TodoList')
	const dispatch = useAppDispatch()

	const onAddTaskHandler = (taskTitle: string) => {
		dispatch(addTaskAC({ todoListId: todoList.id, title: taskTitle }))
	}

	return (
		<div className="todoList">
			<TodoListTitle todoList={todoList} title={todoList.title} />
			<AddItemForm addItem={onAddTaskHandler} />
			<Tasks todoList={todoList} />
			<FilterTasksButtons todoList={todoList} />
		</div>
	)
}

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodoListProps = {
	todoList: TodoListType
}
