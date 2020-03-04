import { UPDATE_PRICE } from '../actions/types';

const initialState = {
    price: 0,
}
export default function(state = initialState, action) {
    switch(action.type) {
        case UPDATE_PRICE:
            return action.price;
        default:
            return state;
    }
}