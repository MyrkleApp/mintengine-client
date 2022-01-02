import { Grid } from '@mui/material'
import React, { useCallback, useEffect, useReducer, useState } from 'react'
import AuthWrapper from '../../components/Wrappers/AuthWrapper/AuthWrapper'
import Input from '../../components/UI/Input/Input'
import { Button } from '../../components/UI/Button/button'
import { useHistory, useLocation } from 'react-router'
import * as Styles from './auth'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { useDispatch } from 'react-redux'
import { loginUser, registerUser } from '../../app/authSlice'
import { toggleBackdrop } from '../../app/backdropSlice'


const passwordReducer = (state, action) => {
    switch (action.type) {
        case 'SIGNUP_PASSWORD_INPUT':
            return {
                ...state,
                passwordValue: action.passwordValue,
                passwordHelperText: 'Minimum of 8 characters in length, include a number.',
                passwordError: false,
                passwordIsValid: (action.passwordValue.trim().length >= 8) && (/\d/.test(action.passwordValue))
            }
        case 'SIGNUP_PASSWORD_BLUR':
            return {
                ...state,
                passwordHelperText: state.passwordIsValid ? '' : action.passwordHelperText,
                passwordError: !state.passwordIsValid,
            }
        case 'CONFIRM_PASSWORD_INPUT':
            return {
                ...state,
                confirmPasswordValue: action.confirmPasswordValue,
                confirmPasswordHelperText: (action.confirmPasswordValue.trim().length > 0 && action.confirmPasswordIsValid === false) ? 'Password does not match' : '',
                confirmPasswordError: !action.confirmPasswordIsValid,
                confirmPasswordIsValid: action.confirmPasswordIsValid
            }
        case 'LOGIN_PASSWORD_INPUT':
            return {
                ...state,
                passwordValue: action.passwordValue,
                passwordIsValid: (action.passwordValue.trim().length >= 8) && (/\d/.test(action.passwordValue))
            }
        case 'LOGIN_ERROR':
            return {
                ...state,
                passwordHelperText: action.passwordHelperText,
                passwordError: true
            }
        default:
            return state
    }
}


function Auth() {
    const { pathname } = useLocation()
    const history = useHistory()
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [buttonIsEnabled, setButtonIsEnabled] = useState(false)
    const [fingerPrint, setFingerPrint] = useState('')
    const [password, dispatchPassword] = useReducer(passwordReducer, {
        passwordValue: '',
        passwordHelperText: '',
        passwordError: false,
        passwordIsValid: false,
        confirmPasswordValue: '',
        confirmPasswordError: false,
        confirmPasswordIsValid: false
    })
    const {
        passwordValue,
        passwordHelperText,
        passwordError,
        passwordIsValid,
        confirmPasswordValue,
        confirmPasswordHelperText,
        confirmPasswordError,
        confirmPasswordIsValid
    } = password

    const handlePasswordChange = useCallback((e) => {
        if (pathname === '/signup') {
            dispatchPassword({ type: 'SIGNUP_PASSWORD_INPUT', passwordValue: e.target.value })
        } else {
            dispatchPassword({ type: 'LOGIN_PASSWORD_INPUT', passwordValue: e.target.value })
        }
    }, [pathname, passwordValue])

    const handlePasswordBlur = useCallback(() => {
        if (pathname !== '/signup') return

        dispatchPassword({
            type: 'SIGNUP_PASSWORD_BLUR',
            passwordHelperText: 'Your password must be up to 8 characters and must include a number'
        })
    }, [])

    const handleConfirmPasswordChange = useCallback((e) => {
        dispatchPassword({
            type: 'CONFIRM_PASSWORD_INPUT',
            confirmPasswordValue: e.target.value,
            confirmPasswordIsValid: e.target.value === passwordValue
        })
    }, [confirmPasswordValue, confirmPasswordIsValid])

    const toggleShowPassword = useCallback(() => {
        setShowPassword(prevState => !prevState)
    }, [])

    const toggleShowConfirmPassword = useCallback(() => {
        setShowConfirmPassword(prevState => !prevState)
    }, [])

    const handleSubmit = e => {
        e.preventDefault();

        dispatch(toggleBackdrop())

        if (pathname === '/signup') {
            dispatch(registerUser({
                password1: passwordValue,
                password2: confirmPasswordValue,
                deviceID: fingerPrint
            }))
            .unwrap()
            .then(res => {
                dispatch(toggleBackdrop())
                console.log('then block');
            })
            .catch(err => {
                dispatch(toggleBackdrop())
                console.log('catch block')
            })
        } else if (pathname === '/login') {
            dispatch(loginUser({
                password: passwordValue,
                deviceID: fingerPrint
            }))
            .unwrap()
            .then(() => {
                dispatch(toggleBackdrop())
                history.push('/dashboard')
            })
            .catch(err => {
                dispatch(toggleBackdrop())
                dispatchPassword({
                    type: 'LOGIN_ERROR',
                    passwordHelperText: err.error[0]
                })
                console.log(err)
            })
        }
    }

    useEffect(() => {
        switch (pathname) {
            case '/signup':
                if (passwordIsValid && confirmPasswordIsValid) {
                    setButtonIsEnabled(true)
                } else {
                    setButtonIsEnabled(false)
                }
                break
            case '/login':
                if (passwordIsValid) {
                    setButtonIsEnabled(true)
                } else {
                    setButtonIsEnabled(false)
                }
                break
            default:
                break
        }
    }, [passwordIsValid, confirmPasswordIsValid])

    useEffect(() => {
        // Initialize the agent at application startup.
        const fpPromise = new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.onload = resolve;
            script.onerror = reject;
            script.async = true;
            script.src = 'https://cdn.jsdelivr.net/npm/'
                + '@fingerprintjs/fingerprintjs-pro@3/dist/fp.min.js';
            document.head.appendChild(script);
        })
        .then(() => FingerprintJS.load({
            token: process.env.REACT_APP_FINGERPRINT
        }));

        // Get the visitor identifier when you need it.
        fpPromise
            .then(fp => fp.get())
            .then(result => setFingerPrint(result.visitorId));
    }, [])

    return (
        <AuthWrapper>
            <Styles.Form onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item xs={1} md={2} />
                    <Grid item container xs={10} md={6} rowSpacing={2} columnSpacing={1}>
                        <Grid item xs={12}>
                            <Styles.Title>{pathname === '/signup' ? 'sign up' : 'login'}</Styles.Title>
                        </Grid>
                        <Input
                            name="password"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            value={passwordValue}
                            handleChange={handlePasswordChange}
                            handleBlur={handlePasswordBlur}
                            helperText={passwordHelperText}
                            error={passwordError}
                            visible={showPassword}
                            toggleShowPassword={toggleShowPassword}
                        />
                        {pathname === '/signup' &&
                            <Input
                                name="confirmPassword"
                                label="Confirm Password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirmPasswordValue}
                                handleChange={handleConfirmPasswordChange}
                                helperText={confirmPasswordHelperText}
                                error={confirmPasswordError}
                                visible={showConfirmPassword}
                                toggleShowPassword={toggleShowConfirmPassword}
                            />}
                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                type="submit"
                                disabled={!buttonIsEnabled}
                            >
                                {pathname === '/signup' ? 'Create my wallet' : 'Access my wallet'}
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={1} md={4} />
                </Grid>
            </Styles.Form>
        </AuthWrapper>
    )
}

export default Auth
