import axios from '../app/axios'
import { useState, useEffect } from 'react'
import { HTTP_STATUS } from '../constants/httpStatus'
import { ANS } from '@algonameservice/sdk'
import algosdk from "algosdk"
import { useSelector } from 'react-redux'


function useAddressIsValid(inputValue) {
    const [data, setData] = useState(null)
    const [status, setStatus] = useState(null)

    useEffect(() => {
        const inputRateTimer = setTimeout(() => {

            if ((inputValue.trim().length > 0) && (inputValue.trim().length !== 58)) {
                setData(false)
            } 

            if (inputValue.trim().length === 58) {
                setStatus(HTTP_STATUS.PENDING)
                axios.post('/algorand/v1/checks/valid_address/', { wallet_address: inputValue })
                .then((res) => {
                    setData(res.data)
                    setStatus(HTTP_STATUS.FULFILLED)
                })
                .catch((err) => {
                    setStatus(HTTP_STATUS.REJECTED)
                    console.log(err)
                })
            }

        }, 1000)

        return(() => clearTimeout(inputRateTimer))
    }, [inputValue])

    return { data, status }
}

const main_client_url = 'https://mainnet-algorand.api.purestake.io/ps2';
const main_index_url = 'https://mainnet-algorand.api.purestake.io/idx2';

const client = new algosdk.Algodv2({'X-API-KEY': process.env.REACT_APP_ANS_CLIENT}, `${main_client_url}`, '');

const indexer = new algosdk.Indexer({'X-API-KEY': process.env.REACT_APP_ANS_CLIENT}, `${main_index_url}`, '');

const sdk = new ANS(client, indexer)

export function useAddressFromANSIsValid(inputValue, setInputValue) {
    const [data, setData] = useState(null)
    const [status, setStatus] = useState(null)
    const isMainnet = useSelector(state => state.algorand.activeWallet.data?.current_net === 'mainnet')

    const getANSName = async(algo_name) => {
        let nameOwner;
        try { 
            nameOwner = await sdk.name(algo_name).getOwner()
        } catch(e) {
            nameOwner = `Could not Resolve Address for ${algo_name}`
        }
        return nameOwner
    }

    useEffect(() => {
        const inputRateTimer = setTimeout(() => {

            if ((inputValue.trim().length > 0) && (inputValue.trim().length !== 58) && isMainnet) {
                setStatus(HTTP_STATUS.PENDING)
                getANSName(inputValue)
                    .then((ansName) => {
                        if (ansName.includes('Could not Resolve Address')) {
                            setData(false)
                            setStatus(HTTP_STATUS.REJECTED)
                        } else {
                            setData(ansName)
                            setInputValue(ansName)
                            setStatus(HTTP_STATUS.FULFILLED)
                        }
                    })
            }       

            if (inputValue.trim().length === 58) {
                setStatus(HTTP_STATUS.PENDING)
                axios.post('/algorand/v1/checks/valid_address/', { wallet_address: inputValue })
                .then((res) => {
                    setData(res.data)
                    setStatus(HTTP_STATUS.FULFILLED)
                    console.log(res.data)
                })
                .catch((err) => {
                    setStatus(HTTP_STATUS.REJECTED)
                    console.log(err)
                })
            }

        }, 1000)

        return(() => clearTimeout(inputRateTimer))
    }, [inputValue])

    return { data, status }
}

export default useAddressIsValid