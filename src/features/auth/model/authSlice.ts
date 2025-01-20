import { LoginArgs } from '../api/authApi.types'
import { AppDispatch } from '../../../app/store'
import { setAppStatus } from '../../../app/appSlice'
import { authApi } from '../api/authApi'
import { ResultCode } from '../../todolists/lib/enums/enums'
import { handleServerAppError, handleServerNetworkError } from 'common/utils'
import { createSlice } from '@reduxjs/toolkit'
import { clearTasksAndTodoLists } from 'common/actions/common.actions'

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		isLoggedIn: false,
		isInitialized: false
	},
	reducers: (create) => ({
		setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
			state.isLoggedIn = action.payload.isLoggedIn
		}),
		setIsInitialized: create.reducer<{ isInitialized: boolean }>((state, action) => {
			state.isInitialized = action.payload.isInitialized
		})
	}),
	selectors: {
		selectIsLoggedIn: (state) => state.isLoggedIn,
		selectIsInitialized: (state) => state.isInitialized
	}
})

export const authReducer = authSlice.reducer

const { setIsLoggedIn, setIsInitialized } = authSlice.actions

export const { selectIsLoggedIn, selectIsInitialized } = authSlice.selectors

// Actions types
export type SetIsLoggedInAction = ReturnType<typeof setIsLoggedIn>
export type SetIsInitializedAction = ReturnType<typeof setIsInitialized>

export type AuthAction = SetIsLoggedInAction | SetIsInitializedAction

// thunks
export const loginTC = (data: LoginArgs) => (dispatch: AppDispatch) => {
	dispatch(setAppStatus({ status: 'loading' }))
	authApi
		.login(data)
		.then((res) => {
			if (res.data.resultCode === ResultCode.Success) {
				dispatch(setAppStatus({ status: 'succeeded' }))
				dispatch(setIsLoggedIn({ isLoggedIn: true }))
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
	dispatch(setAppStatus({ status: 'loading' }))
	authApi
		.logout()
		.then((res) => {
			if (res.data.resultCode === ResultCode.Success) {
				dispatch(setAppStatus({ status: 'succeeded' }))
				dispatch(setIsLoggedIn({ isLoggedIn: false }))
				localStorage.removeItem('sn-token')
				dispatch(clearTasksAndTodoLists({ todoLists: [], tasks: {} }))
			} else {
				handleServerAppError(res.data, dispatch)
			}
		})
		.catch((error) => {
			handleServerNetworkError(error, dispatch)
		})
}

export const initializeAppTC = () => (dispatch: AppDispatch) => {
	dispatch(setAppStatus({ status: 'loading' }))
	authApi
		.me()
		.then((res) => {
			if (res.data.resultCode === ResultCode.Success) {
				dispatch(setAppStatus({ status: 'succeeded' }))
				dispatch(setIsLoggedIn({ isLoggedIn: true }))
			} else {
				handleServerAppError(res.data, dispatch)
			}
		})
		.catch((error) => {
			handleServerNetworkError(error, dispatch)
		})
		.finally(() => {
			dispatch(setIsInitialized({ isInitialized: true }))
		})
}
