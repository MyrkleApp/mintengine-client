import { useState } from 'react'

function useSelectInput() {
    const [value, setValue] = useState({ id: '', amount: '' })

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