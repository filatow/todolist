import s from './Page404.module.css'
import Button from '@mui/material/Button'
import { Link } from 'react-router'
import Grid from '@mui/material/Grid'
import { Path } from 'common/utils/types/path'

export const Page404 = () => {
	return (
		<>
			<Grid
				container
				direction={'column'}
				sx={{
					alignItems: 'center'
				}}
			>
				<h1 className={s.title}>404</h1>
				<h2 className={s.subTitle}>page not found</h2>
				<Button component={Link} to={Path.Main} variant={'contained'}>
					На главную страницу
				</Button>
			</Grid>
		</>
	)
}
