import React from 'react';
import Input from '@material-ui/core/Input'
import styles from './AddCommentForm.module.scss'
import {TextsmsOutlined as MessageIcon} from "@material-ui/icons";
import {Button} from "@material-ui/core";
import {Api} from "../../utils/api";
import {CommentDto} from "../../utils/api/types";
import {selectUserData} from '../../redux/slices/user';
import {useAppSelector} from '../../redux/hooks';


interface AddCommentFormProps {
    postId: number,
    addComments: (obj: CommentDto) => void
}

export const AddCommentForm: React.FC<AddCommentFormProps> = ({postId, addComments}) => {

    const [submitting, setSubmitting] = React.useState(false)
    const [inputActive, setInputActive] = React.useState(false)
    const [inputValue, setInputValue] = React.useState('')

    const onAddComment = async () => {
        try {
            const comment = await Api().comment.create({
                postId,
                text: inputValue
            })
            addComments(comment)
            setSubmitting(true)

            setInputActive(false)
            setInputValue('')
        } catch (e) {
            console.warn(e)
        }
    }


    return (
        <div className={styles.commentForm}>
            <Input disabled={submitting}
                   value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                   onFocus={() => setInputActive(true)} minRows={inputActive ? 5 : 1}
                   classes={{root: styles.inputCommentFrom}} placeholder={'Написать комментарий'} fullWidth multiline/>
            {inputActive
            && <Button disabled={submitting} onClick={onAddComment} className={styles.commentFormButton}
                       variant="contained" color="primary">
                <MessageIcon className="mr-10"/>
                Опубликовать
            </Button>}
        </div>
    );
};

