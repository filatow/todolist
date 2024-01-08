import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import './TodoList.css'
import { Button } from './Button'

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodoListPropsType = {
	todoListID: string
	title: string
	tasks: Array<TaskType>
	changeTaskStatus: (
		todoListID: string,
		taskId: string,
		newIsDoneValue: boolean,
	) => void
	addTask: (todoListID: string, title: string) => void
	removeTask: (todoListID: string, taskId: string) => void
	filterValue: FilterValuesType
	changeFilter: (todoListID: string, filterValue: FilterValuesType) => void
	removeTodoList: (todoListID: string) => void
}

export const TodoList = ({
	todoListID,
	title,
	tasks,
	addTask,
	changeTaskStatus,
	removeTask,
	filterValue,
	changeFilter,
	removeTodoList,
}: TodoListPropsType) => {
	const [taskTitle, setTaskTitle] = useState('')
	const [inputError, setInputError] = useState<string | null>(null)

	const listItemElements: Array<JSX.Element> = tasks.map((task) => {
		const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
			changeTaskStatus(todoListID, task.id, e.currentTarget.checked)

		return (
			<li key={task.id} className={task.isDone ? 'task_done' : 'task'}>
				<input
					type="checkbox"
					checked={task.isDone}
					onChange={onChangeHandler}
				/>
				<span>{task.title}</span>
				<Button
					caption={'x'}
					onClickHandler={() => removeTask(todoListID, task.id)}
				/>
			</li>
		)
	})

	const tasksList: JSX.Element =
		tasks.length ?
			<ul> {listItemElements} </ul>
		:	<div> The list is empty </div>

	const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTaskTitle(e.currentTarget.value)
		inputError && setInputError(null)
	}

	const onClickAddTaskHandler = () => {
		const trimmedTaskTitle = taskTitle.trim()
		if (trimmedTaskTitle) {
			addTask(todoListID, trimmedTaskTitle)
		} else {
			setInputError('Error: title is required')
		}
		setTaskTitle('')
	}

	const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && taskTitle) {
			onClickAddTaskHandler()
		}
	}

	const onClickRemoveTodoListHandler = () => removeTodoList(todoListID)

	return (
		<div className="todoList">
			<h3>
				{title}
				<button onClick={onClickRemoveTodoListHandler}>x</button>
			</h3>
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
				{inputError && <div className="text-error">{inputError}</div>}
			</div>
			{tasksList}
			<div>
				<Button
					caption={'All'}
					onClickHandler={() => changeFilter(todoListID, 'all')}
					classes={filterValue === 'all' ? 'button_active' : ''}
				/>
				<Button
					caption={'Active'}
					onClickHandler={() => changeFilter(todoListID, 'active')}
					classes={filterValue === 'active' ? 'button_active' : ''}
				/>
				<Button
					caption={'Completed'}
					onClickHandler={() => changeFilter(todoListID, 'completed')}
					classes={filterValue === 'completed' ? 'button_active' : ''}
				/>
			</div>
		</div>
	)
}
