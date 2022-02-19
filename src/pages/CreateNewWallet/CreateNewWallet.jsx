import React from 'react'
import { useHistory, useParams } from 'react-router'
import { Button } from '../../components/UI/Button/button'
import AuthWrapper from '../../containers/AuthWrapper/AuthWrapper'
import WalletWrapper from '../../containers/WalletWrapper/WalletWrapper'
import * as Styles from '../../components/UI/WalletShared/walletShared'
import CopyButtonWithTooltip from '../../components/UI/MyTooltip/MyTooltip'
import { useSelector } from 'react-redux'
import { ALGO, XRP } from '../../constants/network'


function CreateNewWallet() {
    const { wallet } = useParams()
    const history = useHistory()
    const passPhrase = useSelector(state => state.algorand.passphrase).split(" ")

    const handleClick = () => {
        if (wallet === ALGO) {
            history.push(`/verify-wallet/${ALGO}`)
        } else if (wallet === XRP) {
            history.push(`/verify-wallet/${XRP}`)
        }
    }

    return (
        <AuthWrapper>
            <WalletWrapper
                title={ wallet === ALGO ? 'ALGORAND WALLET' : 'RIPPLE (XRP) WALLET' }
                description={ 
                    wallet === ALGO 
                    ? 'This wallet 25 words passphrase makes it easy to back up and restore your wallet. So, please keep it safe.'
                    : 'This wallet seed makes it easy to back up and restore your wallet. So, please keep it safe.'
                }
                link={ wallet === ALGO ? `/create-wallet?wallet=${ALGO}` : `/create-wallet?wallet=${XRP}` }
            >
                <Styles.Container>
                    { 
                        wallet === ALGO 
                        ?   <Styles.WordsBox>
                            {
                                passPhrase?.map((item, i) => (
                                    <Styles.Word key={i}>
                                        { `${i + 1}. ${item}` }
                                    </Styles.Word>
                                ))
                            }
                            </Styles.WordsBox>
                        :   <Styles.XrpWordsBox>
                                c6c108b3e923ea40067d129715065d96733528fc4ae5317814f795999f22b88f866a3343237b206daf6537ab593cba0b42a8f51721a6df3c5771cdc9312afc46
                            </Styles.XrpWordsBox>
                    }
                    
                    <Styles.ButtonsContainer>
                        <CopyButtonWithTooltip textToCopy={passPhrase} text="copy" />       
                        <Button fullWidth onClick={handleClick}>
                        {
                            wallet === ALGO
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
