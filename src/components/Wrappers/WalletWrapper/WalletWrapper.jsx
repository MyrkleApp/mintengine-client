import { Grid } from '@mui/material'
import React from 'react'
import * as Styles from './walletWrapper'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

function WalletWrapper({ children, title, description, link }) {

    return (
        <Grid container>
            <Grid item xs={1} md={2} />
            <Grid item xs={10} md={7}>
                <Styles.Title>
                    {
                        link &&
                        <Link to={link}>
                            <ArrowBackIcon className="goBackArrow" />
                        </Link>
                    }
                    { title }
                </Styles.Title>
                <Styles.Description>
                    { description }
                </Styles.Description>
                { children }
            </Grid>
            <Grid item xs={1} md={3} />
        </Grid>
    )
}

export default WalletWrapper
