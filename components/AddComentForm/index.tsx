import React from 'react';
import Input from '@material-ui/core/Input'
import styles from './AddCommentForm.module.scss'
import {TextsmsOutlined as MessageIcon} from "@material-ui/icons";
import {Button} from "@material-ui/core";


interface AddCommentFormProps {

}

export const AddCommentForm: React.FC<AddCommentFormProps> = () => {

    const [inputActive, setInputActive] = React.useState(false)
    const [inputValue, setInputValue] = React.useState('')

    const onAddComment = () => {

        setInputActive(false)
        setInputValue('')
    }

    return (
        <div className={styles.commentForm}>
            <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} onFocus={() => setInputActive(true)} minRows={inputActive ? 5 : 1}
                   classes={{root: styles.inputCommentFrom}} placeholder={'Написать комментарий'} fullWidth multiline/>
            {inputActive && <Button onClick={onAddComment} className={styles.commentFormButton} variant="contained" color="primary">
                <MessageIcon className="mr-10"/>
                Опубликовать
            </Button>}
        </div>
    );
};

