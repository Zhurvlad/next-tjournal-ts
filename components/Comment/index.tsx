import React from 'react';
import {Typography, IconButton, MenuItem, Menu, Avatar} from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreHorizOutlined';

import styles from './Comment.module.scss';
import {ResponseCreateUser} from '../../utils/api/types';
import {Api} from "../../utils/api";

interface CommentPostProps {
    id: number,
    user: ResponseCreateUser;
    text: string;
    createdAt: string,
    currentUserId: number,
    onRemoveComment: (id: number) => void
}

export const Comment: React.FC<CommentPostProps> = ({id, onRemoveComment, user, text, createdAt, currentUserId}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onRemove = async () => {
        try {
          await Api().comment.remove(+id)
            onRemoveComment(id)

        } catch (e) {
            console.log('Ошибка при удалении комментария',e)
        } finally {
            handleClose()
        }
    }

    return (

        <div className={styles.comment}>
            <div className={styles.userInfo}>
                <Avatar style={{marginRight: 10}}>{user.fullName[0]}</Avatar>
                <b>{user.fullName}</b>
                <span>{createdAt}</span>
            </div>
            <Typography className={styles.text}>
                {text}
            </Typography>


            {currentUserId === user.id
            &&
            <>
                <span className={styles.replyBtn}>Ответить</span>
                <IconButton onClick={handleClick}>
                    <MoreIcon/>
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    elevation={2}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    keepMounted>
                    <MenuItem onClick={onRemove}>Удалить</MenuItem>
                    <MenuItem onClick={handleClose}>Редактировать</MenuItem>
                </Menu>
            </>}
        </div>
    );
};
