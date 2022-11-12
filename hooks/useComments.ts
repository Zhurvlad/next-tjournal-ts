import React from "react";
import {Api} from "../utils/api";
import {CommentDto} from "../utils/api/types";

type useCommentsProps = {
    comments:  CommentDto[],
    setComments: (com: CommentDto[]) => void
}

export const useComments = (postId?: number): useCommentsProps => {
    const [comments, setComments] = React.useState<CommentDto[]>([])

    React.useEffect(() => {
        (async () => {
            try {

                const comments = await Api().comment.getAll(postId)
                setComments(comments)

            } catch (e) {
                console.warn('Ошибка получения комментариев', e)
            }
        })()
    }, [])

    return {comments, setComments}
}