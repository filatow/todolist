import React from 'react'
import { Task as TaskType } from '../TodoList'
import { TodoList } from '../../../../model/todolists-reducer'
import Task from './Task/Task'
import { List } from '@mui/material'
import { useAppSelector } from '../../../../../../common/hooks/useAppSelector'
import { selectTasks } from '../../../../model/tasksSelectors'


type TasksProps = {
	todoList: TodoList
}

const Tasks = ({ todoList }: TasksProps) => {
	const allTasks = useAppSelector(selectTasks)
	const tasks = allTasks[todoList.id]

	const filterMapping: FilterMapping = {
		active: () => tasks.filter((task) => !task.isDone),
		completed: () => tasks.filter((task) => task.isDone),
		all: () => tasks,
	}

	const filteredTasks = filterMapping[todoList.filter]()

	return tasks.length ?
		<List>
			{
				filteredTasks.map(
					(task) => <Task key={task.id} task={task} todoList={todoList} />,
				)
			}
		</List>
		:
		<div> The list is empty </div>
}

export default Tasks

type FilterMapping = {
	active: () => Array<TaskType>
	completed: () => Array<TaskType>
	all: () => Array<TaskType>
}