import React from 'react'

type ButtonProps = {
	caption: string
	onClickHandler?: () => void
	isDisabled?: boolean
	classes?: string
}

export const Button = (props: ButtonProps) => {
	return (
		<button
			className={props.classes}
			onClick={props.onClickHandler}
			disabled={props.isDisabled}
		>
			{props.caption}
		</button>
	)
}
