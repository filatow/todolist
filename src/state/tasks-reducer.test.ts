import { v1 } from 'uuid'
import {TasksStateType} from '../App';
import {
  addTaskActionCreator,
  changeTaskStatusActionCreator, changeTaskTitleActionCreator,
  removeTaskActionCreator,
  tasksReducer
} from './tasks-reducer';
import {addTodoListActionCreator, removeTodoListActionCreator} from './todolists-reducer';

test('correct task should be deleted from correct array', () => {
  const todoListId1: string = 'todoListId1'
  const todoListId2: string = 'todoListId2'
  const taskIdToRemove = '2'

  const startState: TasksStateType = {
    [todoListId1]: [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false},
    ],
    [todoListId2]: [
      {id: '1', title: 'bread', isDone: false},
      {id: '2', title: 'milk', isDone: true},
      {id: '3', title: 'tea', isDone: false},
    ],
  }

  const action = removeTaskActionCreator(todoListId2, taskIdToRemove)
  const endState = tasksReducer(startState, action)

  expect(endState[todoListId1].length).toBe(3)
  expect(endState[todoListId2].length).toBe(2)
  expect(endState[todoListId2].every(t => t.id !== '2')).toBeTruthy()
})

test('new task should be added to correct array', () => {
  const todoListId1: string = 'todoListId1'
  const todoListId2: string = 'todoListId2'
  const newTaskId = v1()
  const newTaskTitle = 'eggs'

  const startState: TasksStateType = {
    [todoListId1]: [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false},
    ],
    [todoListId2]: [
      {id: '1', title: 'bread', isDone: false},
      {id: '2', title: 'milk', isDone: true},
      {id: '3', title: 'tea', isDone: false},
    ],
  }

  const action = addTaskActionCreator(todoListId2, newTaskId, newTaskTitle)
  const endState = tasksReducer(startState, action)

  expect(endState[todoListId1].length).toBe(3)
  expect(endState[todoListId2].length).toBe(4)
  expect(endState[todoListId2].find(t => t.id === newTaskId)).toBeDefined()
  expect(endState[todoListId2][0].id).toBe(newTaskId)
  expect(endState[todoListId2][0].title).toBe(newTaskTitle)
  expect(endState[todoListId2][0].isDone).toBe(false)
})

test('task\'s status should be changed to correct value', () => {
  const todoListId1: string = 'todoListId1'
  const todoListId2: string = 'todoListId2'

  const taskToChangeId = '3'
  const isDoneNewValue = true

  const startState: TasksStateType = {
    [todoListId1]: [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: taskToChangeId, title: 'React', isDone: false},
    ],
    [todoListId2]: [
      {id: '1', title: 'bread', isDone: false},
      {id: '2', title: 'milk', isDone: true},
      {id: taskToChangeId, title: 'tea', isDone: false},
    ],
  }

  const action = changeTaskStatusActionCreator(todoListId2, taskToChangeId, isDoneNewValue)
  const endState = tasksReducer(startState, action)

  expect(endState[todoListId2][2].isDone).toBe(isDoneNewValue)
  expect(endState[todoListId1][2].isDone).not.toBe(isDoneNewValue)
})

test('task\'s title should be changed to correct value', () => {
  const todoListId1: string = 'todoListId1'
  const todoListId2: string = 'todoListId2'

  const taskToChangeId = '3'
  const taskNewTitle = 'coffee'

  const startState: TasksStateType = {
    [todoListId1]: [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: taskToChangeId, title: 'React', isDone: false},
    ],
    [todoListId2]: [
      {id: '1', title: 'bread', isDone: false},
      {id: '2', title: 'milk', isDone: true},
      {id: taskToChangeId, title: 'tea', isDone: false},
    ],
  }

  const action = changeTaskTitleActionCreator(todoListId2, taskToChangeId, taskNewTitle)
  const endState = tasksReducer(startState, action)

  expect(endState[todoListId2][2].title).toBe(taskNewTitle)
  expect(endState[todoListId1][2].title).not.toBe(taskNewTitle)
})


test('new todoList item should be added then new todolist is added', () => {
  const todoListId1: string = 'todoListId1'
  const todoListId2: string = 'todoListId2'
  const newTodoListTitle: string = 'todoListId3'

  const startState: TasksStateType = {
    [todoListId1]: [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false},
    ],
    [todoListId2]: [
      {id: '1', title: 'bread', isDone: false},
      {id: '2', title: 'milk', isDone: true},
      {id: '3', title: 'tea', isDone: false},
    ],
  }

  const action = addTodoListActionCreator(newTodoListTitle)
  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)
  const newKey = keys.find(k => k !== todoListId1 && k !== todoListId2)
  if (!newKey) {
    throw  Error('new key should be added')
  }
  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test('property with todoListId should be deleted', () => {
  const todoListId1: string = 'todoListId1'
  const todoListId2: string = 'todoListId2'
  const todoListIdToRemove = todoListId1

  const startState: TasksStateType = {
    [todoListId1]: [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false},
    ],
    [todoListId2]: [
      {id: '1', title: 'bread', isDone: false},
      {id: '2', title: 'milk', isDone: true},
      {id: '3', title: 'tea', isDone: false},
    ],
  }

  const action = removeTodoListActionCreator(todoListIdToRemove)
  const endState = tasksReducer(startState, action)

  expect(Object.keys(endState).length).toBe(1)
  expect(endState[todoListIdToRemove]).toBeUndefined()
})
