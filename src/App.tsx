import React from 'react';
import './App.css';
import { TaskType, TodoList } from './TodoList';

function App() {
  const frontendTasks: Array<TaskType> = [
    { id: 1, title: 'CSS', isDone: true },
    { id: 1, title: 'HTML', isDone: true },
    { id: 2, title: 'JS6+/TS', isDone: true },
    { id: 3, title: 'React', isDone: false },
  ];

  const purchases: Array<TaskType> = [
    { id: 4, title: 'Meat', isDone: true },
    { id: 5, title: 'Fish', isDone: true },
    { id: 6, title: 'Water', isDone: true },
  ];

  return (
    <div className='App'>
      <TodoList title='What to learn' tasks={frontendTasks} />
      <TodoList title='What to buy' tasks={purchases} />
      {/* <TodoList title='Songs' /> */}
    </div>
  );
}

export default App;
