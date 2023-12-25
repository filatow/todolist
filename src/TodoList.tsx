import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './TodoList.css';
// import {Button} from './Button';
import {FilterValueType} from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (tasks: Array<TaskType>, id: string) => void
    filterValue: FilterValueType
    changeFilter: (value: FilterValueType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export const TodoList = (
    {
        title,
        tasks,
        removeTask,
        filterValue,
        changeFilter,
        addTask,
        changeTaskStatus,
    }: PropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const listItemElements: Array<JSX.Element> = tasks.map((task) => {
        const onRemoveHandler = () => removeTask(tasks, task.id);
        const onChangeHandler = (
            e: ChangeEvent<HTMLInputElement>
        ) => changeTaskStatus(task.id, e.currentTarget.checked);

        return (
            <li key={task.id}
                className={task.isDone ? 'is-done' : ''}
            >
                <label>
                    <input
                        type="checkbox"
                        checked={task.isDone}
                        onChange={onChangeHandler}
                    />
                    {task.title}
                </label>
                <button onClick={onRemoveHandler}>x</button>
            </li>
        )
    })

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setNewTaskTitle(e.currentTarget.value.trimStart())
    }
    const onClickAddTaskHandler = () => {
        if (newTaskTitle.trim() !== '') {
            addTask(newTaskTitle.trimEnd())
            setNewTaskTitle('')
        } else {
            setError('Title is required');
        }
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
                    className={error ? 'error' : ''}
                />
                <button
                    onClick={onClickAddTaskHandler}
                    // disabled={!Boolean(newTaskTitle)}
                >+
                </button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {listItemElements}
            </ul>
            <div>
                <button
                    className={filterValue === 'all' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}
                >All
                </button>
                <button
                    className={filterValue === 'active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}
                >Active
                </button>
                <button
                    className={filterValue === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}
                >Completed
                </button>
            </div>
        </div>
    )
}
