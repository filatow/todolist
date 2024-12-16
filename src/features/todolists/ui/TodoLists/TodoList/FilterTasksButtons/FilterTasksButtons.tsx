import React from 'react'
import Button from '@mui/material/Button'
import { changeTodoListFilterAC } from '../../../../model/todolists-reducer'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { DomainTodoList } from '../../../../api/todolistsApi.types'

const FilterTasksButtons = ({ todoList }: FilterTasksButtonsProps) => {
	const dispatch = useAppDispatch()

	const onClickAllHandler = () => {
		dispatch(
			changeTodoListFilterAC({
				todoListId: todoList.id,
				filterValue: 'all'
			})
		)
	}

	const onClickActiveHandler = () => {
		dispatch(
			changeTodoListFilterAC({
				todoListId: todoList.id,
				filterValue: 'active'
			})
		)
	}

	const onClickCompletedHandler = () => {
		dispatch(
			changeTodoListFilterAC({
				todoListId: todoList.id,
				filterValue: 'completed'
			})
		)
	}

	return (
		<div>
			<Button
				onClick={onClickAllHandler}
				variant={todoList.filter === 'all' ? 'contained' : 'outlined'}
				color={'inherit'}
			>
				All
			</Button>
			<Button
				onClick={onClickActiveHandler}
				variant={todoList.filter === 'active' ? 'contained' : 'outlined'}
				color={'primary'}
			>
				Active
			</Button>
			<Button
				onClick={onClickCompletedHandler}
				variant={todoList.filter === 'completed' ? 'contained' : 'outlined'}
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
