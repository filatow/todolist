import React from "react";

type ButtonPropsType = {
    caption: string
    onClickHandler?: () => void
    isDisabled?: boolean
}

export const Button = ({caption, onClickHandler, isDisabled}: ButtonPropsType) => {
    return (
        <button
            onClick={onClickHandler}
            disabled={isDisabled}
        >{caption}</button>
    )
}