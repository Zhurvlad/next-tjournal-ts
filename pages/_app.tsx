import Head from 'next/head';

import {Header} from '../components/Header';

import {MuiThemeProvider, CssBaseline} from '@material-ui/core';
import {theme} from '../theme';

import '../styles/globals.scss';
import 'macro-css';
import {Provider} from "react-redux";
import {store, wrapper} from '../redux/store';
import {parseCookies} from "nookies";
import {Api} from "../utils/api";
import {setUserData} from "../redux/slices/user";

function MyApp({Component, pageProps}) {

    return (
        <>
            <Head>
                <title>RJournal</title>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/>
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,400;1,500;1,700;1,900&display=swap"
                    rel="stylesheet"></link>
            </Head>
            <MuiThemeProvider theme={theme}>
                <CssBaseline/>
                <Header/>
                <Component {...pageProps} />
            </MuiThemeProvider>
        </>
    );
}

//Запрашиваем данные с бэка и смотрим авторизован ли пользователь
MyApp.getInitialProps = wrapper.getInitialAppProps(store => async ({ctx, Component}) => {
    try {
        const userData = await Api(ctx).user.getMe()
        store.dispatch(setUserData(userData))

    } catch (e) {
        //Проверяем авторизован ли пользователь. Если нет то редиректим его
        if(ctx.asPath === '/write'){
            ctx.res.writeHead(302, {
                Location: '/404'
            })
            ctx.res.end()
        }
    }
    return {
        pageProps: {
            ...(Component.getInitialProps ? await Component.getInitialProps({...ctx, store}) : {}),
        },
    }
})

export default wrapper.withRedux(MyApp);
