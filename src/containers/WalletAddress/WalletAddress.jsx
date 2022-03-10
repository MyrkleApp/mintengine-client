import React, { Fragment, useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import * as Styles from './walletAddress'
import qrCode from '../../assets/icons/qrCode.svg'
import { Button, WalletAddressButton } from '../../components/UI/Button/button';
import { Word } from '../../components/UI/WalletShared/walletShared';
import CopyButtonWithTooltip from '../../components/UI/MyTooltip/MyTooltip'
import { useDispatch, useSelector } from 'react-redux';
import { ALGORAND, coinToReturn, networkDataToReturn, RIPPLE } from '../../constants/network';
import { ThreeDots } from 'react-loader-spinner';
import { HTTP_STATUS } from '../../constants/httpStatus';
import DB from '../../app/db';
import { setAlgorandPassphrase } from '../../app/algorand/algorandSlice';
import useEncrypt from '../../Hooks/Encrypt'
import useModal from '../../Hooks/Modal';
import Modal from '../../components/UI/Modal/Modal';
import useFormControl from '../../Hooks/FormControl';
import FormControl from '../../components/FormControl/FormControl'
import useSubmit from '../../Hooks/Submit'
import { verifyPassword } from '../../app/auth/authSlice'
import { getCoinPrice } from '../../app/price/priceSlice';


function WalletAddress() {
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const network = useSelector(state => state.network.network)
    const deviceFingerprint = useSelector(state => state.deviceFingerprint.deviceFingerprint)
    const rippleSeed = 'c6c108b3e923ea40067d129715065d96733528fc4ae5317814f795999f22b88f866a3343237b206daf6537ab593cba0b42a8f51721a6df3c5771cdc9312afc46'
    const { status, data: activeWalletData } = useSelector(networkDataToReturn[network.toLowerCase()]);
    const { status: coinPriceStatus, data: coinPrice } = useSelector(state => state.price.price)
    const activeWalletAddress = activeWalletData?.address
    const algorandPassphrase = useSelector(state => state.algorand.passphrase)
    const textToCopy = network === ALGORAND ? algorandPassphrase : rippleSeed
    const { decryptString } = useEncrypt()
    const { handleSubmit } = useSubmit()

    const showPassphrase = () => {
        setOpen(true)
    }

    const hidePassphrase = () => {
        setOpen(false)
    }

    const db = new DB()

    /**
     * retrieve passphrase stored in browser db
     */
    useEffect(() => {
        const getActiveWalletPassphrase = async () => {
            //!adjust "const algorandPassphrase" to work for all networks and not just algorand
            if (activeWalletAddress) {
                const allPassphrases = await db.getPassphrase()
                const activePassphrase = await allPassphrases.filter(obj => obj.doc[activeWalletAddress])[0]
                const decryptedPassphrase = decryptString(activePassphrase.doc[activeWalletAddress])
                dispatch(setAlgorandPassphrase(decryptedPassphrase || ''))
            }
        }
        getActiveWalletPassphrase()
    }, [activeWalletAddress, deviceFingerprint, dispatch])

    useEffect(() => {
        dispatch(getCoinPrice({ coin: coinToReturn[network.toLowerCase()] }))
    }, [network, dispatch])

    const { 
        modalState: qrCodeModalState, 
        handleModalOpen: handleQrCodeModalOpen, 
        handleModalClose: handleQrCodeModalClose, 
    } = useModal()

    const { 
        modalState: passwordModalState, 
        handleModalOpen: handlePasswordModalOpen, 
        handleModalClose: handlePasswordModalClose, 
    } = useModal()

    const {
        value: passwordValue,
        handleChange: handlePasswordChange,
        toggleVisibile: togglePasswordVisibile,
        typeForPasswordInput: typeForPasswordInput,
        handleSetValue: handleSetPasswordValue
    } = useFormControl()

    const verifyPasswordSuccessCallback = () => {
        showPassphrase()
        handleSetPasswordValue('')
    }

    const handleVerifyPassword = () => {
        handlePasswordModalClose()
        handleSubmit(verifyPassword({ password: passwordValue }), verifyPasswordSuccessCallback)
    }

    return (
        <Fragment>
            <Styles.Parent show={open}>
                <Styles.WalletPassphrase show={open}>
                    <Grid container className="gridContainer">
                        <Grid item xs={12} md={9} className="wordsBox">
                        {
                            network === ALGORAND && (
                                algorandPassphrase?.split(" ").map((item, i) => (
                                    <Word key={i}>{ `${i + 1}. ${item}` }</Word>
                                ))
                            )
                        }
                        {
                            network === RIPPLE && (
                                <Styles.RippleSeed>
                                    { rippleSeed }
                                </Styles.RippleSeed>
                            )
                        }
                        </Grid>
                        <Grid item xs={12} md={3} className="passphraseRight">
                            <CopyButtonWithTooltip 
                                textToCopy={textToCopy} 
                            />
                            <WalletAddressButton onClick={hidePassphrase}>
                                { network === ALGORAND ? 'Hide Passphrase' : 'Hide Seed' }
                            </WalletAddressButton>
                        </Grid>
                    </Grid>
                </Styles.WalletPassphrase>
                <Styles.WalletAddress>
                    <div className="container">
                        <span className="welcome">Welcome</span>
                        <Grid container>
                            <Grid item xs={12} md={5} className="left">
                                { activeWalletAddress || '' }
                                { 
                                    status === HTTP_STATUS.PENDING && (
                                        <ThreeDots
                                            height="30"
                                            width="100"
                                            color='gray'
                                            ariaLabel='loading'
                                        />
                                    )
                                }
                                <CopyButtonWithTooltip 
                                    textToCopy={activeWalletAddress} 
                                    onlyIcon
                                />
                            </Grid>

                            <Grid item xs={12} md={3} className="center">
                                <div className="qrBox">
                                    <img src={qrCode} alt="" onClick={handleQrCodeModalOpen} style={{ cursor: 'pointer' }} />
                                </div>
                            </Grid>

                            <Grid item xs={12} md={4} className="right">
                                <span className="amount">{ activeWalletData?.balance }&nbsp;</span>
                                <span className="coinName">ALGO</span><br />
                                <div className="dollarAmount">{`~ $${(coinPrice * activeWalletData?.balance).toFixed(3)}`}</div>

                                <WalletAddressButton onClick={handlePasswordModalOpen} disabled={!algorandPassphrase}>
                                    { network === ALGORAND ? 'Show Passphrase' : 'Show Seed' }
                                </WalletAddressButton>
                            </Grid>
                        </Grid>
                    </div>
                </Styles.WalletAddress>
            </Styles.Parent>

            <Modal open={qrCodeModalState} handleClose={handleQrCodeModalClose}>
                <Styles.QrCodeMainImg src={qrCode} />             
            </Modal>
            <Modal open={passwordModalState} handleClose={handlePasswordModalClose}>
                <FormControl
                    icon
                    label="Password"
                    value={passwordValue}
                    handleChange={handlePasswordChange}
                    type={typeForPasswordInput}
                    toggleShowPassword={togglePasswordVisibile}
                />
                <Button fullWidth onClick={handleVerifyPassword} disabled={passwordValue.length === 0}>Show Passphrase</Button>
            </Modal>
        </Fragment>
    )
}

export default WalletAddress
