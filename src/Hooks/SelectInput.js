import { useState } from 'react'
import algorandLogo from '../assets/icons/algorandLogo.png'

function useSelectInput() {
    const [value, setValue] = useState({ id: '', amount: 0, image: algorandLogo })

    const setValueByClick = data => {
        setValue({ ...data, amount: 0 })
    }

    const handleSelectChange = (fieldToChange, e) => {
        setValue({ ...value, [fieldToChange]: e.target.value })
    }

    return {
        value,
        setValueByClick,
        handleSelectChange
    }
}

export default useSelectInput