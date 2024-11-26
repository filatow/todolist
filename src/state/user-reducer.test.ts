import {
	changeNameActionCreator,
	incrementAgeActionCreator,
	incrementChildrenCountActionCreator,
	userReducer
} from './user-reducer'

test('user reducer should increment only age', () => {
	const startState = { age: 20, childrenCount: 2, name: 'Dimych' }
	const endState = userReducer(startState, incrementAgeActionCreator())

	expect(endState.age).toBe(21)
	expect(endState.childrenCount).toBe(2)
})

test('user reducer should increment only childrenCount', () => {
	const startState = { age: 20, childrenCount: 2, name: 'Dimych' }
	const endState = userReducer(startState, incrementChildrenCountActionCreator())

	expect(endState.age).toBe(20)
	expect(endState.childrenCount).toBe(3)
})

test('user reducer should change name of user', () => {
	const startState = { age: 20, childrenCount: 2, name: 'Dimych' }
	const newName = 'Viktor'

	const endState = userReducer(startState, changeNameActionCreator(newName))

	expect(endState.name).toBe(newName)
})
