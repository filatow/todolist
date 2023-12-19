import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './TodoList.css';
// import {Button} from './Button';
import {FilterValuesType} from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (tasks: Array<TaskType>, id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export const TodoList = ({title, tasks, removeTask, changeFilter, addTask}: PropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState<string>('');

    const listItemElements: Array<JSX.Element> = tasks.map((task) => {
        const onRemoveHandler = () => removeTask(tasks, task.id);
        return (
            <li key={task.id}>
                <label>
                    <input type="checkbox" defaultChecked={task.isDone}/>
                    {task.title}
                </label>
                <button onClick={onRemoveHandler}>x</button>
            </li>
        )
    })

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onClickAddTaskHandler = () => {
        addTask(newTaskTitle);
        setNewTaskTitle('');
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.ctrlKey && e.code === 'Enter') onClickAddTaskHandler();
    }
    const onAllClickHandler = () => changeFilter('all')
    const onActiveClickHandler = () => changeFilter('active')
    const onCompletedClickHandler = () => changeFilter('completed')

    return (
        <div className="todoList">
            <h3>{title}</h3>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownHandler}
                />
                {/*<Button onClick={() => addTask()} caption={'+'}/>*/}
                <button onClick={onClickAddTaskHandler}>+</button>
            </div>
            <ul>
                {listItemElements}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}
