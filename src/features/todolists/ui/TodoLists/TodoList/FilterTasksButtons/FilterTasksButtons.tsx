import React from 'react'
import Button from '@mui/material/Button'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { todoListsApi } from '../../../../api/todolistsApi'
import { DomainTodoList, FilterValue } from '../../../../lib/types/types'

const FilterTasksButtons = ({ todoList }: FilterTasksButtonsProps) => {
	const {filter, id} = todoList
	const dispatch = useAppDispatch()

	const changeFilterTasks = (filter: FilterValue) => {
		dispatch(
			todoListsApi.util.updateQueryData('getTodoLists', undefined, (todoLists: DomainTodoList[]) => {
				const todoList = todoLists.find((tl) => tl.id === id)
				if (todoList) {
					todoList.filter = filter
				}
			})
		)
	}

	const onClickAllHandler = () => changeFilterTasks('all')
	const onClickActiveHandler = () => changeFilterTasks('active')
	const onClickCompletedHandler = () => changeFilterTasks('completed')

	return (
		<div>
			<Button
				onClick={onClickAllHandler}
				variant={filter === 'all' ? 'contained' : 'outlined'}
				color={'inherit'}
			>
				All
			</Button>
			<Button
				onClick={onClickActiveHandler}
				variant={filter === 'active' ? 'contained' : 'outlined'}
				color={'primary'}
			>
				Active
			</Button>
			<Button
				onClick={onClickCompletedHandler}
				variant={filter === 'completed' ? 'contained' : 'outlined'}
				color={'secondary'}
			>
				Completed
			</Button>
		</div>
	)
}

export default FilterTasksButtons

type FilterTasksButtonsProps = {
	todoList: DomainTodoList
}
