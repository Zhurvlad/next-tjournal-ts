export type CreateUserDto = {
    fullName: string,
} & LoginDto

export type LoginDto = {
    email: string,
    password: string,
}

export type ResponseCreateUser = {
    createdAt: string,
    id: number,
    email: string,
    token: string,
    updatedAt: string
} & CreateUserDto