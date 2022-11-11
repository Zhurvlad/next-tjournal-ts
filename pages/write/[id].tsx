import React from 'react';
import {GetServerSideProps, NextPage} from "next";
import {MainLayout} from '../../layouts/MainLayout';
import WriteForm from '../../components/WriteForm';
import {Api} from "../../utils/api";
import {PostDto} from "../../utils/api/types";

interface WritePageProps {
    post: PostDto
}

const WritePage: NextPage<WritePageProps> = ({post}) => {
    return (
        <MainLayout className={'main-layout-white'} hideMenu hideComments>
            <WriteForm data={post}/>
        </MainLayout>
    );
};

//Достаём айди статьи чтобы перейти на страницу с постом и проверяем
// есть ли права у пользователи для редактирования статьи
export const getServerSideProps: GetServerSideProps = async ctx => {
    try {
        const postId = ctx.params.id
        const post = await Api(ctx).post.getOne(+postId)
        const user = await Api(ctx).user.getMe()


        if (post.user.id !== user.id) {
            return {
                props: {},
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        }

        return {
            props: {
                post
            }
        }
    } catch (e) {
        console.log('Write page', e)
        return {
            props: {},
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
}

export default WritePage

