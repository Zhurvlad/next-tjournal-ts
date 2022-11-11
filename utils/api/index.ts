import {UserApi} from "./user";
import {GetServerSidePropsContext, NextPageContext} from "next";
import Cookies, {parseCookies} from "nookies";
import axios from "axios";
import {PostApi} from "./post";

export type ApiReturnType = {
    user: ReturnType<typeof UserApi>
    post: ReturnType<typeof PostApi>
}

//Создали функцию которая отпределяет откуда доставать Cookies. Брать куки из контукста или брать из браузера
export const Api = (ctx?: NextPageContext | GetServerSidePropsContext): ApiReturnType => {
    const cookies = ctx ? Cookies.get(ctx) : parseCookies()
    const token = cookies.TJAuthToken

    const instance = axios.create({
        baseURL: 'http://localhost:8888/',
        headers: {
            Authorization: 'Bearer ' + token
        }
    })

    return {
        user: UserApi(instance),
        post: PostApi(instance)
    }
}
