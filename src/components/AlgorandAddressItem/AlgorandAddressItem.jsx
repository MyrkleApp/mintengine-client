import React from 'react'
import * as Styles from './algorandAddressItem'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import CopyButtonWithTooltip from '../../components/UI/MyTooltip/MyTooltip'
import { useSelector } from 'react-redux';


function AlgorandAddressItem({ walletAddress, handleClick }) {
    const activeWalletAddress = useSelector(state => state.algorand.activeWallet.data?.address)

    return (
        <Styles.Root active={activeWalletAddress === walletAddress}>
            <p onClick={handleClick}>{walletAddress}</p>
            <div className="copyIconContainer">
                <CopyButtonWithTooltip 
                    textToCopy={walletAddress} 
                    onlyIcon
                />
            </div>
        </Styles.Root>
    )
}

export default AlgorandAddressItem
