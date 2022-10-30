import React from 'react';
import {Button, Divider} from "@material-ui/core";
import {FormField} from "../../FormField";
import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import { RegisterSchema} from "../../../utils/validation";

interface RegisterFormProps {
    onOpenLogin: (l: 'login') => void
}

export const RegisterForm: React.FC<RegisterFormProps> = ({onOpenLogin}) => {

    const form = useForm({
        mode: 'onChange',
        resolver: yupResolver(RegisterSchema)
    });

    const onSubmit = (data) => console.log(data)

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} >
                <FormField textFieldName={'nickname'} label={"Никнэйм"}/>
                <FormField textFieldName={'email'} label={'Почта'}/>
                <FormField textFieldName={'password'} label={'Пароль'}/>
                <Divider className="mt-30 mb-20"/>
                <div className={'d-flex align-center justify-between'}>
                    <Button disabled={!form.formState.isValid} type={'submit'} color="primary" variant="contained">
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
