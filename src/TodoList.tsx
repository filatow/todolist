import React, { ChangeEvent } from 'react'
import './TodoList.css'
// import { Button } from './Button'
import { AddItemForm } from './AddItemForm'
import { EditableSpan } from './EditableSpan'
import {Checkbox, IconButton} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button';


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
		const onClickRemoveTaskHandler = () =>
			props.removeTask(props.todoListID, task.id)

		return (
			<div key={task.id} className={task.isDone ? 'task_done' : 'task'}>
				<Checkbox
					color={'primary'}
					checked={task.isDone}
					onChange={onChangeTaskStatusHandler}
				/>
				<EditableSpan
					onChange={onChangeTaskTitleHandler}
					caption={task.title}
				/>
				<IconButton size={'small'} onClick={onClickRemoveTaskHandler}>
					<DeleteIcon />
				</IconButton>
			</div>
		)
	})

	const tasksList: JSX.Element =
		props.tasks.length ?
			<div> {listItemElements} </div>
		:	<div> The list is empty </div>

	const onAddTaskHandler = (taskTitle: string) =>
		props.addTask(props.todoListID, taskTitle)

	const onClickRemoveTodoListHandler = () =>
		props.removeTodoList(props.todoListID)

	const onChangeTodoListTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
		props.changeTodoListTitle(props.todoListID, e.currentTarget.value)
	}

	const onClickAllHandler = () =>
		props.changeFilter(props.todoListID, 'all')

	const onClickActiveHandler = () =>
		props.changeFilter(props.todoListID, 'active')

	const onClickCompletedHandler = () =>
		props.changeFilter(props.todoListID, 'completed')

	return (
		<div className="todoList">
			<h3>
				<EditableSpan
					caption={props.title}
					onChange={onChangeTodoListTitleHandler}
				/>
				<IconButton onClick={onClickRemoveTodoListHandler}>
					<DeleteIcon />
				</IconButton>
			</h3>
			<AddItemForm addItem={onAddTaskHandler} />
			{tasksList}
			<div>
				<Button
					onClick={onClickAllHandler}
					variant={props.filterValue === 'all' ? 'contained' : 'outlined'}
					color={'inherit'}
				>All</Button>
				<Button
					onClick={onClickActiveHandler}
					variant={props.filterValue === 'active' ? 'contained' : 'outlined'}
					color={'primary'}
				>Active</Button>
				<Button
					onClick={onClickCompletedHandler}
					variant={props.filterValue === 'completed' ? 'contained' : 'outlined'}
					color={'secondary'}
				>Completed</Button>
			</div>
		</div>
	)
}
