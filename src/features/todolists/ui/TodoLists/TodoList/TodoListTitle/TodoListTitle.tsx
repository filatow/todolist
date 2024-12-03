import React, { ChangeEvent } from 'react'
import { EditableSpan } from '../../../../../../common/components/EditableSpan/EditableSpan'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { changeTodoListTitleAC, removeTodoListAC, TodoList } from '../../../../model/todolists-reducer'
import { useAppDispatch } from '../../../../../../common/hooks/useAppDispatch'

type TodoListTitleProps = {
	todoList: TodoList
	title: string
}

const TodoListTitle = ({ todoList, title }: TodoListTitleProps) => {
	const dispatch = useAppDispatch()

	const onChangeTodoListTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch(
			changeTodoListTitleAC({
				todoListId: todoList.id,
				title: e.currentTarget.value,
			}),
		)
	}

	const onClickRemoveTodoListHandler = () => {
		dispatch(removeTodoListAC({ todoListId: todoList.id }))
	}

	return (
		<h3>
			<EditableSpan
				caption={title}
				onChange={onChangeTodoListTitleHandler}
			/>
			<IconButton onClick={onClickRemoveTodoListHandler}>
				<DeleteIcon />
			</IconButton>
		</h3>
	)
}

export default TodoListTitle