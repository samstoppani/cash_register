import { UPDATE_TILL } from './types';

const tillData = (till) => { return {
    type: UPDATE_TILL,
    till: till
}}
export const updateTill = (till) => {
    return function(dispatch) {
        dispatch( tillData(till) )
    }
}