import {AxiosInstance} from "axios";
import {OutputData} from "@editorjs/editorjs";
import { PostDto } from "./types";

type CreatePostDto = {
    title: string,
    body: OutputData['blocks'];
}

type SearchPostDto = {
    title?: string;
    body?: string;
    views?: 'DESC' | 'ASC';
    limit?: number;
    take?: number;
    tag?: string;
}


//Создаём функцию для запроса статей с БД
export const PostApi = (instance: AxiosInstance) => (
    {
        async getAll() {
            const {data} = await instance.get<PostDto[]>('/posts')
            return data
        },
        async getOne(id: number) {
            const {data} = await instance.get<PostDto>(`/posts/${id}`)
            return data
        },
        async create(dto: CreatePostDto) {
            const {data} = await instance.post<CreatePostDto, {data: PostDto}>('/posts', dto)
            return data
        },
        async update(id: number, dto: CreatePostDto) {
            const {data} = await instance.patch<CreatePostDto, {data: PostDto}>(`/posts/${id}`, dto)
            return data
        },
        async search(query: SearchPostDto) {
            const {data} = await instance.get<{items: PostDto[], total: number}>(`/posts/search`, {params: query})
            return data
        },
    }
)