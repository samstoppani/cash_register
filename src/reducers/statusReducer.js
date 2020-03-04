import { UPDATE_STATUS} from '../actions/types';

const initialState = {
    status: 0,
}
export default function(state = initialState, action) {
    switch(action.type) {
        case UPDATE_STATUS:
            return action.status;
        default:
            return state;
    }
}