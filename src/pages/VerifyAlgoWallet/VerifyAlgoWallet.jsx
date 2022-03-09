import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Button } from '../../components/UI/Button/button'
import AuthWrapper from '../../containers/AuthWrapper/AuthWrapper'
import WalletWrapper from '../../containers/WalletWrapper/WalletWrapper'
import * as Styles from '../../components/UI/WalletShared/walletShared'
import { useDispatch, useSelector } from 'react-redux'
import { confirmAlgorandPassphrase, incorrectPassphraseError } from '../../app/algorand/algorandSlice'
import Modal from '../../components/UI/Modal/Modal'
import { DisclaimerDefault, DisclaimerError, DisclaimerSuccess } from '../../components/Disclaimer/Disclaimer'
import useDisclaimer from '../../Hooks/Disclaimer'
import { CONFIRMED, CREATE } from '../../constants/walletStatus'
import { DEFAULT, ERROR, SUCCESS } from '../../constants/modalStatus'
import { ALGO } from '../../constants/network'
import useFormValidity from '../../Hooks/FormValidity'
import useModal from '../../Hooks/Modal'
import useEncrypt from '../../Hooks/Encrypt'
import useSubmit from '../../Hooks/Submit'
import DB from '../../app/db'


function VerifyWallet() {
    const dispatch = useDispatch()
    const history = useHistory()
    const walletId = useSelector(state => state.algorand.id)
    const walletAddress = useSelector(state => state.algorand.address)
    const passphrase = useSelector(state => state.algorand.passphrase)
    const passphraseArray = useSelector(state => state.algorand.passphrase).split(" ")
    const [missingWords, setMissingWords] = useState({ num3: '', num5: '', num12: '', num15: '', num24: '' })
    const { num3, num5, num12, num15, num24 } = missingWords
    const { formIsValid } = useFormValidity(num3, num5, num12, num15, num24)
    const { modalState, handleModalOpen, handleModalClose } = useModal()
    const { checkbox, modalContentStatus, toggleCheckbox, handleModalStatus } = useDisclaimer()
    const { encryptString } = useEncrypt()
    const { handleSubmit } = useSubmit()

    const handleAlgoChange = e => {
        setMissingWords(prevState => {
            return {
                ...prevState, [e.target.name]: e.target.value
            }
        })
    }

    const handleModalToDefault = () => {
        handleModalClose()
        handleModalStatus(DEFAULT)
    }

    const showDisclaimerModal = () => {
        handleModalOpen()
    }

    const storePassphraseInBrowserDB = async () => {
        const db = new DB()
        const data = { [walletAddress]: encryptString(passphrase), type: 'algorand' }
        const res = await db.addPassphrase(data)
        return res
    }

    const submitSuccess = () => {
        handleModalStatus(SUCCESS)
        handleModalOpen()
        storePassphraseInBrowserDB()
    }

    const submitError = () => {
        handleModalStatus(ERROR)
        handleModalOpen()
    }

    const handleVerifyPassphrase = () => {
        handleModalToDefault()

        const completedPassphrase = passphraseArray
        completedPassphrase[2] = num3.trim()
        completedPassphrase[4] = num5.trim()
        completedPassphrase[11] = num12.trim()
        completedPassphrase[14] = num15.trim()
        completedPassphrase[23] = num24.trim()

        if ((completedPassphrase !== passphraseArray) || (passphraseArray.length < 25)) {
            dispatch(incorrectPassphraseError({
                status: CREATE,
                error: 'The entered passphrase does not match'
            }))
            handleModalStatus(ERROR)
            handleModalOpen()
            return
        }

        const confirmData = { id: walletId, status: CONFIRMED, active: true }

        handleSubmit(confirmAlgorandPassphrase(confirmData), submitSuccess, submitError)


    }

    const navigateToDashboard = () => {
        handleModalToDefault()
        history.push('/wallet')
    }
    

    return (
        <AuthWrapper>
            <WalletWrapper
                title="VERIFY PASSPHRASE BACKUP"
                description="Please fill in the missing words based on their numbers. This is to verify you did a backup."      
                link={ `/create-wallet/${ALGO}` }
            >
                <Styles.Container>
                    <Styles.WordsBox>
                        { passphraseArray?.slice(0, 2)?.map((item, i) => (
                            <Styles.Word key={i}>                                        
                                { `${i + 1}. ${item}` }
                            </Styles.Word>
                        ))}
                        <Styles.WordInput>
                            <span>3.</span>
                            <input name="num3" value={num3} onChange={handleAlgoChange} />
                        </Styles.WordInput>
                        <Styles.Word>                                        
                            { `${4}. ${passphraseArray[3]}` }
                        </Styles.Word>
                        <Styles.WordInput>
                            <span>5.</span>
                            <input name="num5" value={num5} onChange={handleAlgoChange} />
                        </Styles.WordInput>
                        { passphraseArray?.slice(5, 11)?.map((item, i) => (
                            <Styles.Word key={i}>                                        
                                { `${i + 6}. ${item}` }
                            </Styles.Word>
                        ))}
                        <Styles.WordInput>
                            <span>12.</span>
                            <input name="num12" value={num12} onChange={handleAlgoChange} />
                        </Styles.WordInput>
                        { passphraseArray?.slice(12, 14)?.map((item, i) => (
                            <Styles.Word key={i}>                                        
                                { `${i + 13}. ${item}` }
                            </Styles.Word>
                        ))}
                        <Styles.WordInput>
                            <span>15.</span>
                            <input name="num15" value={num15} onChange={handleAlgoChange} />
                        </Styles.WordInput>
                        { passphraseArray?.slice(15, 23)?.map((item, i) => (
                            <Styles.Word key={i}>                                        
                                { `${i + 16}. ${item}` }
                            </Styles.Word>
                        ))}
                        <Styles.WordInput>
                            <span>24.</span>
                            <input name="num24" value={num24} onChange={handleAlgoChange} />
                        </Styles.WordInput>
                        <Styles.Word>                                        
                            { `25. ${passphraseArray[24]}` }
                        </Styles.Word>
                    </Styles.WordsBox>
                    
                    <Styles.ButtonsContainer> 
                        <Button 
                            fullWidth 
                            disabled={!formIsValid} 
                            onClick={showDisclaimerModal}
                        >   
                            verify my backup
                        </Button>
                    </Styles.ButtonsContainer>

                </Styles.Container>

                <Modal open={modalState} handleClose={handleModalToDefault}>
                    <Styles.ModalContent>
                    {
                        modalContentStatus === DEFAULT && (
                            <DisclaimerDefault
                                checkbox={checkbox}
                                toggleCheckbox={toggleCheckbox}
                                handleContinue={handleVerifyPassphrase}
                                handleCloseModal={handleModalToDefault}
                            />
                        )
                    }
                    {
                        modalContentStatus === SUCCESS && (
                            <DisclaimerSuccess 
                                create
                                handleClick={navigateToDashboard} 
                            />
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

export default VerifyWallet
