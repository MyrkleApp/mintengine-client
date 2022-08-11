import React from 'react'
import * as Styles from './parteners'
import { Grid } from '@mui/material'
import algorandBlack from '../../../assets/images/landingPage/algorandBlack.png'
import algorandFoundation from '../../../assets/images/landingPage/algorandFoundation.svg'


function Parteners() {
    
    return (
        <Styles.Root>
            {/* <Styles.Title>Our Parteners</Styles.Title>

            <Grid container spacing={6}>                
                <Grid item xs={12} md={6} style={{ display: 'flex', alignItems: 'center' }}>
                    <Styles.Image src={algorandBlack} alt="Algorand" />
                </Grid>

                <Grid item xs={12} md={6} style={{ display: 'flex', alignItems: 'center' }}>
                    <Styles.Image src={algorandFoundation} alt="Algorand Foundation" />
                </Grid>

            </Grid> */}
            
        </Styles.Root>
    )
}

export default Parteners