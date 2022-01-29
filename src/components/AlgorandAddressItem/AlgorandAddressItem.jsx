import React from 'react'
import * as Styles from './algorandAddressItem'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

function AlgorandAddressItem() {

    return (
        <Styles.Root>
            <p>OFUVYAGG6WTU2ZUS2TQE4CM3HH3QJDISX3I5SLOZHE2Q6QP3IOC3BXPY4A</p>
            <ContentCopyOutlinedIcon style={{ fontSize: '30px', color: '#097246' }} />
        </Styles.Root>
    )
}

export default AlgorandAddressItem
