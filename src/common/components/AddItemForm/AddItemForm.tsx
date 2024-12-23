import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import AddBox from '@mui/icons-material/AddBox'

type AddItemFormProps = {
	addItem: (title: string) => void
	disabled?: boolean
}

export const AddItemForm = ({ addItem, disabled = false }: AddItemFormProps) => {
	const [itemTitle, setItemTitle] = useState('')
	const [inputError, setInputError] = useState<string | null>(null)

	const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setItemTitle(e.currentTarget.value)
		inputError && setInputError(null)
	}

	const onClickAddItemHandler = () => {
		const trimmedItemTitle = itemTitle.trim()
		if (trimmedItemTitle) {
			addItem(trimmedItemTitle)
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
				disabled={disabled}
			/>
			<IconButton
				size={'medium'}
				color={'primary'}
				onClick={onClickAddItemHandler}
				disabled={disabled || !itemTitle}
			>
				<AddBox />
			</IconButton>
		</div>
	)
}
