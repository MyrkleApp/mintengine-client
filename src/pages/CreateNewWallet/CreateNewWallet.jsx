import React, { useState } from 'react'
import { useParams } from 'react-router'
import { Button } from '../../components/UI/Button/button'
import AuthWrapper from '../../components/Wrappers/AuthWrapper/AuthWrapper'
import WalletWrapper from '../../components/Wrappers/WalletWrapper/WalletWrapper'
import * as Styles from '../../components/UI/WalletShared/walletShared'
import CopyButtonWithTooltip from '../../components/UI/MyTooltip/MyTooltip'


function CreateNewWallet() {
    const { wallet } = useParams()
    const [passPhrase, setPassPhrase] = useState([ "one", "two", "five..." ])


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
                    { 
                        wallet === 'algo' 
                        ?   <Styles.WordsBox>
                            {
                                Array(25).fill().map((item, i) => (
                                    <Styles.Word key={i}>
                                        { `${i + 1}. wallet` }
                                    </Styles.Word>
                                ))
                            }
                            </Styles.WordsBox>
                        :   <Styles.XrpWordsBox>
                                c6c108b3e923ea40067d129715065d96733528fc4ae5317814f795999f22b88f866a3343237b206daf6537ab593cba0b42a8f51721a6df3c5771cdc9312afc46
                            </Styles.XrpWordsBox>
                    }
                    
                    <Styles.ButtonsContainer>
                        <CopyButtonWithTooltip passPhrase={passPhrase} text="copy" />       
                        <Button fullWidth>
                        {
                            wallet === 'algo'
                            ? 'I’VE BACKED UP MY PASSPHRASE'
                            : 'I’VE BACKED UP MY SEED'
                        }
                        </Button>
                    </Styles.ButtonsContainer>

                    
                    
                </Styles.Container>
            </WalletWrapper>
        </AuthWrapper>
    )
}

export default CreateNewWallet
