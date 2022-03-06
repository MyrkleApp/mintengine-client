import React from 'react'
import WalletCard from '../../components/WalletCard/WalletCard'
import AuthWrapper from '../../containers/AuthWrapper/AuthWrapper'
import * as Styles from './walletSetup'
import AddIcon from '@mui/icons-material/Add';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import algorandLogo from '../../assets/icons/algorandLogo.png'
import rippleLogo from '../../assets/icons/rippleLogo.png'
import { Link, useHistory, useLocation } from 'react-router-dom'
import WalletWrapper from '../../containers/WalletWrapper/WalletWrapper'
import { createAlgorandWallet } from '../../app/algorand/algorandSlice'
import { CREATE } from '../../constants/walletStatus';
import { ALGO, XRP } from '../../constants/network';
import useSubmit from '../../Hooks/Submit';


function WalletSetup() {
    const location = useLocation()
    const history = useHistory()
    const { pathname } = location
    const urlQueryParams = new URLSearchParams(location.search)
    const selectedWallet = urlQueryParams.get('wallet')
    const { handleSubmit } = useSubmit()

    const submitSuccess = () => {
        history.push(`/create-wallet/${selectedWallet}`)
    }

    const handleCreateWallet = () => {
        if (selectedWallet === ALGO) {
            const data = { status: CREATE }
            handleSubmit(createAlgorandWallet(data), submitSuccess)
        } else if (selectedWallet === XRP) {
            alert('create ripple wallet')
        }
    }

    const handleImportWallet = () => {
        history.push(`/import-wallet/${selectedWallet}`)
    }

    return (
        <AuthWrapper>
            <WalletWrapper
                title="WALLET SETUP"
                description="Setup a wallet on one blockchain and you can set up the other in the profile section."
                /**
                 *!!!!!!! REMOVE ARROW BACK ICON FOR WHEN THER IS NO USER !!!!!!
                 */
                link={ pathname === '/create-wallet' ? '/wallet-setup' : '/settings' }
            >
            {
                pathname === '/wallet-setup' &&
                <>
                    <Link to={`/create-wallet?wallet=${ALGO}`} style={{ textDecoration: 'none' }}>
                        <WalletCard
                            walletSetup
                            title="algorand wallet"
                            text="Algorand's native cryptocurrency is called Algo."
                            image={algorandLogo}
                        />
                    </Link>
                    <Link to={`/create-wallet?wallet=${XRP}`} style={{ textDecoration: 'none' }}>
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
                        handleClick={handleCreateWallet}
                        icon={<AddIcon fontSize="large" style={{ color: '#097246' }} />}
                    />
                    <WalletCard
                        title="import existing wallet"
                        text="Restore your existing Algorand wallet using your passphrase."
                        buttonText="import wallet"
                        link={`/import-wallet/${selectedWallet}`}
                        handleClick={handleImportWallet}
                        icon={<SystemUpdateAltIcon fontSize="large" style={{ color: '#097246' }} />}
                    />
                </>
            }
            </WalletWrapper>
        </AuthWrapper>
    )
}

export default WalletSetup
