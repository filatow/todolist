import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import { Button } from './Button'

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
			<input
				value={itemTitle}
				onChange={(e) => {
					onChangeInputHandler(e)
				}}
				onKeyDown={onKeyDownHandler}
				className={inputError ? 'input-error' : ''}
			/>
			<Button
				caption={'+'}
				onClickHandler={onClickAddItemHandler}
				isDisabled={!itemTitle}
			/>
			{inputError && <div className="text-error">{inputError}</div>}
		</div>
	)
}
