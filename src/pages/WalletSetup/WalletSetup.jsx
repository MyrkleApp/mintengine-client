import { Grid } from '@mui/material'
import React from 'react'
import WalletCard from '../../components/WalletCard/WalletCard'
import AuthWrapper from '../../components/Wrappers/AuthWrapper/AuthWrapper'
import * as Styles from './walletSetup'
import AddIcon from '@mui/icons-material/Add';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import algorandLogo from '../../assets/icons/algorandLogo.png'
import rippleLogo from '../../assets/icons/rippleLogo.png'
import { Link, useLocation } from 'react-router-dom'
import WalletWrapper from '../../components/Wrappers/WalletWrapper/WalletWrapper'


function WalletSetup() {
    const location = useLocation()
    const { pathname } = location
    const urlQueryParams = new URLSearchParams(location.search)
    const selectedWallet = urlQueryParams.get('wallet')

    return (
        <AuthWrapper>
            <WalletWrapper
                title="WALLET SETUP"
                description="Setup a wallet on one blockchain and you can set up the other in the profile section."
                link={ pathname === '/create-wallet' ? '/wallet-setup' : '' }
            >
            {
                pathname === '/wallet-setup' &&
                <>
                    <Link to="/create-wallet?wallet=algo" style={{ textDecoration: 'none' }}>
                        <WalletCard
                            walletSetup
                            title="algorand wallet"
                            text="Algorand's native cryptocurrency is called Algo."
                            image={algorandLogo}
                        />
                    </Link>
                    <Link to="/create-wallet?wallet=xrp" style={{ textDecoration: 'none' }}>
                        <WalletCard
                            walletSetup
                            title="ripple wallet"
                            text="Ripple's native cryptocurrency is called XRP."
                            image={rippleLogo}
                        />
                    </Link>
                </>
            }
            { 
                pathname === '/create-wallet' &&
                <>
                    <WalletCard
                        title="create new wallet"
                        text="This will create a new Algorand wallet and generate a 25 word passphrase you must backup."
                        buttonText="create wallet"
                        link={`/create-wallet/${selectedWallet}`}
                    >
                        <AddIcon fontSize="large" style={{ color: '#097246' }} />
                    </WalletCard>
                    <WalletCard
                        title="import existing wallet"
                        text="Restore your existing Algorand wallet using your passphrase."
                        buttonText="import wallet"
                        link="#"
                    >
                        <SystemUpdateAltIcon fontSize="large" style={{ color: '#097246' }} />
                    </WalletCard>
                </>
            }
            </WalletWrapper>
        </AuthWrapper>
    )
}

export default WalletSetup
