import { RouteConfig } from 'vue-router';

export interface iMenu {
    name: string
    path: string
    [propName: string]: any
}

export interface iNotification {
    id: number
    detail: string
    created: string
    isRead?: boolean
    [propName: string]: any
}

export interface iImage {
    id?: number
    url: string,
    file?: ArrayBuffer | null
    [propName: string]: any
}

export interface iRealState {
    id?: number
    location: string
    rate: string
    unit: string
    excerpt: string
    description: string
    created_at?: string
    images?: Array<iImage>
    [propName: string]: any
}

export interface iMaterial {
    id?: number
    name: string
    description: string
    quantity: string
    measurement_unit: string
    created_at?: string
    price: string
    material_category_id: number | ''
    images?: Array<iImage>
    [propName: string]: any
}

export interface iRent {
    id?: number
    name: string
    machinery: string
    excerpt: string
    description: string
    created_at?: string
    price: string
    [propName: string]: any
}

export interface iMaterialCategory {
    id?: number
    title: string
    description: string
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

export type newRouteConfig = RouteConfig & {
    meta: {
        layout: string
        type: string
    }
    [propName: string]: any
}