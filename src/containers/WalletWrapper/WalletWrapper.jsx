import { Grid } from '@mui/material'
import React from 'react'
import * as Styles from './walletWrapper.js'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

function WalletWrapper({ children, title, description, link }) {

    return (
        <Styles.Root>
            <div className="container">
                <Grid container>
                    <Grid item xs={12} md={10}>
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
                </Grid>
            </div>
        </Styles.Root>
    )
}

export default WalletWrapper
