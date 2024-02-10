import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { IconButton, TextField } from '@mui/material'
import { AddBox } from '@mui/icons-material'

type AddItemFormProps = {
	addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormProps) => {
	const [itemTitle, setItemTitle] = useState('')
	const [inputError, setInputError] = useState<string | null>(null)

	const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setItemTitle(e.currentTarget.value)
		inputError && setInputError(null)
	}

	const onClickAddItemHandler = () => {
		const trimmedItemTitle = itemTitle.trim()
		if (trimmedItemTitle) {
			props.addItem(trimmedItemTitle)
		} else {
			setInputError('Error: title is required')
		}
		setItemTitle('')
	}

	const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && itemTitle) {
			onClickAddItemHandler()
		}
	}

	return (
		<div>
			<TextField
				size={'small'}
				variant="outlined"
				value={itemTitle}
				onChange={onChangeInputHandler}
				onKeyDown={onKeyDownHandler}
				error={!!inputError}
				helperText={inputError}
			/>
			<IconButton
				size={'medium'}
				color={'primary'}
				onClick={onClickAddItemHandler}
				disabled={!itemTitle}
			>
				<AddBox />
			</IconButton>
		</div>
	)
}
