import React from 'react'
import { useSelector } from 'react-redux'
import ModalResponse from '../../../components/ModalResponse/ModalResponse'
import { HTTP_STATUS } from '../../../constants/httpStatus'

function UnfreezeRes() {
    const { status } = useSelector(state => state.algorand.unfreeze)

    const success = status === HTTP_STATUS.FULFILLED 

    return (
        <ModalResponse
            success={success}
            title={success ? 'success' : 'error'}
            description={
                success ? 'successfully unfroze asset' : 'something went wrong while trying to unfreeze asset'
            }
        />
    )
}

export default UnfreezeRes
