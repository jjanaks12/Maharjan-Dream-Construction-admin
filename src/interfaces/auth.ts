import { iTrainingUser } from '@/interfaces/training'

export interface iLogin {
    email: string
    password: string
    [propName: string]: any
}

export interface userResponse {
    data: Array<iUserDetail>
    current_page: number
    per_page: number
    last_page: number
    total: number
    [propName: string]: any
}

export interface iUserDetail {
    id?: string
    name: string
    email: string
    phone: string
    address: string
    password?: string
    confirm_password?: string
    photo?: string
    token?: string
    citizenship_front?: string | null
    citizenship_back?: string | null
    email_verified_at?: string
    created_at?: string
    pivot?: iTrainingUser
    [propName: string]: any
}

export interface iErrorMessage {
    [propName: string]: Array<string>
}