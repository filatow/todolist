import { LoginArgs } from '../api/authApi.types'
import { AppDispatch } from '../../../app/store'
import { setAppStatusAC } from '../../../app/app-reducer'
import { authApi } from '../api/authApi'
import { ResultCode } from '../../todolists/lib/enums/enums'
import { handleServerAppError, handleServerNetworkError } from 'common/utils'

type InitialStateType = typeof initialState

const initialState = {
	isLoggedIn: false,
	isInitialized: false
}

export const authReducer = (
	state: InitialStateType = initialState,
	action: AuthAction
): InitialStateType => {
	switch (action.type) {
		case 'SET_IS_LOGGED_IN':
			return { ...state, isLoggedIn: action.payload.isLoggedIn }
		case 'SET_IS_INITIALIZED':
			return { ...state, isInitialized: action.payload.isInitialized }
		default:
			return state
	}
}
// Action creators
const setIsLoggedInAC = (isLoggedIn: boolean) => {
	return { type: 'SET_IS_LOGGED_IN', payload: { isLoggedIn } } as const
}

const setIsInitializedAC = (isInitialized: boolean) => {
	return { type: 'SET_IS_INITIALIZED', payload: { isInitialized } } as const
}

// Actions types
export type SetIsLoggedInAction = ReturnType<typeof setIsLoggedInAC>
export type SetIsInitializedAction = ReturnType<typeof setIsInitializedAC>

export type AuthAction = SetIsLoggedInAction | SetIsInitializedAction

// thunks
export const loginTC = (data: LoginArgs) => (dispatch: AppDispatch) => {
	dispatch(setAppStatusAC('loading'))
	authApi
		.login(data)
		.then((res) => {
			if (res.data.resultCode === ResultCode.Success) {
				dispatch(setAppStatusAC('succeeded'))
				dispatch(setIsLoggedInAC(true))
				localStorage.setItem('sn-token', res.data.data.token)
			} else {
				handleServerAppError(res.data, dispatch)
			}
		})
		.catch((error) => {
			handleServerNetworkError(error, dispatch)
		})
}

export const logoutTC = () => (dispatch: AppDispatch) => {
	dispatch(setAppStatusAC('loading'))
	authApi
		.logout()
		.then((res) => {
			if (res.data.resultCode === ResultCode.Success) {
				dispatch(setAppStatusAC('succeeded'))
				dispatch(setIsLoggedInAC(false))
				localStorage.removeItem('sn-token')
			} else {
				handleServerAppError(res.data, dispatch)
			}
		})
		.catch((error) => {
			handleServerNetworkError(error, dispatch)
		})
}

export const initializeAppTC = () => (dispatch: AppDispatch) => {
	dispatch(setAppStatusAC('loading'))
	authApi
		.me()
		.then((res) => {
			if (res.data.resultCode === ResultCode.Success) {
				dispatch(setAppStatusAC('succeeded'))
				dispatch(setIsLoggedInAC(true))
			} else {
				handleServerAppError(res.data, dispatch)
			}
		})
		.catch((error) => {
			handleServerNetworkError(error, dispatch)
		})
		.finally(() => {
			dispatch(setIsInitializedAC(true))
		})
}