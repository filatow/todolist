import React, { ChangeEvent } from 'react'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'

import { ListItem } from '@mui/material'
import { EditableSpan } from 'common/components'
import {
	DomainTask,
	UpdateTaskDomainModel,
	UpdateTaskModel
} from '../../../../../api/tasksApi.types'
import { TaskStatus } from '../../../../../lib/enums/enums'
import { DomainTodoList } from '../../../../../api/todolistsApi.types'
import { useRemoveTaskMutation, useUpdateTaskMutation } from '../../../../../api/tasksApi'

export const Task = ({ todoList, task }: TaskProps) => {
	// const dispatch = useAppDispatch()
	const [removeTask] = useRemoveTaskMutation()
	const [updateTask] = useUpdateTaskMutation()

	const disabled = task.entityStatus === 'loading' || todoList.entityStatus === 'loading'

	const updateTaskWith = (newData: UpdateTaskDomainModel) => {
		const {
			todoListId,
			id: taskId,
			title,
			status,
			deadline,
			description,
			priority,
			startDate
		} = task

		const updateTaskData: UpdateTaskModel = Object.assign(
			{ title, status, deadline, description, priority, startDate },
			newData
		)
		updateTask({ updateTaskData, todoListId, taskId })
	}

	const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
		const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New

		// dispatch(updateTaskTC({ task, domainModel: { status } }))
		updateTaskWith({ status })
	}
	const changeTaskTitle = (title: string) => {
		// dispatch(updateTaskTC({ task, domainModel: { title } }))
		updateTaskWith({ title })
	}

	const removeTaskCallback = () => {
		// dispatch(removeTaskTC({ todoListId: todoList.id, taskId: task.id }))
		removeTask({ todoListId: todoList.id, taskId: task.id })
	}

	return (
		<ListItem key={task.id} className={task.status === TaskStatus.Completed ? 'task_done' : 'task'}>
			<Checkbox
				color={'primary'}
				checked={!!task.status}
				onChange={changeTaskStatus}
				disabled={disabled}
			/>
			<EditableSpan onChange={changeTaskTitle} caption={task.title} disabled={disabled} />
			<IconButton size={'small'} onClick={removeTaskCallback} disabled={disabled}>
				<DeleteIcon />
			</IconButton>
		</ListItem>
	)
}

type TaskProps = {
	todoList: DomainTodoList
	task: DomainTask
}
