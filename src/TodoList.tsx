import React from 'react';
import './TodoList.css';
import {Button} from "./Button";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (tasks: Array<TaskType>, id: number) => void
    changeFilter: (value: FilterValuesType) => void
}

export const TodoList = ({title, tasks, removeTask, changeFilter}: PropsType) => {
    const listItemElements: Array<JSX.Element> = tasks.map((task) => {
        return (
            <li key={task.id}>
                <label>
                    <input type='checkbox' defaultChecked={task.isDone}/>
                    {task.title}
                </label>
                <button onClick={() => {
                    removeTask(tasks, task.id);
                }}>x
                </button>
            </li>
        )
    })

    return (
        <div className="todoList">
            <h3>{title}</h3>
            <div>
                <input/>
                <Button caption={'+'}/>
            </div>
            <ul>
                {listItemElements}
            </ul>
            <div>
                <button onClick={() => changeFilter('all')}>All</button>
                <button onClick={() => changeFilter('active')}>Active</button>
                <button onClick={() => changeFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}
