import { iRealState, iRent } from '@/interfaces/app';
import { iUserDetail } from '@/interfaces/auth'

export enum AvailabilityType {
    REALSTATE = 'realstate',
    RENT = 'rent'
}

export enum AppointmentStatus {
    REQUESTED = 'requested',
    ACCEPTED = 'accepted',
    REJECTED = 'rejected',
    // DELAYED = 'delayed',
}

export interface availability {
    id?: string
    user: iUserDetail
    type: AvailabilityType  
    status: AppointmentStatus
    realstate?: iRealState
    rent?: iRent
    date: string
}

export interface availabilityResponse {
    data: Array<availability>
    current_page: number
    per_page: number
    last_page: number
    total: number
    [propName: string]: any
}