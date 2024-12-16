import React from 'react'
import { EditableSpan } from 'common/components'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { removeTodoListTC, updateTodoListTC } from '../../../../model/todolists-reducer'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { DomainTodoList } from '../../../../api/todolistsApi.types'

type TodoListTitleProps = {
	todoList: DomainTodoList
	title: string
}

const TodoListTitle = ({ todoList, title }: TodoListTitleProps) => {
	const dispatch = useAppDispatch()

	const onChangeTodoListTitleHandler = (title: string) => {
		dispatch(
			updateTodoListTC({
				todoListId: todoList.id,
				title
			})
		)
	}

	const onClickRemoveTodoListHandler = () => {
		dispatch(removeTodoListTC({ todoListId: todoList.id }))
	}

	return (
		<h3>
			<EditableSpan caption={title} onChange={onChangeTodoListTitleHandler} />
			<IconButton onClick={onClickRemoveTodoListHandler}>
				<DeleteIcon />
			</IconButton>
		</h3>
	)
}

export default TodoListTitle
