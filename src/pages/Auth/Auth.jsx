import { Grid } from '@mui/material'
import React from 'react'
import AuthWrapper from '../../components/Wrappers/AuthWrapper/AuthWrapper'
import Input from '../../components/UI/Input/Input'
import { Button } from '../../components/UI/Button/button'
import { useLocation } from 'react-router'
import * as Styles from './auth'


function Auth() {
    const { pathname } = useLocation()

    const handleSubmit = e => {
        e.preventDefault();
        //
    }

    return (
        <AuthWrapper>
            <Styles.Form onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item xs={1} md={2} />
                    <Grid item container xs={10} md={6} rowSpacing={2} columnSpacing={1}>
                        <Grid item container xs={12}>
                            <Styles.Title>{ pathname === '/signup' ? 'sign up' : 'login'}</Styles.Title>
                        </Grid>
                        <Input
                            name="password"
                            label="Password"
                            type="password"
                        />
                        <Input
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                        />
                        <Grid item xs={12}>
                            <Button fullWidth type="submit">CREATE MY ACCOUNT</Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={1} md={4} />
                </Grid>
            </Styles.Form>
        </AuthWrapper>
    )
}

export default Auth
