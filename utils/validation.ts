import * as yup from "yup";


export const LoginSchema = yup.object().shape({
    email: yup.string().email("Некорректная почта").required("Это поле обязательное"),
    password: yup.string().min(6, "Слишком короткий пароль").required("Это поле обязательное")
})


export const RegisterSchema = yup.object().shape({
    fullName: yup.string().min(6, "Слишком короткий пароль").required("Это поле обязательное")
}).concat(LoginSchema)