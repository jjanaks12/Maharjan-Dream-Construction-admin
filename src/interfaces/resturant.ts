export interface iDeskResponse {
    data: Array<iDesk>
    current_page: number
    per_page: number
    last_page: number
    total: number
    [propName: string]: any
}

export interface iDesk {
    id?: string
    name: string
    [propName: string]: any
}

export interface iMenuResponse {
    data: Array<iMenu>
    current_page: number
    per_page: number
    last_page: number
    total: number
    [propName: string]: any
}

export interface iMenu {
    id?: string
    name: string
    parent_id?: string
    excerpt: string
    description: string
    price: string
    quantity: number
    deleted?: string
    created_at?: string
    updated_at?: string
    children?: Array<iMenu>
    [propName: string]: any
}