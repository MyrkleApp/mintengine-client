import axios from '../app/axios'
import { useState, useEffect } from 'react'
import { HTTP_STATUS } from '../constants/httpStatus'

function useAddressIsValid(inputValue) {
    const [data, setData] = useState(null)
    const [status, setStatus] = useState(null)

    useEffect(() => {
        // const inputRateTimer = setTimeout(() => {

            if (inputValue.length === 58) {
                setStatus(HTTP_STATUS.PENDING)
                axios.post('/algorand/v1/checks/valid_address/', { wallet_address: inputValue })
                .then((res) => {
                    setData(res.data)
                    setStatus(HTTP_STATUS.FULFILLED)
                    // console.log(res.data)
                })
                .catch((err) => {
                    setStatus(HTTP_STATUS.REJECTED)
                    console.log(err)
                })
            }
        // }, 1000)

        // return(() => clearTimeout(inputRateTimer))
    }, [inputValue])

    return { data, status }
}

export default useAddressIsValid