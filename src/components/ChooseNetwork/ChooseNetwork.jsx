import React, { useState } from 'react'
import * as Styles from './chooseNetwork'
import algorandLogo from '../../assets/icons/algorandLogo.png'
import rippleLogo from '../../assets/icons/rippleLogo.png'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useDispatch, useSelector } from 'react-redux';
import { ALGORAND, ALGORAND_MAIN_NET, ALGORAND_TEST_NET, RIPPLE } from '../../constants/network';
import { toggleNetwork, toggleNetworkType } from '../../app/network/networkSlice';
import ClickAwayListener from 'react-click-away-listener';
import useSubmit from '../../Hooks/Submit'
import { setNet } from '../../app/network/networkSlice'


function ChooseNetwork() {
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const currentNetwork = useSelector(state => state.network.network)

    const currentNetworkType = useSelector(state => state.network.networkType)

    const { handleSubmit } = useSubmit()

    const toggleOpen = () => {
        setOpen(prevState => !prevState)
    }

    const handleChangeNetwork = () => {

        // dispatch(toggleNetwork())

        const netData = currentNetworkType === ALGORAND_TEST_NET ? "mainnet" : "testnet"
        
        handleSubmit(setNet({ net: netData }), () => dispatch(toggleNetworkType()))

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
                            <span>{`${currentNetworkType === ALGORAND_TEST_NET ? "ALGORAND TESTNET" : "ALGORAND MAINNET"}`}</span>
                        </div>
                    </div>
                </div>
                <Styles.Hidden show={open} onClick={handleChangeNetwork}>
                    {/* <img src={currentNetwork === ALGORAND ? rippleLogo : algorandLogo} alt="" />
                    <span>{`${currentNetwork === ALGORAND ? RIPPLE : ALGORAND} NETWORK`}</span> */}

                    <img src={algorandLogo} alt="" />
                    <span>{`${currentNetworkType === ALGORAND_TEST_NET ? "Algorand mainnet" : "Algorand testnet"}`}</span>
                </Styles.Hidden>
            </Styles.Root>
        </ClickAwayListener>
    )
}

export default ChooseNetwork
