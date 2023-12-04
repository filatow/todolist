import React from "react";

type ButtonPropsType = {
    caption: string
}

export const Button = (props: ButtonPropsType) => {
    return (
        <button>{props.caption}</button>
    )
}