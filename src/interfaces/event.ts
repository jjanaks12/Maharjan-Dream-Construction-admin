export interface iEvent {
    id?: string
    name: string
    slug?: string
    description?: string
    start: string
    end: string
    poster?: string
    created_at?: string
    updated_at?: string
}

export interface iEventParticipant {
    id?: string
    first_name: string
    middle_name?: string
    last_name: string
    date_of_birth: string
    guild_name: string
    game_name: string
    phone_type: PhoneType
    phone_number: string
}

export enum PhoneType {
    ADROID = 'android',
    IPHONE = 'iphone'
}

export const eventInit: iEvent = {
    name: '',
    description: '',
    start: '',
    end: ''
}

export const eventParticipantInit: iEventParticipant = {
    first_name: '',
    last_name: '',
    date_of_birth: '',
    guild_name: '',
    game_name: '',
    phone_type: PhoneType.ADROID,
    phone_number: '',
}