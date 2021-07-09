export interface iLogin {
    email: string
    password: string
    // rememberMe: boolean
    [propName: string]: any
}

export interface iUserDetail {
    name: string
    image: string
    [propName: string]: any
}

export interface iErrorMessage {
    [propName: string]: Array<string>
}