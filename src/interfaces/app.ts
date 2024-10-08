import { iUserDetail } from '@/interfaces/auth';
import { RouteConfig } from 'vue-router';

export interface iMenu {
    name: string
    path: string
    [propName: string]: any
}

export interface RequestParams {
    [propName: string]: any
}

export interface RequestQuery {
    params?: RequestParams
}

export interface iImage {
    id: string
    url: string,
    image_url: string,
    file?: ArrayBuffer | null
    [propName: string]: any
}

export interface iResponse<T> {
    data: Array<T>
    current_page: number
    per_page: number
    last_page: number
    total: number
    [propName: string]: any
}

export interface iRealStateResponse {
    data: Array<iRealState>
    current_page: number
    per_page: number
    last_page: number
    total: number
    [propName: string]: any
}

export interface iService extends Record<string, number> { }

export interface iRealState {
    id?: string
    location: string
    rate: string
    unit: string
    excerpt: string
    description: string
    created_at?: string
    published?: boolean
    images?: Array<iImage>
    detail?: iService
    [propName: string]: any
    users?:Array<iUserDetail>
}

export interface iRentResponse {
    data: Array<iRent>
    current_page: number
    per_page: number
    last_page: number
    total: number
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

export type newRouteConfig = RouteConfig & {
    meta: {
        layout: string
        type: string
    }
    [propName: string]: any
}

export interface iResponse<T> {
    data: Array<T>
    current_page: number
    per_page: number
    last_page: number
    total: number
}

export const responseInit = {
    data: [],
    current_page: 0,
    per_page: 0,
    last_page: 0,
    total: 0,
}