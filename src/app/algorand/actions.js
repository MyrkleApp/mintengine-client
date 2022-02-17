import { HTTP_STATUS } from "../../constants/httpStatus"

export const createAlgorandWalletPending = (state) => {
    state.createWallet.status = HTTP_STATUS.PENDING
}

export const createAlgorandWalletFulfilled = (state, { payload }) => {
    state.createWallet.status = HTTP_STATUS.FULFILLED
    state.id = payload.id
    state.address = payload.address
    state.passphrase = payload.passphrase
    state.user = payload.user
    state.createWallet.error = null
    localStorage.setItem('algophrase', JSON.stringify(payload.passphrase))
}

export const createAlgorandWalletRejected = (state, { payload }) => {
    state.createWallet.status =  HTTP_STATUS.REJECTED
    state.createWallet.error = payload
}

export const confirmAlgorandPassphrasePending = (state) => {
    state.confirmWallet.status = HTTP_STATUS.PENDING
}

export const confirmAlgorandPassphraseFulfilled = (state, { payload }) => {
    state.confirmWallet.status = HTTP_STATUS.FULFILLED
    state.confirmWallet.success = payload
}

export const confirmAlgorandPassphraseRejected = (state, { payload }) => {
    state.confirmWallet.status =  HTTP_STATUS.REJECTED
    state.confirmWallet.error = payload.error
}


export const getActiveAlgorandWalletPending = (state) => {
    state.activeWallet.status = HTTP_STATUS.PENDING
}

export const getActiveAlgorandWalletFulfilled = (state, { payload }) => {
    state.activeWallet.status = HTTP_STATUS.FULFILLED
    state.activeWallet.data = payload
}

export const getActiveAlgorandWalletRejected = (state, { payload }) => {
    state.activeWallet.status = HTTP_STATUS.REJECTED
    state.activeWallet.error = payload
}

export const createAlgorandClawbackPending = (state) => {
    state.clawback.status = HTTP_STATUS.PENDING
}

export const createAlgorandClawbackFulfilled = (state, { payload }) => {
    state.clawback.status = HTTP_STATUS.FULFILLED
    state.clawback.data = payload
}

export const createAlgorandClawbackRejected = (state, { payload }) => {
    state.clawback.status = HTTP_STATUS.REJECTED
    state.clawback.error = payload
}

export const createAlgorandCommonNftPending = (state) => {
    state.commonNft.status = HTTP_STATUS.PENDING
}

export const createAlgorandCommonNftFulfilled = (state, { payload }) => {
    state.commonNft.status = HTTP_STATUS.FULFILLED
    state.commonNft.data = payload
}

export const createAlgorandCommonNftRejected = (state, { payload }) => {
    state.commonNft.status = HTTP_STATUS.REJECTED
    state.commonNft.error = payload
}

export const createAlgorandTokenPending = (state) => {
    state.token.status = HTTP_STATUS.PENDING
}

export const createAlgorandTokenFulfilled = (state, { payload }) => {
    state.token.status = HTTP_STATUS.FULFILLED
    state.token.data = payload
}

export const createAlgorandTokenRejected = (state, { payload }) => {
    state.token.status = HTTP_STATUS.REJECTED
    state.token.error = payload
}

export const createCustomAlgorandTokenPending = (state) => {
    state.commonNft.status = HTTP_STATUS.PENDING
}

export const createCustomAlgorandTokenFulfilled = (state, { payload }) => {
    state.commonNft.status = HTTP_STATUS.FULFILLED
    state.commonNft.data = payload
}

export const createCustomAlgorandTokenRejected = (state, { payload }) => {
    state.commonNft.status = HTTP_STATUS.REJECTED
    state.commonNft.error = payload
}

export const destroyAlgorandPending = (state) => {
    state.destroy.status = HTTP_STATUS.PENDING
}

export const destroyAlgorandFulfilled = (state, { payload }) => {
    state.destroy.status = HTTP_STATUS.FULFILLED
    state.destroy.data = payload
}

export const destroyAlgorandRejected = (state, { payload }) => {
    state.destroy.status = HTTP_STATUS.REJECTED
    state.destroy.error = payload
}

export const createAlgorandFractionalNftPending = (state) => {
    state.fractionalNft.status = HTTP_STATUS.PENDING
}

export const createAlgorandFractionalNftFulfilled = (state, { payload }) => {
    state.fractionalNft.status = HTTP_STATUS.FULFILLED
    state.fractionalNft.data = payload
}

export const createAlgorandFractionalNftRejected = (state, { payload }) => {
    state.fractionalNft.status = HTTP_STATUS.REJECTED
    state.fractionalNft.error = payload
}

export const freezeAlgorandPending = (state) => {
    state.freeze.status = HTTP_STATUS.PENDING
}

export const freezeAlgorandFulfilled = (state, { payload }) => {
    state.freeze.status = HTTP_STATUS.FULFILLED
    state.freeze.data = payload
}

export const freezeAlgorandRejected = (state, { payload }) => {
    state.freeze.status = HTTP_STATUS.REJECTED
    state.freeze.error = payload
}

export const modifyAlgorandPending = (state) => {
    state.modify.status = HTTP_STATUS.PENDING
}

export const modifyAlgorandFulfilled = (state, { payload }) => {
    state.modify.status = HTTP_STATUS.FULFILLED
    state.modify.data = payload
}

export const modifyAlgorandRejected = (state, { payload }) => {
    state.modify.status = HTTP_STATUS.REJECTED
    state.modify.error = payload
}

export const algorandOptInPending = (state) => {
    state.optIn.status = HTTP_STATUS.PENDING
}

export const algorandOptInFulfilled = (state, { payload }) => {
    state.optIn.status = HTTP_STATUS.FULFILLED
    state.optIn.data = payload
}

export const algorandOptInRejected = (state, { payload }) => {
    state.optIn.status = HTTP_STATUS.REJECTED
    state.optIn.error = payload
}

export const algorandOptOutPending = (state) => {
    state.optOut.status = HTTP_STATUS.PENDING
}

export const algorandOptOutFulfilled = (state, { payload }) => {
    state.optOut.status = HTTP_STATUS.FULFILLED
    state.optOut.data = payload
}

export const algorandOptOutRejected = (state, { payload }) => {
    state.optOut.status = HTTP_STATUS.REJECTED
    state.optOut.error = payload
}

export const getAlgorandSendListPending = (state) => {
    state.sendList.status = HTTP_STATUS.PENDING
}

export const getAlgorandSendListFulfilled = (state, { payload }) => {
    state.sendList.status = HTTP_STATUS.FULFILLED
    state.sendList.data = payload
}

export const getAlgorandSendListRejected = (state, { payload }) => {
    state.sendList.status = HTTP_STATUS.REJECTED
    state.sendList.error = payload
}

export const sendAlgorandPending = (state) => {
    state.send.status = HTTP_STATUS.PENDING
}

export const sendAlgorandFulfilled = (state, { payload }) => {
    state.send.status = HTTP_STATUS.FULFILLED
    state.send.data = payload
}

export const sendAlgorandRejected = (state, { payload }) => {
    state.send.status = HTTP_STATUS.REJECTED
    state.send.error = payload
}

export const swapAlgorandPending = (state) => {
    state.swap.status = HTTP_STATUS.PENDING
}

export const swapAlgorandFulfilled = (state, { payload }) => {
    state.swap.status = HTTP_STATUS.FULFILLED
    state.swap.data = payload
}

export const swapAlgorandRejected = (state, { payload }) => {
    state.swap.status = HTTP_STATUS.REJECTED
    state.swap.error = payload
}

export const unfreezeAlgorandPending = (state) => {
    state.unfreeze.status = HTTP_STATUS.PENDING
}

export const unfreezeAlgorandFulfilled = (state, { payload }) => {
    state.unfreeze.status = HTTP_STATUS.FULFILLED
    state.unfreeze.data = payload
}

export const unfreezeAlgorandRejected = (state, { payload }) => {
    state.unfreeze.status = HTTP_STATUS.REJECTED
    state.unfreeze.error = payload
}