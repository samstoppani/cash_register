import { UPDATE_PRICE } from './types';

const priceData = (price) => { return {
    type: UPDATE_PRICE,
    price: price
}}
export const updatePrice = (price) => {
    return function(dispatch) {
        dispatch( priceData(price) )
    }
}


// const cashData = (cashGiven) => { return {
//     type: UPDATE_CASH,
//     cashGiven: cashGiven
// }}
// export const updateCash = (cashGiven) => {
//     return function(dispatch) {
//         dispatch( cashData(cashGiven) )
//     }
// }


// export const updatePrice = (price) => {
//     return {
//         type: UPDATE_PRICE,
//         price: price
//     }
// }