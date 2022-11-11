import {Post} from '../components/Post';
import {MainLayout} from '../layouts/MainLayout';
import {Api} from "../utils/api";
import {GetServerSideProps, NextPage} from "next";
import {PostDto} from "../utils/api/types";

interface HomeProps {
    posts: PostDto[]
}


const Home: NextPage<HomeProps> = ({posts}) => {



    return (
        <MainLayout>
            {posts?.map((postObj, i) => <Post key={postObj.createdAt} id={postObj.id} title={postObj.title}
                                              description={postObj.description} />)}
        </MainLayout>
    )
}

//Делаем запрос на получение статей с бэкенда для дальнейшего их рендеринга
export const getServerSideProps:GetServerSideProps = async ctx => {
    try {
        //Необходимо делать async await т.к. функция ниже возвращает промис а он всегда = true
        const posts = await Api(ctx).post.getAll()
        return {
            props: {
                posts
            }
        }
    } catch (e) {
        console.log(e)
    }
    return {
        props: {
            posts: null
        }
    }
}

export default Home