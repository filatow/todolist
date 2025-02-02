import React from 'react'
import { EditableSpan } from 'common/components'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import {
	useRemoveTodoListMutation,
	useUpdateTodoListTitleMutation
} from '../../../../api/todolistsApi'
import { DomainTodoList } from '../../../../lib/types/types'

type TodoListTitleProps = {
	todoList: DomainTodoList
	title: string
}

const TodoListTitle = ({ todoList, title }: TodoListTitleProps) => {
	const { id: todoListId, entityStatus } = todoList
	const [removeTodoList] = useRemoveTodoListMutation()
	const [updateTodoListTitle] = useUpdateTodoListTitleMutation()

	const updateTodoListTitleCallback = (title: string) => {
		updateTodoListTitle({ title, id: todoListId })
	}

	const removeTodoListCallback = () => {
		removeTodoList(todoListId)
	}

	return (
		<h3>
			<EditableSpan
				caption={title}
				onChange={updateTodoListTitleCallback}
				disabled={entityStatus === 'loading'}
			/>
			<IconButton onClick={removeTodoListCallback} disabled={entityStatus === 'loading'}>
				<DeleteIcon />
			</IconButton>
		</h3>
	)
}

export default TodoListTitle
