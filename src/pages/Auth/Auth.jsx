import { Grid } from '@mui/material'
import React from 'react'
import AuthWrapper from '../../components/Wrappers/AuthWrapper/AuthWrapper'
import Input from '../../components/UI/Input/Input'
import { Button } from '../../components/UI/Button/button'


function Auth() {

    const handleSubmit = e => {
        e.preventDefault();
        //
    }

    return (
        <AuthWrapper>
            <form onSubmit={handleSubmit} style={{ marginTop: '30px' }}>
                <Grid container>
                    <Grid item xs={1} md={2} />
                    <Grid item container xs={10} md={6} rowSpacing={2} columnSpacing={1}>
                        <Grid item container xs={12}>
                            <h2>SIGN UP</h2>
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
            </form>
        </AuthWrapper>
    )
}

export default Auth
