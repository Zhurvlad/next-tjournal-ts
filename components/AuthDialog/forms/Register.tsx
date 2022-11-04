import React from 'react';
import {Button, Divider} from "@material-ui/core";
import {FormField} from "../../FormField";
import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import { RegisterSchema} from "../../../utils/validation";
import {CreateUserDto} from "../../../utils/api/types";
import {UserApi} from "../../../utils/api";
import {setCookie} from "nookies";
import {Alert} from "@material-ui/lab";

interface RegisterFormProps {
    onOpenLogin: (l: 'login') => void
}

export const RegisterForm: React.FC<RegisterFormProps> = ({onOpenLogin}) => {
    const [errorMessage, setErrorMessage] = React.useState('')


    const form = useForm({
        mode: 'onChange',
        resolver: yupResolver(RegisterSchema)
    });

    const onSubmit = async (dto:CreateUserDto) => {
        try {
            const data = await UserApi.register(dto)
            console.log(data)
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
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} >
                <FormField textFieldName={'fullName'} label={"Никнэйм"}/>
                <FormField textFieldName={'email'} label={'Почта'}/>
                <FormField textFieldName={'password'} label={'Пароль'}/>
                {errorMessage && <Alert severity="error" className={'mb-10'}>{errorMessage}</Alert>}
                <Divider className="mt-30 mb-20"/>
                <div className={'d-flex align-center justify-between'}>
                    <Button disabled={!form.formState.isValid || form.formState.isSubmitting} type={'submit'} color="primary" variant="contained">
                        Зарегестрироваться
                    </Button>
                    <Button onClick={() => onOpenLogin("login")} color="primary" variant="text">
                        Войти
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
};
