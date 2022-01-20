import { useState } from 'react';

function useFormControl() {
    const [value, setValue] = useState('')

    const handleChange = e => {
        setValue(e.target.value)
    }

    return {
        value,
        handleChange
    }
}

export default useFormControl