import React, { useCallback } from 'react'
import './TodoList.css'
import { FilterValueType } from './App'
import { AddItemForm } from './AddItemForm'
import { EditableSpan } from './EditableSpan'
import { Button, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { AppRootState } from './state/store'
import { addTaskActionCreator } from './state/tasks-reducer'
import { v1 } from 'uuid'
import { Task } from './Task'

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

export const TodoListWithRedux = React.memo(
	({
		id,
		title,
		filterValue,
		changeFilter,
		removeTodoList,
		renameTotoList,
	}: PropsType) => {
		console.log('TodoListWithRedux')
		const tasks = useSelector<AppRootState, TaskType[]>(
			(state) => state.tasks[id],
		)
		const dispatch = useDispatch()

		let tasksToShow = tasks
		if (filterValue === 'active') {
			tasksToShow = tasksToShow.filter((t) => !t.isDone)
		}
		if (filterValue === 'completed') {
			tasksToShow = tasksToShow.filter((t) => t.isDone)
		}

		const addTask = useCallback(
			(title: string) => {
				const action = addTaskActionCreator(id, v1(), title)
				dispatch(action)
			},
			[dispatch, id],
		)

		const onAllClickHandler = useCallback(
			() => changeFilter(id, 'all'),
			[changeFilter, id],
		)
		const onActiveClickHandler = useCallback(
			() => changeFilter(id, 'active'),
			[changeFilter, id],
		)
		const onCompletedClickHandler = useCallback(
			() => changeFilter(id, 'completed'),
			[changeFilter, id],
		)

		const onRemoveTodoListClickHandler = useCallback(
			() => removeTodoList(id),
			[removeTodoList, id],
		)
		const onChangeTodoListTitleHandler = useCallback(
			(newTitle: string) => {
				renameTotoList(id, newTitle)
			},
			[renameTotoList, id],
		)

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
				{tasksToShow.map((task) => (
					<Task key={task.id} todoListId={id} task={task} />
				))}
				<div>
					<Button
						onClick={onAllClickHandler}
						variant={
							filterValue === 'all' ? 'contained' : 'outlined'
						}
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
							filterValue === 'completed' ? 'contained' : (
								'outlined'
							)
						}
						color="info"
					>
						Completed
					</Button>
				</div>
			</div>
		)
	},
)
