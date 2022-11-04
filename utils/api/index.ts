import axios from "axios";
import {CreateUserDto, LoginDto, ResponceCreateUser} from "./types";


const instance = axios.create({
    baseURL: 'http://localhost:8888/'
})

export const UserApi = {
    async register(dto: CreateUserDto) : Promise<ResponceCreateUser> {
        const {data} = await instance.post<CreateUserDto, {data: ResponceCreateUser}>('/auth/register', dto)
        return data
    },
    async login(dto: LoginDto) : Promise<ResponceCreateUser>{
        const {data} = await instance.post<LoginDto,  {data: ResponceCreateUser}>('/auth/login', dto)
        return data
    }
}