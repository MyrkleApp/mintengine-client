import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import DB from '../app/db.js';
import { setAlgorandPassphrase } from '../app/algorand/algorandSlice.js';
import useEncrypt from './Encrypt';
import { networkDataToReturn } from '../constants/network.js'

function ActiveWalletPassphrase() {
    const dispatch = useDispatch()
    const network = useSelector(state => state.network.network)
    const { data: activeWalletData } = useSelector(networkDataToReturn[network.toLowerCase()]);
    const walletAddress  = activeWalletData?.address
    const { decryptString } = useEncrypt()
    const deviceFingerprint = useSelector(state => state.deviceFingerprint.deviceFingerprint)

    const db = new DB()

    /**
     * retrieve passphrase stored in browser db
     */
    useEffect(() => {
        const getActiveWalletPassphrase = async () => {
            //!adjust "const algorandPassphrase" to work for all networks and not just algorand
            if (walletAddress) {
                const allPassphrases = await db.getPassphrase()
                const activePassphrase = await allPassphrases.filter(obj => obj.doc[walletAddress])[0]
                const decryptedPassphrase = activePassphrase
                    ? decryptString(activePassphrase.doc[walletAddress])
                    : ""
                if (decryptedPassphrase) {
                    dispatch(setAlgorandPassphrase(decryptedPassphrase || ''))
                }
            }
        }
        getActiveWalletPassphrase()
    }, [walletAddress, deviceFingerprint, dispatch])

    return null
}

export default ActiveWalletPassphrase