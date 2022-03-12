import React, { useState } from 'react'
import { Grid } from '@mui/material'
import AuthWrapper from '../../containers/AuthWrapper/AuthWrapper'
import FormControl from '../../components/FormControl/FormControl'
import { Button } from '../../components/UI/Button/button'
import { useHistory, useLocation } from 'react-router'
import * as Styles from './auth'
import { useSelector } from 'react-redux'
import { loginUser, registerUser } from '../../app/auth/authSlice'
import useFormControl, { useFormControlPasswordCheck } from '../../Hooks/FormControl'
import useSubmit from '../../Hooks/Submit'


function Auth() {
    const { pathname } = useLocation()
    const history = useHistory()
    const deviceFingerprint = useSelector(state => state.deviceFingerprint.deviceFingerprint)
    const { handleSubmit } = useSubmit()
    const [passwordError, setPasswordError] = useState('')
    
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



    return (
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
                                { !deviceFingerprint ? 'loading ID' : (pathname === '/signup' ? 'Create my wallet' : 'Access my wallet') }
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={1} md={3} />
                </Grid>
            </Styles.Form>
        </AuthWrapper>
    )
}

export default Auth
