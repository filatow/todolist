import React from "react";

type ButtonPropsType = {
    caption: string
    onClickHandler?: () => void
}

export const Button = ({caption, onClickHandler}: ButtonPropsType) => {
    return (
        <button onClick={onClickHandler}>{caption}</button>
    )
}