import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { Button, CopyButton } from '../../components/UI/Button/button.js'
import AuthWrapper from '../../containers/AuthWrapper/AuthWrapper.jsx'
import WalletWrapper from '../../containers/WalletWrapper/WalletWrapper.jsx'
import * as Styles from '../../components/UI/WalletShared/walletShared.js'
import NoteOutlinedIcon from '@mui/icons-material/NoteOutlined';
import { useDispatch, useSelector } from 'react-redux'
import { confirmAlgorandPassphrase, incorrectPassphraseError } from '../../app/algorand/algorandSlice.js'
import { hideBackdrop, showBackdrop } from '../../app/backdrop/backdropSlice.js'
import Modal from '../../components/UI/Modal/Modal.jsx'
import { DisclaimerDefault, DisclaimerError, DisclaimerSuccess } from '../../components/Disclaimer/Disclaimer'
import useDisclaimer from '../../Hooks/Disclaimer.js'
import { CONFIRMED, CREATE } from '../../constants/walletStatus.js'
import { DEFAULT, ERROR, SUCCESS } from '../../constants/modalStatus.js'
import { XRP } from '../../constants/network.js'


function VerifyRippleWallet() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [xrpSeed, setXrpSeed] = useState("")
    const walletId = useSelector(state => state.algorand.id)
    const passphrase = useSelector(state => state.algorand.passphrase).split(" ")
    const [buttonIsEnabled, setButtonIsEnabled] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const { checkbox, modalContentStatus, toggleCheckbox, handleModalStatus } = useDisclaimer()


    const handlePasteSeed = () => {
        navigator.clipboard.readText().then(text => setXrpSeed(text))
    }

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

    const handleVerifyPassphrase = () => {
        handleCloseModal()

        const completedPassphrase = passphrase

        /**
         * !ripplephrase does not exist yet, rewrite handleVerifyPassphrase function for ripple wallet
         */
        if (completedPassphrase !== JSON.parse(localStorage.getItem('ripplephrase'))) {
            dispatch(incorrectPassphraseError({
                status: CREATE,
                error: 'The entered passphrase does not match'
            }))
            handleModalStatus(ERROR)
            handleOpenModal()
            return
        }

        dispatch(showBackdrop())
        dispatch(confirmAlgorandPassphrase({ id: walletId, status: CONFIRMED }))
        .unwrap()
        .then(res => {
            dispatch(hideBackdrop())
            //open modal with success message
            handleModalStatus(SUCCESS)
            handleOpenModal()
            console.log(res)
        })
        .catch(err => {
            dispatch(hideBackdrop())
            //open modal with error message
            handleModalStatus(ERROR)
            handleOpenModal()
            console.log(err)
        })

    }

    useEffect(() => {
        if (xrpSeed.trim().length > 10) {
            setButtonIsEnabled(true)
        } else {
            setButtonIsEnabled(false)
        }
    }, [xrpSeed])

    const navigateToDashboard = () => {
        handleCloseModal()
        history.push('/dashboard')
    }
    

    return (
        <AuthWrapper>
            <WalletWrapper
                title="VERIFY PASSPHRASE BACKUP"
                description="Please paste the seed you copied. This is to verify you did a backup."
                link={`/create-wallet/${XRP}`}
            >
                <Styles.Container>
                    <Styles.XrpWordsBox>
                        <textarea value={xrpSeed} onChange={e => setXrpSeed(e.target.value)} />
                    </Styles.XrpWordsBox>
                    
                    <Styles.ButtonsContainer>
                        <CopyButton outlined onClick={handlePasteSeed}>
                            paste <NoteOutlinedIcon fontSize="small" sx={{ ml: '7px', transform: 'rotate(90deg)' }} />
                        </CopyButton> 
                        
                        <Button 
                            fullWidth 
                            disabled={!buttonIsEnabled} 
                            onClick={showDisclaimerModal}
                        >   
                            verify my backup
                        </Button>
                    </Styles.ButtonsContainer>

                </Styles.Container>

                <Modal open={openModal} handleClose={handleCloseModal}>
                    <Styles.ModalContent>
                    {
                        modalContentStatus === DEFAULT &&
                        <DisclaimerDefault
                            checkbox={checkbox}
                            toggleCheckbox={toggleCheckbox}
                            handleContinue={handleVerifyPassphrase}
                            handleCloseModal={handleCloseModal}
                        />
                    }
                    {
                        modalContentStatus === SUCCESS &&
                        <DisclaimerSuccess 
                            create
                            handleClick={navigateToDashboard} 
                        />
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

export default VerifyRippleWallet
