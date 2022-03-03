import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function useUserInputDispatch(inputValue, dataToDispatch, action) {
    const dispatch = useDispatch()

    useEffect(() => {

        const inputRateTimer = setTimeout(() => {
            if (inputValue.length > 0) {
                dispatch(action(dataToDispatch))
            }
        }, 1000)

        return(() => {
            clearTimeout(inputRateTimer)
        })
    }, [inputValue])

}

export default useUserInputDispatch