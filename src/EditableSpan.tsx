import React, { ChangeEvent, useState } from 'react'
import { TextField } from '@mui/material'

type EditableSpanProps = {
	caption: string
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const EditableSpan = (props: EditableSpanProps) => {
	const [edit, setEdit] = useState(false)

	const onDoubleClickSpanHandler = () => setEdit(true)
	const onBlurInputHandler = () => setEdit(false)

	return edit ?
			<TextField
				size={'small'}
				variant={'standard'}
				onChange={props.onChange}
				onBlur={onBlurInputHandler}
				value={props.caption}
				autoFocus
			/>
		:	<span onDoubleClick={onDoubleClickSpanHandler}>{props.caption}</span>
}
