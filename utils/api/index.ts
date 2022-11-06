import axios from "axios";
import {CreateUserDto, LoginDto, ResponseCreateUser} from "./types";


const instance = axios.create({
    baseURL: 'http://localhost:8888'
})

export const UserApi = {
    async register(dto: CreateUserDto) : Promise<ResponseCreateUser> {
        const {data} = await instance.post<CreateUserDto, {data: ResponseCreateUser}>('/auth/register', dto)
        return data
    },
    async login(dto: LoginDto) : Promise<ResponseCreateUser>{
        const {data} = await instance.post<LoginDto,  {data: ResponseCreateUser}>('/auth/login', dto)
        return data
    },

    async getMe(token: string) {
        const {data} = await instance.get<ResponseCreateUser>('/users/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(data)
        return data
    }
}