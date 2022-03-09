import React, { Fragment, useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import * as Styles from './walletAddress'
import qrCode from '../../assets/icons/qrCode.svg'
import { WalletAddressButton } from '../../components/UI/Button/button';
import { Word } from '../../components/UI/WalletShared/walletShared';
import CopyButtonWithTooltip from '../../components/UI/MyTooltip/MyTooltip'
import { useDispatch, useSelector } from 'react-redux';
import { ALGORAND, networkDataToReturn, RIPPLE } from '../../constants/network';
import { ThreeDots } from 'react-loader-spinner';
import { HTTP_STATUS } from '../../constants/httpStatus';
import DB from '../../app/db';
import { setAlgorandPassphrase } from '../../app/algorand/algorandSlice';
import useEncrypt from '../../Hooks/Encrypt'
import useModal from '../../Hooks/Modal';
import Modal from '../../components/UI/Modal/Modal';


function WalletAddress() {
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const network = useSelector(state => state.network.network)
    const deviceFingerprint = useSelector(state => state.deviceFingerprint.deviceFingerprint)
    const rippleSeed = 'c6c108b3e923ea40067d129715065d96733528fc4ae5317814f795999f22b88f866a3343237b206daf6537ab593cba0b42a8f51721a6df3c5771cdc9312afc46'
    const { status, data: activeWalletData } = useSelector(networkDataToReturn[network.toLowerCase()]);
    const activeWalletAddress = activeWalletData?.address
    const algorandPassphrase = useSelector(state => state.algorand.passphrase)
    const textToCopy = network === ALGORAND ? algorandPassphrase : rippleSeed
    const { decryptString } = useEncrypt()

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

    const { modalState, handleModalOpen, handleModalClose } = useModal()

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
                            {/* <CopyButton outlined>Copy</CopyButton> */}
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
                                    <img src={qrCode} alt="" onClick={handleModalOpen} style={{ cursor: 'pointer' }} />
                                </div>
                            </Grid>

                            <Grid item xs={12} md={4} className="right">
                                <span className="amount">{ activeWalletData?.balance }&nbsp;</span>
                                <span className="coinName">ALGO</span><br />
                                <div className="dollarAmount">~ $0</div>
                                <WalletAddressButton onClick={showPassphrase} disabled={!algorandPassphrase ? true : false}>
                                    { network === ALGORAND ? 'Show Passphrase' : 'Show Seed' }
                                </WalletAddressButton>
                            </Grid>
                        </Grid>
                    </div>
                </Styles.WalletAddress>
            </Styles.Parent>

            <Modal open={modalState} handleClose={handleModalClose}>
                <Styles.QrCodeMainImg src={qrCode} />             
            </Modal>
        </Fragment>
    )
}

export default WalletAddress
