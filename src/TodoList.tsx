import React from 'react';
import './TodoList.css';
import {Button} from './Button';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    changeTodoListFilter: (filterValue: FilterValuesType) => void
}

export const TodoList = ({title, tasks, removeTask, changeTodoListFilter}: TodoListPropsType) => {
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

    return (
        <div className="todoList">
            <h3>{title}</h3>
            <div>
                <input/>
                <Button caption={'+'} />
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
