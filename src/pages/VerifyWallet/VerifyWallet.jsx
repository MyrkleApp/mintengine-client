import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Button, CopyButton } from '../../components/UI/Button/button'
import AuthWrapper from '../../components/Wrappers/AuthWrapper/AuthWrapper'
import WalletWrapper from '../../components/Wrappers/WalletWrapper/WalletWrapper'
import * as Styles from '../../components/UI/WalletShared/walletShared'
import NoteOutlinedIcon from '@mui/icons-material/NoteOutlined';
import { useSelector } from 'react-redux'


function VerifyWallet() {
    const { wallet } = useParams()
    const [xrpSeed, setXrpSeed] = useState("")
    const passPhrase = useSelector(state => state.algorand.phrase).split(" ")
    const [missingWords, setMissingWords] = useState({ num3: '', num5: '', num12: '', num15: '', num24: '' })
    const { num3, num5, num12, num15, num24 } = missingWords

    const handlePasteSeed = () => {
        navigator.clipboard.readText().then(text => setXrpSeed(text))
    }

    const handleAlgoChange = e => {
        setMissingWords(prevState => {
            return {
                ...prevState, [e.target.name]: e.target.value
            }
        })
    }

    // [2, 4, 11, 14, 23].includes(i) 

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
                                { passPhrase?.slice(0, 2)?.map((item, i) => (
                                    <Styles.Word key={i}>                                        
                                        { `${i + 1}. ${item}` }
                                    </Styles.Word>
                                ))}
                                <Styles.Word>
                                    <Styles.WordInput>
                                        <span>3.</span>
                                        <input name="num3" value={num3} onChange={handleAlgoChange} />
                                    </Styles.WordInput>
                                </Styles.Word>
                                <Styles.Word>                                        
                                    { `${4}. ${passPhrase[3]}` }
                                </Styles.Word>
                                <Styles.Word>
                                    <Styles.WordInput>
                                        <span>5.</span>
                                        <input name="num5" value={num5} onChange={handleAlgoChange} />
                                    </Styles.WordInput>
                                </Styles.Word>
                                { passPhrase?.slice(5, 11)?.map((item, i) => (
                                    <Styles.Word key={i}>                                        
                                        { `${i + 6}. ${item}` }
                                    </Styles.Word>
                                ))}
                                <Styles.Word>
                                    <Styles.WordInput>
                                        <span>12.</span>
                                        <input name="num12" value={num12} onChange={handleAlgoChange} />
                                    </Styles.WordInput>
                                </Styles.Word>
                                { passPhrase?.slice(12, 14)?.map((item, i) => (
                                    <Styles.Word key={i}>                                        
                                        { `${i + 13}. ${item}` }
                                    </Styles.Word>
                                ))}
                                <Styles.Word>
                                    <Styles.WordInput>
                                        <span>15.</span>
                                        <input name="num15" value={num15} onChange={handleAlgoChange} />
                                    </Styles.WordInput>
                                </Styles.Word>
                                { passPhrase?.slice(15, 23)?.map((item, i) => (
                                    <Styles.Word key={i}>                                        
                                        { `${i + 16}. ${item}` }
                                    </Styles.Word>
                                ))}
                                <Styles.Word>
                                    <Styles.WordInput>
                                        <span>24.</span>
                                        <input name="num24" value={num24} onChange={handleAlgoChange} />
                                    </Styles.WordInput>
                                </Styles.Word>
                                <Styles.Word>                                        
                                    { `25. ${passPhrase[24]}` }
                                </Styles.Word>
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
