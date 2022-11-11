import {MainLayout} from '../../layouts/MainLayout';
import {FullPost} from '../../components/FullPost';
import React from 'react';
import {PostComments} from "../../components/PostComments";
import {GetServerSideProps, NextPage} from "next";
import {Api} from "../../utils/api";
import {PostDto} from "../../utils/api/types";

type FullPostPageProps = {
    post: PostDto
}

const  FullPostPage: NextPage<FullPostPageProps> = ({post}) =>  {
    return (
        <MainLayout className="mb-50" contentFullWidth>
            <FullPost  title={post.title} blocks={post.body}/>
            <PostComments />
        </MainLayout>
    );
}

export const getServerSideProps: GetServerSideProps = async ctx => {
    try {
        const postId = ctx.params.id
        const post = await Api(ctx).post.getOne(+postId)

        return {
            props: {
                post
            }
        }
    } catch (e) {
        console.log('Full post page', e)
        return {
            props: {},
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
}

export default FullPostPage