import { combineReducers, legacy_createStore as createStore } from 'redux'
import { tasksReducer } from '../reducers/tasks-reducer'
import { todoListsReducer } from '../reducers/todolists-reducer'


// определить автоматически тип всего объекта состояния
export type RootState = ReturnType<typeof store.getState>

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
	tasks: tasksReducer,
	todoLists: todoListsReducer,
})
// непосредственно создаём store
export const store = createStore(rootReducer)

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store