import React, { ChangeEvent, useState } from 'react'
import { TextField } from '@mui/material'

type EditableSpanPropsType = {
	title: string
	onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
	const [editMode, setEditMode] = useState<boolean>(false)
	const [title, setTitle] = useState<string>(props.title)

	const activateEditMode = () => setEditMode(true)
	const activateViewMode = () => {
		setEditMode(false)
		props.onChange(title)
	}
	const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setTitle(event.currentTarget.value)
	}

	return editMode ?
			<TextField
				size="small"
				variant="standard"
				onBlur={activateViewMode}
				type="text"
				value={title}
				onChange={onChangeTitleHandler}
				autoFocus
			/>
		:	<span onDoubleClick={activateEditMode}>{title}</span>
}
