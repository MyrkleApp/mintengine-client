import { HTTP_STATUS } from "../../constants/httpStatus"

const createAlgorandWalletPending = (state) => {
    state.createWallet.status = HTTP_STATUS.PENDING
}

const createAlgorandWalletFulfilled = (state, { payload }) => {
    state.createWallet.status = HTTP_STATUS.FULFILLED
    state.id = payload.id
    state.address = payload.address
    state.passphrase = payload.passphrase
    state.user = payload.user
    state.createWallet.error = null
    localStorage.setItem('algophrase', JSON.stringify(payload.passphrase))
}

const createAlgorandWalletRejected = (state, { payload }) => {
    state.createWallet.status =  HTTP_STATUS.REJECTED
    state.createWallet.error = payload
}

const confirmAlgorandPassphrasePending = (state) => {
    state.confirmWallet.status = HTTP_STATUS.PENDING
}

const confirmAlgorandPassphraseFulfilled = (state, { payload }) => {
    state.confirmWallet.status = HTTP_STATUS.FULFILLED
    state.confirmWallet.success = payload
}

const confirmAlgorandPassphraseRejected = (state, { payload }) => {
    state.confirmWallet.status =  HTTP_STATUS.REJECTED
    state.confirmWallet.error = payload.error
}


const getActiveAlgorandWalletPending = (state) => {
    state.activeWallet.status = HTTP_STATUS.PENDING
}

const getActiveAlgorandWalletFulfilled = (state, { payload }) => {
    state.activeWallet.status = HTTP_STATUS.FULFILLED
    state.activeWallet.value = payload
}

const getActiveAlgorandWalletRejected = (state) => {
    state.activeWallet.status = HTTP_STATUS.REJECTED
}

export {
    createAlgorandWalletPending,
    createAlgorandWalletFulfilled,
    createAlgorandWalletRejected,
    confirmAlgorandPassphrasePending,
    confirmAlgorandPassphraseFulfilled,
    confirmAlgorandPassphraseRejected,
    getActiveAlgorandWalletPending,
    getActiveAlgorandWalletFulfilled,
    getActiveAlgorandWalletRejected,
}