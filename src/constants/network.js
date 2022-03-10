export const ALGORAND = 'ALGORAND';
export const RIPPLE = 'RIPPLE';
export const ALGO = 'algo';
export const XRP = 'xrp';

export const networkDataToReturn = { 
    algorand(state) {
        return state.algorand.activeWallet
    },
    ripple(state) {
        return state.algorand.activeWallet
    }
}

export const coinToReturn = {
    algorand: 'algo',
    ripple: 'xrp'
}

