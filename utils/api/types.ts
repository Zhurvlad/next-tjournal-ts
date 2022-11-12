import {OutputData} from "@editorjs/editorjs";

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
    commentsCount?: number
} & CreateUserDto

export type PostDto = {
    title: string,
    body: OutputData['blocks'],
    description: string,
    tags: null | string,
    user: ResponseCreateUser
    id: number,
    views: number,
    createdAt: string,
    updatedAt: string
}

export type CommentDto = {
    id: number,
    post: PostDto,
    user: ResponseCreateUser
    text: string
    createdAt: string,
    updatedAt: string
}