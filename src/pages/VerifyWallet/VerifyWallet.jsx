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
import { ModalContent } from './verifyWallet'
import successImg from '../../assets/icons/success.png'

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
    const [checkbox, setCheckbox] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [modalContentStatus, setModalContentStatus] = useState('default')
    const confirmWalletError = useSelector(state => state.algorand.confirmWallet.error)


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
        setModalContentStatus('default')
    }

    const showDisclaimerModal = () => {
        handleOpenModal()
    }

    const handleVerifyPassphrase = () => {
        handleCloseModal()

        const completedPassphrase = passphrase
        completedPassphrase[2] = num3
        completedPassphrase[4] = num5
        completedPassphrase[11] = num12
        completedPassphrase[14] = num15
        completedPassphrase[23] = num24

        if (completedPassphrase.join(" ") !== JSON.parse(localStorage.getItem('algophrase'))) {
            dispatch(incorrectPassphraseError({
                status: 'create',
                error: 'The entered passphrase does not match'
            }))
            setModalContentStatus('error')
            handleOpenModal()
            return
        }

        dispatch(showBackdrop())
        dispatch(confirmAlgorandPassphrase({ id: walletId, status: 'confirmed' }))
        .unwrap()
        .then(res => {
            dispatch(hideBackdrop())
            //open modal with success message
            setModalContentStatus('success')
            handleOpenModal()
            console.log(res)
        })
        .catch(err => {
            dispatch(hideBackdrop())
            //open modal with error message
            setModalContentStatus('error')
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
                                <Styles.Word>
                                    <Styles.WordInput>
                                        <span>3.</span>
                                        <input name="num3" value={num3} onChange={handleAlgoChange} />
                                    </Styles.WordInput>
                                </Styles.Word>
                                <Styles.Word>                                        
                                    { `${4}. ${passphrase[3]}` }
                                </Styles.Word>
                                <Styles.Word>
                                    <Styles.WordInput>
                                        <span>5.</span>
                                        <input name="num5" value={num5} onChange={handleAlgoChange} />
                                    </Styles.WordInput>
                                </Styles.Word>
                                { passphrase?.slice(5, 11)?.map((item, i) => (
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
                                { passphrase?.slice(12, 14)?.map((item, i) => (
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
                                { passphrase?.slice(15, 23)?.map((item, i) => (
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
                    <ModalContent>
                    {
                        modalContentStatus === 'default' &&
                        <>
                            <h2 className="disclaimerTitle">DISCLAIMER</h2>
                            <p>Due to security concerns, Mint Engine does not keep any record of our users' passphrase/seed. Thus, we will not be able to recover your passphrase/seed for you. </p>
                            <p>So, if you did not back up the seed properly or if you lost the seed, we will not be able to recover wallet data for you.</p>
                            <div className="disclaimer">
                                <input type="checkbox" value={checkbox} onChange={e => setCheckbox(prevState => !prevState)} checked={checkbox} />
                                <p>I understand that Mint Engine is not responsible for the wallet backup process.</p>
                            </div>
                            <Button fullWidth disabled={!checkbox} onClick={handleVerifyPassphrase}>continue</Button>
                            <h3 onClick={handleCloseModal}>CANCEL</h3>
                        </>
                    }

                    {
                        modalContentStatus === 'success' &&
                        <>
                            <div className="success">
                                <img src={successImg} alt="" />
                            </div>
                            <h2 className="success">SUCCESS!</h2>
                            <p className="success">You have successfully created your wallet.</p>
                            <Button 
                                fullWidth 
                                style={{ marginBottom: '30px' }}
                                onClick={navigateToDashboard}
                            >
                                access my wallet
                            </Button>
                        </>
                    }

                    {
                        modalContentStatus === 'error' &&
                        <>
                            <h2 className="error">ERROR!</h2>
                            <p className="error">{confirmWalletError}</p>
                        </>
                    }
                    </ModalContent>
                </Modal>
            </WalletWrapper>
        </AuthWrapper>
    )
}

export default VerifyWallet
