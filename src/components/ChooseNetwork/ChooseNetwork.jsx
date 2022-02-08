import React, { useState } from 'react'
import * as Styles from './chooseNetwork'
import algorandLogo from '../../assets/icons/algorandLogo.png'
import rippleLogo from '../../assets/icons/rippleLogo.png'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useDispatch, useSelector } from 'react-redux';
import { ALGORAND, RIPPLE } from '../../constants/network';
import { toggleNetwork } from '../../app/network/networkSlice';
import ClickAwayListener from 'react-click-away-listener';


function ChooseNetwork() {
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const currentNetwork = useSelector(state => state.network.network)

    const toggleOpen = () => {
        setOpen(prevState => !prevState)
    }

    const handleChangeNetwork = () => {
        dispatch(toggleNetwork())
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
                            <span>{`${currentNetwork === ALGORAND ? ALGORAND : RIPPLE} NETWORK`}</span>
                        </div>
                    </div>
                </div>
                <Styles.Hidden show={open} onClick={handleChangeNetwork}>
                    <img src={currentNetwork === ALGORAND ? rippleLogo : algorandLogo} alt="" />
                    <span>{`${currentNetwork === ALGORAND ? RIPPLE : ALGORAND} NETWORK`}</span>
                </Styles.Hidden>
            </Styles.Root>
        </ClickAwayListener>
    )
}

export default ChooseNetwork
