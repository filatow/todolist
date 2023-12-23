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
    addTask: (title: string) => void
    removeTask: (taskId: string) => void
    changeTodoListFilter: (filterValue: FilterValuesType) => void
}

export const TodoList = (
    {
        title,
        tasks,
        addTask,
        removeTask,
        changeTodoListFilter
    }: TodoListPropsType) => {

    const [taskTitle, setTaskTitle] = useState('');

    const listItemElements: Array<JSX.Element> = tasks.map((task) => (
        <li key={task.id}>
            <input
                type="checkbox"
                defaultChecked={task.isDone}
            />
            <span>{task.title}</span>
            <Button caption={'x'} onClickHandler={() => removeTask(task.id)} />
        </li>
    ))

    const tasksList: JSX.Element = tasks.length
        ? <ul> {listItemElements} </ul>
        : <div> The list is empty </div>

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value.trimStart())
    }

    const onClickAddTaskHandler = () => {
        addTask(taskTitle.trimEnd());
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
                    onChange={(e) => {onChangeInputHandler(e)}}
                    onKeyDown={onKeyDownHandler}
                />
                <Button
                    caption={'+'}
                    onClickHandler={onClickAddTaskHandler}
                    isDisabled={!taskTitle}
                />
            </div>
            {tasksList}
            <div>
                <Button caption={'All'} onClickHandler={() => changeTodoListFilter('all')}/>
                <Button caption={'Active'} onClickHandler={() => changeTodoListFilter('active')}/>
                <Button caption={'Completed'} onClickHandler={() => changeTodoListFilter('completed')}/>
            </div>
        </div>
    )
}
