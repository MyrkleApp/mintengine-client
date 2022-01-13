import { Grid } from '@mui/material'
import React from 'react'
import * as Styles from './homeAnimations'

function HomeAnimations() {

    return (
        <Styles.Root>
            <Grid container>
                <Grid item xs={12} md={6} className="leftGrid" style={{ display: 'flex', justifyContent: 'center' }}>
                    <Styles.Disk />
                    <Styles.Box>
                        <Styles.WhiteDiv />
                        <Styles.Hoop />
                        <Styles.Hoop />
                        <Styles.Hoop />
                        <Styles.Hoop />
                    </Styles.Box>
                </Grid>
                <Grid item xs={12} md={6} className="rightGrid" style={{ display: 'flex', justifyContent: 'center' }}>
                    <Styles.RightCircle>
                        <Styles.RightInnerCircle />
                    </Styles.RightCircle>
                    
                    <Styles.RightBox>
                        <Styles.Hoop />
                        <Styles.Hoop />
                    </Styles.RightBox>
                </Grid>
            </Grid>
            
        </Styles.Root>
    )
}

export default HomeAnimations
