import React, { ChangeEvent, useState } from 'react'
import TextField from '@mui/material/TextField'

type EditableSpanProps = {
	caption: string
	// onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
	onChange: (title: string) => void
	disabled?: boolean
}

export const EditableSpan = (props: EditableSpanProps) => {
	const { caption, onChange, disabled = false } = props
	const [value, setValue] = useState(caption)
	const [edit, setEdit] = useState(false)

	const onDoubleClickSpanHandler = () => setEdit(true)
	const onBlurInputHandler = () => setEdit(false)
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		onChange(e.currentTarget.value)
		setValue(e.currentTarget.value)
	}

	return edit ?
			<TextField
				size={'small'}
				variant={'standard'}
				onChange={(e) => onChangeHandler(e)}
				onBlur={onBlurInputHandler}
				value={value}
				autoFocus
				disabled={disabled}
			/>
		:	<span onDoubleClick={onDoubleClickSpanHandler}>{caption}</span>
}
