import React, { useEffect } from 'react'
import { Task } from './Task'
import { List } from '@mui/material'
import { TasksSkeleton } from '../../../skeletons/TasksSkeleton'

import { DomainTodoList } from '../../../../lib/types/types'
import { TasksPagination } from '../../../TasksPagination/TasksPagination'
import { useAppDispatch } from 'common/hooks'
import { setAppStatus } from '../../../../../../app/appSlice'
import { useTasks } from '../../../../lib/hooks/useTasks'

type TasksProps = {
	todoList: DomainTodoList
}

const Tasks = ({ todoList }: TasksProps) => {
	const dispatch = useAppDispatch()
	const { isFetching, isLoading, filteredTasks, page, setPage, totalCount } = useTasks(todoList)

	useEffect(() => {
		const status = isFetching ? 'loading' : 'idle'
		dispatch(setAppStatus({ status }))
	}, [isFetching])

	if (isLoading) {
		return <TasksSkeleton />
	}

	return filteredTasks.length ?
			<>
				<List>
					{filteredTasks.map((task) => (
						<Task key={task.id} task={task} todoList={todoList} />
					))}
				</List>
				<TasksPagination totalCount={totalCount || 0} page={page} setPage={setPage} />
			</>
		:	<div> The list is empty </div>
}

export default Tasks
