import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Button, CopyButton } from '../../components/UI/Button/button'
import AuthWrapper from '../../containers/AuthWrapper/AuthWrapper'
import WalletWrapper from '../../containers/WalletWrapper/WalletWrapper'
import * as Styles from '../../components/UI/WalletShared/walletShared'
import NoteOutlinedIcon from '@mui/icons-material/NoteOutlined';
import { createAlgorandWallet } from '../../app/algorand/algorandSlice'
import Modal from '../../components/UI/Modal/Modal'
import useDisclaimer from '../../Hooks/Disclaimer'
import { DisclaimerDefault, DisclaimerError, DisclaimerSuccess } from '../../components/Disclaimer/Disclaimer'
import { IMPORT } from '../../constants/walletStatus'
import { DEFAULT, ERROR, SUCCESS } from '../../constants/modalStatus'
import { ALGO } from '../../constants/network'
import useModal from '../../Hooks/Modal'
import useSubmit from '../../Hooks/Submit'
import useFormValidity from '../../Hooks/FormValidity'
import DB from '../../app/db'
import useEncrypt from '../../Hooks/Encrypt'


function ImportWallet() {
    const history = useHistory()
    const [missingWords, setMissingWords] = useState(Array(25).fill(''))
    const { formIsValid } = useFormValidity(...missingWords)
    const { modalState, handleModalOpen, handleModalClose } = useModal()
    const { checkbox, modalContentStatus, toggleCheckbox, handleModalStatus } = useDisclaimer()
    const { encryptString } = useEncrypt()
    const { handleSubmit } = useSubmit()

    const handlePastePassphrase = () => {
        if (!navigator.clipboard.readText) return

        navigator.clipboard.readText().then(text => {
            const copiedTextToArray = text.trim().split(" ")
            setMissingWords(copiedTextToArray)
        })
    }

    console.log(Array(25).fill('word').join(" "))

    const handleChange = (e, i) => {
        const values = [...missingWords]
        values[i] = e.target.value
        setMissingWords(values)
    }

    const handleModalToDefault = () => {
        handleModalClose()
        handleModalStatus(DEFAULT)
    }

    const showDisclaimerModal = () => {
        handleModalOpen()
    }

    const storePassphraseInBrowserDB = async (res) => {
        const db = new DB()
        const data = { [res.address]: encryptString(res.passphrase), type: 'algorand' }
        const response = await db.addPassphrase(data)
        return response
    }

    const submitSuccess = (res) => {
        handleModalStatus(SUCCESS)
        handleModalOpen()
        storePassphraseInBrowserDB(res)
    }

    const submitError = () => {
        handleModalStatus(ERROR)
        handleModalOpen()
    }

    const handleImportWallet = () => {
        handleModalToDefault()

        const phrase = missingWords.join(" ")
        const importData = { status: IMPORT, phrase: phrase, active: true }

        handleSubmit(createAlgorandWallet(importData), submitSuccess, submitError)
    }

    const navigateToDashboard = () => {
        handleModalToDefault()
        history.push('/wallet')
    }

    return (
        <AuthWrapper>
            <WalletWrapper
                title="IMPORT YOUR PASSPHRASE"
                description="Please fill in your Algorand wallet 25 words passphrase to restore your wallet."
                link={`/create-wallet?wallet=${ALGO}`}
            >
                <Styles.Container>
                    <Styles.WordsBox import>
                    {
                        missingWords.map((_, i) => (
                            <Styles.WordInput key={i}>
                                <span>{i+1}.</span>
                                <input value={missingWords[i]} onChange={e => handleChange(e, i)} />
                            </Styles.WordInput>
                        ))
                    }
                    </Styles.WordsBox>
                
                    <Styles.ButtonsContainer>
                        <CopyButton outlined onClick={handlePastePassphrase}>
                            paste <NoteOutlinedIcon fontSize="small" sx={{ ml: '7px', transform: 'rotate(90deg)' }} />
                        </CopyButton>     
                        <Button fullWidth disabled={!formIsValid} onClick={showDisclaimerModal}>verify my backup</Button>
                    </Styles.ButtonsContainer>

                </Styles.Container>

                <Modal open={modalState} handleOpen={handleModalOpen} handleClose={handleModalToDefault}>
                    <Styles.ModalContent>
                    {
                        modalContentStatus === DEFAULT && (
                            <DisclaimerDefault
                                checkbox={checkbox}
                                toggleCheckbox={toggleCheckbox}
                                handleContinue={handleImportWallet}
                                handleCloseModal={handleModalToDefault}
                            />
                        )
                    }
                    {
                        modalContentStatus === SUCCESS && (
                            <DisclaimerSuccess handleClick={navigateToDashboard} />
                        )
                        
                    }
                    {
                        modalContentStatus === ERROR && (
                            <DisclaimerError />
                        )
                    }
                    </Styles.ModalContent>
                </Modal>
            </WalletWrapper>
        </AuthWrapper>
    )
}

export default ImportWallet
