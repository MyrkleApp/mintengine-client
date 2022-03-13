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

    const handleSetValue = (fieldToChange, data) => {
        setValue({ ...value, [fieldToChange]: data})
    }

    return {
        value,
        setValueByClick,
        handleSelectChange,
        handleSetValue
    }
}

export default useSelectInput