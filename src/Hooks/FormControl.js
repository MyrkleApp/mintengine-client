import { useEffect, useState } from 'react';

function useFormControl(type) {
    const [value, setValue] = useState('')
    
    const [helperText, setHelperText] = useState('')

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

    const handlePasswordBlur = () => {
        if ((value.trim().length >= 8) && (/\d/.test(value))) {
            setHelperText('')
        } else {
            setHelperText('Minimum of 8 characters in length, include a number.')
        }
    }

    const handleConfirmPasswordChange = (e, passwordValue) => {
        if (e.target.value !== passwordValue) {
            setHelperText('Password does not match')
        } else {
            setHelperText('')
        }
        
        setValue(e.target.value)
    }
    
    
    return {
        value,
        handleChange,
        toggleVisibile,
        typeForPasswordInput,
        handleSetValue,
        helperText,
        handlePasswordBlur,
        handleConfirmPasswordChange
    }
}

export function useFormControlPasswordCheck(passwordValue, confirmPasswordValue) {

    const [passwordsAreValid, setPasswordsAreValid] = useState(false)

    useEffect(() => {
        const inputRateTimer = setTimeout(() => {
            if (
                (passwordValue.trim().length >= 8) && 
                (/\d/.test(passwordValue)) && 
                (confirmPasswordValue.trim().length >= 8) && 
                (/\d/.test(confirmPasswordValue)) &&
                (passwordValue.trim() === confirmPasswordValue.trim())
            ) {
                setPasswordsAreValid(true)
            } else {
                setPasswordsAreValid(false)
            }
        }, 500)

        return () => clearTimeout(inputRateTimer)

    }, [passwordValue, confirmPasswordValue])

    return {
        passwordsAreValid
    }
} 

export default useFormControl