import { UPDATE_CASH } from './types';

const cashData = (cashGiven) => { return {
    type: UPDATE_CASH,
    cashGiven: cashGiven
}}
export const updateCash = (cashGiven) => {
    return function(dispatch) {
        dispatch( cashData(cashGiven) )
    }
}