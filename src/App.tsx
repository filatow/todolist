import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'JS6+/TS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
    ]);
    const [filter, setFilter] = useState<FilterValuesType>('all');

    const removeTask = (tasks: Array<TaskType>, id: string) => {
        const filteredTasks = tasks.filter((task) => task.id !== id);
        setTasks(filteredTasks);
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title,
            isDone: false
        };
        const newTasks = [newTask, ...tasks];
        setTasks(newTasks);
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
        <div className="App">
            <TodoList
                title="What to learn"
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
