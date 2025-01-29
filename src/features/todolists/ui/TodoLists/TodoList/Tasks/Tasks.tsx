import React from 'react'
import { Task } from './Task'
import { List } from '@mui/material'
import { DomainTask } from '../../../../api/tasksApi.types'
import { TaskStatus } from '../../../../lib/enums/enums'
import { DomainTodoList } from '../../../../api/todolistsApi.types'
import { useGetTasksQuery } from '../../../../api/tasksApi'
import { TasksSkeleton } from '../../../skeletons/TasksSkeleton'
import { FilterValue } from '../TodoList'

type TasksProps = {
	todoList: DomainTodoList
}

const Tasks = ({ todoList }: TasksProps) => {
	const { data: tasks = [], isLoading  } = useGetTasksQuery(todoList.id)

	if (isLoading) {
		return <TasksSkeleton />
	}

	const filterMapping: FilterMapping = {
		active: (tasks) => tasks.filter((task) => task.status === TaskStatus.New),
		completed: (tasks) => tasks.filter((task) => task.status === TaskStatus.Completed),
		all: (tasks) => tasks
	}
	const filteredTasks = filterMapping[todoList.filter](tasks)

	return filteredTasks.length ?
			<List>
				{filteredTasks.map((task) => (
					<Task key={task.id} task={task} todoList={todoList} />
				))}
			</List>
		:	<div> The list is empty </div>
}

export default Tasks

type FilterMethod = (tasks: DomainTask[]) => DomainTask[]
type FilterMapping = Record<FilterValue, FilterMethod>