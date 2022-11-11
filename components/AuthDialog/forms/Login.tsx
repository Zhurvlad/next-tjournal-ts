import React from 'react';
import {Button, Divider} from "@material-ui/core";
import { yupResolver } from '@hookform/resolvers/yup';

import {useForm, FormProvider} from "react-hook-form";
import {LoginSchema} from "../../../utils/validation";
import {FormField} from "../../FormField";
import {CreateUserDto, LoginDto} from "../../../utils/api/types";
import {UserApi} from "../../../utils/api/user";
import {setCookie} from "nookies";
import {Alert} from "@material-ui/lab";
import {useAppDispatch} from "../../../redux/hooks";
import {setUserData} from '../../../redux/slices/user'
import {Api} from "../../../utils/api";

interface LoginFormProps {
    onOpenRegister: (n:'registration') => void
}

export const LoginForm: React.FC<LoginFormProps> = ({onOpenRegister}) => {
    const [errorMessage, setErrorMessage] = React.useState('')
    const dispatch = useAppDispatch()

    const form = useForm({
        mode: 'onChange',
        resolver: yupResolver(LoginSchema)
    });

    const onSubmit = async (dto:LoginDto) => {
        try {
            const data = await Api().user.login(dto)
            dispatch(setUserData(data))
            //Сохраняем JWT токен
            setCookie(null, 'TJAuthToken', data.token, {
                maxAge: 30*24*60*60,
                path: '/'
            })
            setErrorMessage('')
        } catch (e){
            console.log('Произошла ошибка при регистрации')
            setErrorMessage(e.response?.data.message)
        }
    };


    return (
        <div>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} >

                    <FormField textFieldName={'email'} label={"Эл. почта"}/>
                    <FormField textFieldName={'password'} label={'Пароль'}/>
                    {errorMessage && <Alert severity="error" className={'mb-10'}>{errorMessage}</Alert>}
                    <Divider className="mt-30 mb-20"/>
                    <div className={'d-flex align-center justify-between'}>
                        <Button disabled={!form.formState.isValid || form.formState.isSubmitting} type={'submit'} color="primary" variant="contained">
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

