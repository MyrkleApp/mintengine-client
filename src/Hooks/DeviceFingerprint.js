import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { setDeviceFingerprint } from '../app/deviceFingerprint/deviceFingerprintSlice'


function useDeviceFingerprint() {
    const dispatch = useDispatch()

    useEffect(() => {
        // Initialize the agent at application startup.
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
            .then(result => dispatch(setDeviceFingerprint(result.visitorId)));
    }, [])
}

export default useDeviceFingerprint