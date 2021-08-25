export interface iTrainingResponse {
    data: Array<iTraining>
    current_page: number
    per_page: number
    last_page: number
    total: number
    [propName: string]: any
}

export interface iTraining {
    id?: number
    title: string
    excerpt: string
    description: string
    duration: string
    duration_type: string
    price: string
    start_date: string
    [propName: string]: any
}

export interface iTrainingUser {
    amount: number
    order_status: number
    payment_status: number
    queried_at: string
    [propName: string]: any
}


export const trainingUserInit = {
    amount: 0,
    order_status: 0,
    payment_status: 0,
    queried_at: '',
}