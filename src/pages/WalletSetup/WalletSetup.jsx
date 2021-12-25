import { Grid } from '@mui/material'
import React from 'react'
import WalletCard from '../../components/WalletCard/WalletCard'
import AuthWrapper from '../../components/Wrappers/AuthWrapper/AuthWrapper'
import * as Styles from './walletSetup'
import AddIcon from '@mui/icons-material/Add';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import algorandLogo from '../../assets/icons/algorandLogo.png'
import rippleLogo from '../../assets/icons/rippleLogo.png'
import { Link } from 'react-router-dom'


function WalletSetup() {

    return (
        <AuthWrapper>
            <Grid container>
                <Grid item xs={1} md={2} />
                <Grid item xs={10} md={7} rowSpacing={2} columnSpacing={1}>
                    <Styles.Title>WALLET SETUP</Styles.Title>
                    <Styles.Description>
                        Setup a wallet on one blockchain and you can set up the other in the profile section.
                    </Styles.Description>
                    <Link to="#" style={{ textDecoration: 'none' }}>
                        <WalletCard 
                            walletSetup 
                            title="algorand wallet"
                            text="Algorand's native cryptocurrency is called Algo."
                            image={algorandLogo}
                        />
                    </Link>
                    <Link to="#" style={{ textDecoration: 'none' }}>
                        <WalletCard 
                            walletSetup 
                            title="ripple wallet"
                            text="Ripple's native cryptocurrency is called XRP."
                            image={rippleLogo}
                        />
                    </Link>
                </Grid>
                    <Grid item xs={1} md={3} />
                </Grid>
        </AuthWrapper>
    )
}

export default WalletSetup
