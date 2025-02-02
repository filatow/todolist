import { SubmitHandler, useForm } from 'react-hook-form'
import { LoginArgs } from '../../api/authApi.types'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { useLoginMutation } from '../../api/authApi'
import { selectIsLoggedIn, selectTheme, setIsLoggedIn } from '../../../../app/appSlice'
import { getTheme } from 'common/theme'
import { ResultCode } from '../../../todolists/lib/enums/enums'


export const useLogin = () => {
	const dispatch = useAppDispatch()
	const [login] = useLoginMutation()

	const isLoggedIn = useAppSelector(selectIsLoggedIn)
	const themeMode = useAppSelector(selectTheme)
	const theme = getTheme(themeMode)

	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors }
	} = useForm<LoginArgs>({
		defaultValues: {
			email: process.env.ITI_API_EMAIL,
			// email: 'free@samuraijs.com',
			password: process.env.ITI_API_PASSWORD,
			// password: 'free',
			rememberMe: false
		}
	})

	const onSubmit: SubmitHandler<LoginArgs> = (data) => {
		login(data)
			.then((res) => {
				if (res.data?.resultCode === ResultCode.Success) {
					dispatch(setIsLoggedIn({ isLoggedIn: true }))
					localStorage.setItem('sn-token', res.data.data.token)
				}
			})
			.finally(() => {
				reset()
			})
	}

	return {isLoggedIn, theme, handleSubmit, onSubmit, register, control, errors}
}
