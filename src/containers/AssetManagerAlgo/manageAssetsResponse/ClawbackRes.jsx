import React from 'react'
import { useSelector } from 'react-redux'
import ModalResponse from '../../../components/ModalResponse/ModalResponse'
import { HTTP_STATUS } from '../../../constants/httpStatus'

function ClawbackRes() {
    const { status } = useSelector(state => state.algorand.clawback)

    const success = status === HTTP_STATUS.FULFILLED 

    return (
        <ModalResponse
            success={success}
            title={success ? 'success' : 'error'}
            description={
                success ? 'successfully clawed-back asset' : 'something went wrong while trying to clawback asset'
            }
        />
    )
}

export default ClawbackRes
