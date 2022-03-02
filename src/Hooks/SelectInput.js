import { useState } from 'react'

function useSelectInput() {
    const [value, setValue] = useState({ id: '', amount: '' })

    const setValueByClick = data => {
        setValue({ ...data, img: '' })
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