import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { HTTP_STATUS } from '../constants/httpStatus'

function useUserInputDispatch(inputValue, dataToDispatch, action) {
    const dispatch = useDispatch()
    const [status, setStatus] = useState(null)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const inputRateTimer = setTimeout(() => {
            if (inputValue.length > 0) {
                setStatus(HTTP_STATUS.PENDING)
                dispatch(action(dataToDispatch))
                .unwrap()
                .then((res) => {
                    setData(res)
                    setStatus(HTTP_STATUS.FULFILLED)
                })
                .catch((err) => {
                    setError(err)
                    setStatus(HTTP_STATUS.REJECTED)
                })
            }
        }, 1000)

        return(() => {
            clearTimeout(inputRateTimer)
            // dispatch(action(dataToDispatch)).abort()
        })
    }, [inputValue])

    return { status, data, error }
}

export default useUserInputDispatch