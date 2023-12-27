import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './TodoList.css';
import {Button} from './Button';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void
    addTask: (title: string) => void
    removeTask: (taskId: string) => void
    filterValue: FilterValuesType
    changeTodoListFilter: (filterValue: FilterValuesType) => void
}

export const TodoList = (
    {
        title,
        tasks,
        addTask,
        changeTaskStatus,
        removeTask,
        filterValue,
        changeTodoListFilter
    }: TodoListPropsType) => {

    const [taskTitle, setTaskTitle] = useState('');
    const [inputError, setInputError] = useState<string | null>(null);

    const listItemElements: Array<JSX.Element> = tasks.map((task) => {
        const onChangeHandler = (
            e: ChangeEvent<HTMLInputElement>
        ) => changeTaskStatus(task.id, e.currentTarget.checked)

        return (
            <li key={task.id} className={task.isDone ? 'task_done' : 'task'}>
                <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={onChangeHandler}
                />
                <span>{task.title}</span>
                <Button caption={'x'} onClickHandler={() => removeTask(task.id)}/>
            </li>
        )
    })

    const tasksList: JSX.Element = tasks.length
        ? <ul> {listItemElements} </ul>
        : <div> The list is empty </div>

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value);
        inputError && setInputError(null);
    }

    const onClickAddTaskHandler = () => {
        const trimmedTaskTitle = taskTitle.trim();
        if (trimmedTaskTitle) {
            addTask(trimmedTaskTitle);
        } else {
            setInputError('Error: title is required');
        }
        setTaskTitle('');
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && taskTitle) {
            onClickAddTaskHandler()
        }
    }

    return (
        <div className="todoList">
            <h3>{title}</h3>
            <div>
                <input
                    value={taskTitle}
                    onChange={(e) => {
                        onChangeInputHandler(e)
                    }}
                    onKeyDown={onKeyDownHandler}
                    className={inputError ? 'input-error' : ''}
                />
                <Button
                    caption={'+'}
                    onClickHandler={onClickAddTaskHandler}
                    isDisabled={!taskTitle}
                />
                {inputError && <div className='text-error'>{inputError}</div>}
            </div>
            {tasksList}
            <div>
                <Button
                    caption={'All'}
                    onClickHandler={() => changeTodoListFilter('all')}
                    classes={filterValue === 'all' ? 'button_active' : ''}
                />
                <Button
                    caption={'Active'}
                    onClickHandler={() => changeTodoListFilter('active')}
                    classes={filterValue === 'active' ? 'button_active' : ''}
                />
                <Button
                    caption={'Completed'}
                    onClickHandler={() => changeTodoListFilter('completed')}
                    classes={filterValue === 'completed' ? 'button_active' : ''}
                />
            </div>
        </div>
    )
}
