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
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    filterValue: FilterValueType
    changeFilter: (value: FilterValueType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
}

export const TodoList = (
    {
        id,
        title,
        tasks,
        removeTask,
        filterValue,
        changeFilter,
        addTask,
        changeTaskStatus,
        removeTodoList,
    }: PropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const listItemElements: Array<JSX.Element> = tasks.map((task) => {
        const onRemoveHandler = () => removeTask(task.id, id);
        const onChangeHandler = (
            e: ChangeEvent<HTMLInputElement>
        ) => changeTaskStatus(task.id, e.currentTarget.checked, id);

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
            addTask(newTaskTitle.trimEnd(), id)
            setNewTaskTitle('')
        } else {
            setError('Title is required');
        }
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.ctrlKey && e.code === 'Enter') onClickAddTaskHandler();
    }
    const onAllClickHandler = () => changeFilter('all', id)
    const onActiveClickHandler = () => changeFilter('active', id)
    const onCompletedClickHandler = () => changeFilter('completed', id)
    const onRemoveTodoListClickHandler = () => {
        removeTodoList(id)
    }

    return (
        <div className="todoList">
            <h3>{title} <button onClick={onRemoveTodoListClickHandler}>x</button></h3>
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
