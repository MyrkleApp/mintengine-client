import { useState } from 'react';

function useFormControl() {
    const [value, setValue] = useState('')

    const handleChange = e => {
        setValue(e.target.value)
    }

    const [visible, setVisible] = useState(false)

    const toggleVisibile = () => {
        setVisible(prevState => !prevState)
    }

    const typeForPasswordInput = visible ? 'text' : 'password'

    return {
        value,
        handleChange,
        toggleVisibile,
        typeForPasswordInput
    }
}

export default useFormControl