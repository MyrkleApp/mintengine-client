import React, { useState } from 'react'
import * as Styles from './chooseNetwork'
import algorandLogo from '../../assets/icons/algorandLogo.png'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


function ChooseNetwork() {
    const [open, setOpen] = useState(false)

    const toggleOpen = () => {
        setOpen(prevState => !prevState)
    }

    return (
        <Styles.Root>
            <div className="main">
                <div className="left">
                    <img src={algorandLogo} alt=""/>
                </div>
                <div className="right">
                    <div className="rightTop">
                        <span>Use Mint Engine on</span>
                        <KeyboardArrowDownIcon style={{ cursor: 'pointer' }} onClick={toggleOpen} />
                    </div>
                    <div className="rightBottom">
                        <span>ALGORAND NETWORK</span>
                    </div>
                </div>
            </div>
            <Styles.Hidden show={open}>
                <img src={algorandLogo} alt=""/>
                <span>ALGORAND NETWORK</span>
            </Styles.Hidden>
        </Styles.Root>
    )
}

export default ChooseNetwork
