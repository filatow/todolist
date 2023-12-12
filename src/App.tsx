import React, {useState} from 'react';
import './App.css';
import {FilterValuesType, TaskType, TodoList} from './TodoList';


function App() {
    const todoListTitle = 'What to learn';

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'CSS', isDone: true},
        {id: 2, title: 'HTML', isDone: true},
        {id: 3, title: 'JS6+/TS', isDone: true},
        {id: 4, title: 'React', isDone: false},
    ]);

    const [filterValue, setFilterValue] = useState<FilterValuesType>('all');

    const getFilteredTasks = (tasks: Array<TaskType>, filterValue: FilterValuesType): Array<TaskType> => {
        const mapping = {
            'active': () => tasks.filter((t) => !t.isDone),
            'completed': () => tasks.filter((t) => t.isDone),
            'all': () => tasks
        }
        return mapping[filterValue]();
    }

    const filteredTasks = getFilteredTasks(tasks, filterValue);

    const removeTask = (taskId: number) => {
        const newTasks = tasks.filter((t) => t.id !== taskId)
        setTasks(newTasks);
    }

    const changeTodoListFilter = (filterValue: FilterValuesType) => setFilterValue(filterValue);

    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={filteredTasks}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
            />
        </div>
    );
}

export default App;
