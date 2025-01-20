import React, { useEffect } from 'react'
import { Task } from './Task'
import { List } from '@mui/material'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { fetchTasksTC, selectTasks } from '../../../../model/tasksSlice'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { DomainTask } from '../../../../api/tasksApi.types'
import { TaskStatus } from '../../../../lib/enums/enums'
import { DomainTodoList } from '../../../../api/todolistsApi.types'

type TasksProps = {
	todoList: DomainTodoList
}

const Tasks = ({ todoList }: TasksProps) => {
	const allTasks = useAppSelector(selectTasks)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchTasksTC(todoList.id))
	}, [])

	const tasks = allTasks[todoList.id]

	const filterMapping: FilterMapping = {
		active: () => tasks.filter((task) => task.status === TaskStatus.New),
		completed: () => tasks.filter((task) => task.status === TaskStatus.Completed),
		all: () => tasks
	}
	const filteredTasks = tasks ? filterMapping[todoList.filter]() : []

	return filteredTasks.length ?
			<List>
				{filteredTasks.map((task) => (
					<Task key={task.id} task={task} todoList={todoList} />
				))}
			</List>
		:	<div> The list is empty </div>
}

export default Tasks

type FilterMapping = {
	active: () => Array<DomainTask>
	completed: () => Array<DomainTask>
	all: () => Array<DomainTask>
}
