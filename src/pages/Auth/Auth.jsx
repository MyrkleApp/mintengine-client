import { Grid } from '@mui/material'
import React, { useEffect, useReducer, useState } from 'react'
import AuthWrapper from '../../components/Wrappers/AuthWrapper/AuthWrapper'
import Input from '../../components/UI/Input/Input'
import { Button } from '../../components/UI/Button/button'
import { useLocation } from 'react-router'
import * as Styles from './auth'


const passwordReducer = (state, action) => {
    switch (action.type) {
        case 'PASSWORD_INPUT':
            return { 
                ...state,
                passwordValue: action.passwordValue, 
                passwordHelperText: 'Minimum of 8 characters in length, include a number.',
                passwordError: false,
                passwordIsValid: (action.passwordValue.trim().length >= 8) && (/\d/.test(action.passwordValue))
            }
        case 'PASSWORD_BLUR' :
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
        default: 
            return state
    }
}


function Auth() {
    const { pathname } = useLocation()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [buttonIsEnabled, setButtonIsEnabled] = useState(false)
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

    const handlePasswordChange = e => {
        if (pathname === '/signup') {
            dispatchPassword({ type: 'PASSWORD_INPUT', passwordValue: e.target.value })
        } else {
            dispatchPassword({ type: 'LOGIN_PASSWORD_INPUT', passwordValue: e.target.value })
        }
    }

    const handlePasswordBlur = () => {
        if (pathname !== '/signup') return

        dispatchPassword({ 
            type: 'PASSWORD_BLUR',
            passwordHelperText: 'Your password must be up to 8 characters and must include a number'
        })
    }

    const handleConfirmPasswordChange = e => {
        dispatchPassword({ type: 'CONFIRM_PASSWORD_INPUT', confirmPasswordValue: e.target.value, confirmPasswordIsValid: e.target.value === passwordValue })
    }

    const handleSubmit = e => {
        e.preventDefault();
        
        alert('submitted !!!')
    }

    useEffect(() => {
        if (pathname === '/signup') {
            if (passwordIsValid && confirmPasswordIsValid) {
                setButtonIsEnabled(true)
            } else {
                setButtonIsEnabled(false)
            }
        } else if (pathname === '/login') {
            if (passwordIsValid) {
                setButtonIsEnabled(true)
            } else {
                setButtonIsEnabled(false)
            }
        }
    }, [passwordIsValid, confirmPasswordIsValid])

    return (
        <AuthWrapper>
            <Styles.Form onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item xs={1} md={2} />
                    <Grid item container xs={10} md={6} rowSpacing={2} columnSpacing={1}>
                        <Grid item xs={12}>
                            <Styles.Title>{ pathname === '/signup' ? 'sign up' : 'login' }</Styles.Title>
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
                            toggleShowPassword={() => setShowPassword(prevState => !prevState)}
                        />
                        {
                            pathname === '/signup' &&
                            <Input
                                name="confirmPassword"
                                label="Confirm Password"
                                type={ showConfirmPassword ? 'text' : 'password' }
                                value={ confirmPasswordValue }
                                handleChange={ handleConfirmPasswordChange }
                                helperText={ confirmPasswordHelperText }
                                error={ confirmPasswordError }
                                visible={ showConfirmPassword }
                                toggleShowPassword={() => setShowConfirmPassword(prevState => !prevState)}
                            />
                        }
                        <Grid item xs={12}>
                            <Button 
                                fullWidth 
                                type="submit"
                                disabled={ !buttonIsEnabled }
                            >
                                { pathname === '/signup' ? 'Create my wallet' : 'Access my wallet' }
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
