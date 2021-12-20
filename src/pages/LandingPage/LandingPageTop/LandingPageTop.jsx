import { Grid } from '@mui/material'
import React from 'react'
import { Button } from '../../../components/UI/button'
import * as Styles from './landingPageTop'

function LandingPageTop() {
    return (
        <Styles.LandingTopRoot>
            <Styles.Container>
                <h1>Mint Engine</h1>
                <h2>Seamless Connection & Interaction with Multiple Blockchains</h2>
                <Grid container className="gridContainer" alignItems="center">
                    <Grid item xs={12} md={6}>
                        <p>A gateway that connects multiple blockchains build around the idea of cbdcs.</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>Arrow div</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p>Arrow div 2</p>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <p>Allowing seamless interaction and interoperabiltiy not just for large enterprises but for anyone with access to the internet.</p>
                    </Grid>
                </Grid>
                <div className="buttonsContainer">
                    <Button>get started</Button>
                    <Button outlined>login</Button>
                </div>
            </Styles.Container>
        </Styles.LandingTopRoot>
    )
}

export default LandingPageTop
