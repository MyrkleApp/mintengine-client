import React from 'react'
import { useParams } from 'react-router'
import { Button, CopyButton } from '../../components/UI/Button/button'
import AuthWrapper from '../../components/Wrappers/AuthWrapper/AuthWrapper'
import WalletWrapper from '../../components/Wrappers/WalletWrapper/WalletWrapper'
import * as Styles from './createNewWallet'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


function CreateNewWallet() {
    const { wallet } = useParams()

    return (
        <AuthWrapper>
            <WalletWrapper
                title={ wallet === 'algo' ? 'ALGORAND WALLET' : 'RIPPLE (XRP) WALLET' }
                description={ 
                    wallet === 'algo' 
                    ? 'This wallet 25 words passphrase makes it easy to back up and restore your wallet. So, please keep it safe.'
                    : 'This wallet seed makes it easy to back up and restore your wallet. So, please keep it safe.'
                }
                link={ wallet === 'algo' ? '/create-wallet?wallet=algo' : '/create-wallet?wallet=xrp' }
            >
                <Styles.Container>
                    <Styles.WordsBox>
                    {
                        Array(25).fill().map((item, i) => (
                            <Styles.Word key={i}>
                                { i + 1 }. wallet
                            </Styles.Word>
                        ))
                    }
                    </Styles.WordsBox>
                    
                    <Styles.ButtonsContainer>
                        <CopyButton outlined>
                            copy <ContentCopyIcon fontSize="small" sx={{ ml: '7px' }} />
                        </CopyButton>
                        <Button fullWidth>I’VE BACKED UP MY PASSPHRASE</Button>
                    </Styles.ButtonsContainer>
                    
                    
                </Styles.Container>
            </WalletWrapper>
        </AuthWrapper>
    )
}

export default CreateNewWallet
