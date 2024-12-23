import React, { SyntheticEvent } from 'react'
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { selectAppError } from '../../../app/appSelectors'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { setAppErrorAC } from '../../../app/app-reducer'

export const ErrorSnackbar = () => {
	const dispatch = useAppDispatch()
	const error = useAppSelector(selectAppError)

	const handleClose = (event: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
		if (reason === 'clickaway') {
			return
		}
		dispatch(setAppErrorAC(null))
	}

	return (
		<div>
			<Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
					{error}!
				</Alert>
			</Snackbar>
		</div>
	)
}
