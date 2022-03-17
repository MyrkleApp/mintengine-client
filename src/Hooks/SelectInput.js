import { useState } from 'react'
import algorandLogo from '../assets/icons/algorandLogo.png'

function useSelectInput() {
    const [value, setValue] = useState({ id: 0, name: 'Algorand', amount: "", image: algorandLogo, unit: 'ALGO' })

    const setValueByClick = data => {
        setValue({ ...data, amount: "" })
    }

    const handleSelectChange = (fieldToChange, e) => {
        setValue({ ...value, [fieldToChange]: e.target.value })
    }

    const handleSetValue = (fieldToChange, data) => {
        setValue({ ...value, [fieldToChange]: data})
    }

    const handleSetAssetValue = data => {
        setValue({ ...data, amount: "" })
    }

    return {
        value,
        setValueByClick,
        handleSelectChange,
        handleSetValue,
        handleSetAssetValue
    }
}

export default useSelectInput