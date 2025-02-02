import { useState } from 'react'
import { useGetTasksQuery } from '../../api/tasksApi'
import { TaskStatus } from '../enums/enums'
import { DomainTodoList, FilterValue } from '../types/types'
import { DomainTask } from '../../api/tasksApi.types'

export const useTasks = (todoList: DomainTodoList) => {
	const [page, setPage] = useState(1)

	const { data, isLoading, isFetching } = useGetTasksQuery({
		todoListId: todoList.id,
		args: { page: page }
	})

	const tasks = data?.items || []

	const filterMapping: FilterMapping = {
		active: (tasks) => tasks.filter((task) => task.status === TaskStatus.New),
		completed: (tasks) => tasks.filter((task) => task.status === TaskStatus.Completed),
		all: (tasks) => tasks
	}
	const filteredTasks = filterMapping[todoList.filter](tasks)

	return { isFetching, isLoading, filteredTasks, page, setPage, totalCount: data?.totalCount }
}

type FilterMethod = (tasks: DomainTask[]) => DomainTask[]
type FilterMapping = Record<FilterValue, FilterMethod>
