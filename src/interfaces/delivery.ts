export interface iDelivery {
    id?: string
    name: string
    slug?: string
    weight: 1
    price: 1
}

export const deliveryInit: iDelivery = {
    name: '',
    slug: '',
    weight: 1,
    price: 1,
}