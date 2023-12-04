import React from 'react';
import './TodoList.css';
import {Button} from "./Button";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
}

export const TodoList = ({title, tasks}: PropsType) => {
    const listItems: Array<JSX.Element> = [];

    for (let i = 0; i < tasks.length; i += 1) {
        const listItem: JSX.Element = (
            <li>
                <input type='checkbox' checked={tasks[i].isDone}/>
                <span>{tasks[i].title}</span>
            </li>
        );
        listItems.push(listItem);
    }

    return (
        <div className="todoList">
            <h3>{title}</h3>
            <div>
                <input/>
                <Button caption={'+'}/>
            </div>
            <ul>
                {listItems}
            </ul>
            <div>
                <Button caption={'All'}/>
                <Button caption={'Active'}/>
                <Button caption={'Completed'}/>
            </div>
        </div>
    )
}
