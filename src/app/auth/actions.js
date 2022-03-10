import { HTTP_STATUS } from '../../constants/httpStatus'

export const registerUserPending = (state) => {
    state.register.status = HTTP_STATUS.PENDING
}

export const registerUserFulfilled = (state, { payload }) => {
    state.register.status = HTTP_STATUS.FULFILLED
    state.token = payload.key
    localStorage.setItem('mint-engine', JSON.stringify(payload.key))
    state.isLoggedIn = true
}

export const registerUserRejected = (state, { payload }) => {
    state.register.status = HTTP_STATUS.REJECTED
    state.register.error = payload.error[0]
}

export const loginUserPending = (state) =>{
    state.login.status = HTTP_STATUS.PENDING
}

export const loginUserFulfilled = (state, { payload }) => {
    state.login.status = HTTP_STATUS.FULFILLED
    state.token = payload.key
    localStorage.setItem('mint-engine', JSON.stringify(payload.key))
    state.isLoggedIn = true
}

export const loginUserRejected = (state, { payload }) => {
    state.login.status = HTTP_STATUS.REJECTED
    state.login.error = payload
}

export const getUserFulfilled = (state, { payload }) => {
    state.isLoggedIn = true
}

export const verifyPasswordPending = (state) => {
    state.verifyPassword.status = HTTP_STATUS.PENDING
}

export const verifyPasswordFulfilled = (state, { payload }) => {
    state.verifyPassword.status = HTTP_STATUS.FULFILLED
    state.verifyPassword.data = payload
}

export const verifyPasswordRejected = (state, { payload }) => {
    state.verifyPassword.status = HTTP_STATUS.REJECTED
    state.verifyPassword.error = payload
}