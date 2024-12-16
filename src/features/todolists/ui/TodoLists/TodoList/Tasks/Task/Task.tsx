import React, { ChangeEvent } from 'react'
import { removeTaskTC, updateTaskTC } from '../../../../../model/tasks-reducer'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'

import { ListItem } from '@mui/material'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { EditableSpan } from 'common/components'
import { DomainTask } from '../../../../../api/tasksApi.types'
import { TaskStatus } from '../../../../../lib/enums/enums'
import { DomainTodoList } from '../../../../../api/todolistsApi.types'

export const Task = ({ todoList, task }: TaskProps) => {
	const dispatch = useAppDispatch()
	const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
		const status = e.currentTarget.checked
			? TaskStatus.Completed
			: TaskStatus.New

		dispatch(
			updateTaskTC({ task, domainModel: { status } })
		)
	}
	const changeTaskTitle = (title: string) => {
		dispatch(
			updateTaskTC({ task, domainModel: { title } })
		)
	}
	const removeTask = () => {
		dispatch(
			removeTaskTC({ todoListId: todoList.id, taskId: task.id })
		)
	}

	return (
		<ListItem key={task.id} className={task.status === TaskStatus.Completed ? 'task_done' : 'task'}>
			<Checkbox color={'primary'} checked={!!task.status} onChange={changeTaskStatus} />
			<EditableSpan onChange={changeTaskTitle} caption={task.title} />
			<IconButton size={'small'} onClick={removeTask}>
				<DeleteIcon />
			</IconButton>
		</ListItem>
	)
}


type TaskProps = {
	todoList: DomainTodoList
	task: DomainTask
}