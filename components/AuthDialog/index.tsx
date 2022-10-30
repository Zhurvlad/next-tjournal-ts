import React from 'react';
import {Button, Dialog, DialogContent, DialogContentText, Divider, TextField, Typography} from "@material-ui/core";
import styles from './AuthDialog.module.scss'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {MainFrom} from "./forms/Main";
import {LoginForm} from "./forms/Login";
import {RegisterForm} from "./forms/Register";

interface AuthDialogProps {
    open: boolean,
    setOpen: (b: boolean) => void
}

export const AuthDialog: React.FC<AuthDialogProps> = ({open, setOpen}) => {

    const [formType, setFormType] = React.useState<'main' | 'login' | 'registration'>('main')

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                maxWidth={'xs'}
                fullWidth
            >
                <DialogContent>
                    <DialogContentText>
                        <div className={styles.content}>
                            <Typography className={styles.title}>
                                {formType === 'main'
                                    ? 'Войти в RJ'
                                    : <>
                                        <p onClick={() => setFormType('main')} className={styles.backTitle}>
                                            <ArrowBackIcon/> К авторизации</p>
                                    </>}
                            </Typography>
                            {formType === 'main' &&
                                <MainFrom onOpenLogin={setFormType}/>
                            }
                            {formType === 'login' &&
                                <LoginForm onOpenRegister={setFormType}/>
                            }
                            {formType === 'registration' &&
                                <RegisterForm onOpenLogin={setFormType}/>
                            }
                        </div>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}




