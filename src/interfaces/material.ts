import { iImage } from "./app"
import { iVendor } from "./vendor"

export interface iMaterialResponse {
    data: Array<iMaterial>
    current_page: number
    per_page: number
    last_page: number
    total: number
    [propName: string]: any
}

export interface iMaterial {
    id?: string
    name: string
    description: string
    quantity: string
    measurement_unit: string
    created_at?: string
    price: string
    material_category_id: number | ''
    vendor_id: number | ''
    images?: Array<iImage>
    [propName: string]: any
    vendor?: iVendor
}

export interface iMaterialCategoryResponse {
    data: Array<iMaterialCategory>
    current_page: number
    per_page: number
    last_page: number
    total: number
    [propName: string]: any
}

export interface iMaterialCategory {
    id?: number
    title: string
    description: string
    [propName: string]: any
}