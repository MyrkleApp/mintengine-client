import { HTTP_STATUS } from "../../constants/httpStatus"

export const getCoinPricePending = (state) => {
    state.price.status = HTTP_STATUS.PENDING
}

export const getCoinPriceFulfilled = (state, { payload }) => {
    state.price.status = HTTP_STATUS.FULFILLED
    state.price.data = payload.data.market_data.price_usd
}

export const getCoinPriceRejected = (state, { payload }) => {
    state.price.status = HTTP_STATUS.REJECTED
    state.price.error = payload
}