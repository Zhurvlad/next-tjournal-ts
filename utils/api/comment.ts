import {AxiosInstance} from "axios";
import {OutputData} from "@editorjs/editorjs";
import {CommentDto, PostDto} from "./types";

type CreateCommentDto = {
    postId: number,
    text: string
}


//Создаём функцию для запроса статей с БД
export const CommentApi = (instance: AxiosInstance) => (
    {
        async getAll(postId: number) {
            //Передаем айди статьи к которой мы присали комментарии
            const {data} = await instance.get<CommentDto[]>('/comments',{params: {postId}})
            return data
        },
        async create(dto: CreateCommentDto) {
            const {data} = await instance.post<CreateCommentDto, { data: CommentDto }>('/comments', dto)
            return data
        },
        async remove(id: number) {
           await instance.delete<number>(`/comments/${id}`)
        }
    }
)