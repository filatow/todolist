import React from 'react'
import { EditableSpan } from 'common/components'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import {
	todoListsApi,
	useRemoveTodoListMutation,
	useUpdateTodoListTitleMutation
} from '../../../../api/todolistsApi'
import { useAppDispatch } from 'common/hooks'
import { RequestStatus } from '../../../../../../app/appSlice'
import { DomainTodoList } from '../../../../lib/types/types'

type TodoListTitleProps = {
	todoList: DomainTodoList
	title: string
}

const TodoListTitle = ({ todoList, title }: TodoListTitleProps) => {
	const {id: todoListId, entityStatus} = todoList
	const dispatch = useAppDispatch()
	const [removeTodoList] = useRemoveTodoListMutation()
	const [updateTodoListTitle] = useUpdateTodoListTitleMutation()

	const setTodoListEntityStatus = (status: RequestStatus) => {
		dispatch(
			todoListsApi.util.updateQueryData('getTodoLists', undefined, (todoLists) => {
				const todoList = todoLists.find(tl => tl.id === todoListId)
				if (todoList) {
					todoList.entityStatus = status
				}
			})
		)
	}

	const updateTodoListTitleCallback = (title: string) => {
		updateTodoListTitle({ title, id: todoListId })
	}

	const removeTodoListCallback = () => {
		setTodoListEntityStatus('loading')
		removeTodoList(todoListId)
			.unwrap()
			.catch(() => {
				setTodoListEntityStatus('failed')
			})
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
