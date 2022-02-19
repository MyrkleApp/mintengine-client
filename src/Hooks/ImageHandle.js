import { useState } from 'react'

function useImageHandle() {
    const [imageValue, setImageValue] = useState('')

    const handleImageChange = e => {
        setImageValue(e.target.files[0])
    }

    const imageName = imageValue.name || 'no image selected'

    return {
        imageValue,
        handleImageChange,
        imageName
    }
}

export default useImageHandle