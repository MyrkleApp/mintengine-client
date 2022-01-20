import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { Button, CopyButton } from '../../components/UI/Button/button'
import AuthWrapper from '../../components/Wrappers/AuthWrapper/AuthWrapper'
import WalletWrapper from '../../components/Wrappers/WalletWrapper/WalletWrapper'
import * as Styles from '../../components/UI/WalletShared/walletShared'
import NoteOutlinedIcon from '@mui/icons-material/NoteOutlined';
import { useDispatch } from 'react-redux'
import { createAlgorandWallet } from '../../app/algorandSlice'
import Modal from '../../components/UI/Modal/Modal'
import useDisclaimer from '../../Hooks/Disclaimer'
import { DisclaimerDefault, DisclaimerError, DisclaimerSuccess } from '../../components/Disclaimer/Disclaimer'
import { hideBackdrop, showBackdrop } from '../../app/backdropSlice'
import { IMPORT } from '../../constants/walletStatus'
import { DEFAULT, ERROR, SUCCESS } from '../../constants/modalStatus'



function ImportWallet() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { wallet } = useParams()
    const [xrpSeed, setXrpSeed] = useState("")
    const [missingWords, setMissingWords] = useState(Array(25).fill(''))
    const [buttonIsEnabled, setButtonIsEnabled] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const { checkbox, modalContentStatus, toggleCheckbox, handleModalStatus } = useDisclaimer()

    const handlePasteSeed = () => {
        navigator.clipboard.readText().then(text => setXrpSeed(text))
    }

    const handleChange = (e, i) => {
        const values = [...missingWords]
        values[i] = e.target.value
        setMissingWords(values)
    }

    useEffect(() => {
        if (missingWords.every(word => word.trim().length > 0)) {
            setButtonIsEnabled(true)
        } else {
            setButtonIsEnabled(false)
        }
    }, [missingWords])

    const handleOpenModal = () => {
        setOpenModal(true)
    }

    const handleCloseModal = () => {
        setOpenModal(false)
        handleModalStatus(DEFAULT)
    }

    const showDisclaimerModal = () => {
        handleOpenModal()
    }

    const handleImportWallet = () => {
        handleCloseModal()
        dispatch(showBackdrop())
        const phrase = missingWords.join(" ")

        dispatch(createAlgorandWallet({ status: IMPORT, phrase: phrase }))
        .unwrap()
        .then(res => {
            dispatch(hideBackdrop())
            handleModalStatus(SUCCESS)
            handleOpenModal()
            console.log(res)
        })
        .catch(err => {
            dispatch(hideBackdrop())
            handleModalStatus(ERROR)
            handleOpenModal()
            console.log(err)
        })
    }

    const navigateToDashboard = () => {
        handleCloseModal()
        history.push('/dashboard')
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
                link={ `/create-wallet?wallet=${wallet}` }
            >
                <Styles.Container>
                    { 
                        wallet === 'algo' 
                        ?   <Styles.WordsBox import>
                            {
                                missingWords.map((_, i) => (
                                    <Styles.WordInput>
                                        <span>{i+1}.</span>
                                        <input value={missingWords[i]} onChange={e => handleChange(e, i)} />
                                    </Styles.WordInput>
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
                        <Button fullWidth disabled={!buttonIsEnabled} onClick={showDisclaimerModal}>verify my backup</Button>
                    </Styles.ButtonsContainer>

                </Styles.Container>

                <Modal open={openModal} handleOpen={handleOpenModal} handleClose={handleCloseModal}>
                    <Styles.ModalContent>
                    {
                        modalContentStatus === DEFAULT &&
                        <DisclaimerDefault
                            checkbox={checkbox}
                            toggleCheckbox={toggleCheckbox}
                            handleContinue={handleImportWallet}
                            handleCloseModal={handleCloseModal}
                        />
                    }
                    {
                        modalContentStatus === SUCCESS &&
                        <DisclaimerSuccess handleClick={navigateToDashboard} />
                    }
                    {
                        modalContentStatus === ERROR &&
                        <DisclaimerError />
                    }
                    </Styles.ModalContent>
                </Modal>
            </WalletWrapper>
        </AuthWrapper>
    )
}

export default ImportWallet
