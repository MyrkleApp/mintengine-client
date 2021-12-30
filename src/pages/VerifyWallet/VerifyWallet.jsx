import React, { useState } from 'react'
import { useParams } from 'react-router'
import { Button, CopyButton } from '../../components/UI/Button/button'
import AuthWrapper from '../../components/Wrappers/AuthWrapper/AuthWrapper'
import WalletWrapper from '../../components/Wrappers/WalletWrapper/WalletWrapper'
import * as Styles from '../../components/UI/WalletShared/walletShared'
import NoteOutlinedIcon from '@mui/icons-material/NoteOutlined';


function VerifyWallet() {
    const { wallet } = useParams()
    const [xrpSeed, setXrpSeed] = useState("")

    const handlePasteSeed = () => {
        navigator.clipboard.readText().then(text => setXrpSeed(text))
    }

    return (
        <AuthWrapper>
            <WalletWrapper
                title="VERIFY PASSPHRASE BACKUP"
                description={                                                               
                    wallet === 'algo' 
                    ? 'Please fill in the missing words based on their numbers. This is to verify you did a backup.'
                    : 'Please paste the seed you copied. This is to verify you did a backup.'
                }
                link={ `/create-wallet/${wallet}` }
            >
                <Styles.Container>
                    { 
                        wallet === 'algo' 
                        ?   <Styles.WordsBox>
                            {
                                Array(25).fill().map((item, i) => (
                                    <Styles.Word key={i}>                                        
                                    {
                                        [2, 4, 11, 14, 23].includes(i) 
                                        ?   <Styles.WordInput>
                                                <span>{i + 1}.</span>
                                                <input />
                                            </Styles.WordInput> 
                                        : `${i + 1}. wallet`
                                    }
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

export default VerifyWallet
