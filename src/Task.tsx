import { useDispatch } from 'react-redux'
import {
	changeTaskStatusActionCreator,
	changeTaskTitleActionCreator,
	removeTaskActionCreator,
} from './state/tasks-reducer'
import React, { ChangeEvent, useCallback } from 'react'
import { Checkbox, IconButton } from '@mui/material'
import { EditableSpan } from './EditableSpan'
import { Delete } from '@mui/icons-material'
import { TaskType } from './TodoListWithRedux'

type TaskProps = {
	todoListId: string
	task: TaskType
}
export const Task = React.memo(({ todoListId, task }: TaskProps) => {
	const dispatch = useDispatch()

	const onRemoveTaskHandler = () => {
		const action = removeTaskActionCreator(todoListId, task.id)
		dispatch(action)
	}
	const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const action = changeTaskStatusActionCreator(
			todoListId,
			task.id,
			e.currentTarget.checked,
		)
		dispatch(action)
	}
	const onChangeTaskTitleHandler = useCallback(
		(newValue: string) => {
			const action = changeTaskTitleActionCreator(
				todoListId,
				task.id,
				newValue,
			)
			dispatch(action)
		},
		[dispatch, todoListId, task.id],
	)

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
