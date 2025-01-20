import React, { SyntheticEvent } from 'react'
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { selectAppError, setAppError } from '../../../app/appSlice'
import { useAppDispatch } from 'common/hooks/useAppDispatch'

export const ErrorSnackbar = () => {
	const dispatch = useAppDispatch()
	const error = useAppSelector(selectAppError)

	const handleClose = (event: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
		if (reason === 'clickaway') {
			return
		}
		dispatch(setAppError({ error: null }))
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
