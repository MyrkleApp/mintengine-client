import { useEffect, useState } from 'react'
import axios from 'axios'
import algorandLogo from '../assets/icons/algorandLogo.png'

function useCheckImageExists(assetId) {
    const [tinyManAssetImage, setTinyManAssetImage] = useState('')

    useEffect(() => {
        if (assetId === 0) {
            setTinyManAssetImage(algorandLogo) 

        } else {
            
            axios
                .get(`https://asa-list.tinyman.org/assets/${assetId}/icon.png`)
                .then(res => {
                    if (res.headers['content-type'].includes('image')) {
                        setTinyManAssetImage(`https://asa-list.tinyman.org/assets/${assetId}/icon.png`)
                    } 
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [assetId])

    return {
        tinyManAssetImage
    }
}

export default useCheckImageExists