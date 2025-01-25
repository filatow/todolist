import { LoginArgs } from './authApi.types'
import { instance } from 'common/instance/instance'
import { BaseResponse } from 'common/types'
import { baseApi } from '../../../app/baseApi'

export const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		me: builder.query<BaseResponse<{ id: number; email: string; login: string }>, void>({
			query: () => 'auth/me'
		}),
		login: builder.mutation<BaseResponse<{ userId: number; token: string }>, LoginArgs>({
			query: (payload) => ({
				method: 'POST',
				url: `auth/login`,
				body: payload
			})
		}),
		logout: builder.mutation<BaseResponse, void>({
			query: () => ({
				method: 'DELETE',
				url: `auth/logout`
			})
		})
	})
})

export const { useMeQuery, useLoginMutation, useLogoutMutation} = authApi

export const _authApi = {
	login(payload: LoginArgs) {
		return instance.post<BaseResponse<{ userId: number; token: string }>>('auth/login', payload)
	},
	logout() {
		return instance.delete<BaseResponse>('auth/login')
	},
	me() {
		return instance.get<BaseResponse<{ id: number; email: string; login: string }>>('auth/me')
	}
}
