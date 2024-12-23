import { AppDispatch } from '../../app/store'
import { setAppErrorAC, setAppStatusAC } from '../../app/app-reducer'

export const handleServerNetworkError = (error: { message: string }, dispatch: AppDispatch) => {
	dispatch(setAppErrorAC(error.message))
	dispatch(setAppStatusAC('failed'))
}
