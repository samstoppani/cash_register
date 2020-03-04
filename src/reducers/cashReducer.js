import { UPDATE_CASH } from '../actions/types';

const initialState = {
    cashGiven: 0
}
export default function(state = initialState, action) {
    switch(action.type) {
        case UPDATE_CASH: 
            return action.cashGiven;
        default:
            return state;
    }
}