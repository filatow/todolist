import React, { ChangeEvent } from 'react'
import './TodoList.css'
import { Button } from './Button'
import { AddItemForm } from './AddItemForm'
import { EditableSpan } from './EditableSpan'

export type Task = {
	id: string
	title: string
	isDone: boolean
}

export type FilterValues = 'all' | 'active' | 'completed'

type TodoListProps = {
	todoListID: string
	title: string
	tasks: Array<Task>
	changeTaskStatus: (
		todoListID: string,
		taskId: string,
		newIsDoneValue: boolean,
	) => void
	addTask: (todoListID: string, title: string) => void
	changeTaskTitle: (todoListID: string, taskId: string, title: string) => void
	removeTask: (todoListID: string, taskId: string) => void
	filterValue: FilterValues
	changeFilter: (todoListID: string, filterValue: FilterValues) => void
	changeTodoListTitle: (todoListID: string, title: string) => void
	removeTodoList: (todoListID: string) => void
}

export const TodoList = (props: TodoListProps) => {
	const listItemElements: Array<JSX.Element> = props.tasks.map((task) => {
		const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
			props.changeTaskStatus(
				props.todoListID,
				task.id,
				e.currentTarget.checked,
			)
		const onChangeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
			props.changeTaskTitle(
				props.todoListID,
				task.id,
				e.currentTarget.value,
			)
		}

		return (
			<li key={task.id} className={task.isDone ? 'task_done' : 'task'}>
				<input
					type="checkbox"
					checked={task.isDone}
					onChange={onChangeTaskStatusHandler}
				/>
				<EditableSpan
					onChange={onChangeTaskTitleHandler}
					caption={task.title}
				/>
				<Button
					caption={'x'}
					onClickHandler={() =>
						props.removeTask(props.todoListID, task.id)
					}
				/>
			</li>
		)
	})

	const tasksList: JSX.Element =
		props.tasks.length ?
			<ul> {listItemElements} </ul>
		:	<div> The list is empty </div>

	const onAddTaskHandler = (taskTitle: string) =>
		props.addTask(props.todoListID, taskTitle)

	const onClickRemoveTodoListHandler = () =>
		props.removeTodoList(props.todoListID)

	const onChangeTodoListTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
		props.changeTodoListTitle(props.todoListID, e.currentTarget.value)
	}

	return (
		<div className="todoList">
			<h3>
				<EditableSpan
					caption={props.title}
					onChange={onChangeTodoListTitleHandler}
				/>
				<button onClick={onClickRemoveTodoListHandler}>x</button>
			</h3>
			<AddItemForm addItem={onAddTaskHandler} />
			{tasksList}
			<div>
				<Button
					caption={'All'}
					onClickHandler={() =>
						props.changeFilter(props.todoListID, 'all')
					}
					classes={props.filterValue === 'all' ? 'button_active' : ''}
				/>
				<Button
					caption={'Active'}
					onClickHandler={() =>
						props.changeFilter(props.todoListID, 'active')
					}
					classes={
						props.filterValue === 'active' ? 'button_active' : ''
					}
				/>
				<Button
					caption={'Completed'}
					onClickHandler={() =>
						props.changeFilter(props.todoListID, 'completed')
					}
					classes={
						props.filterValue === 'completed' ? 'button_active' : ''
					}
				/>
			</div>
		</div>
	)
}
