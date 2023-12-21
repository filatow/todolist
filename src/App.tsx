import React, {useState} from 'react';
import './App.css';
import {FilterValuesType, TaskType, TodoList} from './TodoList';
import {v1} from 'uuid';


function App() {
    const todoListTitle = 'What to learn';

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'JS6+/TS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
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

    const removeTask = (taskId: string) => {
        const newTasks = tasks.filter((t) => t.id !== taskId)
        setTasks(newTasks);
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false,
        }
        setTasks([newTask, ...tasks]);
    }

    const changeTodoListFilter = (filterValue: FilterValuesType) => setFilterValue(filterValue);

    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={filteredTasks}
                addTask={addTask}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
            />
        </div>
    );
}

export default App;
