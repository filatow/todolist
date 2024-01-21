import React, { ChangeEvent, useState } from 'react'

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
			<input
				onBlur={activateViewMode}
				type="text"
				value={title}
				onChange={onChangeTitleHandler}
				autoFocus
			/>
		:	<span onDoubleClick={activateEditMode}>{title}</span>
}
