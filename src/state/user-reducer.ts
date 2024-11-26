type StateType = {
	age: number
	childrenCount: number
	name: String
}

type IncrementAgeActionType = {
	type: 'INCREMENT-AGE'
}

type IncrementChildrenCountActionType = {
	type: 'INCREMENT-CHILDREN-COUNT'
}

type ChangeNameActionType = {
	type: 'CHANGE-NAME'
	newName: string
}

type ActionsType =
	| IncrementAgeActionType
	| IncrementChildrenCountActionType
	| ChangeNameActionType

export const userReducer = (
	state: StateType,
	action: ActionsType,
): StateType => {
	switch (action.type) {
		case 'INCREMENT-AGE':
			return {
				...state,
				age: state.age + 1,
			}
		case 'INCREMENT-CHILDREN-COUNT':
			return {
				...state,
				childrenCount: state.childrenCount + 1,
			}
		case 'CHANGE-NAME':
			return {
				...state,
				name: action.newName,
			}
		default:
			throw new Error("I don't understand this action type")
	}
}

export const changeNameActionCreator = (newName: string): ChangeNameActionType => {
	return {
		type: 'CHANGE-NAME',
		newName
	}
}

export const incrementChildrenCountActionCreator = (): IncrementChildrenCountActionType => {
	return {
		type: 'INCREMENT-CHILDREN-COUNT'
	}
}


export const incrementAgeActionCreator = (): IncrementAgeActionType => {
	return {
		type: 'INCREMENT-AGE'
	}
}
