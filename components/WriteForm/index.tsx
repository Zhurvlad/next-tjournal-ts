import React from 'react';
import Input from '@material-ui/core/Input'
import styles from './WriteForm.module.scss'
import dynamic from "next/dynamic";
import {TextsmsOutlined as MessageIcon} from "@material-ui/icons";
import {Button} from "@material-ui/core";

//Динаически подгружаем импорт на клиенской части
const Editor = dynamic(() => import('../Editor').then(n => n.Editor), {ssr: false})

interface WriteFormProps {
    title?: string
}

export const WriteForm: React.FC<WriteFormProps> = ({title}) => {


    return (
        <div>
            <Input classes={{root: styles.titleField}} placeholder={'Заголовок'} defaultValue={title}/>
            <div className={styles.editor}>
                <Editor/>
            </div>
            <Button variant="contained" color="primary">
                <MessageIcon className="mr-10"/>
                Опубликовать
            </Button>
        </div>

    );
};

