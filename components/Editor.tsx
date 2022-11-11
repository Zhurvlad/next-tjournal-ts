import React from 'react';
import EditorJS, {OutputData} from "@editorjs/editorjs";

interface EditorProps {
    onChange: (textValue: OutputData['blocks']) => void,
    initialText?: OutputData['blocks']
}

export const Editor: React.FC<EditorProps> = ({onChange, initialText}) => {

    React.useEffect(() => {
        const editor = new EditorJS({
            holder: 'editor',
            data: {
                blocks: initialText
            },
            placeholder: 'Введите текс вашей статьи',
            //Достаём из эдитора написанный нами текст
            async onChange() {
                const {blocks} = await editor.save()
                onChange(blocks)
            }
        })

        return () => {
            editor.isReady
                .then(() => {
                    editor.destroy()
                })
                .catch((e) => console.error("ERROR editor cleanup", e))
        }

    }, [])

    return (
        <div id={'editor'}/>
    );
};

