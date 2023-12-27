import React from 'react';

type ButtonPropsType = {
    caption: string
    onClickHandler?: () => void
    isDisabled?: boolean
    classes?: string
}

export const Button = (
    {
        caption,
        onClickHandler,
        isDisabled,
        classes
    }: ButtonPropsType) => {

    return (
        <button
            className={classes}
            onClick={onClickHandler}
            disabled={isDisabled}
        >{caption}</button>
    )
}