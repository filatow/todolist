import {combineReducers, legacy_createStore as createStore} from 'redux';
import {todoListsReducer} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';
// import {TasksStateType, TodolistType} from '../AppWithRedux';


// type AppRootState = {
//   todoLists: Array<TodolistType>
//   tasks: TasksStateType
// }

export type AppRootState = ReturnType<typeof rootReducer>


const rootReducer = combineReducers({
  todoLists: todoListsReducer,
  tasks: tasksReducer
})
export const store = createStore(rootReducer)

// @ts-ignore
window.store = store