import { HTTP_STATUS } from '../../constants/httpStatus'

const registerUserPending = (state) => {
    state.register.status = HTTP_STATUS.PENDING
}

const registerUserFulfilled = (state, { payload }) => {
    state.register.status = HTTP_STATUS.FULFILLED
    state.token = payload.key
    localStorage.setItem('mint-engine', JSON.stringify(payload.key))
}

const registerUserRejected = (state, { payload }) => {
    state.register.status = HTTP_STATUS.REJECTED
    state.register.error = payload.error[0]
}

const loginUserPending = (state) =>{
    state.login.status = HTTP_STATUS.PENDING
}

const loginUserFulfilled = (state, { payload }) => {
    state.login.status = HTTP_STATUS.FULFILLED
    state.token = payload.key
    localStorage.setItem('mint-engine', JSON.stringify(payload.key))
}

const loginUserRejected = (state, { payload }) => {
    state.login.status = HTTP_STATUS.REJECTED
    state.login.error = payload
}

export {
    registerUserPending,
    registerUserFulfilled,
    registerUserRejected,
    loginUserPending,
    loginUserFulfilled,
    loginUserRejected
}