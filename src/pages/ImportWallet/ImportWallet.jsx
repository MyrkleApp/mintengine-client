import React, { useState } from 'react'
import { useParams } from 'react-router'
import { Button, CopyButton } from '../../components/UI/Button/button'
import AuthWrapper from '../../components/Wrappers/AuthWrapper/AuthWrapper'
import WalletWrapper from '../../components/Wrappers/WalletWrapper/WalletWrapper'
import * as Styles from '../../components/UI/WalletShared/walletShared'
import NoteOutlinedIcon from '@mui/icons-material/NoteOutlined';


function ImportWallet() {
    const { wallet } = useParams()
    const [xrpSeed, setXrpSeed] = useState("")

    const handlePasteSeed = () => {
        navigator.clipboard.readText().then(text => setXrpSeed(text))
    }

    return (
        <AuthWrapper>
            <WalletWrapper
                title={ wallet === 'algo' ? "IMPORT YOUR PASSPHRASE" : 'IMPORT YOUR SEED' }
                description={                                                               
                    wallet === 'algo' 
                    ? 'Please fill in your Algorand wallet 25 words passphrase to restore your wallet.'
                    : 'Please paste your XRP wallet seed to restore your wallet.'
                }
                link={ `/wallet-setup?wallet=${wallet}` }
            >
                <Styles.Container>
                    { 
                        wallet === 'algo' 
                        ?   <Styles.WordsBox import>
                            {
                                Array(25).fill().map((item, i) => (
                                    <Styles.Word key={i}>                                        
                                        <Styles.WordInput>
                                            <span>{i + 1}.</span>
                                            <input />
                                        </Styles.WordInput>
                                    </Styles.Word>
                                ))
                            }
                            </Styles.WordsBox>
                        :   <Styles.XrpWordsBox>
                                <textarea value={xrpSeed} onChange={e => setXrpSeed(e.target.value)} />
                            </Styles.XrpWordsBox>
                    }
                    
                    <Styles.ButtonsContainer>
                        {
                            wallet === 'xrp' &&
                            <CopyButton outlined onClick={handlePasteSeed}>
                                paste <NoteOutlinedIcon fontSize="small" sx={{ ml: '7px', transform: 'rotate(90deg)' }} />
                            </CopyButton> 
                        }      
                        <Button fullWidth disabled>verify my backup</Button>
                    </Styles.ButtonsContainer>

                </Styles.Container>
            </WalletWrapper>
        </AuthWrapper>
    )
}

export default ImportWallet
