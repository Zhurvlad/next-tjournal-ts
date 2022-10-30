import React from 'react';
import {Divider, Paper, Tab, Tabs, Typography} from "@material-ui/core";
import {Comment} from "../Comment";
import {AddCommentForm} from "../AddComentForm";
import {comments} from '../../data'

type TComment = {
    text: string,
    id: number,
    createdAt: string,
    user: {
        fullname: string,
        avatarUrl: string
    }
}

interface PostCommentsProps {
    items: TComment[]
}

export const PostComments: React.FC = () => {

    const [activeSort, setActiveSort] = React.useState(0)

    const items = comments[activeSort !== 0 ? 'new' : 'popular' ]

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
                <AddCommentForm/>
                <div className="mb-20"/>

                {items.map(obj => <Comment key={obj.id} createdAt={obj.createdAt} text={obj.text} user={obj.user}/>)}

            </div>
        </Paper>
    );
};

