import React from 'react';
import Input from '@material-ui/core/Input'
import styles from './WriteForm.module.scss'
import dynamic from "next/dynamic";
import {TextsmsOutlined as MessageIcon} from "@material-ui/icons";
import {Button} from "@material-ui/core";
import {Api} from "../../utils/api";
import {PostDto} from "../../utils/api/types";
import {useRouter} from "next/router";

//Динаически подгружаем импорт на клиенской части
const Editor = dynamic(() => import('../Editor').then(n => n.Editor), {ssr: false})

interface WriteFormProps {
    data?: PostDto
}

 const WriteForm: React.FC<WriteFormProps> = ({data}) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = React.useState(false)
    const [titleValue, setTitleValue] = React.useState(data?.title || '')
    const [textValue, setValueText] = React.useState(data?.body || [])

    const onAddPost = async () => {
        try {
            setIsLoading(true)
            const obj = {
                title: titleValue,
                body: textValue
            }
           if(!data){
               const post = await Api().post.create(obj)
               await router.push(`/write/${post.id}`)
           } else {
              await Api().post.update(data.id, obj)
           }
            /*if(!isLoading){
                setValueText([])
                setTitleValue('')
            }*/
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <Input value={titleValue} onChange={e => setTitleValue(e.target.value)} classes={{root: styles.titleField}}
                   placeholder={'Заголовок'} defaultValue={titleValue}/>
            <div className={styles.editor}>
                <Editor initialText={data?.body} onChange={text => setValueText(text)}/>
            </div>
            <Button disabled={isLoading || !textValue.length || !titleValue} onClick={onAddPost} variant="contained" color="primary">
                <MessageIcon className="mr-10"/>
                {data ? 'Сохранить' : 'Опубликовать'}
            </Button>
        </div>

    );
};

export default WriteForm