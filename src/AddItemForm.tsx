import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { IconButton, TextField } from '@mui/material'
import { AddCircle } from '@mui/icons-material'

type AddItemFormPropsType = {
	addItem: (title: string) => void
}

export function AddItemForm({ addItem }: AddItemFormPropsType) {
	const [title, setTitle] = useState<string>('')
	const [error, setError] = useState<string | null>(null)

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setError(null)
		setTitle(e.currentTarget.value.trimStart())
	}

	const onClickAddItemHandler = () => {
		if (title.trim() !== '') {
			addItem(title.trimEnd())
			setTitle('')
		} else {
			setError('Title is required')
		}
	}

	const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.ctrlKey && e.code === 'Enter') onClickAddItemHandler()
	}

	return (
		<div>
			<TextField
				variant={'outlined'}
				size="small"
				label="Type value"
				value={title}
				onChange={onChangeHandler}
				onKeyDown={onKeyDownHandler}
				className={error ? 'error' : ''}
				error={!!error}
				helperText={error}
			/>
			<IconButton color="success" onClick={onClickAddItemHandler}>
				<AddCircle />
			</IconButton>
		</div>
	)
}
