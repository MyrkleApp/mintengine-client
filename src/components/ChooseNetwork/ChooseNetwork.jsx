import React, { useState } from 'react'
import * as Styles from './chooseNetwork'
import algorandLogo from '../../assets/icons/algorandLogo.png'
import rippleLogo from '../../assets/icons/rippleLogo.png'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useSelector } from 'react-redux';
import { ALGORAND } from '../../constants/network';
import ClickAwayListener from 'react-click-away-listener';
import useSubmit from '../../Hooks/Submit'
import { setAlgorandNet } from '../../app/algorand/algorandSlice';


function ChooseNetwork() {
    const [open, setOpen] = useState(false)
    const currentNetwork = useSelector(state => state.network.network)

    const currentNet = useSelector(state => state.algorand.activeWallet.data?.current_net)

    // const currentNetworkType = useSelector(state => state.network.networkType)

    const { handleSubmit } = useSubmit()

    const toggleOpen = () => {
        setOpen(prevState => !prevState)
    }

    const handleChangeNetwork = () => {

        // dispatch(toggleNetwork())

        const netToSet = currentNet === "testnet" ? "mainnet" : "testnet"
        
        handleSubmit(setAlgorandNet({ net: netToSet }), () => window.location.reload(false))

        toggleOpen()
    }

    const handleClickAway = () => {
        setOpen(false)
    }

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Styles.Root>
                <div className="main">
                    <div className="left">
                        <img src={currentNetwork === ALGORAND ? algorandLogo : rippleLogo} alt="" />
                    </div>
                    <div className="right">
                        <div className="rightTop">
                            <span>Use Mint Engine on</span>
                            <KeyboardArrowDownIcon style={{ cursor: 'pointer' }} onClick={toggleOpen} />
                        </div>
                        <div className="rightBottom">
                            {/* <span>{`${currentNetwork === ALGORAND ? ALGORAND : RIPPLE} NETWORK`}</span> */}
                            <span>{`${currentNet === "testnet" ? "ALGORAND TESTNET" : "ALGORAND MAINNET"}`}</span>
                        </div>
                    </div>
                </div>
                <Styles.Hidden show={open} onClick={handleChangeNetwork}>
                    {/* <img src={currentNetwork === ALGORAND ? rippleLogo : algorandLogo} alt="" />
                    <span>{`${currentNetwork === ALGORAND ? RIPPLE : ALGORAND} NETWORK`}</span> */}

                    <img src={algorandLogo} alt="" />
                    <span>{`${currentNet === "testnet" ? "Algorand mainnet" : "Algorand testnet"}`}</span>
                </Styles.Hidden>
            </Styles.Root>
        </ClickAwayListener>
    )
}

export default ChooseNetwork
