import React, { ChangeEvent } from 'react'
import {
	changeTaskStatusAC,
	changeTaskTitleAC,
	removeTaskAC
} from '../../../../../model/tasks-reducer'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { TodoList } from '../../../../../model/todolists-reducer'
import { ListItem } from '@mui/material'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { EditableSpan } from 'common/components'

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}
type TaskProps = {
	todoList: TodoList
	task: TaskType
}

export const Task = ({ todoList, task }: TaskProps) => {
	const dispatch = useAppDispatch()
	const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch(
			changeTaskStatusAC({
				todoListId: todoList.id,
				taskId: task.id,
				isDone: e.currentTarget.checked
			})
		)
	}
	const onChangeTaskTitleHandler = (title: string) => {
		dispatch(
			changeTaskTitleAC({
				todoListId: todoList.id,
				taskId: task.id,
				title
			})
		)
	}
	const onClickRemoveTaskHandler = () => {
		dispatch(
			removeTaskAC({
				todoListId: todoList.id,
				taskId: task.id
			})
		)
	}

	return (
		<ListItem key={task.id} className={task.isDone ? 'task_done' : 'task'}>
			<Checkbox color={'primary'} checked={task.isDone} onChange={onChangeTaskStatusHandler} />
			<EditableSpan onChange={onChangeTaskTitleHandler} caption={task.title} />
			<IconButton size={'small'} onClick={onClickRemoveTaskHandler}>
				<DeleteIcon />
			</IconButton>
		</ListItem>
	)
}
