import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';
import {v1} from 'uuid';

export type FilterValueType = 'all' | 'completed' | 'active'

type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

function App() {
    const [todoListId1, todoListId2] = [v1(), v1()];
    const [allTasks, setAllTasks] = useState({
        [todoListId1]: [
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'JS6+/TS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: 'Book', isDone: false},
            {id: v1(), title: 'Milk', isDone: true},
        ],
    })
    const [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todoListId1, title: 'What to learn', filter: 'active'},
        {id: todoListId2, title: 'What to buy', filter: 'completed'},
    ])

    const removeTask = (taskId: string, todoListId: string) => {
        allTasks[todoListId] = allTasks[todoListId]
            .filter((task) => task.id !== taskId);
        setAllTasks({...allTasks});
    }

    const changeStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        allTasks[todoListId] = allTasks[todoListId].map(
            (t) => t.id === taskId ? {...t, isDone} : t
        );
        setAllTasks({...allTasks});
    }

    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {id: v1(), title, isDone: false};
        allTasks[todoListId] = [newTask, ...allTasks[todoListId]];
        setAllTasks({...allTasks});
    }

    const changeFilter = (value: FilterValueType, todolistId: string) => {
        const updatedTotoLists = todoLists.map(
            (tl) => tl.id === todolistId ? {...tl, filter: value} : tl
        )
        setTodoLists(updatedTotoLists)
    }

    const removeTodoList = (todoLIstId: string) => {
        setTodoLists(todoLists.filter((tl) => tl.id !== todoLIstId));
        delete allTasks[todoLIstId];
        setAllTasks({...allTasks});
    }


    return (
        <div className="App">
            {
                todoLists.map((tl) => {
                    let tasksForTodolist = allTasks[tl.id];
                    if (tl.filter === 'active') {
                        tasksForTodolist = tasksForTodolist.filter((t) => !t.isDone)
                    }
                    if (tl.filter === 'completed') {
                        tasksForTodolist = tasksForTodolist.filter((t) => t.isDone)
                    }

                    return <TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        filterValue={tl.filter}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        removeTodoList={removeTodoList}
                    />
                })
            }
        </div>
    );
}

export default App;
