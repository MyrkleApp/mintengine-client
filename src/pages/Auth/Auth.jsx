import React, { Fragment, useState } from 'react'
import { Grid } from '@mui/material'
import AuthWrapper from '../../containers/AuthWrapper/AuthWrapper'
import FormControl from '../../components/FormControl/FormControl'
import { Button } from '../../components/UI/Button/button'
import { useHistory, useLocation } from 'react-router'
import * as Styles from './auth'
import { useSelector } from 'react-redux'
import { loginUser, registerUser, resetPassword } from '../../app/auth/authSlice'
import useFormControl, { useFormControlPasswordCheck } from '../../Hooks/FormControl'
import useSubmit from '../../Hooks/Submit'
import useModal from '../../Hooks/Modal'
import Modal from '../../components/UI/Modal/Modal'
import ModalResponse from '../../components/ModalResponse/ModalResponse'
import DB from '../../app/db'

function Auth() {
    const { pathname } = useLocation()
    const history = useHistory()
    const deviceFingerprint = useSelector(state => state.deviceFingerprint.deviceFingerprint)
    const { handleSubmit } = useSubmit()
    const [passwordError, setPasswordError] = useState('')
    const { modalState, handleModalOpen, handleModalClose } = useModal()
    const { 
        modalState: modalResponseState, 
        handleModalOpen: handleModalResponseOpen, 
        handleModalClose: handleModalResponseClose, 
    } = useModal()
    
    const {
        value: passwordValue,
        handleChange: handlePasswordChange,
        toggleVisibile: togglePasswordVisibile,
        typeForPasswordInput: typeForPasswordInput,
        handlePasswordBlur: handlePasswordBlur,
        errorText: passwordErrortext
    } = useFormControl()

    const {
        value: confirmPasswordValue,
        handleConfirmPasswordChange,
        toggleVisibile: toggleConfirmPasswordVisibile,
        typeForPasswordInput: typeForConfirmPasswordInput,
        errorText: confirmPasswordErrorText
    } = useFormControl()

    const { passwordsAreValid } = useFormControlPasswordCheck(passwordValue, confirmPasswordValue)

    const registerUserSuccessCallback = () => {
        history.push('/wallet-setup')
    }

    const loginUserSuccessCallback = () => {
        history.push('/wallet')
    }

    const authErrorCallback = (err) => {
        setPasswordError(err?.error[0])
    }

    const handleAuth = e => {
        e.preventDefault();

        if (pathname === '/signup') {
            const registerUserData = {
                password1: passwordValue,
                password2: confirmPasswordValue,
                deviceID: deviceFingerprint
            }
            handleSubmit(registerUser(registerUserData), registerUserSuccessCallback, authErrorCallback)
            
        } else if (pathname === '/login') {
            const loginUserData = {
                password: passwordValue,
                deviceID: deviceFingerprint
            }
            handleSubmit(loginUser(loginUserData), loginUserSuccessCallback, authErrorCallback)
        }
    }

    const forgotPasswordSuccessCallback = () => {
        const db = new DB()
        db.clearData()
        window.location.replace('https://mintengine.org')
    }

    const handleForgotPassword = () => {
        handleModalClose()
        handleSubmit(
            resetPassword({ deviceID: deviceFingerprint }), 
            forgotPasswordSuccessCallback,
            () => handleModalResponseOpen()
        )
    }



    return (
        <Fragment>
            <AuthWrapper>
                <Styles.Form onSubmit={handleAuth}>
                    <Grid container>
                        <Grid item xs={1} md={2} />
                        <Grid item container xs={10} md={7} rowSpacing={2} columnSpacing={1}>
                            <Grid item xs={12}>
                                <Styles.Title>{pathname === '/signup' ? 'sign up' : 'login'}</Styles.Title>
                            </Grid>
                            <FormControl
                                icon
                                label="Password"
                                value={passwordValue}
                                handleChange={handlePasswordChange}
                                type={typeForPasswordInput}
                                toggleShowPassword={togglePasswordVisibile}
                                handleBlur={handlePasswordBlur}
                                errorText={pathname === '/signup' && passwordErrortext}
                            />
                            <p style={{ fontSize: '15px', color: 'red', marginTop: '-5px', marginLeft: '10px' }}>
                                {passwordError}
                            </p>
                            { pathname === '/signup' && (
                                <FormControl
                                    icon
                                    label="Confirm Password"
                                    value={confirmPasswordValue}
                                    handleChange={(e) => handleConfirmPasswordChange(e, passwordValue)}
                                    type={typeForConfirmPasswordInput}
                                    toggleShowPassword={toggleConfirmPasswordVisibile}
                                    errorText={confirmPasswordErrorText}
                                />
                            )}
                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    type="submit"
                                    disabled={(pathname === '/signup' && !passwordsAreValid) || (pathname === '/login' && passwordValue.trim().length < 8) || !deviceFingerprint}
                                >
                                    { !deviceFingerprint ? 'loading ID...' : (pathname === '/signup' ? 'Create my wallet' : 'Access my wallet') }
                                </Button>
                                <Styles.ForgotPassword onClick={() => handleModalOpen()}>
                                    Forgot Password?
                                </Styles.ForgotPassword>
                            </Grid>
                        </Grid>
                        <Grid item xs={1} md={3} />
                    </Grid>
                </Styles.Form>
            </AuthWrapper>

            {/* reset password modal */}
            <Modal open={modalState} handleClose={handleModalClose}>
                <Styles.ModalTitle>Reset Password</Styles.ModalTitle>
                <Styles.Text>
                    This option will remove this account and all wallet associated with it from this device.
                </Styles.Text>
                <Button fullWidth onClick={handleForgotPassword}>Remove Account</Button>
            </Modal>

            {/* response modal */}
            <Modal open={modalResponseState} handleClose={handleModalResponseClose}>
                <ModalResponse
                    success={false}
                    title={'error'}
                    description={
                        'Something went wrong while trying to remove this account'
                    }
                />
            </Modal>
        </Fragment>
    )
}

export default Auth
