import { UPDATE_TILL } from '../actions/types';

const initialState = {
    till: [
        ["£50", 0],
        ["£20", 0],
        ["£10", 0],
        ["£5", 0],
        ["£2", 0],
        ["£1", 0],
        ["50p", 0],
        ["20p", 0],
        ["10p", 0],
        ["5p", 0],
        ["2p", 0],
        ["1p", 0]
    ]
}
export default function(state = initialState, action) {
    switch(action.type) {
        case UPDATE_TILL:
            return action.till;
        default:
            return state;
    }
}
 