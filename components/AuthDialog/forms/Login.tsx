import React from 'react';
import {Button, Divider} from "@material-ui/core";
import { yupResolver } from '@hookform/resolvers/yup';

import {useForm, FormProvider} from "react-hook-form";
import {LoginSchema} from "../../../utils/validation";
import {FormField} from "../../FormField";


interface LoginFormProps {
    onOpenRegister: (n:'registration') => void
}

export const LoginForm: React.FC<LoginFormProps> = ({onOpenRegister}) => {

    const form = useForm({
        mode: 'onChange',
        resolver: yupResolver(LoginSchema)
    });

    const onSubmit = (data) => console.log(data)

    return (
        <div>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} >

                    <FormField textFieldName={'email'} label={"Эл. почта"}/>
                    <FormField textFieldName={'password'} label={'Пароль'}/>
                    <Divider className="mt-30 mb-20"/>
                    <div className={'d-flex align-center justify-between'}>
                        <Button disabled={!form.formState.isValid} type={'submit'} color="primary" variant="contained">
                            Войти
                        </Button>
                        <Button onClick={() => onOpenRegister('registration') }  color="primary" variant="text">
                            Регистрация
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
};

