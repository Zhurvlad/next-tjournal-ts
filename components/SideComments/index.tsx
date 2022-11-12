import React from 'react';
import ArrowRightIcon from '@material-ui/icons/NavigateNextOutlined';

import styles from './SideComments.module.scss';
import {CommentItem} from "./CommentItem";
import {comments} from '../../data'
import clsx from "clsx";
import {Api} from "../../utils/api";
import {useAppSelector} from "../../redux/hooks";
import {selectUserData} from "../../redux/slices/user";
import {CommentDto} from "../../utils/api/types";
import {useComments} from "../../hooks/useComments";




export const SideComments = () => {
    /*const items = comments[activeSort !== 0 ? 'new' : 'popular' ]*/
    const {comments, setComments} = useComments()

    const [hideComments, setHideComments] = React.useState(true)

    const toggleVisibleComments = () => {
        setHideComments(!hideComments)
    }



    return (
        <div className={clsx(styles.root, !hideComments && styles.rotated)}>
            <h3 onClick={toggleVisibleComments}>
                Комментарии <ArrowRightIcon/>
            </h3>
            {hideComments &&  comments.map((obj) => (
                <CommentItem {...obj} key={obj.id}/>
            ))}
        </div>
    );
};
