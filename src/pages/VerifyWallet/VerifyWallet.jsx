import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { Button, CopyButton } from '../../components/UI/Button/button'
import AuthWrapper from '../../components/Wrappers/AuthWrapper/AuthWrapper'
import WalletWrapper from '../../components/Wrappers/WalletWrapper/WalletWrapper'
import * as Styles from '../../components/UI/WalletShared/walletShared'
import NoteOutlinedIcon from '@mui/icons-material/NoteOutlined';
import { useDispatch, useSelector } from 'react-redux'
import { confirmAlgorandPassphrase, incorrectPassphraseError } from '../../app/algorandSlice'
import { hideBackdrop, showBackdrop } from '../../app/backdropSlice'
import Modal from '../../components/UI/Modal/Modal'
import { DisclaimerDefault, DisclaimerError, DisclaimerSuccess } from '../../components/Disclaimer/Disclaimer'
import useDisclaimer from '../../Hooks/Disclaimer'


function VerifyWallet() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { wallet } = useParams()
    const [xrpSeed, setXrpSeed] = useState("")
    const walletId = useSelector(state => state.algorand.id)
    const passphrase = useSelector(state => state.algorand.passphrase).split(" ")
    const [missingWords, setMissingWords] = useState({ num3: '', num5: '', num12: '', num15: '', num24: '' })
    const [buttonIsEnabled, setButtonIsEnabled] = useState(false)
    const { num3, num5, num12, num15, num24 } = missingWords
    const [openModal, setOpenModal] = useState(false)
    const { checkbox, modalContentStatus, toggleCheckbox, handleModalStatus } = useDisclaimer()


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

    const handleOpenModal = () => {
        setOpenModal(true)
    }

    const handleCloseModal = () => {
        setOpenModal(false)
        handleModalStatus('default')
    }

    const showDisclaimerModal = () => {
        handleOpenModal()
    }

    const handleVerifyPassphrase = () => {
        handleCloseModal()

        const completedPassphrase = passphrase
        completedPassphrase[2] = num3.trim()
        completedPassphrase[4] = num5.trim()
        completedPassphrase[11] = num12.trim()
        completedPassphrase[14] = num15.trim()
        completedPassphrase[23] = num24.trim()

        if (completedPassphrase.join(" ") !== JSON.parse(localStorage.getItem('algophrase'))) {
            dispatch(incorrectPassphraseError({
                status: 'create',
                error: 'The entered passphrase does not match'
            }))
            handleModalStatus('error')
            handleOpenModal()
            return
        }

        dispatch(showBackdrop())
        dispatch(confirmAlgorandPassphrase({ id: walletId, status: 'confirmed' }))
        .unwrap()
        .then(res => {
            dispatch(hideBackdrop())
            //open modal with success message
            handleModalStatus('success')
            handleOpenModal()
            console.log(res)
        })
        .catch(err => {
            dispatch(hideBackdrop())
            //open modal with error message
            handleModalStatus('error')
            handleOpenModal()
            console.log(err)
        })

    }

    useEffect(() => {
        if (
            num3.trim().length > 0 &&
            num5.trim().length > 0 &&
            num12.trim().length > 0 &&
            num15.trim().length > 0 &&
            num24.trim().length > 0 
        ) {
            setButtonIsEnabled(true)
        } else {
            setButtonIsEnabled(false)
        }
    }, [missingWords])

    const navigateToDashboard = () => {
        handleCloseModal()
        history.push('/dashboard')
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
                                { passphrase?.slice(0, 2)?.map((item, i) => (
                                    <Styles.Word key={i}>                                        
                                        { `${i + 1}. ${item}` }
                                    </Styles.Word>
                                ))}
                                <Styles.WordInput>
                                    <span>3.</span>
                                    <input name="num3" value={num3} onChange={handleAlgoChange} />
                                </Styles.WordInput>
                                <Styles.Word>                                        
                                    { `${4}. ${passphrase[3]}` }
                                </Styles.Word>
                                <Styles.WordInput>
                                    <span>5.</span>
                                    <input name="num5" value={num5} onChange={handleAlgoChange} />
                                </Styles.WordInput>
                                { passphrase?.slice(5, 11)?.map((item, i) => (
                                    <Styles.Word key={i}>                                        
                                        { `${i + 6}. ${item}` }
                                    </Styles.Word>
                                ))}
                                <Styles.WordInput>
                                    <span>12.</span>
                                    <input name="num12" value={num12} onChange={handleAlgoChange} />
                                </Styles.WordInput>
                                { passphrase?.slice(12, 14)?.map((item, i) => (
                                    <Styles.Word key={i}>                                        
                                        { `${i + 13}. ${item}` }
                                    </Styles.Word>
                                ))}
                                <Styles.WordInput>
                                    <span>15.</span>
                                    <input name="num15" value={num15} onChange={handleAlgoChange} />
                                </Styles.WordInput>
                                { passphrase?.slice(15, 23)?.map((item, i) => (
                                    <Styles.Word key={i}>                                        
                                        { `${i + 16}. ${item}` }
                                    </Styles.Word>
                                ))}
                                <Styles.WordInput>
                                    <span>24.</span>
                                    <input name="num24" value={num24} onChange={handleAlgoChange} />
                                </Styles.WordInput>
                                <Styles.Word>                                        
                                    { `25. ${passphrase[24]}` }
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
                        <Button 
                            fullWidth 
                            disabled={!buttonIsEnabled} 
                            onClick={showDisclaimerModal}
                        >   
                            verify my backup
                        </Button>
                    </Styles.ButtonsContainer>

                </Styles.Container>

                <Modal open={openModal} handleOpen={handleOpenModal} handleClose={handleCloseModal}>
                    <Styles.ModalContent>
                    {
                        modalContentStatus === 'default' &&
                        <DisclaimerDefault
                            checkbox={checkbox}
                            toggleCheckbox={toggleCheckbox}
                            handleContinue={handleVerifyPassphrase}
                            handleCloseModal={handleCloseModal}
                        />
                    }
                    {
                        modalContentStatus === 'success' &&
                        <DisclaimerSuccess 
                            create
                            handleClick={navigateToDashboard} 
                        />
                    }
                    {
                        modalContentStatus === 'error' &&
                        <DisclaimerError />
                    }
                    </Styles.ModalContent>
                </Modal>
            </WalletWrapper>
        </AuthWrapper>
    )
}

export default VerifyWallet
