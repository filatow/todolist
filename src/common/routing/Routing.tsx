import { Route, Routes } from 'react-router'
import { Login } from '../../features/auth/ui/Login'
import Main from '../../app/Main'
import { Page404 } from 'common/components/Page404'
import { Path } from 'common/utils/types/path'

export const Routing = () => {
	console.log('Routing')
	return (
		<Routes>
			<Route path={Path.Login} element={<Login />} />
			<Route path={Path.Main} element={<Main />} />
			<Route path={Path.NotFound} element={<Page404 />} />
		</Routes>
	)
}
