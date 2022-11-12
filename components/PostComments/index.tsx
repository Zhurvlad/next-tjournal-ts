import React from 'react';
import {Divider, Paper, Tab, Tabs, Typography} from "@material-ui/core";
import {Comment} from "../Comment";
import {AddCommentForm} from "../AddComentForm";
import {comments} from '../../data'
import {Api} from "../../utils/api";
import {CommentDto} from "../../utils/api/types";
import {useAppSelector} from "../../redux/hooks";
import {selectUserData} from "../../redux/slices/user";
import {useComments} from "../../hooks/useComments";

type TComment = {
    text: string,
    id: number,
    createdAt: string,
    user: {
        fullName: string,
        avatarUrl: string
    }
}

interface PostCommentsProps {
    items: TComment[],
    postId: number
}

export const PostComments: React.FC<PostCommentsProps> = ({postId}) => {
    const userData = useAppSelector(selectUserData)
    const [activeSort, setActiveSort] = React.useState(0)
    const [isCommentsLoading, setIsCommentsLoading] = React.useState(true)

    const {comments, setComments} = useComments(postId)

    /*const items = comments[activeSort !== 0 ? 'new' : 'popular' ]*/
    /*const [comments, setComments] = React.useState<CommentDto[]>([])*/




    const onAddComment = (obj: CommentDto) => {
        setComments(prevState => [...prevState, obj])
    }

    const onRemoveComment = (id: number) => {
        setComments(prevState => prevState.filter(obj => obj.id !== id))
    }

    return (
        <Paper elevation={0} className="mt-40 p-30">
            <div className={'container'}>
                <Typography variant="h6" className="mb-20">
                    42 комментария
                </Typography>
                <Tabs onChange={(_, newValue) => setActiveSort(newValue)} className="mt-20" value={activeSort}
                      indicatorColor="primary" textColor="primary">
                    <Tab label="Популярные"/>
                    <Tab label="По порядку"/>
                </Tabs>
                <Divider/>
                {userData && <AddCommentForm addComments={onAddComment} postId={postId}/>}
                <div className="mb-20"/>

                {comments.map(obj => <Comment key={obj.id}
                                              onRemoveComment={onRemoveComment}
                                              id={obj.id}
                                              createdAt={obj.createdAt}
                                              text={obj.text}
                                              user={obj.user}
                                              currentUserId={userData?.id}/>
                                              )}

            </div>
        </Paper>
    );
};

