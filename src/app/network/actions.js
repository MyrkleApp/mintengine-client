import { HTTP_STATUS } from "../../constants/httpStatus"

export const setNetPending = (state) => {
    state.setNet.status = HTTP_STATUS.PENDING
}

export const setNetFulfilled = (state) => {
    state.setNet.status = HTTP_STATUS.FULFILLED
}

export const setNetRejected = (state) => {
    state.setNet.status = HTTP_STATUS.REJECTED
}