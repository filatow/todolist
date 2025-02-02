import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import { Path } from 'common/utils/types/path'
import { useLogin } from '../../lib/hooks/useLogin'
import { LoginFormLabel } from './LoginFormLabel'
import { LoginForm } from './LoginForm'

export const Login = () => {
	const navigate = useNavigate()
	const { isLoggedIn } = useLogin()

	useEffect(() => {
		if (isLoggedIn) {
			navigate(Path.Main)
		}
	}, [isLoggedIn, navigate])

	return (
		<Grid container justifyContent={'center'}>
			<Grid item justifyContent={'center'}>
				<FormControl>
					<FormLabel>
						<LoginFormLabel />
						<LoginForm />
					</FormLabel>
				</FormControl>
			</Grid>
		</Grid>
	)
}
