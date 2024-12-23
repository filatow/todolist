import React, { useEffect } from 'react'
import { Task } from './Task'
import { List } from '@mui/material'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { selectTasks } from '../../../../model/tasksSelectors'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { fetchTasksTC } from '../../../../model/tasks-reducer'
import { ServerTask } from '../../../../api/tasksApi.types'
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
				{tasks.map((task) => (
					<Task key={task.id} task={task} todoList={todoList} />
				))}
			</List>
		:	<div> The list is empty </div>
}

export default Tasks

type FilterMapping = {
	active: () => Array<ServerTask>
	completed: () => Array<ServerTask>
	all: () => Array<ServerTask>
}
