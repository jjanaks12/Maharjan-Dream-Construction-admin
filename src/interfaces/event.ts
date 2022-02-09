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

export const eventInit: iEvent = {
    name: '',
    description: '',
    start: '',
    end: ''
}