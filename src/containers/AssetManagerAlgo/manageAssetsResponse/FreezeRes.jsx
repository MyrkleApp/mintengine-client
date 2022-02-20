import React from 'react'
import { useSelector } from 'react-redux'
import ModalResponse from '../../../components/ModalResponse/ModalResponse'
import { HTTP_STATUS } from '../../../constants/httpStatus'

function FreezeRes() {
    const { status } = useSelector(state => state.algorand.freeze)

    const success = status === HTTP_STATUS.FULFILLED 

    return (
        <ModalResponse
            success={success}
            title={success ? 'success' : 'error'}
            description={
                success ? 'successfully froze asset' : 'something went wrong while trying to freeze asset'
            }
        />
    )
}

export default FreezeRes
