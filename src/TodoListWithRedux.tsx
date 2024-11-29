import React, { ChangeEvent } from 'react'
import './TodoList.css'
import { FilterValueType } from './App'
import { AddItemForm } from './AddItemForm'
import { EditableSpan } from './EditableSpan'
import { Button, Checkbox, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './state/store';
import {
	addTaskActionCreator,
	changeTaskStatusActionCreator,
	changeTaskTitleActionCreator,
	removeTaskActionCreator
} from './state/tasks-reducer';
import {v1} from 'uuid';

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

type PropsType = {
	id: string
	title: string
	filterValue: FilterValueType
	changeFilter: (todolistId: string, value: FilterValueType) => void
	removeTodoList: (todoListId: string) => void
	renameTotoList: (todoListId: string, newTitle: string) => void
}

export const TodoListWithRedux = ({
	id,
	title,
	filterValue,
	changeFilter,
	removeTodoList,
	renameTotoList,
}: PropsType) => {
	const tasks = useSelector<AppRootState, TaskType[]>(state => {
		let tasksToShow = state.tasks[id]
		if (filterValue === 'active') {
			tasksToShow = tasksToShow.filter(
				(t) => !t.isDone,
			)
		}
		if (filterValue === 'completed') {
			tasksToShow = tasksToShow.filter(
				(t) => t.isDone,
			)
		}
		return tasksToShow
	})
	const dispatch = useDispatch()

	const listItemElements: Array<JSX.Element> = tasks.map((task) => {
		const onRemoveTaskHandler = () => {
			const action = removeTaskActionCreator(id, task.id)
			dispatch(action)
		}
		const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
			const action = changeTaskStatusActionCreator(id, task.id, e.currentTarget.checked)
			dispatch(action)
		}
		const onChangeTaskTitleHandler = (newValue: string) => {
			const action = changeTaskTitleActionCreator(id, task.id, newValue)
			dispatch(action)
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

	const addTask = (title: string) => {
		const action = addTaskActionCreator(id, v1(), title)
		dispatch(action)
	}

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
			<AddItemForm addItem={addTask} />
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