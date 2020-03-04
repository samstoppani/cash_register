import { UPDATE_STATUS } from './types';

const statusData = (status) => { return {
    type: UPDATE_STATUS,
    status: status
}}
export const updateStatus = (status) => {
    return function(dispatch) {
        dispatch( statusData(status) )
    }
}