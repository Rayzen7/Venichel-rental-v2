import { AxiosError } from "axios"

export function getErrorMessage(error: unknown): string {
    const errorMessage = error as AxiosError<{ message: string }>
    return errorMessage.response?.data?.message || 'Axios Error'
}