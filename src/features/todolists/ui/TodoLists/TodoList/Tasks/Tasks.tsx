import React, { useEffect, useState } from 'react'
import { Task } from './Task'
import { List } from '@mui/material'
import { DomainTask } from '../../../../api/tasksApi.types'
import { TaskStatus } from '../../../../lib/enums/enums'
import { useGetTasksQuery } from '../../../../api/tasksApi'
import { TasksSkeleton } from '../../../skeletons/TasksSkeleton'

import { DomainTodoList, FilterValue } from '../../../../lib/types/types'
import { TasksPagination } from '../../../TasksPagination/TasksPagination'
import { useAppDispatch } from 'common/hooks'
import { setAppStatus } from '../../../../../../app/appSlice'

type TasksProps = {
	todoList: DomainTodoList
}

const Tasks = ({ todoList }: TasksProps) => {
	const [page, setPage] = useState(1)
	const dispatch = useAppDispatch()
	const { data, isLoading, isFetching, isError, error } = useGetTasksQuery({
		todoListId: todoList.id,
		args: { page: page }
	})

	useEffect(() => {
		if (isError) console.log('isError', error)
	}, [isError])

	useEffect(() => {
		const status = isFetching ? 'loading' : 'idle'
		dispatch(setAppStatus({ status }))
	}, [isFetching])

	if (isLoading) {
		return <TasksSkeleton />
	}

	const tasks = data?.items || []

	const filterMapping: FilterMapping = {
		active: (tasks) => tasks.filter((task) => task.status === TaskStatus.New),
		completed: (tasks) => tasks.filter((task) => task.status === TaskStatus.Completed),
		all: (tasks) => tasks
	}
	const filteredTasks = filterMapping[todoList.filter](tasks)

	return filteredTasks.length ?
			<>
				<List>
					{filteredTasks.map((task) => (
						<Task key={task.id} task={task} todoList={todoList} />
					))}
				</List>
				<TasksPagination totalCount={data?.totalCount || 0} page={page} setPage={setPage} />
			</>
		:	<div> The list is empty </div>
}

export default Tasks

type FilterMethod = (tasks: DomainTask[]) => DomainTask[]
type FilterMapping = Record<FilterValue, FilterMethod>
