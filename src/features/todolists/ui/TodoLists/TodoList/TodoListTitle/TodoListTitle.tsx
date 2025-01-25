import React from 'react'
import { EditableSpan } from 'common/components'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { DomainTodoList } from '../../../../api/todolistsApi.types'
import {
	useRemoveTodoListMutation,
	useUpdateTodoListTitleMutation
} from '../../../../api/todolistsApi'

type TodoListTitleProps = {
	todoList: DomainTodoList
	title: string
}

const TodoListTitle = ({ todoList, title }: TodoListTitleProps) => {
	const [removeTodoList] = useRemoveTodoListMutation()
	const [updateTodoListTitle] = useUpdateTodoListTitleMutation()

	const updateTodoListTitleCallback = (title: string) => {
		updateTodoListTitle({ title, id: todoList.id })
	}

	const removeTodoListCallback = () => {
		removeTodoList(todoList.id)
	}

	return (
		<h3>
			<EditableSpan
				caption={title}
				onChange={updateTodoListTitleCallback}
				disabled={todoList.entityStatus === 'loading'}
			/>
			<IconButton onClick={removeTodoListCallback} disabled={todoList.entityStatus === 'loading'}>
				<DeleteIcon />
			</IconButton>
		</h3>
	)
}

export default TodoListTitle
