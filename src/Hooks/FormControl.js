import { useState } from 'react';

function useFormControl(type) {
    const [value, setValue] = useState('')

    const handleChange = e => {
        if (type === 'number') {
            const numValue = e.target.value
            const reg = new RegExp('^[0-9]*$');
            if (!reg.test(numValue)) {
                return
            }
        }
        setValue(e.target.value)
    }

    const [visible, setVisible] = useState(false)

    const toggleVisibile = () => {
        setVisible(prevState => !prevState)
    }

    const typeForPasswordInput = visible ? 'text' : 'password'

    const handleSetValue = data => {
        setValue(data)
    }
    
    
    return {
        value,
        handleChange,
        toggleVisibile,
        typeForPasswordInput,
        handleSetValue
    }
}

export default useFormControl