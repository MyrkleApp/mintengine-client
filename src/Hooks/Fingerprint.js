import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setDeviceFingerprint } from '../app/deviceFingerprint/deviceFingerprintSlice'
import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'
import DB from '../app/db'

//chrome fingerprint => "cMZVq60xH2DpZHJTtf6y"
// firefox fingerprint:""ZIa2nwrOQRTiRWBQFpBy""

function useFingerprint() {
    const dispatch = useDispatch()

    useEffect(() => {
        const handleFingerprint = async () => {
            const db = new DB();

            const savedDeviceFingerprint = await db.getFingerprint()

            // const savedDeviceFingerprint = localStorage.getItem('fingerprint')
            //     ? JSON.parse(localStorage.getItem('fingerprint'))
            //     : ""

            if (savedDeviceFingerprint) {
                dispatch(setDeviceFingerprint(savedDeviceFingerprint.doc.fingerprint))
            } else {

                const fpPromise = new Promise((resolve, reject) => {
                    const script = document.createElement('script');
                    script.onload = resolve;
                    script.onerror = reject;
                    script.async = true;
                    script.src = 'https://cdn.jsdelivr.net/npm/'
                        + '@fingerprintjs/fingerprintjs-pro@3/dist/fp.min.js';
                    document.head.appendChild(script);
                })
                .then(() => FingerprintJS.load({
                    token: process.env.REACT_APP_FINGERPRINT
                }));

                // Get the visitor identifier when you need it.
                fpPromise
                    .then(fp => fp.get())
                    .then(result => {
                        dispatch(setDeviceFingerprint(result.visitorId))
                        // localStorage.setItem('fingerprint', JSON.stringify(result.visitorId))

                        db.saveFingerprint({ 
                            fingerprint: result.visitorId, 
                            type: 'fingerprint' 
                        })
                    });
            }
        }
        handleFingerprint()
    }, [])
}

export default useFingerprint