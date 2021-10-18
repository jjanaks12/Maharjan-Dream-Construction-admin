import { iUserDetail } from "./auth"

export interface iNotification {
    id?: string
    type: string
    model_id: string
    operation: string
    user: iUserDetail
    created: string
    is_read?: number
    [propName: string]: any
}