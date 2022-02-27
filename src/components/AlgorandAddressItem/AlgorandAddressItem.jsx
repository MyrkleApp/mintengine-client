import React from 'react'
import * as Styles from './algorandAddressItem'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import CopyButtonWithTooltip from '../../components/UI/MyTooltip/MyTooltip'


function AlgorandAddressItem({ walletAddress }) {

    return (
        <Styles.Root>
            <p>{walletAddress}</p>
            <div className="copyIconContainer" >
                <CopyButtonWithTooltip 
                    textToCopy={walletAddress} 
                    onlyIcon
                />
            </div>
        </Styles.Root>
    )
}

export default AlgorandAddressItem
