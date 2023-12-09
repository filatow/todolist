import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';

export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 0, title: 'CSS', isDone: true},
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'JS6+/TS', isDone: true},
        {id: 3, title: 'React', isDone: false},
    ]);
    const [filter, setFilter] = useState<FilterValuesType>('all');

    const removeTask = (tasks: Array<TaskType>, id: number) => {
        const filteredTasks = tasks.filter((task) => task.id !== id);
        setTasks(filteredTasks);
    }

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value);
    }

    let tasksForTodolist = tasks;
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter((t) => t.isDone)
    }
    if (filter === 'active') {
        tasksForTodolist = tasks.filter((t) => !t.isDone)
    }

    return (
        <div className='App'>
            <TodoList
                title='What to learn'
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
