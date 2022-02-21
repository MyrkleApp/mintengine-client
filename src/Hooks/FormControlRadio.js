import { useState } from 'react'

function useFormControlRadio() {
    const [value, setValue] = useState('')

    const handleClick = (data) => {
        setValue(data)
    }

    return {
        value,
        handleClick
    }
}

export default useFormControlRadio