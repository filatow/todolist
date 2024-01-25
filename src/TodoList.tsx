import React, { ChangeEvent } from 'react'
import './TodoList.css'
import { FilterValueType } from './App'
import { AddItemForm } from './AddItemForm'
import { EditableSpan } from './EditableSpan'
import { Button, Checkbox, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

type PropsType = {
	id: string
	title: string
	tasks: Array<TaskType>
	removeTask: (todolistId: string, taskId: string) => void
	filterValue: FilterValueType
	changeFilter: (todolistId: string, value: FilterValueType) => void
	addTask: (todolistId: string, title: string) => void
	changeTaskStatus: (
		todoListId: string,
		taskId: string,
		isDone: boolean,
	) => void
	changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
	removeTodoList: (todoListId: string) => void
	renameTotoList: (todoListId: string, newTitle: string) => void
}

export const TodoList = ({
	id,
	title,
	tasks,
	removeTask,
	filterValue,
	changeFilter,
	addTask,
	changeTaskStatus,
	changeTaskTitle,
	removeTodoList,
	renameTotoList,
}: PropsType) => {
	const listItemElements: Array<JSX.Element> = tasks.map((task) => {
		const onRemoveTaskHandler = () => removeTask(id, task.id)
		const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
			changeTaskStatus(id, task.id, e.currentTarget.checked)
		const onChangeTaskTitleHandler = (newValue: string) => {
			changeTaskTitle(id, task.id, newValue)
		}

		return (
			<div key={task.id} className={task.isDone ? 'is-done' : ''}>
				<Checkbox
					checked={task.isDone}
					onChange={onChangeTaskStatusHandler}
				/>
				<EditableSpan
					title={task.title}
					onChange={onChangeTaskTitleHandler}
				/>
				<IconButton size="small" onClick={onRemoveTaskHandler}>
					<Delete fontSize="inherit" />
				</IconButton>
			</div>
		)
	})

	const addItem = (title: string) => addTask(id, title)

	const onAllClickHandler = () => changeFilter(id, 'all')
	const onActiveClickHandler = () => changeFilter(id, 'active')
	const onCompletedClickHandler = () => changeFilter(id, 'completed')

	const onRemoveTodoListClickHandler = () => removeTodoList(id)
	const onChangeTodoListTitleHandler = (newTitle: string) => {
		renameTotoList(id, newTitle)
	}

	return (
		<div className="todoList">
			<h3>
				<EditableSpan
					title={title}
					onChange={onChangeTodoListTitleHandler}
				/>
				<IconButton
					size="medium"
					onClick={onRemoveTodoListClickHandler}
				>
					<Delete fontSize="inherit" />
				</IconButton>
			</h3>
			<AddItemForm addItem={addItem} />
			{listItemElements}
			<div>
				<Button
					onClick={onAllClickHandler}
					variant={filterValue === 'all' ? 'contained' : 'outlined'}
					color="success"
				>
					All
				</Button>
				<Button
					onClick={onActiveClickHandler}
					variant={
						filterValue === 'active' ? 'contained' : 'outlined'
					}
					color="secondary"
				>
					Active
				</Button>
				<Button
					onClick={onCompletedClickHandler}
					variant={
						filterValue === 'completed' ? 'contained' : 'outlined'
					}
					color="info"
				>
					Completed
				</Button>
			</div>
		</div>
	)
}
