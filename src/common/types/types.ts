export type BaseResponse<Data = {}> = {
	resultCode: number
	messages: string[]
	fieldsErrors: FieldError[]
	data: Data
}

export type FieldError = {
	error: string
	field: string
}
