export interface iPage {
    id?: string
    title: string
    subtitle?: string
    slug?: string
    description?: string
    created_at?: string
    updated_at?: string
}

export const pageInit: iPage = {
    title: '',
    subtitle: '',
    description: '',
}