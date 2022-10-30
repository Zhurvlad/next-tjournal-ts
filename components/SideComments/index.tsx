import React from 'react';
import ArrowRightIcon from '@material-ui/icons/NavigateNextOutlined';

import styles from './SideComments.module.scss';
import {CommentItem} from "./CommentItem";
import {comments} from '../../data'
import clsx from "clsx";




export const SideComments = () => {

    const [hideComments, setHideComments] = React.useState(true)

    const toggleVisibleComments = () => {
        setHideComments(!hideComments)
    }

    return (
        <div className={clsx(styles.root, !hideComments && styles.rotated)}>
            <h3 onClick={toggleVisibleComments}>
                Комментарии <ArrowRightIcon/>
            </h3>
            {hideComments &&  comments.popular.map((obj) => (
                <CommentItem {...obj} key={obj.id}/>
            ))}
        </div>
    );
};
